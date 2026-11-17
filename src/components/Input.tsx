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

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-8 rounded-md text-sm',
  md: 'h-10 rounded-lg text-sm',
  lg: 'h-12 rounded-lg text-base',
}

const paddingClasses: Record<InputSize, { plain: string; withIcon: string }> = {
  sm: { plain: 'px-2.5', withIcon: 'pr-2.5 pl-8' },
  md: { plain: 'px-3', withIcon: 'pr-3 pl-9' },
  lg: { plain: 'px-4', withIcon: 'pr-4 pl-11' },
}

const iconClasses: Record<InputSize, { size: number; position: string }> = {
  sm: { size: 16, position: 'left-2.5' },
  md: { size: 18, position: 'left-3' },
  lg: { size: 20, position: 'left-4' },
}

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
    <div className={['flex flex-col gap-1.5', className].join(' ')}>
      <label htmlFor={inputId} className="text-sm font-medium text-gray-900">
        {label}
        {required && (
          <span className="ml-0.5 text-red-600" aria-hidden>
            *
          </span>
        )}
      </label>

      <div className="relative">
        {IconComponent && (
          <IconComponent
            size={iconClasses[size].size}
            aria-hidden
            className={[
              'pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500',
              iconClasses[size].position,
            ].join(' ')}
          />
        )}
        <input
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={[
            'w-full border bg-white text-gray-900 placeholder:text-gray-400 transition-colors',
            'focus:outline-2 focus:outline-offset-0',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500',
            error
              ? 'border-red-600 focus:outline-red-600'
              : 'border-gray-300 hover:border-gray-400 focus:outline-teal-700',
            sizeClasses[size],
            IconComponent ? paddingClasses[size].withIcon : paddingClasses[size].plain,
          ].join(' ')}
          {...props}
        />
      </div>

      {message && (
        <p
          id={messageId}
          className={[
            'flex items-center gap-1 text-sm',
            error ? 'text-red-700' : 'text-gray-600',
          ].join(' ')}
        >
          {error && <IconAlertCircle size={16} aria-hidden className="shrink-0" />}
          {message}
        </p>
      )}
    </div>
  )
}
