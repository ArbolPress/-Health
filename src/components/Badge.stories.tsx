import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconAlertTriangle, IconCheck, IconClock, IconInfoCircle, IconX } from '@tabler/icons-react'
import { Badge } from './Badge'

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Pendiente' },
  argTypes: {
    color: {
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
      control: { type: 'inline-radio' },
    },
    icon: {
      options: ['Ninguno', 'IconCheck', 'IconClock', 'IconAlertTriangle', 'IconInfoCircle', 'IconX'],
      mapping: {
        Ninguno: undefined,
        IconCheck,
        IconClock,
        IconAlertTriangle,
        IconInfoCircle,
        IconX,
      },
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** La etiqueta por defecto. Cambia sus opciones en el panel de controles. */
export const Default: Story = {}

/** Los cinco colores según su significado. */
export const Colores: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} color="neutral">Neutral</Badge>
      <Badge {...args} color="info">Info</Badge>
      <Badge {...args} color="success">Hecho</Badge>
      <Badge {...args} color="warning">Pendiente</Badge>
      <Badge {...args} color="danger">Urgente</Badge>
    </div>
  ),
}

/** Los dos tamaños. */
export const Tamaños: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} size="sm">Pequeño</Badge>
      <Badge {...args} size="md">Mediano</Badge>
    </div>
  ),
}

/** Con un icono antes del texto. */
export const ConIcono: Story = {
  name: 'Con icono',
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} color="info" icon={IconInfoCircle}>Nueva</Badge>
      <Badge {...args} color="success" icon={IconCheck}>Hecho</Badge>
      <Badge {...args} color="warning" icon={IconClock}>Pendiente</Badge>
      <Badge {...args} color="danger" icon={IconAlertTriangle}>Urgente</Badge>
    </div>
  ),
}

/** Con un punto de color antes del texto. */
export const ConPunto: Story = {
  name: 'Con punto',
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} color="neutral" dot>Borrador</Badge>
      <Badge {...args} color="success" dot>Activa</Badge>
      <Badge {...args} color="danger" dot>Caducada</Badge>
    </div>
  ),
}
