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

// Todas las clases de color, espaciado, borde, radio, sombra y texto son tokens
// de componente (card.*). Ver docs/tokens.md.
const variantClasses: Record<CardVariant, string> = {
  outlined: 'border-card-border-width border-card-border-neutral bg-card-background-neutral',
  elevated: 'bg-card-background-neutral shadow-card-elevation',
  filled: 'bg-card-background-neutral-subtle',
}

const paddingClasses: Record<CardPadding, string> = {
  sm: 'p-card-padding-sm gap-card-gap-sm',
  md: 'p-card-padding gap-card-gap',
  lg: 'p-card-padding-lg gap-card-gap-lg',
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
        'flex flex-col rounded-card-radius text-card-text-neutral',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ].join(' ')}
      {...props}
    >
      {hasHeader && (
        <div className="flex items-start gap-card-gap-header">
          {IconComponent && (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-card-radius-icon bg-card-background-brand-subtle text-card-icon-brand">
              <IconComponent size={22} aria-hidden />
            </span>
          )}
          <div className="min-w-0 flex-1">
            {title && <h3 className="text-card-title">{title}</h3>}
            {description && (
              <p className="text-card text-card-text-neutral-subtle">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      {children && <div className="text-card text-card-text-neutral">{children}</div>}

      {footer && (
        <div className="flex flex-wrap items-center gap-card-gap-footer border-t-card-border-width border-card-border-neutral pt-card-padding-footer">
          {footer}
        </div>
      )}
    </div>
  )
}
