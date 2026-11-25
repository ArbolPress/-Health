# Cómo se construye un token en DSHealth

Este es el manual para crear o cambiar tokens. **Todo token nuevo sigue esta misma estructura.**

## Qué es un token

Un **token** es un valor de diseño con nombre propio. Por ejemplo, `color.background.brand` en lugar de escribir `#0069a8`. Si el valor cambia, se cambia en el token y se actualiza todo lo que lo usa.

Los tokens de DSHealth viven en un solo archivo: [`tokens.json`](tokens.json). Storybook los muestra en las páginas **Fundamentos → Primitivos** y **Fundamentos → Semánticos**.

## 1. Los tres niveles

Los tokens se ordenan en tres niveles. Cada nivel es un grupo de primer nivel dentro de `tokens.json`:

```
component   →   semantic   →   primitive
(para qué       (para qué       (qué valor
 componente)     sirve)          es)
```

| Nivel | Qué dice | Ejemplo de nombre | Su valor es |
| --- | --- | --- | --- |
| `primitive` | **Qué valor es.** Valores en bruto, sin significado: un azul, 16 px… | `primitive.color.blue.500` | Un valor literal, como un color o una medida |
| `semantic` | **Para qué sirve.** El papel del valor en la interfaz: el fondo principal, el texto de error… | `semantic.color.text.error` | Un alias a un token `primitive` |
| `component` | **Dónde se usa.** Las decisiones de un componente concreto | `component.button.background.brand.hover` | Un alias a un token `semantic` |

### La regla de los alias: cada nivel solo apunta al de abajo

Un **alias** es un token cuyo valor no es un valor, sino el nombre de otro token. Así, si cambia el token de abajo, cambian todos los que apuntan a él.

- **`primitive`** es el único nivel con valores literales. Nunca usa alias.
- **`semantic`** solo usa alias a tokens `primitive`. Nunca lleva valores literales.
- **`component`** solo usa alias a tokens `semantic`. Nunca lleva valores literales ni apunta directamente a `primitive`.
- **Nunca se apunta hacia arriba** (un `semantic` a un `component`), **ni dentro del mismo nivel** (un `semantic` a otro `semantic`).

| Desde | Puede apuntar a | No puede apuntar a |
| --- | --- | --- |
| `primitive` | — (valor literal) | ningún token |
| `semantic` | `primitive` | `semantic`, `component` |
| `component` | `semantic` | `primitive`, `component` |

**Por qué:**
- Si mañana cambia el color de la marca, se cambia un solo alias en `semantic`, y todos los componentes que lo usan cambian a la vez.
- Si un componente apuntara directamente a `primitive`, se quedaría fuera de ese cambio sin que nadie lo notara.

### Qué nivel usa cada parte del proyecto

- **Los componentes** (`src/components/`) usan tokens `component`. Si el componente todavía no tiene los suyos, usan `semantic`.
- **Las pantallas** (`src/screens/`) no usan tokens de color, radio ni texto. Solo usan componentes y clases de maquetación (principio 2 del [ADR-001](../docs/adr/001-alcance.md)).
- **Nadie usa `primitive` directamente en el código.** Los primitivos solo sirven para que los usen los tokens `semantic`.

## 2. Cómo se nombran

### Reglas para todos los nombres

- En minúsculas y en inglés: `color`, `background`, `brand`.
- Si un nombre tiene varias palabras, van unidas con guion: `font-size`, `border-width`.
- El punto (`.`) separa las partes de la ruta. Nunca va dentro de un nombre.
- Ningún nombre empieza por `$`, ni contiene `{`, `}` o `.`. Lo prohíbe el formato DTCG.
- En las escalas numéricas, los valores por debajo de 100 llevan tres cifras: `050`, no `50`. Así se ordenan bien.

### Primitivos: `[category].[scale].[step]`

| Parte | Qué es | Ejemplos |
| --- | --- | --- |
| `category` | Tipo de valor | `color`, `spacing`, `radius`, `border-width`, `font-size`, `font-weight`, `line-height`, `shadow`, `breakpoint` |
| `scale` | La familia, si la hay | `blue`, `gray`, `brand`, `offset`, `blur` |
| `step` | El paso de la escala | `500`, `050`, `full`, `base` |

Ejemplos: `primitive.color.brand.500`, `primitive.spacing.400`, `primitive.radius.full`, `primitive.shadow.offset.200`.

### Color con significado: `[category].[element].[role].[modifier].[state]`

Los tokens de color de los niveles `semantic` y `component` se nombran con esta fórmula. Las partes van **siempre en este orden**, y **las que no aplican se omiten**: `color.text.neutral` no tiene ni modificador ni estado.

Como cada valor pertenece a una sola parte, siempre se sabe qué es cada una. Por ejemplo, en `color.background.neutral.hover`, `hover` solo puede ser un estado.

| Parte | Pregunta | Valores |
| --- | --- | --- |
| `category` | ¿Qué tipo de token es? | `color` (siempre está) |
| `element` | ¿Qué se pinta? | `background` (fondo), `text` (texto), `icon` (icono), `border` (borde). Siempre está. |
| `role` | ¿Qué significa? | `neutral` (sin color), `brand` (la marca), `info` (información), `success` (éxito), `warning` (aviso), `error` (error o peligro) |
| `modifier` | ¿Con qué intensidad o sobre qué? | `subtle` (más suave), `strong` (más intenso), `inverted` (para usar sobre un fondo sólido u oscuro) |
| `state` | ¿En qué momento? | `hover` (ratón encima), `pressed` (mientras se pulsa), `disabled` (desactivado), `focus` (con el foco del teclado), `selected` (seleccionado) |

- **Sin `modifier` ni `state`**, el token es el valor normal del rol. Por ejemplo, `color.background.brand` es el fondo de la marca en reposo.
- **`inverted`** es para el texto o el icono que va encima del fondo sólido de su mismo rol. Por ejemplo, `color.text.error.inverted` va sobre `color.background.error`, y `color.text.neutral.inverted` sobre `color.background.neutral.inverted`.
- **Si hace falta un valor nuevo** en cualquiera de las columnas, se añade primero a esta tabla, en la misma PR.

**Diferencia conocida con las props de los componentes:**
- Los tokens dicen `brand` y `error`, y las props de los componentes dicen `primary` y `danger`. Un ejemplo es `variant="danger"`, según el principio 4 del [ADR-001](../docs/adr/001-alcance.md).
- No es un error. Los tokens nombran **qué significa el color**, y las props nombran **qué estilo tiene el componente**. Así, un botón `variant="danger"` usa los tokens de `error`, y un botón `variant="primary"` usa los de `brand`.
- Esa correspondencia se escribirá en los tokens del nivel `component`.

**Ejemplos en `semantic`:**

| Nombre | Qué es |
| --- | --- |
| `color.background.neutral` | Fondo base de la interfaz |
| `color.background.brand.hover` | Fondo de la marca, con el ratón encima |
| `color.background.brand.subtle` | Fondo suave de la marca, por ejemplo el del cuadro de un icono |
| `color.text.neutral.subtle` | Texto secundario, más suave que el normal |
| `color.text.error` | Texto de error |
| `color.text.error.inverted` | Texto sobre el fondo sólido de error |
| `color.border.focus` | Contorno del foco del teclado (sin rol: solo el estado) |

**En el nivel `component`**, los colores siguen el mismo orden que en `semantic`, pero con el nombre del componente en lugar de `color`: `[component].[element].[role].[modifier].[state]`.
- **El nombre repite el del semántico al que apunta.** Por ejemplo, `button.background.brand.hover` apunta a `color.background.brand.hover`.
- **El componente sustituye a `color`**, porque el elemento (`background`, `text`, `icon` o `border`) ya dice que es un color.
- Así se ve de un vistazo qué semántico usa cada parte del componente.

Ejemplos:
- `button.background.brand.hover` → `color.background.brand.hover`;
- `button.icon.brand.inverted` → `color.icon.brand.inverted`;
- `input.border.error` → `color.border.error`.

### El resto de tokens con significado

| Categoría | Forma del nombre | Valores |
| --- | --- | --- |
| Tipografía | `typography.[pieza].[estilo]` | Piezas: `font-size`, `line-height` y `font-weight`. Estilos: `display`, `heading`, `title`, `body`, `label` y `caption`. Cada estilo tiene sus tres piezas. |
| Espaciado | `space.[talla]` | `none`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl` y `4xl` |
| Radio | `radius.[talla]` | `none`, `sm`, `md`, `lg`, `xl` y `full` |
| Grosor de borde | `border-width.[uso]` | `default`, `strong` y `focus` |
| Sombra | `elevation.[talla]` | `sm`, `md` y `lg` |

- **El interlineado (`typography.line-height`) es siempre un alias** a la escala `primitive.line-height`, nunca una proporción como `1.5`.
- **No hay tokens de maquetación** (anchos de página, columnas…). Los anchos de pantalla solo existen como primitivos (`primitive.breakpoint`).

### El resto de tokens de componente: `[component].[property].[part|size]`

Para lo que no es color, el nombre dice **qué propiedad** del componente es y, si hace falta, **de qué parte** o **de qué tamaño**:

| Parte del nombre | Valores |
| --- | --- |
| `property` | `padding`, `padding-x`, `gap`, `radius`, `border-width`, `font-size`, `line-height`, `font-weight` y `elevation` |
| `part` | Una parte con nombre del componente: `label`, `message`, `title`, `icon`, `header`, `footer`, `focus`… |
| `size` | `sm` o `lg`, cuando el valor cambia con el tamaño del componente |

- **El token sin `part` ni `size` es el del caso normal:** la parte principal, en el tamaño mediano (`md`). Por ejemplo, `button.padding-x` es el espacio lateral del botón mediano, y `button.padding-x.sm` el del pequeño.
- **Los estilos de texto se reparten en sus tres piezas.** Por ejemplo, el título de una tarjeta usa `card.font-size.title`, `card.line-height.title` y `card.font-weight.title`.
- **El tamaño de los iconos no tiene token todavía**, porque no hay un semántico para él.

## 3. El formato: DTCG

`tokens.json` sigue el formato **DTCG** (*Design Tokens Community Group*), el estándar para guardar tokens que entienden las herramientas de diseño y de código.

### Cada token: `$value` y `$description`

Todo token tiene exactamente estas dos propiedades:
- **`$value`:** su valor, o un alias.
- **`$description`:** una frase que explica qué es (en `primitive`) o para qué sirve (en `semantic` y `component`). Es obligatoria: sin ella, nadie sabe cuándo usar el token.

```json
"500": {
  "$value": { "colorSpace": "oklch", "components": [0.685, 0.169, 237.323], "hex": "#00a6f4" },
  "$description": "Tono central de la marca."
}
```

### El `$type`, en el grupo

- El `$type` se escribe **una vez en el grupo**, no en cada token. Todos los tokens de dentro lo heredan.
- Si un grupo mezcla tipos, el `$type` va en cada subgrupo. Por ejemplo, `shadow` no lleva `$type`, pero `shadow.offset` y `shadow.blur` llevan `dimension`, y `shadow.color` lleva `color`.
- Un alias tiene que apuntar a un token **del mismo tipo** que su grupo: un token `color` solo apunta a otro `color`.

Tipos que se usan en DSHealth y cómo se escribe su valor:

| `$type` | Cómo se escribe el `$value` | Ejemplo |
| --- | --- | --- |
| `color` | Espacio de color, componentes y hex | `{ "colorSpace": "oklch", "components": [0.685, 0.169, 237.323], "hex": "#00a6f4" }` |
| `dimension` | Número y unidad (`px` o `rem`) | `{ "value": 16, "unit": "px" }` |
| `fontFamily` | Lista de fuentes, de la preferida a la de respaldo | `["Inter", "ui-sans-serif", "system-ui", "sans-serif"]` |
| `fontWeight` | Número | `600` |
| `shadow` | Piezas de una sombra, cada una con un alias | Ver «Valores compuestos: la sombra» |

### Los alias: `{ruta.del.token}`

Un alias se escribe como texto, con la **ruta completa** del token entre llaves, empezando por el nivel:

```json
"$value": "{primitive.color.brand.700}"
```

- La ruta empieza siempre por `primitive`, `semantic` o `component`. Nunca se acorta.
- La ruta tiene que existir en `tokens.json`.
- Respeta la regla de los niveles: un alias de `semantic` empieza por `{primitive.`, y uno de `component` empieza por `{semantic.`.

### Un nombre que es token y grupo a la vez: `$root`

A veces un nombre es a la vez un token y un grupo. Por ejemplo, `color.background.brand` es un token (el fondo de la marca), pero también tiene dentro `subtle`, `hover` y `pressed`. En DTCG, ese token se guarda dentro del grupo con el nombre especial **`$root`**:

```json
"brand": {
  "$root": { "$value": "{primitive.color.brand.700}", "$description": "Fondo con el color de la marca." },
  "hover": { "$value": "{primitive.color.brand.800}", "$description": "Fondo de la marca con el ratón encima." }
}
```

- El token se sigue llamando `color.background.brand`.
- **Para apuntar a él con un alias**, se añade `$root` a la ruta: `{semantic.color.background.brand.$root}`.

### Valores compuestos: la sombra

Una sombra (`$type: "shadow"`) es un valor compuesto por piezas: `color`, `offsetX`, `offsetY`, `blur` y `spread`. **Cada pieza es un alias** a un primitivo:

```json
"md": {
  "$value": {
    "color": "{primitive.shadow.color.10}",
    "offsetX": "{primitive.shadow.offset.0}",
    "offsetY": "{primitive.shadow.offset.200}",
    "blur": "{primitive.shadow.blur.800}",
    "spread": "{primitive.shadow.offset.0}"
  },
  "$description": "Elevación media: elementos que flotan, como un menú desplegable."
}
```

## Ejemplo completo con los tres niveles

Un token por nivel, encadenados con alias. Los tres son reales y están en `tokens.json`.

```json
{
  "primitive": {
    "color": {
      "$type": "color",
      "brand": {
        "700": {
          "$value": { "colorSpace": "oklch", "components": [0.5, 0.134, 242.749], "hex": "#0069a8" },
          "$description": "Tono 700 de la escala de la marca."
        }
      }
    }
  },
  "semantic": {
    "color": {
      "background": {
        "$type": "color",
        "brand": {
          "$root": {
            "$value": "{primitive.color.brand.700}",
            "$description": "Fondo con el color de la marca, para la acción principal."
          }
        }
      }
    }
  },
  "component": {
    "button": {
      "background": {
        "$type": "color",
        "brand": {
          "$root": {
            "$value": "{semantic.color.background.brand.$root}",
            "$description": "Fondo del botón primary."
          }
        }
      }
    }
  }
}
```

## De los tokens al código: `npm run tokens`

Los componentes no leen `tokens.json` directamente. El comando `npm run tokens` (`scripts/build-tokens.mjs`) genera tres archivos a partir de él:

| Archivo | Qué es |
| --- | --- |
| `src/styles/tokens.css` | Una variable CSS por token, por ejemplo `--semantic-color-background-brand`. Los alias se convierten en referencias a otras variables, así que la cadena primitive → semantic → component se mantiene. |
| `src/styles/theme.css` | Un bloque `@theme` de Tailwind que convierte los tokens semánticos y de componente en clases, como `bg-background-brand` o `px-button-padding-x`. |
| `docs/tokens.md` | La tabla de cada token con su variable CSS y su clase de Tailwind. |

- **Los tres archivos se generan: no se editan a mano.** Después de cambiar `tokens.json`, ejecuta `npm run tokens`.
- **Para comprobar que están al día** sin escribir nada, ejecuta `npm run tokens -- --check`. Si alguno no lo está, el comando lo dice y termina con error.
- **Cómo se forma cada clase:** la utilidad de Tailwind seguida del nombre del token, por ejemplo `bg-` + `background-brand`. Ninguna se llama igual que una clase que ya trae Tailwind, y las escalas de Tailwind no cambian.

## Lista de comprobación para un token nuevo

- [ ] **Nivel:** está en el nivel correcto: `primitive` (qué valor es), `semantic` (para qué sirve) o `component` (dónde se usa).
- [ ] **Nombre:**
  - los primitivos siguen `[category].[scale].[step]`;
  - los colores de `semantic` siguen la fórmula, en su orden y sin las partes que no aplican; los de `component` empiezan por el nombre del componente en lugar de `color`, y repiten el nombre del semántico al que apuntan;
  - el resto sigue la tabla «El resto de tokens con significado»;
  - cada parte usa un valor de las tablas de este manual.
- [ ] **`$value` y `$description`:** el token tiene los dos, y la descripción explica qué es o para qué sirve.
- [ ] **`$type`:** está en el grupo, no en el token, y coincide con el tipo del valor.
- [ ] **Alias:**
  - si es `semantic`, apunta a un `primitive`; si es `component`, apunta a un `semantic`;
  - la ruta está completa, entre llaves, y existe en `tokens.json`. Si apunta a un token guardado en `$root`, la ruta termina en `.$root`.
- [ ] **Valores literales:** solo los hay en `primitive`.

## Estado actual

- **`primitive`:** 168 tokens. **Todavía no cumplen la regla de `$description`:** solo 2 la tienen. Se completará en su propia PR.
- **`semantic`:** 97 tokens. Todos tienen `$description` y solo usan alias a `primitive`.
- **`component`:** 120 tokens: Button (35), Input (29), Card (26) y Badge (30). Todos tienen `$description` y solo usan alias a `semantic`. Los cuatro componentes ya los usan a través de sus clases de Tailwind.
