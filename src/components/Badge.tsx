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

const colorClasses: Record<BadgeColor, { badge: string; dot: string }> = {
  neutral: { badge: 'bg-gray-100 text-gray-800 ring-gray-300', dot: 'bg-gray-500' },
  info: { badge: 'bg-sky-50 text-sky-800 ring-sky-200', dot: 'bg-sky-500' },
  success: { badge: 'bg-green-50 text-green-800 ring-green-200', dot: 'bg-green-500' },
  warning: { badge: 'bg-amber-50 text-amber-800 ring-amber-200', dot: 'bg-amber-500' },
  danger: { badge: 'bg-red-50 text-red-800 ring-red-200', dot: 'bg-red-500' },
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'h-5 gap-1 px-1.5 text-xs',
  md: 'h-6 gap-1.5 px-2 text-sm',
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
        'inline-flex items-center rounded-full font-medium whitespace-nowrap ring-1 ring-inset',
        colorClasses[color].badge,
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {IconComponent ? (
        <IconComponent size={size === 'sm' ? 12 : 14} aria-hidden />
      ) : (
        dot && (
          <span
            className={['size-1.5 rounded-full', colorClasses[color].dot].join(' ')}
            aria-hidden
          />
        )
      )}
      {children}
    </span>
  )
}
