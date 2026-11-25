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

// Todas las clases de color, espaciado, borde, radio y texto son tokens de
// componente (button.*). Ver docs/tokens.md.
const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-button-background-brand text-button-text-brand-inverted',
    'enabled:hover:bg-button-background-brand-hover enabled:active:bg-button-background-brand-pressed',
    'disabled:bg-button-background-neutral-disabled',
  ].join(' '),
  secondary: [
    'border-button-border-width border-button-border-neutral-strong',
    'bg-button-background-neutral text-button-text-neutral',
    'enabled:hover:bg-button-background-neutral-hover enabled:active:bg-button-background-neutral-pressed',
    'disabled:bg-button-background-neutral-disabled',
  ].join(' '),
  ghost: [
    'text-button-text-brand',
    'enabled:hover:bg-button-background-neutral-hover enabled:active:bg-button-background-neutral-pressed',
  ].join(' '),
  danger: [
    'bg-button-background-error text-button-text-error-inverted',
    'enabled:hover:bg-button-background-error-hover enabled:active:bg-button-background-error-pressed',
    'disabled:bg-button-background-neutral-disabled',
  ].join(' '),
}

// Color del icono de cada variante
const iconClasses: Record<ButtonVariant, string> = {
  primary: 'text-button-icon-brand-inverted',
  secondary: 'text-button-icon-neutral',
  ghost: 'text-button-icon-brand',
  danger: 'text-button-icon-error-inverted',
}

// Botón con texto: alto fijo y espacio a los lados
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 gap-button-gap-sm px-button-padding-x-sm text-button',
  md: 'h-10 gap-button-gap px-button-padding-x text-button',
  lg: 'h-12 gap-button-gap px-button-padding-x-lg text-button-lg',
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
  const iconColor = `${iconClasses[variant]} group-disabled:text-button-icon-neutral-disabled`
  const icon = loading ? (
    <IconLoader2 size={iconSize} className={`animate-spin ${iconColor}`} aria-hidden />
  ) : IconComponent ? (
    <IconComponent size={iconSize} className={iconColor} aria-hidden />
  ) : null

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      // En el botón con solo icono, la descripción también aparece al pasar el ratón
      title={title ?? (iconOnly ? props['aria-label'] : undefined)}
      className={[
        'group inline-flex shrink-0 items-center justify-center rounded-button-radius transition-colors',
        'focus-visible:outline-solid focus-visible:outline-button-border-width-focus focus-visible:outline-button-border-focus focus-visible:outline-offset-2',
        'disabled:cursor-not-allowed disabled:text-button-text-neutral-disabled',
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
