import type { ComponentProps, ReactNode } from 'react'
import { IconLoader2, type Icon } from '@tabler/icons-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonBaseProps = Omit<ComponentProps<'button'>, 'children'> & {
  /** Estilo del botón. Por defecto, `primary`. */
  variant?: ButtonVariant
  /** Tamaño del botón. Por defecto, `md`. */
  size?: ButtonSize
  /** Lado en el que aparece el icono. Por defecto, `left`. */
  iconPosition?: 'left' | 'right'
  /** Muestra un indicador de carga y desactiva el botón. */
  loading?: boolean
  /** Ocupa todo el ancho disponible. */
  fullWidth?: boolean
}

type ButtonWithTextProps = ButtonBaseProps & {
  /** Texto del botón. */
  children: ReactNode
  /** Icono de Tabler que se muestra junto al texto. */
  icon?: Icon
}

type IconOnlyButtonProps = ButtonBaseProps & {
  /** Sin texto: el botón muestra solo el icono. */
  children?: undefined
  /** Icono de Tabler. Obligatorio cuando el botón no tiene texto. */
  icon: Icon
  /**
   * Descripción de la acción para lectores de pantalla y para el
   * texto que aparece al pasar el ratón. Obligatoria cuando el botón no tiene texto.
   */
  'aria-label': string
}

export type ButtonProps = ButtonWithTextProps | IconOnlyButtonProps

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 focus-visible:outline-teal-700',
  secondary:
    'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-teal-700',
  ghost:
    'text-teal-800 hover:bg-teal-50 active:bg-teal-100 focus-visible:outline-teal-700',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:outline-red-600',
}

// Botón con texto: alto fijo y espacio a los lados
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 px-3 text-sm',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-12 gap-2 px-5 text-base',
}

// Botón con solo icono: un círculo del mismo alto que el botón con texto
const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
}

const iconSizes: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 }

export function Button({
  variant = 'primary',
  size = 'md',
  icon: IconComponent,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  disabled,
  type = 'button',
  className = '',
  children,
  title,
  ...props
}: ButtonProps) {
  const iconOnly = children === undefined || children === null
  const iconSize = iconSizes[size]
  const icon = loading ? (
    <IconLoader2 size={iconSize} className="animate-spin" aria-hidden />
  ) : IconComponent ? (
    <IconComponent size={iconSize} aria-hidden />
  ) : null

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      // En el botón con solo icono, la descripción también aparece al pasar el ratón
      title={title ?? (iconOnly ? props['aria-label'] : undefined)}
      className={[
        'inline-flex shrink-0 items-center justify-center rounded-full font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
        fullWidth && !iconOnly ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {iconOnly ? (
        icon
      ) : (
        <>
          {iconPosition === 'left' && icon}
          {children}
          {iconPosition === 'right' && icon}
        </>
      )}
    </button>
  )
}
