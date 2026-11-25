#!/usr/bin/env node
// Genera, a partir de tokens/tokens.json:
//   - src/styles/tokens.css: una variable CSS por token;
//   - src/styles/theme.css: un bloque @theme de Tailwind que convierte los tokens
//     semánticos y de componente en clases;
//   - docs/tokens.md: la tabla token → clase de Tailwind.
//
// Uso:
//   npm run tokens               escribe los tres archivos
//   npm run tokens -- --check    solo comprueba que están al día, sin escribir nada

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = 'tokens/tokens.json'
const OUTPUTS = {
  css: 'src/styles/tokens.css',
  theme: 'src/styles/theme.css',
  docs: 'docs/tokens.md',
}
const HEADER = `Archivo generado por scripts/build-tokens.mjs a partir de ${SOURCE}. No lo edites a mano: cambia ${SOURCE} y ejecuta npm run tokens.`

// ---------------------------------------------------------------------------
// 1. Leer los tokens
// ---------------------------------------------------------------------------

/** Recorre el árbol y devuelve una lista plana de tokens con su ruta y su tipo heredado. */
function flatten(node, path = [], inheritedType) {
  const type = node.$type ?? inheritedType
  const out = []
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') && key !== '$root') continue
    // Un token guardado en $root toma el nombre de su grupo
    const childPath = key === '$root' ? path : [...path, key]
    if (child && typeof child === 'object' && '$value' in child) {
      out.push({ path: childPath, type: child.$type ?? type, value: child.$value, description: child.$description ?? '' })
    } else if (child && typeof child === 'object') {
      out.push(...flatten(child, childPath, type))
    }
  }
  return out
}

/** «{semantic.color.background.brand.$root}» → ['semantic', 'color', 'background', 'brand'] */
function aliasPath(alias) {
  return alias.slice(1, -1).split('.').filter((part) => part !== '$root')
}

const cssVar = (path) => `--${path.join('-')}`

// ---------------------------------------------------------------------------
// 2. Convertir cada valor a CSS
// ---------------------------------------------------------------------------

const round = (n) => Number(n.toFixed(4))

function toCss(value, type) {
  // Un alias se convierte en una referencia a la variable del token al que apunta
  if (typeof value === 'string' && value.startsWith('{')) return `var(${cssVar(aliasPath(value))})`
  switch (type) {
    case 'color': {
      const [a, b, c] = value.components
      if (value.colorSpace === 'oklch') {
        const alpha = value.alpha !== undefined && value.alpha !== 1 ? ` / ${value.alpha}` : ''
        return `oklch(${round(a * 100)}% ${b} ${c}${alpha})`
      }
      return `rgb(${a * 255} ${b * 255} ${c * 255} / ${value.alpha ?? 1})`
    }
    case 'dimension':
      return `${value.value}${value.unit}`
    case 'fontFamily':
      return value.map((name) => (/\s/.test(name) ? `"${name}"` : name)).join(', ')
    case 'fontWeight':
      return String(value)
    case 'shadow':
      return ['offsetX', 'offsetY', 'blur', 'spread', 'color'].map((part) => toCss(value[part])).join(' ')
    default:
      throw new Error(`Tipo de token desconocido: ${type}`)
  }
}

// ---------------------------------------------------------------------------
// 3. Decidir la clase de Tailwind de cada token
// ---------------------------------------------------------------------------
//
// Cada clase es la utilidad de Tailwind seguida del nombre del token:
//   semantic.color.background.brand   →  bg-background-brand
//   semantic.typography.*.heading     →  text-heading
//   semantic.space.md                 →  p-space-md (y cualquier utilidad de espaciado)
//   component.button.padding-x        →  px-button-padding-x

const COLOR_UTILITY = { background: 'bg', text: 'text', icon: 'text', border: 'border' }
const SPACING_UTILITY = { padding: 'p', 'padding-x': 'px', gap: 'gap' }

/** Para un token, devuelve la variable de @theme, la clase y, si hace falta, una utilidad propia. */
function themeEntry(token) {
  const [layer, ...rest] = token.path
  const isComponent = layer === 'component'
  const component = isComponent ? rest[0] : null
  const local = isComponent ? rest.slice(1) : rest // la ruta dentro del componente o de semantic
  const name = (parts) => (component ? [component, ...parts] : parts).join('-')

  // Color: semantic.color.<element>.… y component.<c>.<element>.…
  const colorParts = isComponent ? local : local[0] === 'color' ? local.slice(1) : null
  if (token.type === 'color' && colorParts) {
    const key = name(colorParts)
    const isFocus = colorParts[0] === 'border' && colorParts.at(-1) === 'focus'
    const utility = isFocus ? 'outline' : COLOR_UTILITY[colorParts[0]]
    return { themeVar: `--color-${key}`, className: `${utility}-${key}` }
  }

  // Tipografía: se combina en una sola clase text-<estilo>, más abajo
  if (local[0] === 'typography' || ['font-size', 'line-height', 'font-weight'].includes(local[0])) return null

  // Espaciado
  if (!isComponent && local[0] === 'space') {
    const key = `space-${local[1]}`
    return { themeVar: `--spacing-${key}`, className: `p-${key}` }
  }
  if (isComponent && SPACING_UTILITY[local[0]]) {
    const key = name(local)
    const utility = local[0] === 'padding' && local[1] === 'footer' ? 'pt' : SPACING_UTILITY[local[0]]
    return { themeVar: `--spacing-${key}`, className: `${utility}-${key}` }
  }

  // Radio
  if (local[0] === 'radius') {
    const key = isComponent ? name(local) : `radius-${local[1]}`
    return { themeVar: `--radius-${key}`, className: `rounded-${key}` }
  }

  // Grosor de borde. El del foco es el del contorno (outline), que Tailwind no
  // tiene como escala, así que se crea con @utility.
  if (local[0] === 'border-width') {
    const key = isComponent ? name(local) : `width-${local[1]}`
    if (local.at(-1) === 'focus') {
      return { utility: `outline-${key}`, property: 'outline-width', className: `outline-${key}` }
    }
    return { themeVar: `--border-width-${key}`, className: `border-${key}` }
  }

  // Sombra
  if (local[0] === 'elevation') {
    const key = isComponent ? name(local) : `elevation-${local[1]}`
    return { themeVar: `--shadow-${key}`, className: `shadow-${key}` }
  }

  throw new Error(`No sé qué clase dar al token ${token.path.join('.')}`)
}

/**
 * Agrupa las tres piezas de tipografía (font-size, line-height y font-weight) en
 * una sola clase text-<nombre>. Si una pieza no tiene variante propia (por ejemplo,
 * button.font-weight solo tiene una), se usa la del caso normal.
 */
function typographyEntries(tokens) {
  const styles = new Map()
  for (const token of tokens) {
    const [layer, ...rest] = token.path
    const isComponent = layer === 'component'
    const local = isComponent ? rest.slice(1) : rest[0] === 'typography' ? rest.slice(1) : null
    if (!local || !['font-size', 'line-height', 'font-weight'].includes(local[0])) continue
    const owner = isComponent ? rest[0] : null
    const suffix = local.slice(1).join('-')
    const groupKey = `${owner ?? ''}|${local[0]}|${suffix}`
    styles.set(groupKey, token)
  }
  const entries = []
  for (const [groupKey, token] of styles) {
    const [owner, piece, suffix] = groupKey.split('|')
    if (piece !== 'font-size') continue
    const pick = (p) => styles.get(`${owner}|${p}|${suffix}`) ?? styles.get(`${owner}|${p}|`)
    const name = owner ? [owner, suffix].filter(Boolean).join('-') : suffix
    entries.push({ name, size: token, lineHeight: pick('line-height'), weight: pick('font-weight') })
  }
  return entries
}

// ---------------------------------------------------------------------------
// 4. Generar los archivos
// ---------------------------------------------------------------------------

function buildTokensCss(tokens) {
  const lines = [`/* ${HEADER} */`, '', ':root {']
  let layer = null
  for (const token of tokens) {
    if (token.path[0] !== layer) {
      layer = token.path[0]
      lines.push('', `  /* ${layer} */`)
    }
    lines.push(`  ${cssVar(token.path)}: ${toCss(token.value, token.type)};`)
  }
  lines.push('}', '')
  return lines.join('\n')
}

function buildThemeCss(entries, typography) {
  const theme = []
  const utilities = []
  let section = null
  for (const { token, entry } of entries) {
    const title = token.path[0] === 'semantic' ? 'Semánticos' : `Componente: ${token.path[1]}`
    if (title !== section) {
      section = title
      theme.push('', `  /* ${title} */`)
    }
    if (entry.themeVar) theme.push(`  ${entry.themeVar}: var(${cssVar(token.path)});`)
    else utilities.push(`@utility ${entry.utility} {\n  ${entry.property}: var(${cssVar(token.path)});\n}`)
  }
  theme.push('', '  /* Estilos de texto: tamaño, interlineado y peso en una sola clase text-<nombre> */')
  for (const t of typography) {
    theme.push(`  --text-${t.name}: var(${cssVar(t.size.path)});`)
    if (t.lineHeight) theme.push(`  --text-${t.name}--line-height: var(${cssVar(t.lineHeight.path)});`)
    if (t.weight) theme.push(`  --text-${t.name}--font-weight: var(${cssVar(t.weight.path)});`)
  }
  return [
    `/* ${HEADER} */`,
    '',
    '/*',
    '  Convierte los tokens semánticos y de componente en clases de Tailwind.',
    '  Solo añade nombres nuevos: no cambia ninguna escala que Tailwind ya trae.',
    '  Los valores son las variables de src/styles/tokens.css.',
    '*/',
    '',
    '@theme {' + theme.join('\n'),
    '}',
    '',
    '/* El grosor del contorno del foco (outline) no tiene escala en Tailwind: se crea aquí. */',
    utilities.join('\n\n'),
    '',
  ].join('\n')
}

function buildDocs(entries, typography) {
  const typoClass = new Map()
  for (const t of typography) {
    for (const piece of [t.size, t.lineHeight, t.weight]) {
      if (piece && !typoClass.has(piece.path.join('.'))) typoClass.set(piece.path.join('.'), `text-${t.name}`)
    }
  }
  const rows = new Map()
  for (const { token, entry } of entries) rows.set(token.path.join('.'), entry.className)
  for (const [path, cls] of typoClass) rows.set(path, cls)

  const out = [
    '# Tokens y clases de Tailwind',
    '',
    `> ${HEADER}`,
    '',
    'Cada token semántico y de componente tiene una **clase de Tailwind**: la utilidad de Tailwind seguida del nombre del token. Las clases las crea `src/styles/theme.css`, y los valores salen de las variables de `src/styles/tokens.css`.',
    '',
    '- **Espaciado:** la clase de la tabla es un ejemplo. El mismo nombre sirve con cualquier utilidad de espaciado: `p-space-md`, `px-space-md`, `gap-space-md`, `m-space-md`…',
    '- **Tipografía:** las tres piezas de un estilo (tamaño, interlineado y peso) se aplican juntas con una sola clase: `text-heading`.',
    '- **Iconos:** su color se aplica con `text-…`, porque los iconos de Tabler usan el color del texto.',
    '- **Primitivos:** no tienen clase. Solo existen como variables CSS (`--primitive-…`), y los usan los semánticos.',
    '',
  ]
  const section = (title, filter) => {
    out.push(`## ${title}`, '', '| Token | Variable CSS | Clase de Tailwind |', '| --- | --- | --- |')
    for (const token of allTokens.filter(filter)) {
      const path = token.path.join('.')
      out.push(`| \`${path}\` | \`${cssVar(token.path)}\` | \`${rows.get(path)}\` |`)
    }
    out.push('')
  }
  section('Semánticos', (t) => t.path[0] === 'semantic')
  for (const component of [...new Set(allTokens.filter((t) => t.path[0] === 'component').map((t) => t.path[1]))]) {
    section(`Componente: ${component}`, (t) => t.path[0] === 'component' && t.path[1] === component)
  }
  return out.join('\n')
}

// ---------------------------------------------------------------------------
// 5. Escribir o comprobar
// ---------------------------------------------------------------------------

const json = JSON.parse(await readFile(join(root, SOURCE), 'utf8'))
const allTokens = flatten(json).filter((t) => t.path[0] !== '$description')
const themed = allTokens.filter((t) => t.path[0] !== 'primitive')
const entries = themed.map((token) => ({ token, entry: themeEntry(token) })).filter((e) => e.entry)
const typography = typographyEntries(themed)

// Dos tokens no pueden acabar en la misma clase
const seen = new Map()
for (const { token, entry } of entries) {
  const other = seen.get(entry.className)
  if (other) throw new Error(`La clase ${entry.className} sale de dos tokens: ${other} y ${token.path.join('.')}`)
  seen.set(entry.className, token.path.join('.'))
}

const files = {
  [OUTPUTS.css]: buildTokensCss(allTokens),
  [OUTPUTS.theme]: buildThemeCss(entries, typography),
  [OUTPUTS.docs]: buildDocs(entries, typography),
}

if (process.argv.includes('--check')) {
  const stale = []
  for (const [file, content] of Object.entries(files)) {
    const current = await readFile(join(root, file), 'utf8').catch(() => null)
    if (current !== content) stale.push(file)
  }
  if (stale.length) {
    console.error(`Estos archivos no están al día con ${SOURCE}:`)
    for (const file of stale) console.error(`  - ${file}`)
    console.error('Ejecuta «npm run tokens» para regenerarlos.')
    process.exit(1)
  }
  console.log(`Los archivos generados están al día con ${SOURCE}.`)
} else {
  for (const [file, content] of Object.entries(files)) {
    await mkdir(dirname(join(root, file)), { recursive: true })
    await writeFile(join(root, file), content)
    console.log(`Generado ${file}`)
  }
}
