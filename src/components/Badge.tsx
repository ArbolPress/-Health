import type { ComponentProps } from 'react'
import type { Icon } from '@tabler/icons-react'

type BadgeColor = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
type BadgeSize = 'sm' | 'md'

export type BadgeProps = ComponentProps<'span'> & {
  /** Color según el significado. Por defecto, `neutral`. */
  color?: BadgeColor
  /** Tamaño de la etiqueta. Por defecto, `md`. */
  size?: BadgeSize
  /** Icono de Tabler que se muestra antes del texto. */
  icon?: Icon
  /** Muestra un punto de color antes del texto (se ignora si hay icono). */
  dot?: boolean
}

// Todas las clases de color, espaciado, borde, radio y texto son tokens de
// componente (badge.*). Ver docs/tokens.md.
const colorClasses: Record<BadgeColor, { badge: string; icon: string; dot: string }> = {
  neutral: {
    badge: 'bg-badge-background-neutral-subtle text-badge-text-neutral border-badge-border-neutral',
    icon: 'text-badge-icon-neutral-subtle',
    dot: 'bg-badge-icon-neutral-subtle',
  },
  info: {
    badge: 'bg-badge-background-info-subtle text-badge-text-info border-badge-border-info',
    icon: 'text-badge-icon-info',
    dot: 'bg-badge-icon-info',
  },
  success: {
    badge: 'bg-badge-background-success-subtle text-badge-text-success border-badge-border-success',
    icon: 'text-badge-icon-success',
    dot: 'bg-badge-icon-success',
  },
  warning: {
    badge: 'bg-badge-background-warning-subtle text-badge-text-warning border-badge-border-warning',
    icon: 'text-badge-icon-warning',
    dot: 'bg-badge-icon-warning',
  },
  danger: {
    badge: 'bg-badge-background-error-subtle text-badge-text-error border-badge-border-error',
    icon: 'text-badge-icon-error',
    dot: 'bg-badge-icon-error',
  },
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'h-5 gap-badge-gap px-badge-padding-x-sm text-badge-sm',
  md: 'h-6 gap-badge-gap px-badge-padding-x text-badge',
}

export function Badge({
  color = 'neutral',
  size = 'md',
  icon: IconComponent,
  dot = false,
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center whitespace-nowrap rounded-badge-radius border-badge-border-width',
        colorClasses[color].badge,
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {IconComponent ? (
        <IconComponent size={size === 'sm' ? 12 : 14} className={colorClasses[color].icon} aria-hidden />
      ) : (
        dot && (
          <span
            className={['size-1.5 rounded-badge-radius', colorClasses[color].dot].join(' ')}
            aria-hidden
          />
        )
      )}
      {children}
    </span>
  )
}
