import { useId, type ComponentProps } from 'react'
import { IconAlertCircle, type Icon } from '@tabler/icons-react'

type InputSize = 'sm' | 'md' | 'lg'

export type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
  /** Texto que aparece encima del campo. */
  label: string
  /** Texto de ayuda debajo del campo. */
  hint?: string
  /** Mensaje de error. Si existe, el campo se marca en rojo y sustituye a la ayuda. */
  error?: string
  /** Icono de Tabler que se muestra dentro del campo, a la izquierda. */
  icon?: Icon
  /** Tamaño del campo. Por defecto, `md`. */
  size?: InputSize
}

// Todas las clases de color, espaciado, borde, radio y texto son tokens de
// componente (input.*). Ver docs/tokens.md.

// La caja del campo: el borde, el fondo y el espacio lateral van aquí, y dentro
// se colocan el icono y el texto uno al lado del otro.
const boxSizeClasses: Record<InputSize, string> = {
  sm: 'h-8 px-input-padding-x-sm',
  md: 'h-10 px-input-padding-x',
  lg: 'h-12 px-input-padding-x-lg',
}

const textSizeClasses: Record<InputSize, string> = {
  sm: 'text-input',
  md: 'text-input',
  lg: 'text-input-lg',
}

const iconSizes: Record<InputSize, number> = { sm: 16, md: 18, lg: 20 }

export function Input({
  label,
  hint,
  error,
  icon: IconComponent,
  size = 'md',
  id,
  required,
  className = '',
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className={['flex flex-col gap-input-gap', className].join(' ')}>
      <label htmlFor={inputId} className="flex gap-input-gap text-input-label text-input-text-neutral">
        {label}
        {required && (
          <span className="text-input-text-error" aria-hidden>
            *
          </span>
        )}
      </label>

      <div
        className={[
          'flex items-center gap-input-gap rounded-input-radius border-input-border-width bg-input-background-neutral transition-colors',
          'focus-within:outline-solid focus-within:outline-input-border-width-focus',
          error
            ? 'border-input-border-error focus-within:outline-input-border-error'
            : 'border-input-border-neutral-strong focus-within:outline-input-border-focus',
          'has-disabled:cursor-not-allowed has-disabled:border-input-border-neutral has-disabled:bg-input-background-neutral-disabled',
          boxSizeClasses[size],
        ].join(' ')}
      >
        {IconComponent && (
          <IconComponent
            size={iconSizes[size]}
            aria-hidden
            className="pointer-events-none shrink-0 text-input-icon-neutral-subtle"
          />
        )}
        <input
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={[
            'h-full min-w-0 flex-1 bg-transparent outline-none',
            'text-input-text-neutral placeholder:text-input-text-neutral-subtle',
            'disabled:cursor-not-allowed disabled:text-input-text-neutral-disabled',
            textSizeClasses[size],
          ].join(' ')}
          {...props}
        />
      </div>

      {message && (
        <p
          id={messageId}
          className={[
            'flex items-center gap-input-gap text-input-message',
            error ? 'text-input-text-error' : 'text-input-text-neutral-subtle',
          ].join(' ')}
        >
          {error && <IconAlertCircle size={16} aria-hidden className="shrink-0 text-input-icon-error" />}
          {message}
        </p>
      )}
    </div>
  )
}
