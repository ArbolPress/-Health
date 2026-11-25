# Cómo se construye un token en DSHealth

Este es el manual para crear o cambiar tokens. **Todo token nuevo sigue esta misma estructura.**

## Qué es un token

Un **token** es un valor de diseño con nombre propio. Por ejemplo, `color.bg.primary.default.default` en lugar de escribir `#00a6f4`. Si el valor cambia, se cambia en el token y se actualiza todo lo que lo usa.

Los tokens de DSHealth viven en un solo archivo: [`tokens.json`](tokens.json). Storybook los muestra en la página **Fundamentos → Primitivos**.

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
| `semantic` | **Para qué sirve.** El papel del valor en la interfaz: el fondo principal, el texto de error… | `semantic.color.text.danger.default.default` | Un alias a un token `primitive` |
| `component` | **Dónde se usa.** Las decisiones de un componente concreto | `component.button.color.bg.primary.default.hover` | Un alias a un token `semantic` |

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

- En minúsculas y en inglés: `color`, `bg`, `primary`.
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

Los tokens de color de los niveles `semantic` y `component` se nombran con esta fórmula. **Siempre llevan las cinco partes.** Si una parte no aplica, se escribe `default`. Así todos los nombres tienen la misma forma y se pueden comprobar.

| Parte | Pregunta | Valores |
| --- | --- | --- |
| `category` | ¿Qué tipo de token es? | `color` |
| `element` | ¿Qué se pinta? | `bg` (fondo), `text` (texto), `border` (borde), `icon` (icono) |
| `role` | ¿Qué significa? | `neutral`, `primary`, `danger`, `success`, `warning`, `info` |
| `modifier` | ¿Con qué intensidad? | `default`, `subtle` (más suave), `strong` (más intenso), `inverse` (sobre fondo oscuro) |
| `state` | ¿En qué momento? | `default`, `hover` (ratón encima), `active` (pulsado), `focus` (con el foco del teclado), `disabled` (desactivado), `selected` (seleccionado) |

Los valores de `role` son los nombres de la tabla del principio 4 del [ADR-001](../docs/adr/001-alcance.md): por ejemplo, `danger` y no `error`. Si hace falta un valor nuevo en cualquiera de las columnas, se añade primero a esta tabla, en la misma PR.

**Ejemplos en `semantic`:**

| Nombre | Qué es |
| --- | --- |
| `color.bg.neutral.default.default` | Fondo normal de la interfaz |
| `color.bg.primary.default.hover` | Fondo del color principal, con el ratón encima |
| `color.bg.primary.subtle.default` | Fondo suave del color principal, por ejemplo el del cuadro de un icono |
| `color.text.neutral.subtle.default` | Texto secundario, más suave que el normal |
| `color.text.danger.default.default` | Texto de error |
| `color.border.neutral.default.disabled` | Borde de un campo desactivado |

**En el nivel `component`**, la fórmula va precedida del nombre del componente: `[component].[category].[element].[role].[modifier].[state]`. Por ejemplo:
- `button.color.bg.primary.default.hover`;
- `input.color.border.danger.default.focus`.

El resto de categorías con significado (espaciado, radios, texto…) se nombrarán en el ADR-002, Fundamentos.

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

### Los alias: `{ruta.del.token}`

Un alias se escribe como texto, con la **ruta completa** del token entre llaves, empezando por el nivel:

```json
"$value": "{primitive.color.brand.600}"
```

- La ruta empieza siempre por `primitive`, `semantic` o `component`. Nunca se acorta.
- La ruta tiene que existir en `tokens.json`.
- Respeta la regla de los niveles: un alias de `semantic` empieza por `{primitive.`, y uno de `component` empieza por `{semantic.`.

## Ejemplo completo con los tres niveles

Un token por nivel, encadenados con alias. Los valores son de ejemplo: los colores reales los fijará el ADR-002.

```json
{
  "primitive": {
    "color": {
      "$type": "color",
      "brand": {
        "600": {
          "$value": { "colorSpace": "oklch", "components": [0.588, 0.158, 241.966], "hex": "#0084d1" },
          "$description": "Tono 600 de la escala de la marca."
        }
      }
    }
  },
  "semantic": {
    "color": {
      "$type": "color",
      "bg": {
        "primary": {
          "default": {
            "default": {
              "$value": "{primitive.color.brand.600}",
              "$description": "Fondo del color principal: botones principales y elementos destacados."
            }
          }
        }
      }
    }
  },
  "component": {
    "button": {
      "color": {
        "$type": "color",
        "bg": {
          "primary": {
            "default": {
              "default": {
                "$value": "{semantic.color.bg.primary.default.default}",
                "$description": "Fondo del botón principal en reposo."
              }
            }
          }
        }
      }
    }
  }
}
```

## Lista de comprobación para un token nuevo

- [ ] **Nivel:** está en el nivel correcto: `primitive` (qué valor es), `semantic` (para qué sirve) o `component` (dónde se usa).
- [ ] **Nombre:**
  - los primitivos siguen `[category].[scale].[step]`;
  - los colores de `semantic` siguen la fórmula de cinco partes, y los de `component` la llevan precedida del nombre del componente;
  - cada parte usa un valor de las tablas de este manual.
- [ ] **`$value` y `$description`:** el token tiene los dos, y la descripción explica qué es o para qué sirve.
- [ ] **`$type`:** está en el grupo, no en el token, y coincide con el tipo del valor.
- [ ] **Alias:**
  - si es `semantic`, apunta a un `primitive`; si es `component`, apunta a un `semantic`;
  - la ruta está completa, entre llaves, y existe en `tokens.json`.
- [ ] **Valores literales:** solo los hay en `primitive`.

## Estado actual

- `tokens.json` solo tiene, por ahora, el nivel `primitive`. Los niveles `semantic` y `component` se añadirán con el ADR-002, Fundamentos.
- **Los primitivos todavía no cumplen la regla de `$description`:** solo 2 de sus 168 tokens la tienen. Se completará en su propia PR.
