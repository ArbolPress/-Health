import type { ReactNode } from 'react'
import { IconHeartbeat } from '@tabler/icons-react'
import tokens from '../../tokens/tokens.json'

// Piezas visuales de la página «Fundamentos/Semánticos» de Storybook.
// Cada token se enseña con su nombre y el primitivo al que apunta.
// No contienen valores propios: todo llega de tokens/tokens.json.

type Dimension = { value: number; unit: 'px' | 'rem' }
type ColorValue = {
  colorSpace: 'oklch' | 'srgb'
  components: (number | 'none')[]
  alpha?: number
  hex: string
}
type ShadowValue = Record<'color' | 'offsetX' | 'offsetY' | 'blur' | 'spread', string>
type TokenNode = { $value?: unknown; $description?: string; [key: string]: unknown }

const root = tokens as unknown as TokenNode

/** Lista los tokens de un grupo. Un token guardado en $root toma el nombre de su grupo. */
function flatten(group: TokenNode, prefix: string[] = []): { name: string; token: TokenNode }[] {
  const out: { name: string; token: TokenNode }[] = []
  for (const [key, child] of Object.entries(group)) {
    if (key.startsWith('$') && key !== '$root') continue
    const node = child as TokenNode
    const path = key === '$root' ? prefix : [...prefix, key]
    if (node && typeof node === 'object' && '$value' in node) {
      out.push({ name: path.join('.'), token: node })
    } else if (node && typeof node === 'object') {
      out.push(...flatten(node, path))
    }
  }
  return out
}

/** Busca un token por su ruta, por ejemplo «semantic.color.text.neutral». */
function find(path: string): TokenNode {
  let node: TokenNode = root
  for (const part of path.split('.')) node = node[part] as TokenNode
  return node && !('$value' in node) && '$root' in node ? (node.$root as TokenNode) : node
}

/** Convierte un alias «{primitive.color.gray.50}» en la ruta sin llaves. */
function aliasPath(alias: unknown) {
  return String(alias).replace(/^\{|\}$/g, '')
}

function resolve<T>(alias: unknown): T {
  return find(aliasPath(alias)).$value as T
}

function semanticColor(path: string) {
  return resolve<ColorValue>(find(`semantic.color.${path}`).$value)
}

function colorToCss({ colorSpace, components, alpha = 1 }: ColorValue) {
  const [a, b, c] = components
  return colorSpace === 'oklch'
    ? `oklch(${Number(a) * 100}% ${b} ${c} / ${alpha})`
    : `rgb(${Number(a) * 255} ${Number(b) * 255} ${Number(c) * 255} / ${alpha})`
}

function toCss(dimension: Dimension) {
  return `${dimension.value}${dimension.unit}`
}

function toPx(dimension: Dimension) {
  return dimension.unit === 'rem' ? dimension.value * 16 : dimension.value
}

// Contraste según WCAG, calculado con el valor hex de cada color
function luminance(hex: string) {
  const channel = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5)
}

function contrast(a: ColorValue, b: ColorValue) {
  const [high, low] = [luminance(a.hex), luminance(b.hex)].sort((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

function Name({ children }: { children: ReactNode }) {
  return <span className="font-mono text-sm font-medium text-gray-900">{children}</span>
}

function Alias({ children }: { children: ReactNode }) {
  return <span className="font-mono text-xs text-gray-500">→ {children}</span>
}

function Note({ children }: { children: ReactNode }) {
  return <span className="text-xs text-gray-600">{children}</span>
}

function Contrast({ ratio, min }: { ratio: number; min: number | null }) {
  const ok = min === null || ratio >= min
  return (
    <span
      className={[
        'rounded-sm px-1.5 py-0.5 font-mono text-xs',
        ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800',
      ].join(' ')}
    >
      {ratio.toFixed(2)}:1 {min === null ? '(sin mínimo)' : ok ? `✓ mín. ${min}` : `✗ mín. ${min}`}
    </span>
  )
}

function Label({ name, token }: { name: string; token: TokenNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <Name>{name}</Name>
      <Alias>{aliasPath(token.$value)}</Alias>
      {token.$description && <Note>{token.$description}</Note>}
    </div>
  )
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>
}

/** El fondo sobre el que se pensó cada texto o icono: los «inverted», sobre el fondo sólido de su rol. */
function pairedBackground(name: string) {
  const [role, modifier] = name.split('.')
  if (modifier === 'inverted') return role === 'neutral' ? 'background.neutral.inverted' : `background.${role}`
  return 'background.neutral'
}

/** Fondos, cada uno con el texto que va encima. */
export function BackgroundColors() {
  const list = flatten(find('semantic.color.background') as TokenNode)
  return (
    <Grid>
      {list.map(({ name, token }) => {
        const [role, modifier] = name.split('.')
        const solid = !modifier || ['hover', 'pressed'].includes(modifier)
        const textPath =
          role === 'neutral'
            ? modifier === 'inverted'
              ? 'text.neutral.inverted'
              : 'text.neutral'
            : solid
              ? `text.${role}.inverted`
              : `text.${role}`
        const bg = resolve<ColorValue>(token.$value)
        const fg = semanticColor(textPath)
        return (
          <div key={name} className="flex flex-col gap-2">
            <div
              className="flex h-20 items-center justify-center rounded-lg text-sm font-medium ring-1 ring-black/10 ring-inset"
              style={{ background: colorToCss(bg), color: colorToCss(fg) }}
            >
              Aa · color.{textPath}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Contrast ratio={contrast(fg, bg)} min={modifier === 'disabled' ? null : 4.5} />
            </div>
            <Label name={`color.background.${name}`} token={token} />
          </div>
        )
      })}
    </Grid>
  )
}

/** Textos e iconos, sobre el fondo para el que están pensados, con su contraste. */
function Foregrounds({ kind }: { kind: 'text' | 'icon' }) {
  const list = flatten(find(`semantic.color.${kind}`) as TokenNode)
  const min = kind === 'text' ? 4.5 : 3
  return (
    <Grid>
      {list.map(({ name, token }) => {
        const fg = resolve<ColorValue>(token.$value)
        const [role, modifier] = name.split('.')
        const backgrounds = [pairedBackground(name)]
        if (!modifier && role !== 'neutral') backgrounds.push(`background.${role}.subtle`)
        return (
          <div key={name} className="flex flex-col gap-2">
            {backgrounds.map((bgPath) => {
              const bg = semanticColor(bgPath)
              return (
                <div key={bgPath} className="flex flex-col gap-1">
                  <div
                    className="flex h-14 items-center gap-2 rounded-lg px-4 ring-1 ring-black/10 ring-inset"
                    style={{ background: colorToCss(bg), color: colorToCss(fg) }}
                  >
                    {kind === 'text' ? (
                      <span className="text-base">Tu próxima cita es el martes</span>
                    ) : (
                      <IconHeartbeat size={24} aria-hidden />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Note>sobre color.{bgPath}</Note>
                    <Contrast ratio={contrast(fg, bg)} min={modifier === 'disabled' ? null : min} />
                  </div>
                </div>
              )
            })}
            <Label name={`color.${kind}.${name}`} token={token} />
          </div>
        )
      })}
    </Grid>
  )
}

export function TextColors() {
  return <Foregrounds kind="text" />
}

export function IconColors() {
  return <Foregrounds kind="icon" />
}

/** Bordes sobre el fondo base; el de foco, como contorno. */
export function BorderColors() {
  const list = flatten(find('semantic.color.border') as TokenNode)
  const base = semanticColor('background.neutral')
  const width = resolve<Dimension>(find('semantic.border-width.default').$value)
  const focusWidth = resolve<Dimension>(find('semantic.border-width.focus').$value)
  return (
    <Grid>
      {list.map(({ name, token }) => {
        const color = resolve<ColorValue>(token.$value)
        const isFocus = name === 'focus'
        return (
          <div key={name} className="flex flex-col gap-2">
            <div className="flex h-20 items-center justify-center rounded-lg" style={{ background: colorToCss(base) }}>
              <div
                className="h-12 w-40 rounded-md bg-white"
                style={
                  isFocus
                    ? { outline: `${toCss(focusWidth)} solid ${colorToCss(color)}`, outlineOffset: '2px' }
                    : { border: `${toCss(width)} solid ${colorToCss(color)}` }
                }
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Note>sobre color.background.neutral</Note>
              <Contrast ratio={contrast(color, base)} min={name === 'neutral' ? null : 3} />
            </div>
            <Label name={`color.border.${name}`} token={token} />
          </div>
        )
      })}
    </Grid>
  )
}

/** Cada estilo de texto con un ejemplo y sus tres piezas. */
export function TypographyStyles() {
  const sizes = flatten(find('semantic.typography.font-size') as TokenNode)
  const family = (find('primitive.font-family.inter').$value as string[]).join(', ')
  return (
    <div className="flex flex-col gap-8">
      {sizes.map(({ name, token }) => {
        const lineHeight = find(`semantic.typography.line-height.${name}`)
        const weight = find(`semantic.typography.font-weight.${name}`)
        const size = resolve<Dimension>(token.$value)
        const leading = resolve<Dimension>(lineHeight.$value)
        return (
          <div key={name} className="flex flex-col gap-2">
            <p
              className="text-gray-900"
              style={{
                fontFamily: family,
                fontSize: toCss(size),
                lineHeight: toCss(leading),
                fontWeight: resolve<number>(weight.$value),
              }}
            >
              Tu próxima revisión de la vista es en marzo
            </p>
            <div className="flex flex-col gap-0.5">
              <Name>typography.{name}</Name>
              <Alias>
                font-size: {aliasPath(token.$value)} ({toPx(size)}px) · line-height:{' '}
                {aliasPath(lineHeight.$value)} ({toPx(leading)}px) · font-weight: {aliasPath(weight.$value)}
              </Alias>
              {token.$description && <Note>{token.$description}</Note>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Espaciados como barras. */
export function SpaceScale() {
  return (
    <div className="flex flex-col gap-3">
      {flatten(find('semantic.space') as TokenNode).map(({ name, token }) => {
        const value = resolve<Dimension>(token.$value)
        return (
          <div key={name} className="grid grid-cols-[16rem_1fr] items-center gap-4">
            <Label name={`space.${name}`} token={{ ...token, $description: `${toPx(value)}px` }} />
            <div className="h-4 rounded-sm bg-sky-500" style={{ width: toCss(value) }} />
          </div>
        )
      })}
    </div>
  )
}

/** Radios como cuadrados. */
export function RadiusScale() {
  return (
    <div className="flex flex-wrap gap-6">
      {flatten(find('semantic.radius') as TokenNode).map(({ name, token }) => {
        const value = resolve<Dimension>(token.$value)
        return (
          <div key={name} className="flex w-36 flex-col gap-2">
            <div className="size-20 bg-sky-500" style={{ borderRadius: toCss(value) }} />
            <Label name={`radius.${name}`} token={{ ...token, $description: `${toPx(value)}px` }} />
          </div>
        )
      })}
    </div>
  )
}

/** Grosores de borde como recuadros. */
export function BorderWidths() {
  return (
    <div className="flex flex-wrap gap-6">
      {flatten(find('semantic.border-width') as TokenNode).map(({ name, token }) => {
        const value = resolve<Dimension>(token.$value)
        return (
          <div key={name} className="flex w-56 flex-col gap-2">
            <div
              className="h-16 w-full rounded-md border-solid border-gray-900 bg-white"
              style={{ borderWidth: toCss(value) }}
            />
            <Label name={`border-width.${name}`} token={token} />
          </div>
        )
      })}
    </div>
  )
}

/** Sigue la cadena de alias (component → semantic → primitive) hasta el valor real. */
function resolveDeep(value: unknown): unknown {
  if (typeof value === 'string' && value.startsWith('{')) return resolveDeep(find(aliasPath(value)).$value)
  return value
}

/** Muestra visual de un token según lo que es: color, sombra, peso, radio, borde o medida. */
function ComponentSample({ property, value }: { property: string; value: unknown }) {
  const resolved = resolveDeep(value)
  if (property === 'elevation') {
    const pieces = resolved as ShadowValue
    const parts = (['offsetX', 'offsetY', 'blur', 'spread'] as const).map((p) => toCss(resolveDeep(pieces[p]) as Dimension))
    const color = colorToCss(resolveDeep(pieces.color) as ColorValue)
    return <div className="size-10 rounded-md bg-white" style={{ boxShadow: `${parts.join(' ')} ${color}` }} />
  }
  if (resolved && typeof resolved === 'object' && 'colorSpace' in resolved) {
    return (
      <div
        className="size-10 rounded-md ring-1 ring-black/10 ring-inset"
        style={{ background: colorToCss(resolved as ColorValue) }}
      />
    )
  }
  if (typeof resolved === 'number') {
    return (
      <span className="w-10 text-center text-xl text-gray-900" style={{ fontWeight: resolved }}>
        Aa
      </span>
    )
  }
  const dimension = resolved as Dimension
  if (property === 'radius') {
    return <div className="size-10 bg-sky-500" style={{ borderRadius: toCss(dimension) }} />
  }
  if (property === 'border-width') {
    return <div className="size-10 rounded-md border-solid border-gray-900" style={{ borderWidth: toCss(dimension) }} />
  }
  if (['padding', 'padding-x', 'gap'].includes(property)) {
    return (
      <div className="flex w-10 items-center">
        <div className="h-3 rounded-sm bg-sky-500" style={{ width: toCss(dimension) }} />
      </div>
    )
  }
  return <span className="w-10 text-center font-mono text-xs text-gray-700">{toPx(dimension)}px</span>
}

/** Los tokens de un componente, cada uno con el semántico al que apunta y el valor final. */
export function ComponentTokens({ component }: { component: string }) {
  const group = find(`component.${component}`) as TokenNode
  const list = flatten(group)
  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {list.map(({ name, token }) => {
        const property = name.split('.')[0]
        const target = aliasPath(token.$value)
        const primitive = find(target).$value
        const primitiveLabel =
          typeof primitive === 'string'
            ? aliasPath(primitive)
            : property === 'elevation'
              ? 'varias piezas de primitive.shadow'
              : ''
        return (
          <div key={name} className="grid grid-cols-[3rem_1fr] items-center gap-4 py-3">
            <ComponentSample property={property} value={token.$value} />
            <div className="flex min-w-0 flex-col gap-0.5">
              <Name>
                {component}.{name}
              </Name>
              <Alias>{target}</Alias>
              {primitiveLabel && <span className="pl-4 font-mono text-xs text-gray-500">→ {primitiveLabel}</span>}
              {token.$description && <Note>{token.$description}</Note>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Elevaciones como tarjetas, con las piezas de sombra que las forman. */
export function Elevations() {
  return (
    <div className="flex flex-wrap gap-8 bg-gray-50 p-8">
      {flatten(find('semantic.elevation') as TokenNode).map(({ name, token }) => {
        const pieces = token.$value as ShadowValue
        const css = [
          toCss(resolve<Dimension>(pieces.offsetX)),
          toCss(resolve<Dimension>(pieces.offsetY)),
          toCss(resolve<Dimension>(pieces.blur)),
          toCss(resolve<Dimension>(pieces.spread)),
          colorToCss(resolve<ColorValue>(pieces.color)),
        ].join(' ')
        return (
          <div key={name} className="flex w-60 flex-col gap-3">
            <div className="flex h-24 items-center justify-center rounded-xl bg-white text-sm text-gray-700" style={{ boxShadow: css }}>
              elevation.{name}
            </div>
            <div className="flex flex-col gap-0.5">
              <Name>elevation.{name}</Name>
              {Object.entries(pieces).map(([part, alias]) => (
                <Alias key={part}>
                  {part}: {aliasPath(alias)}
                </Alias>
              ))}
              {token.$description && <Note>{token.$description}</Note>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
