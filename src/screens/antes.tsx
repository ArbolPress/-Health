import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  IconHeartbeat,
  IconInfoCircle,
  IconMessageChatbot,
  IconMessagePlus,
  IconMoodSad,
  IconMoodSmile,
  IconSend,
  IconZzz,
} from '@tabler/icons-react'
import { Badge, Button, Card, Input } from '../components'

// Pantalla del asistente de IA, hecha solo con los componentes que existen hoy.
// Las respuestas son de ejemplo: todavía no hay un asistente de verdad conectado.

type Message = {
  id: number
  author: 'user' | 'assistant'
  text: string
  time: string
}

const suggestions = [
  { icon: IconMoodSmile, text: 'Hoy me siento bien' },
  { icon: IconMoodSad, text: 'Me noto con poca energía' },
  { icon: IconZzz, text: 'Estoy durmiendo mal' },
  { icon: IconHeartbeat, text: 'Me duele la cabeza' },
]

const exampleReplies = [
  'Gracias por contármelo. ¿Desde cuándo te sientes así?',
  'Entiendo. ¿Ha cambiado algo en tu rutina estos últimos días, como el sueño, la comida o el estrés?',
  'Lo apunto en tu registro para que puedas comentarlo en tu próxima cita. ¿Quieres contarme algo más?',
  'Si en algún momento notas que empeora, consulta con tu médico. ¿Te ayudo con algo más?',
]

function currentTime() {
  return new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
}

export default function Antes() {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const nextId = useRef(1)
  const replyTimer = useRef<number | undefined>(undefined)
  const endOfList = useRef<HTMLDivElement>(null)

  // Baja hasta el último mensaje cada vez que llega uno nuevo
  useEffect(() => {
    endOfList.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing])

  // Si se sale de la pantalla, se cancela la respuesta pendiente
  useEffect(() => () => window.clearTimeout(replyTimer.current), [])

  function send(text: string) {
    const clean = text.trim()
    if (!clean || typing) return

    const userMessage: Message = {
      id: nextId.current++,
      author: 'user',
      text: clean,
      time: currentTime(),
    }
    setMessages((previous) => [...previous, userMessage])
    setDraft('')
    setTyping(true)

    // Respuesta de ejemplo, como si el asistente tardara un poco en contestar
    replyTimer.current = window.setTimeout(() => {
      setMessages((previous) => {
        const answered = previous.filter((m) => m.author === 'assistant').length
        const reply: Message = {
          id: nextId.current++,
          author: 'assistant',
          text: exampleReplies[answered % exampleReplies.length],
          time: currentTime(),
        }
        return [...previous, reply]
      })
      setTyping(false)
    }, 1200)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    send(draft)
  }

  function startOver() {
    window.clearTimeout(replyTimer.current)
    setMessages([])
    setDraft('')
    setTyping(false)
  }

  const isEmpty = messages.length === 0 && !typing

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col gap-4 p-4 sm:p-6">
      {/* Cabecera */}
      <Card
        padding="sm"
        icon={IconMessageChatbot}
        title="Asistente de salud"
        description="Cuéntale cómo te sientes. Te escucha y te ayuda a llevar un registro."
        action={
          <div className="flex items-center gap-2">
            <Badge color="success" size="sm" dot>
              Disponible
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              icon={IconMessagePlus}
              aria-label="Nueva conversación"
              onClick={startOver}
              disabled={isEmpty}
            />
          </div>
        }
      />

      {/* Historial de mensajes o estado vacío */}
      <section
        aria-label="Conversación"
        className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50"
      >
        {isEmpty ? (
          <div className="flex min-h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <IconMessageChatbot size={28} aria-hidden />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Todavía no hay mensajes</h2>
              <p className="mt-1 max-w-sm text-sm text-gray-600">
                Escribe abajo cómo te encuentras o empieza con una de estas ideas.
              </p>
            </div>
            <ul className="flex max-w-md flex-wrap justify-center gap-2">
              {suggestions.map(({ icon, text }) => (
                <li key={text}>
                  <Button variant="secondary" size="sm" icon={icon} onClick={() => send(text)}>
                    {text}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ol role="log" aria-live="polite" className="flex flex-col gap-4 p-4">
            {messages.map((message) => {
              const mine = message.author === 'user'
              return (
                <li
                  key={message.id}
                  className={['flex flex-col gap-1', mine ? 'items-end' : 'items-start'].join(' ')}
                >
                  <span className="text-xs text-gray-500">
                    {mine ? 'Tú' : 'Asistente'} · {message.time}
                  </span>
                  <p
                    className={[
                      'max-w-md rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap',
                      mine
                        ? 'rounded-br-md bg-teal-700 text-white'
                        : 'rounded-bl-md border border-gray-200 bg-white text-gray-900',
                    ].join(' ')}
                  >
                    {message.text}
                  </p>
                </li>
              )
            })}
            {typing && (
              <li className="flex items-start">
                <Badge color="neutral" size="sm">
                  El asistente está escribiendo…
                </Badge>
              </li>
            )}
          </ol>
        )}
        <div ref={endOfList} />
      </section>

      {/* Campo para escribir */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <Input
          label="Tu mensaje"
          placeholder="Escribe cómo te sientes…"
          autoComplete="off"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          icon={IconSend}
          aria-label="Enviar mensaje"
          disabled={!draft.trim() || typing}
        />
      </form>

      <p className="flex items-center gap-1.5 text-xs text-gray-500">
        <IconInfoCircle size={14} aria-hidden className="shrink-0" />
        El asistente no sustituye a tu médico. Ante una urgencia, llama a emergencias.
      </p>
    </div>
  )
}
