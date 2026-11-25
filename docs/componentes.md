# Estado de los componentes

Tabla de estado de los componentes de DSHealth. Una fila por componente de `src/components/`.

Este archivo es la fuente: Storybook lo muestra en la página **Status**, pero no guarda una copia. Para cambiar la tabla, edita solo este archivo.

| Componente | Storybook | Solo tokens |
| --- | :---: | :---: |
| Badge | ✅ | ✅ |
| Button | ✅ | ✅ |
| Card | ✅ | ✅ |
| Input | ✅ | ✅ |

**Qué significa cada columna:**
- **Storybook:** el componente tiene historias con todas sus variantes y estados.
- **Solo tokens:** todas sus clases de color, espaciado, borde, radio, sombra y texto son clases de sus tokens de componente (por ejemplo, `bg-button-background-brand`). No usa la paleta ni las escalas de Tailwind (`bg-blue-600`, `text-sm`, `p-4`…). La lista de clases está en [`docs/tokens.md`](tokens.md).

**Excepciones conocidas**, porque todavía no hay un token para ellas:
- **Tamaño de los iconos.** Va escrito como número (`size={18}`).
- **Separación entre un botón y su contorno de foco** (`outline-offset-2`, en Button).
- **Alto de los componentes y tamaño de sus cuadros** (`h-10`, `size-10`). Según el principio 2 del ADR-001, son clases de maquetación.
