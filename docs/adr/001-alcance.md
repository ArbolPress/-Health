# ADR-001 · Alcance y principios

| | |
| --- | --- |
| **Autoría** | ArbolPress |
| **Fecha** | 19 de noviembre de 2026 |
| **Afecta a** | Todo el repositorio de DSHealth |

## Estado

**Aceptado.**

**Cómo se revisa:** se revisa a mano en cada PR, con la lista de comprobación que aparece al final de la sección Decisión.

## Contexto

**Health** es una app web de salud. Cada persona entra en su portal y tiene en un solo lugar:
- sus recetas y su medicación;
- los análisis y chequeos del año;
- sus citas;
- las notas y grabaciones de sus consultas;
- una conversación con un asistente de IA;
- sus objetivos anuales de revisiones.

Todo ello se sigue desde un **panel de datos y métricas**. Health tiene **una sola marca**.

**DSHealth** es su design system: el conjunto de piezas con las que se construye la interfaz de Health. Hoy está hecho con:
- React con TypeScript y Vite;
- Tailwind para los estilos;
- Tabler Icons para los iconos;
- componentes propios, sin librerías de componentes.

Hay cuatro componentes (Button, Input, Card y Badge), documentados en Storybook. Hay también una pantalla de prueba: el asistente (`src/screens/antes.tsx`).

La auditoría (`docs/audit.md`) muestra que, sin reglas escritas, el sistema ya se está desordenando.

**En los componentes:**
- **No hay valores con nombre propio.** Los colores de Tailwind están escritos directamente (por ejemplo, `teal-700`) en 25 líneas de los cuatro componentes.
- **El rojo de error o peligro aparece en cuatro tonos distintos:** `red-500`, `red-600`, `red-700` y `red-800`.
- **Los tamaños de icono son números escritos a mano** (12, 14, 16, 18, 20 y 22), y la escala de 16 / 18 / 20 se repite en dos archivos.
- **Los nombres no son uniformes:**
  - el estilo se llama `variant` en Button y Card, pero `color` en Badge;
  - el tamaño se llama `size`, salvo en Card, donde es `padding`;
  - lo que en Button y Badge es `danger`, en Input es `error`.

**En la primera pantalla hecha sin reglas** (sección 5 de la auditoría):
- **Inventa cinco valores** que no existen en el sistema: `size-14`, un icono de 28 px, `text-lg`, `rounded-2xl` y `py-2.5`.
- **Copia estilos de tres componentes** (Button, Card e Input) en vez de usarlos.
- **Construye a mano tres piezas que deberían ser componentes:** burbuja de mensaje, estado vacío y nota con icono.
- **Pone nombres nuevos** a cosas que ya tenían nombre, por ejemplo `typing` en vez de `loading`.

La rama `antes` guarda ese estado tal cual, para comparar con lo que salga después de este ADR.

Cada pantalla nueva repetiría estos problemas a su manera. Este ADR fija qué es DSHealth y qué reglas tiene que cumplir todo lo que se añada.

## Decisión

### Alcance

**Entra en DSHealth:**
- **Fundamentos:** colores, tipografía, espaciados, radios, sombras y tamaños de icono.
- **Componentes base:** botón, campo de texto, tarjeta, etiqueta, navegación…
- **Componentes propios de salud:** medicación, citas, análisis, burbuja de mensaje del asistente…

**Queda fuera:**
- **Las pantallas completas.** Viven en `src/screens/` y usan DSHealth, pero no forman parte de él.
- **Las apps móviles nativas.** DSHealth es solo para la web.
- **Las gráficas del panel de datos.** Se decidirán en un ADR aparte: si son propias, si se usa una librería, y cómo se visten con los fundamentos.
- **El color de la marca.** Se decidirá en el ADR-002, Fundamentos. Hasta entonces, `teal-700` es provisional.
- **El modo oscuro.** No entra por ahora. Los fundamentos se nombrarán por su uso (`primary`, `danger`…), no por su color, para poder añadirlo más adelante sin tocar los componentes.

**Tecnología:**
- React con TypeScript y Vite.
- Tailwind para los estilos.
- Tabler Icons para los iconos.
- **Ninguna librería de componentes:** los componentes se crean desde cero, como ya dice `AGENTS.md`.
- **Una sola marca.**

### Cinco principios

Cada principio dice qué se exige y cómo se comprueba en una PR.

#### 1. Todo valor visual sale de un token

Un *token* es un valor con nombre propio de DSHealth, por ejemplo `primary` en lugar de `teal-700`.

Colores, espaciados, radios, tamaños de texto, sombras y tamaños de icono se usan siempre por su nombre de DSHealth. No se permiten:
- colores de la paleta de Tailwind escritos directamente (`teal-700`, `gray-200`…);
- colores hex (`#0f766e`);
- valores entre corchetes (`w-[13px]`, `max-w-[85%]`);
- tamaños de icono escritos como números (`size={28}`).

**Cómo se comprueba:** en los archivos cambiados de `src/` no aparece ningún color de la paleta de Tailwind, ningún `#` de color, ningún corchete en las clases ni ningún `size={número}` en un icono. Mientras no exista el ADR-002, cada excepción se anota en la PR.

#### 2. Las pantallas solo usan componentes; no los copian

Una pantalla de `src/screens/` se construye con componentes de DSHealth. Puede usar clases de maquetación (`flex`, `grid`, separaciones con tokens), pero no da a sus elementos colores, radios, bordes ni tamaños de texto propios.

Si una pantalla necesita una pieza que no existe, primero se crea el componente en `src/components/` y después se usa.

**Cómo se comprueba:** los archivos de `src/screens/` no tienen clases de color (`bg-*`, `text-*` de color, `border-*` de color), de radio (`rounded-*`) ni de tamaño de texto. Ningún bloque de la pantalla repite los estilos de un componente existente.

#### 3. Todo componente está documentado antes de usarse

Cada componente de `src/components/` tiene:
- su archivo de historias (`*.stories.tsx`), con todas sus variantes, tamaños y estados;
- su fila en `docs/componentes.md`.

**Cómo se comprueba:** si la PR añade o cambia un componente, también añade o actualiza sus historias y su fila en la tabla. `npm run build-storybook` termina sin errores.

#### 4. Un concepto, un nombre

La misma idea se llama igual en todos los componentes:

| Concepto | Nombre |
| --- | --- |
| Estilo | `variant` |
| Tamaño | `size`, con `sm`, `md` y `lg` |
| Peligro o error | `danger` |
| Esperando a que algo termine | `loading` |
| Icono (se pasa el icono, no `<Icono />`) | `icon` |
| Texto del componente | `children` |

Los nombres se documentan en `AGENTS.md` para que los agentes los acierten a la primera.

**Cómo se comprueba:** las props nuevas usan los nombres de la tabla. Si una PR necesita un nombre nuevo, lo añade a la tabla y a `AGENTS.md` en la misma PR.

#### 5. Accesible según WCAG 2.2 AA, en todo

WCAG 2.2 es la norma internacional de accesibilidad web. AA es su nivel intermedio. Se aplica a todos los componentes y todas las pantallas, sin excepciones:
- **Contraste:** al menos 4,5:1 para el texto, y 3:1 para el texto grande, los iconos que transmiten información y los bordes de los controles.
- **Teclado:** todo se puede usar con el teclado, con el foco siempre visible.
- **Nombres:** todo control tiene un nombre que lee el lector de pantalla. Por ejemplo, el `aria-label` en los botones con solo icono.
- **Tamaño:** las zonas que se pulsan miden al menos 24 × 24 px.
- **Color:** el color nunca es la única forma de transmitir algo. Un error lleva también texto o icono.

**Cómo se comprueba:** se revisan las historias de Storybook de lo que cambia la PR:
- recorriéndolas solo con el teclado;
- midiendo el contraste de cada combinación de colores nueva;
- comprobando que cada control tiene nombre.

### Lista de comprobación para cada PR

Se copia en la descripción de cada PR y se marca a mano:

- [ ] **Tokens:** no hay colores de Tailwind, hex, valores entre corchetes ni tamaños de icono numéricos en `src/` (o cada excepción está anotada).
- [ ] **Pantallas:** las pantallas de `src/screens/` solo usan componentes y clases de maquetación.
- [ ] **Documentación:** cada componente nuevo o cambiado tiene historias en Storybook y su fila en `docs/componentes.md`.
- [ ] **Nombres:** las props siguen la tabla de nombres. Los nombres nuevos están añadidos a la tabla y a `AGENTS.md`.
- [ ] **Accesibilidad:** se ha comprobado lo que cambia con el teclado y el contraste, y todos los controles tienen nombre.

## Consecuencias

### Lo que se gana

- **Un único lugar para decidir el aspecto.** Cambiar el color de la marca, o añadir el modo oscuro más adelante, se hará en los tokens, no componente a componente.
- **Pantallas más rápidas y coherentes.** Se montan con piezas que ya existen, en lugar de reinventarlas.
- **Agentes que aciertan más.** Con nombres uniformes y escritos en `AGENTS.md`, hay menos sorpresas como las de la sección 4 de la auditoría.
- **Accesibilidad desde el principio**, y no como arreglo al final.

### Lo que cuesta

- **Los componentes actuales no cumplen todavía los principios 1 y 4.** Habrá que:
  - sustituir sus colores, radios y tamaños de icono por tokens, cuando exista el ADR-002;
  - renombrar `color` en Badge y `padding` en Card, para que pasen a ser `variant` y `size`.

  Ese trabajo irá en PR propias, y cambiará la forma de usar esos dos componentes.
- **Faltan componentes** que la pantalla del asistente tuvo que inventar: burbuja de mensaje, estado vacío y nota con icono. Habrá que crearlos, con sus historias, antes de rehacer la pantalla.
- **La revisión es manual.** Cada PR lleva más trabajo de revisión. Más adelante se podrán automatizar algunas comprobaciones, como buscar colores de Tailwind en `src/` o revisar la accesibilidad en Storybook, pero eso será otra decisión.
- **Hasta que exista el ADR-002 no hay tokens.** Durante ese tiempo, el principio 1 solo puede cumplirse anotando las excepciones.

### Lo que queda pendiente

- **ADR-002 · Fundamentos:** colores (incluido el de la marca), tipografía, espaciados, radios, sombras y tamaños de icono.
- **Un ADR sobre las gráficas** del panel de datos.
- **Actualizar `AGENTS.md`** con la tabla de nombres del principio 4 y con estas reglas.
- **La rama `antes` no se toca.** Sirve para comparar el sistema antes y después de las reglas.
