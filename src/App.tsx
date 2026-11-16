import type { ReactNode } from 'react'
import {
  IconActivity,
  IconCalendarEvent,
  IconDental,
  IconEye,
  IconHeartbeat,
  IconMicrophone,
  IconPill,
  IconStethoscope,
} from '@tabler/icons-react'

// Estos son los valores que Tailwind trae por defecto.
// Todavía no son los de nuestro design system.

const colors = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink',
  'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'mauve', 'olive',
  'mist', 'taupe',
]

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

// En Tailwind, cada paso de espaciado vale 0,25rem (4px).
const spacing = [
  'px', '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
  '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40',
  '44', '48', '52', '56', '60', '64', '72', '80', '96',
]

const radii = [
  { name: 'none', value: '0' },
  { name: 'xs', value: '0.125rem' },
  { name: 'sm', value: '0.25rem' },
  { name: 'md', value: '0.375rem' },
  { name: 'lg', value: '0.5rem' },
  { name: 'xl', value: '0.75rem' },
  { name: '2xl', value: '1rem' },
  { name: '3xl', value: '1.5rem' },
  { name: '4xl', value: '2rem' },
  { name: 'full', value: '9999px' },
]

const textSizes = [
  { name: 'xs', value: '0.75rem' },
  { name: 'sm', value: '0.875rem' },
  { name: 'base', value: '1rem' },
  { name: 'lg', value: '1.125rem' },
  { name: 'xl', value: '1.25rem' },
  { name: '2xl', value: '1.5rem' },
  { name: '3xl', value: '1.875rem' },
  { name: '4xl', value: '2.25rem' },
  { name: '5xl', value: '3rem' },
  { name: '6xl', value: '3.75rem' },
  { name: '7xl', value: '4.5rem' },
  { name: '8xl', value: '6rem' },
  { name: '9xl', value: '8rem' },
]

const icons = [
  { name: 'IconPill', Icon: IconPill },
  { name: 'IconStethoscope', Icon: IconStethoscope },
  { name: 'IconCalendarEvent', Icon: IconCalendarEvent },
  { name: 'IconHeartbeat', Icon: IconHeartbeat },
  { name: 'IconActivity', Icon: IconActivity },
  { name: 'IconMicrophone', Icon: IconMicrophone },
  { name: 'IconEye', Icon: IconEye },
  { name: 'IconDental', Icon: IconDental },
]

function spacingLabel(step: string) {
  if (step === 'px') return '1px'
  const rem = Number(step) * 0.25
  return `${rem}rem · ${rem * 16}px`
}

function remToPx(value: string) {
  return value.endsWith('rem') ? `${parseFloat(value) * 16}px` : value
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold">
        {title}
      </h2>
      {children}
    </section>
  )
}

function App() {
  return (
    <main className="mx-auto max-w-6xl p-8 text-gray-900">
      <h1 className="text-4xl font-bold">Tailwind</h1>
      <p className="mt-2 text-gray-600">
        Valores que Tailwind CSS trae por defecto. Todavía no son los de
        DSHealth.
      </p>

      <Section title="Paleta de color">
        <div className="overflow-x-auto">
          <div className="min-w-3xl space-y-2">
            <div className="grid grid-cols-[6rem_repeat(11,minmax(0,1fr))] gap-2 text-xs text-gray-500">
              <span />
              {shades.map((shade) => (
                <span key={shade} className="text-center">
                  {shade}
                </span>
              ))}
            </div>
            {colors.map((color) => (
              <div
                key={color}
                className="grid grid-cols-[6rem_repeat(11,minmax(0,1fr))] items-center gap-2"
              >
                <span className="text-sm font-medium">{color}</span>
                {shades.map((shade) => (
                  <div
                    key={shade}
                    title={`${color}-${shade}`}
                    className={`h-10 rounded-md ring-1 ring-black/5 bg-${color}-${shade}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Escala de espaciado">
        <div className="space-y-1">
          {spacing.map((step) => (
            <div key={step} className="flex items-center gap-4">
              <span className="w-12 shrink-0 text-sm font-medium">{step}</span>
              <span className="w-32 shrink-0 text-xs text-gray-500">
                {spacingLabel(step)}
              </span>
              <div className={`h-4 bg-sky-500 w-${step}`} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radios">
        <div className="flex flex-wrap gap-6">
          {radii.map(({ name, value }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className={`size-20 bg-sky-500 rounded-${name}`} />
              <span className="text-sm font-medium">{name}</span>
              <span className="text-xs text-gray-500">{remToPx(value)}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tamaños de texto">
        <div className="space-y-4">
          {textSizes.map(({ name, value }) => (
            <div key={name} className="flex items-baseline gap-4">
              <span className="w-12 shrink-0 text-sm font-medium">{name}</span>
              <span className="w-28 shrink-0 text-xs text-gray-500">
                {value} · {remToPx(value)}
              </span>
              <span className={`leading-tight text-${name}`}>Salud</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Iconos (Tabler Icons)">
        <div className="grid grid-cols-4 gap-6 sm:grid-cols-8">
          {icons.map(({ name, Icon }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <Icon size={32} stroke={1.5} />
              <span className="text-xs text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}

export default App
