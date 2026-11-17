import type { ComponentProps, ReactNode } from 'react'
import type { Icon } from '@tabler/icons-react'

type CardVariant = 'outlined' | 'elevated' | 'filled'
type CardPadding = 'sm' | 'md' | 'lg'

export type CardProps = Omit<ComponentProps<'div'>, 'title'> & {
  /** Título de la tarjeta. */
  title?: ReactNode
  /** Texto corto debajo del título. */
  description?: ReactNode
  /** Icono de Tabler que se muestra junto al título. */
  icon?: Icon
  /** Contenido de la parte derecha de la cabecera (por ejemplo, un Badge). */
  action?: ReactNode
  /** Contenido de la parte de abajo (por ejemplo, botones). */
  footer?: ReactNode
  /** Estilo de la tarjeta. Por defecto, `outlined`. */
  variant?: CardVariant
  /** Espacio interior. Por defecto, `md`. */
  padding?: CardPadding
}

const variantClasses: Record<CardVariant, string> = {
  outlined: 'border border-gray-200 bg-white',
  elevated: 'bg-white shadow-md ring-1 ring-black/5',
  filled: 'bg-gray-50',
}

const paddingClasses: Record<CardPadding, string> = {
  sm: 'p-4 gap-3',
  md: 'p-6 gap-4',
  lg: 'p-8 gap-6',
}

export function Card({
  title,
  description,
  icon: IconComponent,
  action,
  footer,
  variant = 'outlined',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  const hasHeader = title || description || IconComponent || action

  return (
    <div
      className={[
        'flex flex-col rounded-xl text-gray-900',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ].join(' ')}
      {...props}
    >
      {hasHeader && (
        <div className="flex items-start gap-3">
          {IconComponent && (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <IconComponent size={22} aria-hidden />
            </span>
          )}
          <div className="min-w-0 flex-1">
            {title && <h3 className="text-base font-semibold">{title}</h3>}
            {description && (
              <p className="mt-0.5 text-sm text-gray-600">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      {children && <div className="text-sm text-gray-700">{children}</div>}

      {footer && (
        <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 pt-4">
          {footer}
        </div>
      )}
    </div>
  )
}
