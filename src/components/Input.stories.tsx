import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconMail, IconSearch, IconUser } from '@tabler/icons-react'
import { Input } from './Input'

const meta = {
  title: 'Componentes/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Nombre', placeholder: 'Escribe tu nombre' },
  argTypes: {
    icon: {
      options: ['Ninguno', 'IconSearch', 'IconMail', 'IconUser'],
      mapping: { Ninguno: undefined, IconSearch, IconMail, IconUser },
      control: { type: 'select' },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** El campo por defecto. Cambia sus opciones en el panel de controles. */
export const Default: Story = {}

/** Con un texto de ayuda debajo. */
export const ConAyuda: Story = {
  name: 'Con ayuda',
  args: { hint: 'Como aparece en tu tarjeta sanitaria' },
}

/** Con un icono dentro del campo. */
export const ConIcono: Story = {
  name: 'Con icono',
  args: { label: 'Buscar medicamento', placeholder: 'Ibuprofeno', icon: IconSearch },
}

/** Los tres tamaños. */
export const Tamaños: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} size="sm" label="Pequeño" />
      <Input {...args} size="md" label="Mediano" />
      <Input {...args} size="lg" label="Grande" />
    </div>
  ),
}

/** Campo obligatorio, marcado con un asterisco. */
export const Obligatorio: Story = {
  args: { label: 'Correo electrónico', type: 'email', required: true, icon: IconMail },
}

/** Con un error: el borde se pone rojo y aparece el mensaje. */
export const ConError: Story = {
  name: 'Con error',
  args: {
    label: 'Correo electrónico',
    type: 'email',
    required: true,
    defaultValue: 'ana@',
    error: 'Introduce un correo válido',
  },
}

/** Desactivado: no se puede escribir en él. */
export const Desactivado: Story = {
  args: { disabled: true, defaultValue: 'Ana García' },
}
