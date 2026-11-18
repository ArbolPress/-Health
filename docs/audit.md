# Auditoría del design system DSHealth

Fecha: 18 de noviembre de 2026 · Estado de `main` en el commit `6c82528`.

**Qué se ha revisado:** los cuatro componentes de `src/components/`: `Button.tsx`, `Input.tsx`, `Card.tsx` y `Badge.tsx`.

**Qué no se ha revisado:** las historias de Storybook (`*.stories.tsx`), la página de muestra de Tailwind (`src/App.tsx`) ni la configuración. Solo se mencionan cuando ayuda a entender algo.

**Punto de partida:** DSHealth todavía no tiene colores, espaciados ni radios propios. Todos los componentes usan directamente los valores por defecto de Tailwind. Por eso, casi todo lo que aparece en la sección 3 son valores escritos a mano que habrá que cambiar por nombres propios (`primary`, `danger`…) cuando definamos los fundamentos.

---

## 1. Inventario de componentes

| Componente | Archivo | Variantes | Tamaños | Por defecto | Estados |
| --- | --- | --- | --- | --- | --- |
| Button | `src/components/Button.tsx` | `variant`: `primary`, `secondary`, `ghost`, `danger`<br>Forma: con texto o **solo icono** | `sm`, `md`, `lg` | `primary`, `md` | normal, hover, active, foco, `disabled`, `loading` |
| Input | `src/components/Input.tsx` | Sin variantes de estilo.<br>Con o sin icono; con ayuda (`hint`) o con error (`error`) | `sm`, `md`, `lg` | `md` | normal, hover, foco, `disabled`, error, obligatorio (`required`) |
| Card | `src/components/Card.tsx` | `variant`: `outlined`, `elevated`, `filled` | Por espacio interior (`padding`): `sm`, `md`, `lg` | `outlined`, `md` | Sin estados (no es interactiva) |
| Badge | `src/components/Badge.tsx` | `color`: `neutral`, `info`, `success`, `warning`, `danger`<br>Con icono o con punto (`dot`) | `sm`, `md` | `neutral`, `md` | Sin estados (no es interactiva) |

### Detalle por componente

**Button**
- **Con texto:** alto 32 / 40 / 48 px (`sm` / `md` / `lg`). Icono opcional a la izquierda o a la derecha.
- **Solo icono:** un círculo de 32 / 40 / 48 px. Necesita `icon` y `aria-label`.
- **`loading`:** sustituye el icono por un círculo que gira y desactiva el botón.
- **`fullWidth`:** ocupa todo el ancho. No se aplica al botón con solo icono.

**Input**
- **Alto:** 32 / 40 / 48 px. El icono, si lo hay, va siempre a la izquierda.
- **`error`:** pone el borde en rojo y su mensaje sustituye al de `hint`.

**Card**
- **Partes:** cabecera (`icon`, `title`, `description` y `action`), contenido (`children`) y pie (`footer`), separado por una línea. Cada parte solo aparece si tiene contenido.

**Badge**
- **Icono o punto:** el icono tiene prioridad. Si se pasan los dos, el punto no se muestra.

---

## 2. Colores, espaciados y radios de Tailwind que usa cada componente

Equivalencias de Tailwind: un paso de espaciado = 4 px (por ejemplo, `h-10` = 40 px y `gap-1.5` = 6 px).

### Button

| Tipo | Valores |
| --- | --- |
| Colores | `teal-50`, `teal-100`, `teal-700`, `teal-800`, `teal-900`<br>`gray-50`, `gray-100`, `gray-300`, `gray-900`<br>`red-600`, `red-700`, `red-800`<br>`white` |
| Alto y ancho | `h-8`, `h-10`, `h-12`<br>`size-8`, `size-10`, `size-12` (solo icono)<br>`w-full` |
| Espaciado | `px-3`, `px-4`, `px-5`<br>`gap-1.5`, `gap-2`<br>`outline-offset-2` |
| Radios | `rounded-full` (todos los tamaños) |
| Texto | `text-sm` (`sm` y `md`), `text-base` (`lg`), `font-medium` |
| Otros | `outline-2` (foco), `opacity-50` (desactivado) |

### Input

| Tipo | Valores |
| --- | --- |
| Colores | `gray-100`, `gray-300`, `gray-400`, `gray-500`, `gray-600`, `gray-900`<br>`red-600`, `red-700`<br>`teal-700` (foco)<br>`white` |
| Alto | `h-8`, `h-10`, `h-12` |
| Espaciado | Campo sin icono: `px-2.5`, `px-3`, `px-4`<br>Campo con icono: `pl-8`, `pl-9`, `pl-11` (izquierda) y `pr-2.5`, `pr-3`, `pr-4` (derecha)<br>Posición del icono: `left-2.5`, `left-3`, `left-4`<br>Entre título, campo y mensaje: `gap-1.5`<br>Dentro del mensaje: `gap-1`<br>Asterisco: `ml-0.5` |
| Radios | `rounded-md` (`sm`), `rounded-lg` (`md` y `lg`) |
| Texto | `text-sm` (`sm`, `md`, título y mensaje), `text-base` (`lg`), `font-medium` (título) |
| Otros | `outline-2` y `outline-offset-0` (foco) |

### Card

| Tipo | Valores |
| --- | --- |
| Colores | `gray-50`, `gray-200`, `gray-600`, `gray-700`, `gray-900`<br>`teal-50`, `teal-700` (cuadro del icono)<br>`white`, `black/5` (borde fino de `elevated`) |
| Tamaños fijos | `size-10` (cuadro del icono) |
| Espaciado | Interior: `p-4`, `p-6`, `p-8`<br>Entre partes: `gap-3`, `gap-4`, `gap-6`<br>Cabecera: `gap-3`<br>Descripción: `mt-0.5`<br>Pie: `gap-2` y `pt-4` |
| Radios | `rounded-xl` (tarjeta), `rounded-lg` (cuadro del icono) |
| Texto | `text-base` y `font-semibold` (título), `text-sm` (descripción y contenido) |
| Otros | `shadow-md` y `ring-1` (`elevated`), `border` y `border-t` |

### Badge

| Tipo | Valores |
| --- | --- |
| Colores | `neutral`: `gray-100`, `gray-300`, `gray-500`, `gray-800`<br>`info`: `sky-50`, `sky-200`, `sky-500`, `sky-800`<br>`success`: `green-50`, `green-200`, `green-500`, `green-800`<br>`warning`: `amber-50`, `amber-200`, `amber-500`, `amber-800`<br>`danger`: `red-50`, `red-200`, `red-500`, `red-800` |
| Alto | `h-5`, `h-6` |
| Espaciado | `px-1.5`, `px-2`<br>`gap-1`, `gap-1.5`<br>`size-1.5` (punto) |
| Radios | `rounded-full` (etiqueta y punto) |
| Texto | `text-xs` (`sm`), `text-sm` (`md`), `font-medium` |
| Otros | `ring-1 ring-inset` (borde interior) |

### Resumen entre componentes

- **Color principal:** `teal-700`, en tres componentes (Button, Input y Card).
- **Rojo de error o peligro:** hay **cuatro tonos distintos** según el sitio:
  - `red-600`: Button `danger`, borde del Input con error y asterisco.
  - `red-700`: texto de error del Input.
  - `red-800`: texto del Badge `danger`.
  - `red-500`: punto del Badge.
- **Radios:** se usan cuatro (`rounded-md`, `rounded-lg`, `rounded-xl` y `rounded-full`). El Input `sm` usa `rounded-md` y el resto de tamaños `rounded-lg`. El Button usa `rounded-full` en todos.
- **Altos:** Button e Input comparten la misma escala (32 / 40 / 48 px), así que quedan alineados. El Badge usa 20 / 24 px.
- **Grises:** se usan casi todos los tonos del 50 al 900, sin una regla clara de cuál va en cada sitio.

---

## 3. Valores escritos a mano dentro de los componentes

**Colores hex:** no hay ninguno dentro de los componentes.

**Valores en px o con corchetes** (por ejemplo, `w-[13px]`): no hay ninguno escrito como clase.

**Lo que sí está escrito a mano:**
- **Colores de Tailwind usados directamente**, como `teal-700` o `red-600`. Todavía no existe un nombre propio de DSHealth al que apunten.
- **Tamaños de icono escritos como números en píxeles.**

Fuera de los componentes, `public/favicon.svg` (líneas 2 y 3) contiene los colores `#0f766e`, que equivale a `teal-700`, y `#ffffff`. Es el mismo verde que el botón principal, pero escrito aparte.

### 3.1 Colores de Tailwind

| Archivo | Línea | Valor | Para qué |
| --- | --- | --- | --- |
| `src/components/Button.tsx` | 43 | `bg-teal-700`, `text-white`, `hover:bg-teal-800`, `active:bg-teal-900`, `focus-visible:outline-teal-700` | Variante `primary` |
| `src/components/Button.tsx` | 45 | `border-gray-300`, `bg-white`, `text-gray-900`, `hover:bg-gray-50`, `active:bg-gray-100`, `focus-visible:outline-teal-700` | Variante `secondary` |
| `src/components/Button.tsx` | 47 | `text-teal-800`, `hover:bg-teal-50`, `active:bg-teal-100`, `focus-visible:outline-teal-700` | Variante `ghost` |
| `src/components/Button.tsx` | 49 | `bg-red-600`, `text-white`, `hover:bg-red-700`, `active:bg-red-800`, `focus-visible:outline-red-600` | Variante `danger` |
| `src/components/Input.tsx` | 55 | `text-gray-900` | Título del campo |
| `src/components/Input.tsx` | 58 | `text-red-600` | Asterisco de obligatorio |
| `src/components/Input.tsx` | 70 | `text-gray-500` | Icono dentro del campo |
| `src/components/Input.tsx` | 81 | `bg-white`, `text-gray-900`, `placeholder:text-gray-400` | Campo |
| `src/components/Input.tsx` | 83 | `disabled:bg-gray-100`, `disabled:text-gray-500` | Campo desactivado |
| `src/components/Input.tsx` | 85 | `border-red-600`, `focus:outline-red-600` | Campo con error |
| `src/components/Input.tsx` | 86 | `border-gray-300`, `hover:border-gray-400`, `focus:outline-teal-700` | Campo normal |
| `src/components/Input.tsx` | 99 | `text-red-700` / `text-gray-600` | Mensaje de error / de ayuda |
| `src/components/Card.tsx` | 25 | `border-gray-200`, `bg-white` | Variante `outlined` |
| `src/components/Card.tsx` | 26 | `bg-white`, `ring-black/5` | Variante `elevated` |
| `src/components/Card.tsx` | 27 | `bg-gray-50` | Variante `filled` |
| `src/components/Card.tsx` | 53 | `text-gray-900` | Texto de la tarjeta |
| `src/components/Card.tsx` | 63 | `bg-teal-50`, `text-teal-700` | Cuadro del icono |
| `src/components/Card.tsx` | 70 | `text-gray-600` | Descripción |
| `src/components/Card.tsx` | 77 | `text-gray-700` | Contenido |
| `src/components/Card.tsx` | 80 | `border-gray-200` | Línea del pie |
| `src/components/Badge.tsx` | 19 | `bg-gray-100`, `text-gray-800`, `ring-gray-300`, `bg-gray-500` | Color `neutral` |
| `src/components/Badge.tsx` | 20 | `bg-sky-50`, `text-sky-800`, `ring-sky-200`, `bg-sky-500` | Color `info` |
| `src/components/Badge.tsx` | 21 | `bg-green-50`, `text-green-800`, `ring-green-200`, `bg-green-500` | Color `success` |
| `src/components/Badge.tsx` | 22 | `bg-amber-50`, `text-amber-800`, `ring-amber-200`, `bg-amber-500` | Color `warning` |
| `src/components/Badge.tsx` | 23 | `bg-red-50`, `text-red-800`, `ring-red-200`, `bg-red-500` | Color `danger` |

### 3.2 Tamaños de icono en píxeles (números escritos a mano)

| Archivo | Línea | Valor | Para qué |
| --- | --- | --- | --- |
| `src/components/Button.tsx` | 66 | `16`, `18`, `20` | Icono del botón en `sm`, `md` y `lg` |
| `src/components/Input.tsx` | 32–34 | `16`, `18`, `20` | Icono dentro del campo en `sm`, `md` y `lg` |
| `src/components/Input.tsx` | 102 | `16` | Icono del mensaje de error |
| `src/components/Card.tsx` | 64 | `22` | Icono de la cabecera |
| `src/components/Badge.tsx` | 51 | `12`, `14` | Icono de la etiqueta en `sm` y `md` |

Button e Input repiten la misma escala (16 / 18 / 20) en dos sitios distintos. La tarjeta usa 22, un tamaño que no aparece en ningún otro componente.

---

## 4. Nombres de props y variantes que un agente no adivinaría

Un agente (o una persona nueva en el proyecto) suele suponer los nombres más habituales de otras librerías. Estos son los casos en los que DSHealth hace algo distinto o poco evidente.

### Comunes a todos los componentes

| Lo que hay | Lo que se suele suponer | Por qué confunde |
| --- | --- | --- |
| `icon={IconPlus}` (se pasa el icono **sin** `< />`) | `icon={<IconPlus />}` | En todos los componentes se pasa el icono en sí, no el icono ya dibujado. El componente decide el tamaño. |
| Una sola prop `icon` | `leftIcon` / `rightIcon`, `startIcon` / `endIcon` | Solo hay un icono por componente. En Button, el lado se elige con `iconPosition`. |
| El estilo se llama `variant` en Button y Card, pero `color` en Badge | `variant` en todos | Badge no tiene `variant`: `variant="success"` no funciona, hay que usar `color="success"`. |
| El tamaño se llama `size` en Button, Input y Badge, pero `padding` en Card | `size` en todos | Card no tiene `size`: el espacio interior se cambia con `padding`. |
| Importar desde `./components` | Importar archivo por archivo | Hay un `index.ts` que reúne los cuatro. Las dos formas funcionan. |

### Button

| Lo que hay | Lo que se suele suponer | Por qué confunde |
| --- | --- | --- |
| No existe la prop `iconOnly` | `iconOnly`, `variant="icon"`, `<IconButton>` | El botón es «solo icono» cuando **no lleva texto**. Entonces `icon` y `aria-label` son obligatorios y, si faltan, no compila. |
| `ghost` | `tertiary`, `text`, `link`, `plain` | Es el botón sin fondo ni borde. |
| `secondary` es el botón con borde | `outline`, `outlined` | No existe `outline`. Y en Card el estilo con borde sí se llama `outlined`. |
| `danger` | `destructive`, `error`, `critical` | — |
| `iconPosition="left"` / `"right"` | `"start"` / `"end"` | — |
| `loading` | `isLoading`, `busy` | — |
| `fullWidth` | `block`, `wide`, `w-full` | No funciona en el botón con solo icono. |
| Por defecto es `type="button"` | Por defecto `type="submit"` (lo normal en HTML) | Dentro de un formulario hay que poner `type="submit"` a mano o el formulario no se envía. |
| Si no hay `title`, se usa `aria-label` como texto al pasar el ratón | — | Pasa solo en el botón con solo icono. |

### Input

| Lo que hay | Lo que se suele suponer | Por qué confunde |
| --- | --- | --- |
| `label` es **obligatorio** | Opcional | Siempre tiene que haber un título visible. |
| `hint` | `helperText`, `description`, `helper` | — |
| `error` es un **texto** | `error={true}`, `invalid`, `hasError` | Para marcar el error hay que pasar el mensaje. Ese mensaje sustituye al `hint`. |
| `size="sm" \| "md" \| "lg"` | `size` como el atributo de HTML (un número de caracteres) | Sustituye al `size` normal de un campo de texto. |
| `className` se aplica al **contenedor** (título, campo y mensaje) | Que se aplique al campo en sí | Para cambiar el estilo del campo no basta con `className`. |
| El icono va siempre a la izquierda | `iconPosition`, `rightIcon` | No hay forma de ponerlo a la derecha. |
| El componente se llama `Input` pero incluye título y mensajes | `TextField`, `FormField` | No es solo la caja de texto. |

### Card

| Lo que hay | Lo que se suele suponer | Por qué confunde |
| --- | --- | --- |
| `outlined`, `elevated`, `filled` | `default`, `bordered`, `shadow`, `flat`, `ghost` | `outlined` es la de por defecto. |
| `padding="sm" \| "md" \| "lg"` | `size`, `compact`, `dense` | — |
| `action` es la zona derecha de la cabecera | `extra`, `headerRight`, `actions`, `badge` | Pese al nombre, no tiene por qué ser un botón: sirve para cualquier cosa, por ejemplo un Badge. |
| `footer` | `actions`, `CardFooter` | — |
| `title` es contenido (texto o elementos) | El atributo `title` de HTML (texto al pasar el ratón) | Sustituye al `title` normal, así que no se puede usar para mostrar un texto al pasar el ratón. |
| Todo se pasa como props | `<Card.Header>`, `<CardTitle>`, `<CardContent>` | No hay subcomponentes. |

### Badge

| Lo que hay | Lo que se suele suponer | Por qué confunde |
| --- | --- | --- |
| `color` | `variant`, `tone`, `status`, `intent` | Es el único componente que usa `color`. |
| `neutral`, `info`, `success`, `warning`, `danger` | `default`, `gray`, `primary`, `error`, nombres de colores (`green`, `red`) | No acepta nombres de colores: `color="green"` no funciona, es `success`. |
| `danger` | `error` | Badge y Button dicen `danger`, pero Input dice `error` para lo mismo. |
| `dot` | `withDot`, `indicator` | Si hay `icon`, el punto se ignora sin avisar. |
| Solo `sm` y `md` | `sm`, `md`, `lg` | Badge no tiene `lg`, a diferencia de Button e Input. |
| Se llama `Badge` | `Tag`, `Chip`, `Pill`, `Label` | No se puede pulsar ni cerrar. |

---

## 5. Prueba sin reglas

**Qué se probó:** se pidió una pantalla de asistente usando solo los componentes del proyecto, sin ninguna regla de diseño escrita. El resultado es `src/screens/antes.tsx`, revisado tal como está en `main` en el commit `ee9cfc4`. **La pantalla no se ha cambiado.**

**Qué se busca:** lo que sale mal cuando se construye sin reglas. Hay tres tipos de problema:
- valores escritos a mano;
- componentes copiados en vez de usados;
- nombres distintos de los de los componentes.

**Lo que sí salió bien:**
- Se usan los cuatro componentes: Card (cabecera), Badge, Button (en tres sitios: nueva conversación, ideas para empezar y enviar; dos de ellos con solo icono) e Input.
- No hay colores hex ni valores entre corchetes.
- Los colores que aparecen ya existen en los componentes.
- El botón de enviar lleva `type="submit"` (línea 201), la trampa señalada en la sección 4.

### 5.1 Valores escritos a mano

Todas las líneas son de `src/screens/antes.tsx`. En la columna **¿Existe en los componentes?**, «No» significa que el valor aparece por primera vez en esta pantalla.

| Línea | Valor | Para qué | ¿Existe en los componentes? |
| --- | --- | --- | --- |
| 85 | `1200` (milisegundos) | Lo que tarda la respuesta de ejemplo | No. Es un tiempo de espera inventado. |
| 103 | `max-w-3xl`, `gap-4`, `p-4`, `sm:p-6` | Ancho y márgenes de la pantalla | No hay ninguna regla de maquetación de pantallas. |
| 130 | `rounded-xl`, `border-gray-200`, `bg-gray-50` | Caja del historial | Sí, pero mezclando dos variantes de Card (ver 5.2). |
| 133 | `gap-4`, `p-6` | Estado vacío | Sí, son los de Card `md`, escritos a mano. |
| 134 | `size-14`, `rounded-full`, `bg-teal-50`, `text-teal-700` | Círculo del icono del estado vacío | **`size-14` no existe.** Card usa `size-10` y `rounded-lg` para lo mismo. |
| 135 | `size={28}` | Icono del estado vacío | **No.** Los iconos de los componentes miden 12, 14, 16, 18, 20 o 22. |
| 138 | `text-lg`, `font-semibold`, `text-gray-900` | Título del estado vacío | **`text-lg` no existe.** Los componentes solo usan `text-xs`, `text-sm` y `text-base`. |
| 139 | `mt-1`, `max-w-sm`, `text-sm`, `text-gray-600` | Texto del estado vacío | **`mt-1` no existe.** Card usa `mt-0.5` para el texto bajo un título. |
| 143 | `max-w-md`, `gap-2` | Lista de ideas | — |
| 154 | `gap-4`, `p-4` | Lista de mensajes | — |
| 160 | `gap-1` | Separación entre autor y burbuja | — |
| 162 | `text-xs`, `text-gray-500` | Autor y hora del mensaje | Sí, pero `text-xs` solo lo usa Badge `sm`. |
| 167 | `max-w-md`, `rounded-2xl`, `px-4`, `py-2.5`, `text-sm` | Burbuja de mensaje | **`rounded-2xl` y `py-2.5` no existen.** Ningún componente usa ese radio, y todos fijan el alto con `h-*` en vez de con espacio arriba y abajo. |
| 169 | `rounded-br-md`, `bg-teal-700`, `text-white` | Burbuja de la persona | Sí, es el color de Button `primary`. |
| 170 | `rounded-bl-md`, `border-gray-200`, `bg-white`, `text-gray-900` | Burbuja del asistente | Sí, es el estilo de Card `outlined`. |
| 191 | `gap-2` | Entre el campo y el botón de enviar | — |
| 208 | `gap-1.5`, `text-xs`, `text-gray-500` | Aviso del pie | Parecido al mensaje de Input, pero con otros valores (ver 5.2). |
| 209 | `size={14}` | Icono del aviso | Sí, pero en Badge `md`. Input usa 16 para el mismo tipo de icono. |

**Resumen:**
- **Cinco valores nuevos** que no existen en ningún componente: `size-14`, el icono de 28 px, `text-lg`, `rounded-2xl` y `py-2.5`.
- **Los colores no son nuevos**, pero están todos escritos directamente: `teal-50`, `teal-700`, `gray-50`, `gray-200`, `gray-500`, `gray-600`, `gray-900` y `white`.

### 5.2 Componentes copiados en vez de usados

En cada fila: lo que la pantalla construye a mano, de qué componente copia los estilos y en qué se diferencia de él.

| Líneas en `antes.tsx` | Qué se ha hecho a mano | Copia de | Diferencias |
| --- | --- | --- | --- |
| 128–131 | Caja del historial | Card: `rounded-xl` (`Card.tsx:53`), borde de `outlined` (`Card.tsx:25`) y fondo de `filled` (`Card.tsx:27`) | Mezcla dos variantes que en Card no se pueden combinar. No se usó Card porque su espacio interior es fijo y no se puede desplazar por dentro. |
| 134–136 | Círculo con el icono del estado vacío | Cuadro del icono de Card (`Card.tsx:63`): `bg-teal-50` y `text-teal-700` | Otro tamaño (`size-14` frente a `size-10`), otra forma (círculo frente a esquinas redondeadas) y otro icono (28 frente a 22). |
| 133–152 | Estado vacío completo: icono, título, texto y botones | No hay componente | Es un patrón que se repetirá en historial médico, citas o análisis. Hoy cada pantalla lo haría a su manera. |
| 138 | Título del estado vacío (`h2`) | Título de Card (`Card.tsx:68`: `h3`, `text-base`, `font-semibold`) | Otro tamaño (`text-lg`) y otro nivel de título. No hay un componente de título. |
| 165–174 | Burbuja de la persona | Button `primary` (`Button.tsx:43`): `bg-teal-700` y `text-white` | Toma el color de un botón para algo que no se puede pulsar, y le cambia el radio a `rounded-2xl` con una esquina `rounded-br-md`. |
| 165–174 | Burbuja del asistente | Card `outlined` (`Card.tsx:25`): `border-gray-200` y `bg-white` | Otro radio (`rounded-2xl` frente a `rounded-xl`) y otro espacio interior (`px-4 py-2.5` frente a `p-4`, `p-6` o `p-8`). |
| 178–183 | «El asistente está escribiendo…» | Badge `neutral` (`Badge.tsx:19`) | No es una copia: es **un componente usado para otra cosa**. Badge es una etiqueta de estado, pero aquí indica una espera. Button ya tiene su propia forma de mostrar una espera (`loading`, `Button.tsx:84–85`, con el círculo que gira), y esta pantalla no la reutiliza. |
| 208–211 | Aviso del pie con icono | Mensaje de ayuda de Input (`Input.tsx:95–104`: `flex items-center gap-1 text-sm`, icono de 16 y `text-gray-600`) | Es el mismo patrón (icono más texto corto) con todos los valores distintos: `gap-1.5`, `text-xs`, icono de 14 y `text-gray-500`. |

**Resumen:** faltan tres componentes que la pantalla ha tenido que inventar:
- **burbuja de mensaje** (o `Message`);
- **estado vacío** (`EmptyState`);
- **nota con icono**, para avisos cortos.

Además, la caja del historial pide una Card que se pueda desplazar por dentro, o una variante sin espacio interior.

### 5.3 Nombres distintos de los de los componentes

| Línea en `antes.tsx` | Nombre en la pantalla | Nombre equivalente en los componentes | Problema |
| --- | --- | --- | --- |
| Nombre del archivo y 42 | Archivo `antes.tsx` (en minúsculas) | `Button.tsx`, `Card.tsx`… (con mayúscula inicial) | Las pantallas y los componentes siguen convenciones distintas. En las pantallas es a propósito, porque el nombre del archivo es su dirección (`#/antes`), pero no está escrito en ningún sitio. |
| 19 y 156 | `author: 'user' \| 'assistant'` y `mine` | `variant` (Button y Card) o `color` (Badge) | Las dos burbujas se distinguen con un `if` según quién escribe, no con una variante con nombre. Si se convierten en componente, habrá que elegir un tercer nombre (`variant`, `color` o `author`), y ya hay dos en uso. |
| 24–28 y 144 | `{ icon, text }` en las ideas | `icon` sí coincide, pero el texto en Button se llama `children` | `text` no existe en ningún componente: se usa solo dentro de la pantalla. |
| 45 y 178 | `typing` («escribiendo») | `loading` en Button (`Button.tsx:15`) | Es el mismo concepto, esperar a que algo termine, con otro nombre y otro aspecto. |
| 100 y 121 | `isEmpty` | — | Los componentes no usan el prefijo `is` (`loading`, `fullWidth`, `dot`), pero la pantalla sí. |
| 112–114 | Badge `color="success"` con el texto «Disponible» | `success` en Badge significa «hecho, correcto» | Se usa un color de resultado para indicar disponibilidad. Para eso Badge no tiene ningún nombre adecuado, así que se reutiliza `success`. |
| 169 | `bg-teal-700` (sin nombre) | `primary` en Button | El color principal aparece en la burbuja con su valor de Tailwind, no con el nombre `primary`. Si cambia el color de la marca, la burbuja no cambiará con los botones. |
| 193 | `label="Tu mensaje"` | `label` en Input es obligatorio y siempre visible | El nombre coincide, pero en un chat no se suele querer un título visible encima del campo. Input no permite ocultarlo. |

### 5.4 Conclusión

Sin reglas escritas, una sola pantalla:
- **inventa cinco valores** que no existen en el sistema;
- **copia estilos de tres componentes** (Button, Card e Input) en vez de usarlos;
- **construye a mano tres piezas** que deberían ser componentes;
- **pone nombres nuevos** (`typing`, `author`, `text`, `isEmpty`) a cosas que ya tenían nombre o que lo necesitarán.

Cada pantalla nueva repetiría estos problemas a su manera. Por eso los próximos pasos de abajo, sobre todo definir colores y escalas con nombre propio y escribir los nombres en `AGENTS.md`, son lo que haría falta antes de la versión «después».

---

## Próximos pasos sugeridos

Esta auditoría no cambia nada. Lo siguiente que haría falta, en este orden:

1. **Definir los colores con nombre propio.**
   - El principal (`primary`), hoy `teal-700`.
   - Uno solo para peligro y error (`danger`). Hoy hay cuatro rojos distintos.
   - Una escala de grises con uso claro: fondo, borde, texto principal y texto secundario.
2. **Fijar una escala de radios y otra de tamaños de icono**, y usarlas en todos los componentes.
3. **Unificar los nombres de las props:**
   - `variant` frente a `color`;
   - `size` frente a `padding`;
   - `danger` frente a `error`.
4. **Añadir a `AGENTS.md` un resumen de la sección 4**, para que los agentes acierten los nombres a la primera.
