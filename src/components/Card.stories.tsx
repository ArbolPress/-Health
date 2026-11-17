import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCalendarEvent, IconPill, IconStethoscope } from '@tabler/icons-react'
import { Badge } from './Badge'
import { Button } from './Button'
import { Card } from './Card'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    title: 'Ibuprofeno 600 mg',
    description: '1 comprimido cada 8 horas',
    children: 'Tomar después de las comidas.',
  },
  argTypes: {
    icon: {
      options: ['Ninguno', 'IconPill', 'IconCalendarEvent', 'IconStethoscope'],
      mapping: { Ninguno: undefined, IconPill, IconCalendarEvent, IconStethoscope },
      control: { type: 'select' },
    },
    action: { control: false },
    footer: { control: false },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Las tarjetas sueltas se muestran con un ancho limitado, como en la app
const narrow: Story['decorators'] = [
  (Story) => (
    <div className="max-w-sm">
      <Story />
    </div>
  ),
]

/** La tarjeta por defecto. Cambia sus opciones en el panel de controles. */
export const Default: Story = { decorators: narrow }

/** Los tres estilos: con borde, con sombra y con fondo gris. */
export const Variantes: Story = {
  render: (args) => (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card {...args} variant="outlined" title="Outlined" />
      <Card {...args} variant="elevated" title="Elevated" />
      <Card {...args} variant="filled" title="Filled" />
    </div>
  ),
}

/** Los tres espacios interiores. */
export const Padding: Story = {
  decorators: narrow,
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Card {...args} padding="sm" title="Padding sm" />
      <Card {...args} padding="md" title="Padding md" />
      <Card {...args} padding="lg" title="Padding lg" />
    </div>
  ),
}

/** Completa: icono, etiqueta en la cabecera y botones abajo. */
export const Completa: Story = {
  decorators: narrow,
  args: {
    icon: IconPill,
    action: (
      <Badge color="success" size="sm">
        Activa
      </Badge>
    ),
    footer: (
      <>
        <Button size="sm">Ver receta</Button>
        <Button size="sm" variant="ghost">
          Recordar
        </Button>
      </>
    ),
  },
}

/** Solo con título y descripción, sin contenido. */
export const SoloCabecera: Story = {
  name: 'Solo cabecera',
  decorators: narrow,
  args: {
    title: 'Dentista',
    description: 'Martes 24 de noviembre, 10:30',
    icon: IconCalendarEvent,
    children: undefined,
    action: (
      <Badge color="info" size="sm">
        Próxima
      </Badge>
    ),
  },
}
