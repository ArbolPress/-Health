import { useSyncExternalStore, type ComponentType } from 'react'
import TailwindPage from './TailwindPage'

// Índice de la app: un menú arriba y, debajo, la página elegida.
// Cada página tiene su propia dirección: #/tailwind, #/antes…

type Page = { path: string; label: string; Component: ComponentType }

// Todas las pantallas de src/screens/ se añaden solas al menú.
// La dirección es el nombre del archivo: src/screens/antes.tsx → #/antes
const screenModules = import.meta.glob<{ default: ComponentType }>('./screens/*.tsx', {
  eager: true,
})

const screens: Page[] = Object.entries(screenModules)
  .map(([file, module]) => {
    const name = file.replace('./screens/', '').replace('.tsx', '')
    return { path: name, label: name, Component: module.default }
  })
  .sort((a, b) => a.label.localeCompare(b.label, 'es'))

const pages: Page[] = [
  { path: 'tailwind', label: 'Tailwind', Component: TailwindPage },
  ...screens,
]

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getPath() {
  return window.location.hash.replace(/^#\/?/, '')
}

function App() {
  const path = useSyncExternalStore(subscribe, getPath)
  // Sin dirección (o con una que no existe) se abre la primera página
  const current = pages.find((page) => page.path === path) ?? pages[0]
  const { Component } = current

  return (
    <div className="flex h-dvh flex-col bg-white text-gray-900">
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <nav
          aria-label="Páginas"
          className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-6"
        >
          <span className="py-3 font-semibold whitespace-nowrap">DSHealth</span>
          <ul className="flex items-center gap-1">
            {pages.map((page) => {
              const active = page === current
              return (
                <li key={page.path}>
                  <a
                    href={`#/${page.path}`}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'block rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700',
                      active
                        ? 'bg-teal-50 text-teal-800'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                    ].join(' ')}
                  >
                    {page.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <Component key={current.path} />
      </main>
    </div>
  )
}

export default App
