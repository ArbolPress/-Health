# ADR-001 · Alcance y principios

| | |
| --- | --- |
| **Autoría** | ArbolPress |
| **Fecha** | 19 de noviembre de 2026 |
| **Afecta a** | Todo el repositorio de DSHealth |

## Estado

**Aceptado.**

- **Cómo se revisa:** a mano en cada PR, con la lista de comprobación que aparece al final de la sección Decisión.
- **Revisión del 19 de noviembre de 2026:** se reescribieron los cinco principios para que todos se puedan comprobar, y se añadió la tabla «Cómo se comprueba cada principio».

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

Cada principio dice qué se exige y cómo se comprueba en una PR. Lo que se exige y lo que se comprueba es lo mismo: si la comprobación pasa, el principio se cumple.

**A qué archivos se aplican:**
- Se aplican a los componentes (`src/components/*.tsx`) y a las pantallas (`src/screens/*.tsx`).
- No se aplican a las historias de Storybook (`*.stories.tsx`) ni a la página de muestra de Tailwind (`src/TailwindPage.tsx`). Esa página existe precisamente para enseñar los valores de Tailwind.

#### 1. Todo valor visual sale de un token

Un *token* es un valor con nombre propio de DSHealth, por ejemplo `primary` en lugar de `teal-700`. La lista de tokens la fijará el ADR-002, Fundamentos.

Toda clase que da color, radio, tamaño de texto, sombra o espaciado usa un nombre de esa lista. Lo mismo vale para los tamaños de icono. Además, nunca se permiten:
- colores de la paleta de Tailwind escritos directamente (`teal-700`, `gray-200`…);
- colores hex (`#0f766e`);
- valores entre corchetes (`w-[13px]`, `max-w-[85%]`);
- tamaños de icono escritos como números (`size={28}`).

**Cómo se comprueba, revisando el código:** en los archivos cambiados no aparece nada de la lista anterior, y cada clase de color, radio, texto, sombra o espaciado usa un nombre de la lista de tokens del ADR-002.

**Mientras no exista el ADR-002**, no hay lista de tokens, así que el principio no puede cumplirse. Cada valor que no la cumpla se anota en la PR como excepción, con su archivo y su línea.

#### 2. Las pantallas solo usan componentes y clases de maquetación

Una pantalla de `src/screens/` se construye con componentes de DSHealth. Fuera de ellos, solo puede usar **clases de maquetación**, que colocan cosas pero no les dan aspecto:
- disposición: `flex`, `grid`, `items-*`, `justify-*`, `flex-*`, `order-*`;
- tamaño y posición: `w-*`, `h-*`, `min-*`, `max-*`, `size-*`, `relative`, `absolute`, `inset-*`, `overflow-*`;
- separaciones: `gap-*`, `p-*`, `m-*`, `space-*`.
- alineación del texto: `text-left`, `text-center`, `text-right`.

No puede usar **clases de aspecto**, como `bg-*`, `text-*` (salvo las de alineación), `font-*`, `border-*`, `rounded-*`, `shadow-*`, `ring-*` u `outline-*`. Si una pantalla necesita una pieza que no existe, primero se crea el componente en `src/components/` y después se usa.

**Cómo se comprueba, revisando el código:** en los archivos cambiados de `src/screens/`, todas las clases están en la lista de maquetación, y ninguna está en la de aspecto.

#### 3. Todo componente está documentado antes de usarse

Cada componente de `src/components/` cumple tres cosas:
- tiene un archivo de historias (`*.stories.tsx`);
- en sus historias aparecen **todos los valores de cada prop de opciones** (`variant`, `size`…) y **cada prop que cambia su aspecto** (`disabled`, `loading`, `error`…);
- tiene su fila en `docs/componentes.md`, con ✅ en la columna Storybook.

Una pantalla solo puede usar componentes que tengan ✅ en esa tabla.

**Cómo se comprueba, en Storybook y en el código:**
- **En Storybook:** se abre el componente y se ve cada valor de cada prop de opciones, y cada estado.
- **En el código:** el componente tiene su fila con ✅ en `docs/componentes.md`, y `npm run build-storybook` termina sin errores.

#### 4. Un concepto, un nombre

La misma idea se llama igual en todos los componentes. Solo se pueden usar los nombres de esta tabla o los atributos normales de HTML (`disabled`, `type`, `placeholder`…):

| Concepto | Nombre |
| --- | --- |
| Estilo del componente | `variant` |
| Tamaño | `size`, con los valores `sm`, `md` y `lg` |
| Estilo para peligro o error | el valor `danger` (por ejemplo, `variant="danger"`) |
| Mensaje de error de un campo | `error` (un texto) |
| Mensaje de ayuda de un campo | `hint` (un texto) |
| Título de un campo | `label` |
| Esperando a que algo termine | `loading` |
| Icono (se pasa el icono, no `<Icono />`) | `icon` |
| Lado del icono | `iconPosition`, con los valores `left` y `right` |
| Contenido principal del componente | `children` |

Los nombres se documentan en `AGENTS.md` para que los agentes los acierten a la primera.

**Hay dos excepciones conocidas**, que se corregirán en su propia PR:
- `color` en Badge, que debería ser `variant`;
- `padding` en Card, que debería ser `size`.

**Cómo se comprueba, revisando el código:**
- cada prop nueva o cambiada está en la tabla, o es un atributo normal de HTML;
- si una PR necesita un nombre nuevo, lo añade a la tabla y a `AGENTS.md` en la misma PR.

#### 5. Accesible: cinco comprobaciones de WCAG 2.2 AA

WCAG 2.2 es la norma internacional de accesibilidad web, y AA es su nivel intermedio. El objetivo es cumplir WCAG 2.2 AA en todo.

La norma completa tiene decenas de criterios y no se puede revisar entera en cada PR. Por eso, **en cada cambio se comprueban estos cinco**, sobre sus historias de Storybook:

1. **Contraste:**
   - el texto tiene al menos 4,5:1;
   - el texto grande (24 px o más, o 18,7 px o más en negrita) tiene al menos 3:1;
   - los iconos que transmiten información y los bordes de los controles tienen al menos 3:1.

   Se mide con el inspector del navegador o con cualquier comprobador de contraste.
2. **Teclado:** todo se alcanza y se usa solo con el teclado (Tab, Enter, Espacio), y el foco se ve siempre.
3. **Nombres:** cada control tiene un nombre para el lector de pantalla. Se ve en la pestaña de accesibilidad del inspector del navegador.
4. **Tamaño:** cada zona que se pulsa mide al menos 24 × 24 px. Se mide con la regla de Storybook.
5. **Color:** ningún estado se distingue solo por el color. Un error, por ejemplo, lleva también texto o icono.

**Cómo se comprueba, en Storybook:** se abren las historias de lo que cambia la PR y se hacen las cinco comprobaciones.

### Cómo se comprueba cada principio

| Principio | Dónde se comprueba | Qué se mira |
| --- | --- | --- |
| 1. Todo valor visual sale de un token | Revisando el código | Sin colores de Tailwind, hex, corchetes ni tamaños de icono numéricos. Cada clase de color, radio, texto, sombra o espaciado usa un token del ADR-002, o está anotada como excepción. |
| 2. Las pantallas solo usan componentes y clases de maquetación | Revisando el código | En `src/screens/`, todas las clases están en la lista de maquetación y ninguna en la de aspecto. |
| 3. Todo componente está documentado antes de usarse | Mirándolo en Storybook (y en `docs/componentes.md`) | Todos los valores de cada prop de opciones, y cada estado, aparecen en una historia. El componente tiene su fila con ✅. |
| 4. Un concepto, un nombre | Revisando el código | Cada prop nueva o cambiada está en la tabla de nombres o es un atributo de HTML. |
| 5. Accesible: cinco comprobaciones de WCAG 2.2 AA | Mirándolo en Storybook | Contraste, teclado, nombres, tamaño de 24 × 24 px y que el color no sea la única señal. |

### Lista de comprobación para cada PR

Se copia en la descripción de cada PR y se marca a mano:

- [ ] **1. Tokens (código):** sin colores de Tailwind, hex, corchetes ni tamaños de icono numéricos. Todo valor visual usa un token, o está anotado como excepción con su archivo y su línea.
- [ ] **2. Pantallas (código):** en `src/screens/` solo hay componentes y clases de maquetación.
- [ ] **3. Documentación (Storybook):** cada componente nuevo o cambiado muestra en sus historias todos los valores de sus props y todos sus estados, y tiene su fila con ✅ en `docs/componentes.md`.
- [ ] **4. Nombres (código):** cada prop nueva o cambiada está en la tabla de nombres o es un atributo de HTML. Los nombres nuevos están añadidos a la tabla y a `AGENTS.md`.
- [ ] **5. Accesibilidad (Storybook):** se han hecho las cinco comprobaciones (contraste, teclado, nombres, tamaño y color) en las historias de lo que cambia.

## Consecuencias

### Lo que se gana

- **Un único lugar para decidir el aspecto.** Cambiar el color de la marca, o añadir el modo oscuro más adelante, se hará en los tokens, no componente a componente.
- **Pantallas más rápidas y coherentes.** Se montan con piezas que ya existen, en lugar de reinventarlas.
- **Agentes que aciertan más.** Con nombres uniformes y escritos en `AGENTS.md`, hay menos sorpresas como las de la sección 4 de la auditoría.
- **Accesibilidad desde el principio**, y no como arreglo al final.

### Lo que cuesta

- **Los componentes actuales no cumplen todavía los principios 1 y 4.** Las pantallas tampoco cumplen el 2: `src/screens/antes.tsx` usa clases de aspecto. Habrá que:
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
