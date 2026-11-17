import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconArrowRight, IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react'
import { Button } from './Button'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Guardar' },
  argTypes: {
    icon: {
      options: ['Ninguno', 'IconPlus', 'IconDeviceFloppy', 'IconArrowRight', 'IconTrash'],
      mapping: {
        Ninguno: undefined,
        IconPlus,
        IconDeviceFloppy,
        IconArrowRight,
        IconTrash,
      },
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** El botón por defecto. Cambia sus opciones en el panel de controles. */
export const Default: Story = {}

/** Los cuatro estilos disponibles. */
export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="danger">Danger</Button>
    </div>
  ),
}

/** Los tres tamaños. */
export const Tamaños: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">Pequeño</Button>
      <Button {...args} size="md">Mediano</Button>
      <Button {...args} size="lg">Grande</Button>
    </div>
  ),
}

/** Con un icono a la izquierda o a la derecha del texto. */
export const ConIcono: Story = {
  name: 'Con icono',
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} icon={IconPlus}>Añadir cita</Button>
      <Button {...args} icon={IconArrowRight} iconPosition="right" variant="secondary">
        Siguiente
      </Button>
      <Button {...args} icon={IconTrash} variant="danger">Borrar</Button>
    </div>
  ),
}

/** Estados: normal, desactivado y cargando. */
export const Estados: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>Normal</Button>
      <Button {...args} disabled>Desactivado</Button>
      <Button {...args} loading>Guardando</Button>
    </div>
  ),
}

/** Ocupa todo el ancho disponible. */
export const AnchoCompleto: Story = {
  name: 'Ancho completo',
  args: { fullWidth: true, children: 'Confirmar cita' },
}
