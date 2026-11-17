import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  IconArrowRight,
  IconDeviceFloppy,
  IconDotsVertical,
  IconHeart,
  IconMicrophone,
  IconPencil,
  IconPlus,
  IconTrash,
  IconX,
} from '@tabler/icons-react'
import { Button } from './Button'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Guardar' },
  argTypes: {
    icon: {
      options: [
        'Ninguno',
        'IconPlus',
        'IconDeviceFloppy',
        'IconArrowRight',
        'IconTrash',
        'IconMicrophone',
        'IconPencil',
      ],
      mapping: {
        Ninguno: undefined,
        IconPlus,
        IconDeviceFloppy,
        IconArrowRight,
        IconTrash,
        IconMicrophone,
        IconPencil,
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

/**
 * Botón con solo icono, sin texto. Es un círculo del mismo alto que el botón con texto.
 * Necesita `aria-label`: describe la acción para los lectores de pantalla
 * y aparece al pasar el ratón por encima.
 */
export const SoloIcono: Story = {
  name: 'Solo icono',
  args: { children: undefined, icon: IconMicrophone, 'aria-label': 'Grabar consulta' },
}

/** Los cuatro estilos con solo icono. */
export const SoloIconoVariantes: Story = {
  name: 'Solo icono: variantes',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" icon={IconPlus} aria-label="Añadir cita" />
      <Button variant="secondary" icon={IconPencil} aria-label="Editar" />
      <Button variant="ghost" icon={IconDotsVertical} aria-label="Más opciones" />
      <Button variant="danger" icon={IconTrash} aria-label="Borrar" />
    </div>
  ),
}

/** Los tres tamaños con solo icono, junto al botón con texto del mismo tamaño. */
export const SoloIconoTamaños: Story = {
  name: 'Solo icono: tamaños',
  render: () => (
    <div className="flex flex-col gap-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex items-center gap-3">
          <Button size={size} icon={IconHeart} aria-label="Añadir a favoritos" />
          <Button size={size} icon={IconHeart}>
            Favorito
          </Button>
        </div>
      ))}
    </div>
  ),
}

/** Estados con solo icono: normal, desactivado y cargando. */
export const SoloIconoEstados: Story = {
  name: 'Solo icono: estados',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" icon={IconX} aria-label="Cerrar" />
      <Button variant="secondary" icon={IconX} aria-label="Cerrar" disabled />
      <Button icon={IconDeviceFloppy} aria-label="Guardar" loading />
    </div>
  ),
}
