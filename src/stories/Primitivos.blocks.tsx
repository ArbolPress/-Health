import { useEffect, useState, type ReactNode } from 'react'

// Piezas visuales de la página «Fundamentos/Primitivos» de Storybook.
// No contienen valores propios: todo lo que enseñan llega de tokens/tokens.json.

type Dimension = { value: number; unit: 'px' | 'rem' }
type ColorValue = {
  colorSpace: 'oklch' | 'srgb'
  components: (number | 'none')[]
  alpha?: number
  hex: string
}
type Token<T> = { $value: T; $description?: string }
type Group<T> = { $type?: string; $description?: string } & { [name: string]: Token<T> | string | undefined }

// Los nombres que empiezan por $ son propiedades del grupo, no tokens
function entries<T>(group: Group<T>): [string, Token<T>][] {
  return Object.entries(group).filter(
    (entry): entry is [string, Token<T>] => !entry[0].startsWith('$') && typeof entry[1] === 'object',
  )
}

// Ordena de menor a mayor. Hace falta porque JavaScript coloca primero los nombres
// que parecen números enteros (0, 100, 150…) y deja «050» al final.
function byValue(a: [string, Token<Dimension>], b: [string, Token<Dimension>]) {
  return toPx(a[1].$value) - toPx(b[1].$value)
}

function toPx({ value, unit }: Dimension) {
  return unit === 'rem' ? value * 16 : value
}

function dimensionLabel(dimension: Dimension) {
  return dimension.unit === 'rem'
    ? `${dimension.value}rem · ${toPx(dimension)}px`
    : `${dimension.value}px`
}

function toCss(dimension: Dimension) {
  return `${dimension.value}${dimension.unit}`
}

function colorToCss({ colorSpace, components, alpha = 1 }: ColorValue) {
  const [a, b, c] = components
  if (colorSpace === 'oklch') {
    return `oklch(${Number(a) * 100}% ${b} ${c} / ${alpha})`
  }
  return `rgb(${Number(a) * 255} ${Number(b) * 255} ${Number(c) * 255} / ${alpha})`
}

function colorLabel(color: ColorValue) {
  return color.colorSpace === 'oklch'
    ? `oklch(${Number(color.components[0]) * 100}% ${color.components[1]} ${color.components[2]})`
    : colorToCss(color)
}

function Name({ children }: { children: ReactNode }) {
  return <span className="font-mono text-sm font-medium text-gray-900">{children}</span>
}

function Value({ children }: { children: ReactNode }) {
  return <span className="font-mono text-xs text-gray-500">{children}</span>
}

function Rows({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>
}

function Row({ name, value, children }: { name: string; value: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_10rem_1fr] items-center gap-4">
      <Name>{name}</Name>
      <Value>{value}</Value>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

/** Una fila por familia de color, con sus tonos del 50 al 950. */
export function ColorPalettes({ group }: { group: Record<string, unknown> }) {
  const families = Object.entries(group).filter(([name]) => !name.startsWith('$')) as [
    string,
    Group<ColorValue>,
  ][]
  return (
    <div className="flex flex-col gap-6">
      {families.map(([family, shades]) => (
        <div key={family}>
          <div className="mb-2 flex items-baseline gap-3">
            <Name>{family}</Name>
            {shades.$description && <Value>{shades.$description}</Value>}
          </div>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
            {entries(shades).map(([shade, { $value }]) => (
              <div key={shade} className="flex flex-col gap-1" title={colorLabel($value)}>
                <div
                  className="h-12 rounded-md ring-1 ring-black/10 ring-inset"
                  style={{ background: colorToCss($value) }}
                />
                <span className="font-mono text-xs font-medium text-gray-900">{shade}</span>
                <Value>{$value.hex}</Value>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Cada paso del espaciado como una barra de ese ancho. */
export function SpacingScale({ group }: { group: Group<Dimension> }) {
  return (
    <Rows>
      {entries(group).sort(byValue).map(([name, { $value }]) => (
        <Row key={name} name={name} value={dimensionLabel($value)}>
          <div className="h-4 rounded-sm bg-sky-500" style={{ width: toCss($value) }} />
        </Row>
      ))}
    </Rows>
  )
}

/** Un cuadrado por radio. */
export function RadiusScale({ group }: { group: Group<Dimension> }) {
  return (
    <div className="flex flex-wrap gap-6">
      {entries(group).sort(byValue).map(([name, { $value }]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div className="size-20 bg-sky-500" style={{ borderRadius: toCss($value) }} />
          <Name>{name}</Name>
          <Value>{dimensionLabel($value)}</Value>
        </div>
      ))}
    </div>
  )
}

/** Un recuadro por grosor de borde. */
export function BorderWidths({ group }: { group: Group<Dimension> }) {
  return (
    <div className="flex flex-wrap gap-6">
      {entries(group).map(([name, { $value }]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div
            className="size-20 rounded-md border-solid border-gray-900 bg-white"
            style={{ borderWidth: toCss($value) }}
          />
          <Name>{name}</Name>
          <Value>{dimensionLabel($value)}</Value>
        </div>
      ))}
    </div>
  )
}

/** La familia tipográfica, con un aviso si Inter no está disponible en este navegador. */
export function FontFamilies({ group }: { group: Group<string[]> }) {
  const [interLoaded, setInterLoaded] = useState<boolean | null>(null)

  useEffect(() => {
    document.fonts.ready.then(() => setInterLoaded(document.fonts.check('16px Inter')))
  }, [])

  return (
    <Rows>
      {entries(group).map(([name, { $value, $description }]) => (
        <div key={name} className="flex flex-col gap-2">
          <div className="flex items-baseline gap-3">
            <Name>{name}</Name>
            <Value>{$value.join(', ')}</Value>
          </div>
          <p className="text-3xl text-gray-900" style={{ fontFamily: $value.join(', ') }}>
            Salud para todos · ÁÉÍÓÚ áéíóú ñ 0123456789
          </p>
          {$description && <Value>{$description}</Value>}
          {interLoaded === false && (
            <p className="text-xs text-amber-800">
              Inter no está cargada en este navegador, así que la muestra usa la fuente de respaldo.
            </p>
          )}
        </div>
      ))}
    </Rows>
  )
}

/** Cada talla de texto con una frase de muestra. */
export function FontSizes({ group, family }: { group: Group<Dimension>; family: string[] }) {
  return (
    <Rows>
      {entries(group).map(([name, { $value }]) => (
        <Row key={name} name={name} value={dimensionLabel($value)}>
          <span
            className="block truncate text-gray-900"
            style={{ fontSize: toCss($value), lineHeight: 1.2, fontFamily: family.join(', ') }}
          >
            Salud para todos
          </span>
        </Row>
      ))}
    </Rows>
  )
}

/** Cada peso con una frase de muestra. */
export function FontWeights({ group, family }: { group: Group<number>; family: string[] }) {
  return (
    <Rows>
      {entries(group).map(([name, { $value }]) => (
        <Row key={name} name={name} value={String($value)}>
          <span
            className="text-2xl text-gray-900"
            style={{ fontWeight: $value, fontFamily: family.join(', ') }}
          >
            Salud para todos
          </span>
        </Row>
      ))}
    </Rows>
  )
}

/** Cada interlineado con un párrafo de dos líneas; las bandas marcan el alto de cada línea. */
export function LineHeights({ group, family }: { group: Group<Dimension>; family: string[] }) {
  return (
    <Rows>
      {entries(group).map(([name, { $value }]) => {
        const height = toCss($value)
        return (
          <Row key={name} name={name} value={dimensionLabel($value)}>
            <p
              className="max-w-xs text-base text-gray-900"
              style={{
                lineHeight: height,
                fontFamily: family.join(', '),
                backgroundImage: `repeating-linear-gradient(to bottom, rgb(14 165 233 / 0.12) 0 ${height}, transparent ${height} calc(${height} * 2))`,
              }}
            >
              Tu próxima cita es el martes.
              <br />
              Recuerda llevar tus análisis.
            </p>
          </Row>
        )
      })}
    </Rows>
  )
}

type ShadowGroup = {
  offset: Group<Dimension>
  blur: Group<Dimension>
  color: Group<ColorValue>
}

function ShadowSample({ label, value, shadow }: { label: string; value: string; shadow: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="size-20 rounded-lg bg-white" style={{ boxShadow: shadow }} />
      <Name>{label}</Name>
      <Value>{value}</Value>
    </div>
  )
}

/**
 * Las piezas de sombra. Cada fila cambia una pieza y deja las otras dos fijas,
 * para que se vea qué aporta cada una.
 */
export function ShadowPieces({ group }: { group: ShadowGroup }) {
  const offsets = entries(group.offset)
  const blurs = entries(group.blur)
  const colors = entries(group.color)

  const fixedOffset = group.offset['400'] as Token<Dimension>
  const fixedBlur = group.blur['800'] as Token<Dimension>
  const fixedColor = group.color['25'] as Token<ColorValue>

  const shadow = (offset: Dimension, blur: Dimension, color: ColorValue) =>
    `0 ${toCss(offset)} ${toCss(blur)} ${colorToCss(color)}`

  const sample = {
    offset: group.offset['200'] as Token<Dimension>,
    blur: group.blur['400'] as Token<Dimension>,
    color: group.color['10'] as Token<ColorValue>,
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Value>offset (desplazamiento), con blur 800 y color 25</Value>
        <div className="flex flex-wrap gap-8 bg-gray-50 p-6">
          {offsets.map(([name, { $value }]) => (
            <ShadowSample
              key={name}
              label={name}
              value={dimensionLabel($value)}
              shadow={shadow($value, fixedBlur.$value, fixedColor.$value)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Value>blur (desenfoque), con offset 400 y color 25</Value>
        <div className="flex flex-wrap gap-8 bg-gray-50 p-6">
          {blurs.map(([name, { $value }]) => (
            <ShadowSample
              key={name}
              label={name}
              value={dimensionLabel($value)}
              shadow={shadow(fixedOffset.$value, $value, fixedColor.$value)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Value>color (negro con transparencia), con offset 400 y blur 800</Value>
        <div className="flex flex-wrap gap-8 bg-gray-50 p-6">
          {colors.map(([name, { $value }]) => (
            <ShadowSample
              key={name}
              label={`${name} %`}
              value={colorToCss($value)}
              shadow={shadow(fixedOffset.$value, fixedBlur.$value, $value)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Value>Muestra combinada: offset 200 + blur 400 + color 10</Value>
        <div className="flex bg-gray-50 p-6">
          <div
            className="flex h-24 w-64 items-center justify-center rounded-xl bg-white text-sm text-gray-700"
            style={{ boxShadow: shadow(sample.offset.$value, sample.blur.$value, sample.color.$value) }}
          >
            Tarjeta de ejemplo
          </div>
        </div>
      </div>
    </div>
  )
}

/** Cada ancho de pantalla como una barra proporcional al más grande. */
export function Breakpoints({ group }: { group: Group<Dimension> }) {
  const items = entries(group)
  const widest = Math.max(...items.map(([, { $value }]) => toPx($value)))
  return (
    <Rows>
      {items.map(([name, { $value }]) => (
        <Row key={name} name={name} value={dimensionLabel($value)}>
          <div
            className="h-6 rounded-sm bg-sky-500"
            style={{ width: `${(toPx($value) / widest) * 100}%` }}
          />
        </Row>
      ))}
    </Rows>
  )
}
