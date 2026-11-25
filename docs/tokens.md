# Tokens y clases de Tailwind

> Archivo generado por scripts/build-tokens.mjs a partir de tokens/tokens.json. No lo edites a mano: cambia tokens/tokens.json y ejecuta npm run tokens.

Cada token semántico y de componente tiene una **clase de Tailwind**: la utilidad de Tailwind seguida del nombre del token. Las clases las crea `src/styles/theme.css`, y los valores salen de las variables de `src/styles/tokens.css`.

- **Espaciado:** la clase de la tabla es un ejemplo. El mismo nombre sirve con cualquier utilidad de espaciado: `p-space-md`, `px-space-md`, `gap-space-md`, `m-space-md`…
- **Tipografía:** las tres piezas de un estilo (tamaño, interlineado y peso) se aplican juntas con una sola clase: `text-heading`.
- **Iconos:** su color se aplica con `text-…`, porque los iconos de Tabler usan el color del texto.
- **Primitivos:** no tienen clase. Solo existen como variables CSS (`--primitive-…`), y los usan los semánticos.

## Semánticos

| Token | Variable CSS | Clase de Tailwind |
| --- | --- | --- |
| `semantic.color.background.neutral` | `--semantic-color-background-neutral` | `bg-background-neutral` |
| `semantic.color.background.neutral.subtle` | `--semantic-color-background-neutral-subtle` | `bg-background-neutral-subtle` |
| `semantic.color.background.neutral.strong` | `--semantic-color-background-neutral-strong` | `bg-background-neutral-strong` |
| `semantic.color.background.neutral.inverted` | `--semantic-color-background-neutral-inverted` | `bg-background-neutral-inverted` |
| `semantic.color.background.neutral.hover` | `--semantic-color-background-neutral-hover` | `bg-background-neutral-hover` |
| `semantic.color.background.neutral.pressed` | `--semantic-color-background-neutral-pressed` | `bg-background-neutral-pressed` |
| `semantic.color.background.neutral.disabled` | `--semantic-color-background-neutral-disabled` | `bg-background-neutral-disabled` |
| `semantic.color.background.brand` | `--semantic-color-background-brand` | `bg-background-brand` |
| `semantic.color.background.brand.subtle` | `--semantic-color-background-brand-subtle` | `bg-background-brand-subtle` |
| `semantic.color.background.brand.hover` | `--semantic-color-background-brand-hover` | `bg-background-brand-hover` |
| `semantic.color.background.brand.pressed` | `--semantic-color-background-brand-pressed` | `bg-background-brand-pressed` |
| `semantic.color.background.info` | `--semantic-color-background-info` | `bg-background-info` |
| `semantic.color.background.info.subtle` | `--semantic-color-background-info-subtle` | `bg-background-info-subtle` |
| `semantic.color.background.success` | `--semantic-color-background-success` | `bg-background-success` |
| `semantic.color.background.success.subtle` | `--semantic-color-background-success-subtle` | `bg-background-success-subtle` |
| `semantic.color.background.warning` | `--semantic-color-background-warning` | `bg-background-warning` |
| `semantic.color.background.warning.subtle` | `--semantic-color-background-warning-subtle` | `bg-background-warning-subtle` |
| `semantic.color.background.error` | `--semantic-color-background-error` | `bg-background-error` |
| `semantic.color.background.error.subtle` | `--semantic-color-background-error-subtle` | `bg-background-error-subtle` |
| `semantic.color.background.error.hover` | `--semantic-color-background-error-hover` | `bg-background-error-hover` |
| `semantic.color.background.error.pressed` | `--semantic-color-background-error-pressed` | `bg-background-error-pressed` |
| `semantic.color.text.neutral` | `--semantic-color-text-neutral` | `text-text-neutral` |
| `semantic.color.text.neutral.subtle` | `--semantic-color-text-neutral-subtle` | `text-text-neutral-subtle` |
| `semantic.color.text.neutral.inverted` | `--semantic-color-text-neutral-inverted` | `text-text-neutral-inverted` |
| `semantic.color.text.neutral.disabled` | `--semantic-color-text-neutral-disabled` | `text-text-neutral-disabled` |
| `semantic.color.text.brand` | `--semantic-color-text-brand` | `text-text-brand` |
| `semantic.color.text.brand.inverted` | `--semantic-color-text-brand-inverted` | `text-text-brand-inverted` |
| `semantic.color.text.info` | `--semantic-color-text-info` | `text-text-info` |
| `semantic.color.text.info.inverted` | `--semantic-color-text-info-inverted` | `text-text-info-inverted` |
| `semantic.color.text.success` | `--semantic-color-text-success` | `text-text-success` |
| `semantic.color.text.success.inverted` | `--semantic-color-text-success-inverted` | `text-text-success-inverted` |
| `semantic.color.text.warning` | `--semantic-color-text-warning` | `text-text-warning` |
| `semantic.color.text.warning.inverted` | `--semantic-color-text-warning-inverted` | `text-text-warning-inverted` |
| `semantic.color.text.error` | `--semantic-color-text-error` | `text-text-error` |
| `semantic.color.text.error.inverted` | `--semantic-color-text-error-inverted` | `text-text-error-inverted` |
| `semantic.color.icon.neutral` | `--semantic-color-icon-neutral` | `text-icon-neutral` |
| `semantic.color.icon.neutral.subtle` | `--semantic-color-icon-neutral-subtle` | `text-icon-neutral-subtle` |
| `semantic.color.icon.neutral.inverted` | `--semantic-color-icon-neutral-inverted` | `text-icon-neutral-inverted` |
| `semantic.color.icon.neutral.disabled` | `--semantic-color-icon-neutral-disabled` | `text-icon-neutral-disabled` |
| `semantic.color.icon.brand` | `--semantic-color-icon-brand` | `text-icon-brand` |
| `semantic.color.icon.brand.inverted` | `--semantic-color-icon-brand-inverted` | `text-icon-brand-inverted` |
| `semantic.color.icon.info` | `--semantic-color-icon-info` | `text-icon-info` |
| `semantic.color.icon.info.inverted` | `--semantic-color-icon-info-inverted` | `text-icon-info-inverted` |
| `semantic.color.icon.success` | `--semantic-color-icon-success` | `text-icon-success` |
| `semantic.color.icon.success.inverted` | `--semantic-color-icon-success-inverted` | `text-icon-success-inverted` |
| `semantic.color.icon.warning` | `--semantic-color-icon-warning` | `text-icon-warning` |
| `semantic.color.icon.warning.inverted` | `--semantic-color-icon-warning-inverted` | `text-icon-warning-inverted` |
| `semantic.color.icon.error` | `--semantic-color-icon-error` | `text-icon-error` |
| `semantic.color.icon.error.inverted` | `--semantic-color-icon-error-inverted` | `text-icon-error-inverted` |
| `semantic.color.border.neutral` | `--semantic-color-border-neutral` | `border-border-neutral` |
| `semantic.color.border.neutral.strong` | `--semantic-color-border-neutral-strong` | `border-border-neutral-strong` |
| `semantic.color.border.brand` | `--semantic-color-border-brand` | `border-border-brand` |
| `semantic.color.border.info` | `--semantic-color-border-info` | `border-border-info` |
| `semantic.color.border.success` | `--semantic-color-border-success` | `border-border-success` |
| `semantic.color.border.warning` | `--semantic-color-border-warning` | `border-border-warning` |
| `semantic.color.border.error` | `--semantic-color-border-error` | `border-border-error` |
| `semantic.color.border.focus` | `--semantic-color-border-focus` | `outline-border-focus` |
| `semantic.typography.font-size.display` | `--semantic-typography-font-size-display` | `text-display` |
| `semantic.typography.font-size.heading` | `--semantic-typography-font-size-heading` | `text-heading` |
| `semantic.typography.font-size.title` | `--semantic-typography-font-size-title` | `text-title` |
| `semantic.typography.font-size.body` | `--semantic-typography-font-size-body` | `text-body` |
| `semantic.typography.font-size.label` | `--semantic-typography-font-size-label` | `text-label` |
| `semantic.typography.font-size.caption` | `--semantic-typography-font-size-caption` | `text-caption` |
| `semantic.typography.line-height.display` | `--semantic-typography-line-height-display` | `text-display` |
| `semantic.typography.line-height.heading` | `--semantic-typography-line-height-heading` | `text-heading` |
| `semantic.typography.line-height.title` | `--semantic-typography-line-height-title` | `text-title` |
| `semantic.typography.line-height.body` | `--semantic-typography-line-height-body` | `text-body` |
| `semantic.typography.line-height.label` | `--semantic-typography-line-height-label` | `text-label` |
| `semantic.typography.line-height.caption` | `--semantic-typography-line-height-caption` | `text-caption` |
| `semantic.typography.font-weight.display` | `--semantic-typography-font-weight-display` | `text-display` |
| `semantic.typography.font-weight.heading` | `--semantic-typography-font-weight-heading` | `text-heading` |
| `semantic.typography.font-weight.title` | `--semantic-typography-font-weight-title` | `text-title` |
| `semantic.typography.font-weight.body` | `--semantic-typography-font-weight-body` | `text-body` |
| `semantic.typography.font-weight.label` | `--semantic-typography-font-weight-label` | `text-label` |
| `semantic.typography.font-weight.caption` | `--semantic-typography-font-weight-caption` | `text-caption` |
| `semantic.space.none` | `--semantic-space-none` | `p-space-none` |
| `semantic.space.2xs` | `--semantic-space-2xs` | `p-space-2xs` |
| `semantic.space.xs` | `--semantic-space-xs` | `p-space-xs` |
| `semantic.space.sm` | `--semantic-space-sm` | `p-space-sm` |
| `semantic.space.md` | `--semantic-space-md` | `p-space-md` |
| `semantic.space.lg` | `--semantic-space-lg` | `p-space-lg` |
| `semantic.space.xl` | `--semantic-space-xl` | `p-space-xl` |
| `semantic.space.2xl` | `--semantic-space-2xl` | `p-space-2xl` |
| `semantic.space.3xl` | `--semantic-space-3xl` | `p-space-3xl` |
| `semantic.space.4xl` | `--semantic-space-4xl` | `p-space-4xl` |
| `semantic.radius.none` | `--semantic-radius-none` | `rounded-radius-none` |
| `semantic.radius.sm` | `--semantic-radius-sm` | `rounded-radius-sm` |
| `semantic.radius.md` | `--semantic-radius-md` | `rounded-radius-md` |
| `semantic.radius.lg` | `--semantic-radius-lg` | `rounded-radius-lg` |
| `semantic.radius.xl` | `--semantic-radius-xl` | `rounded-radius-xl` |
| `semantic.radius.full` | `--semantic-radius-full` | `rounded-radius-full` |
| `semantic.border-width.default` | `--semantic-border-width-default` | `border-width-default` |
| `semantic.border-width.strong` | `--semantic-border-width-strong` | `border-width-strong` |
| `semantic.border-width.focus` | `--semantic-border-width-focus` | `outline-width-focus` |
| `semantic.elevation.sm` | `--semantic-elevation-sm` | `shadow-elevation-sm` |
| `semantic.elevation.md` | `--semantic-elevation-md` | `shadow-elevation-md` |
| `semantic.elevation.lg` | `--semantic-elevation-lg` | `shadow-elevation-lg` |

## Componente: button

| Token | Variable CSS | Clase de Tailwind |
| --- | --- | --- |
| `component.button.background.brand` | `--component-button-background-brand` | `bg-button-background-brand` |
| `component.button.background.brand.hover` | `--component-button-background-brand-hover` | `bg-button-background-brand-hover` |
| `component.button.background.brand.pressed` | `--component-button-background-brand-pressed` | `bg-button-background-brand-pressed` |
| `component.button.background.error` | `--component-button-background-error` | `bg-button-background-error` |
| `component.button.background.error.hover` | `--component-button-background-error-hover` | `bg-button-background-error-hover` |
| `component.button.background.error.pressed` | `--component-button-background-error-pressed` | `bg-button-background-error-pressed` |
| `component.button.background.neutral` | `--component-button-background-neutral` | `bg-button-background-neutral` |
| `component.button.background.neutral.hover` | `--component-button-background-neutral-hover` | `bg-button-background-neutral-hover` |
| `component.button.background.neutral.pressed` | `--component-button-background-neutral-pressed` | `bg-button-background-neutral-pressed` |
| `component.button.background.neutral.disabled` | `--component-button-background-neutral-disabled` | `bg-button-background-neutral-disabled` |
| `component.button.text.brand` | `--component-button-text-brand` | `text-button-text-brand` |
| `component.button.text.brand.inverted` | `--component-button-text-brand-inverted` | `text-button-text-brand-inverted` |
| `component.button.text.error.inverted` | `--component-button-text-error-inverted` | `text-button-text-error-inverted` |
| `component.button.text.neutral` | `--component-button-text-neutral` | `text-button-text-neutral` |
| `component.button.text.neutral.disabled` | `--component-button-text-neutral-disabled` | `text-button-text-neutral-disabled` |
| `component.button.icon.brand` | `--component-button-icon-brand` | `text-button-icon-brand` |
| `component.button.icon.brand.inverted` | `--component-button-icon-brand-inverted` | `text-button-icon-brand-inverted` |
| `component.button.icon.error.inverted` | `--component-button-icon-error-inverted` | `text-button-icon-error-inverted` |
| `component.button.icon.neutral` | `--component-button-icon-neutral` | `text-button-icon-neutral` |
| `component.button.icon.neutral.disabled` | `--component-button-icon-neutral-disabled` | `text-button-icon-neutral-disabled` |
| `component.button.border.neutral.strong` | `--component-button-border-neutral-strong` | `border-button-border-neutral-strong` |
| `component.button.border.focus` | `--component-button-border-focus` | `outline-button-border-focus` |
| `component.button.border-width` | `--component-button-border-width` | `border-button-border-width` |
| `component.button.border-width.focus` | `--component-button-border-width-focus` | `outline-button-border-width-focus` |
| `component.button.radius` | `--component-button-radius` | `rounded-button-radius` |
| `component.button.padding-x` | `--component-button-padding-x` | `px-button-padding-x` |
| `component.button.padding-x.sm` | `--component-button-padding-x-sm` | `px-button-padding-x-sm` |
| `component.button.padding-x.lg` | `--component-button-padding-x-lg` | `px-button-padding-x-lg` |
| `component.button.gap` | `--component-button-gap` | `gap-button-gap` |
| `component.button.gap.sm` | `--component-button-gap-sm` | `gap-button-gap-sm` |
| `component.button.font-size` | `--component-button-font-size` | `text-button` |
| `component.button.font-size.lg` | `--component-button-font-size-lg` | `text-button-lg` |
| `component.button.line-height` | `--component-button-line-height` | `text-button` |
| `component.button.line-height.lg` | `--component-button-line-height-lg` | `text-button-lg` |
| `component.button.font-weight` | `--component-button-font-weight` | `text-button` |

## Componente: input

| Token | Variable CSS | Clase de Tailwind |
| --- | --- | --- |
| `component.input.background.neutral` | `--component-input-background-neutral` | `bg-input-background-neutral` |
| `component.input.background.neutral.disabled` | `--component-input-background-neutral-disabled` | `bg-input-background-neutral-disabled` |
| `component.input.text.neutral` | `--component-input-text-neutral` | `text-input-text-neutral` |
| `component.input.text.neutral.subtle` | `--component-input-text-neutral-subtle` | `text-input-text-neutral-subtle` |
| `component.input.text.neutral.disabled` | `--component-input-text-neutral-disabled` | `text-input-text-neutral-disabled` |
| `component.input.text.error` | `--component-input-text-error` | `text-input-text-error` |
| `component.input.icon.neutral.subtle` | `--component-input-icon-neutral-subtle` | `text-input-icon-neutral-subtle` |
| `component.input.icon.error` | `--component-input-icon-error` | `text-input-icon-error` |
| `component.input.border.neutral.strong` | `--component-input-border-neutral-strong` | `border-input-border-neutral-strong` |
| `component.input.border.neutral` | `--component-input-border-neutral` | `border-input-border-neutral` |
| `component.input.border.error` | `--component-input-border-error` | `border-input-border-error` |
| `component.input.border.focus` | `--component-input-border-focus` | `outline-input-border-focus` |
| `component.input.border-width` | `--component-input-border-width` | `border-input-border-width` |
| `component.input.border-width.focus` | `--component-input-border-width-focus` | `outline-input-border-width-focus` |
| `component.input.radius` | `--component-input-radius` | `rounded-input-radius` |
| `component.input.padding-x` | `--component-input-padding-x` | `px-input-padding-x` |
| `component.input.padding-x.sm` | `--component-input-padding-x-sm` | `px-input-padding-x-sm` |
| `component.input.padding-x.lg` | `--component-input-padding-x-lg` | `px-input-padding-x-lg` |
| `component.input.gap` | `--component-input-gap` | `gap-input-gap` |
| `component.input.font-size` | `--component-input-font-size` | `text-input` |
| `component.input.font-size.lg` | `--component-input-font-size-lg` | `text-input-lg` |
| `component.input.font-size.label` | `--component-input-font-size-label` | `text-input-label` |
| `component.input.font-size.message` | `--component-input-font-size-message` | `text-input-message` |
| `component.input.line-height` | `--component-input-line-height` | `text-input` |
| `component.input.line-height.lg` | `--component-input-line-height-lg` | `text-input-lg` |
| `component.input.line-height.label` | `--component-input-line-height-label` | `text-input-label` |
| `component.input.line-height.message` | `--component-input-line-height-message` | `text-input-message` |
| `component.input.font-weight` | `--component-input-font-weight` | `text-input` |
| `component.input.font-weight.label` | `--component-input-font-weight-label` | `text-input-label` |

## Componente: card

| Token | Variable CSS | Clase de Tailwind |
| --- | --- | --- |
| `component.card.background.neutral` | `--component-card-background-neutral` | `bg-card-background-neutral` |
| `component.card.background.neutral.subtle` | `--component-card-background-neutral-subtle` | `bg-card-background-neutral-subtle` |
| `component.card.background.brand.subtle` | `--component-card-background-brand-subtle` | `bg-card-background-brand-subtle` |
| `component.card.text.neutral` | `--component-card-text-neutral` | `text-card-text-neutral` |
| `component.card.text.neutral.subtle` | `--component-card-text-neutral-subtle` | `text-card-text-neutral-subtle` |
| `component.card.icon.brand` | `--component-card-icon-brand` | `text-card-icon-brand` |
| `component.card.border.neutral` | `--component-card-border-neutral` | `border-card-border-neutral` |
| `component.card.border-width` | `--component-card-border-width` | `border-card-border-width` |
| `component.card.elevation` | `--component-card-elevation` | `shadow-card-elevation` |
| `component.card.radius` | `--component-card-radius` | `rounded-card-radius` |
| `component.card.radius.icon` | `--component-card-radius-icon` | `rounded-card-radius-icon` |
| `component.card.padding` | `--component-card-padding` | `p-card-padding` |
| `component.card.padding.sm` | `--component-card-padding-sm` | `p-card-padding-sm` |
| `component.card.padding.lg` | `--component-card-padding-lg` | `p-card-padding-lg` |
| `component.card.padding.footer` | `--component-card-padding-footer` | `pt-card-padding-footer` |
| `component.card.gap` | `--component-card-gap` | `gap-card-gap` |
| `component.card.gap.sm` | `--component-card-gap-sm` | `gap-card-gap-sm` |
| `component.card.gap.lg` | `--component-card-gap-lg` | `gap-card-gap-lg` |
| `component.card.gap.header` | `--component-card-gap-header` | `gap-card-gap-header` |
| `component.card.gap.footer` | `--component-card-gap-footer` | `gap-card-gap-footer` |
| `component.card.font-size.title` | `--component-card-font-size-title` | `text-card-title` |
| `component.card.font-size` | `--component-card-font-size` | `text-card` |
| `component.card.line-height.title` | `--component-card-line-height-title` | `text-card-title` |
| `component.card.line-height` | `--component-card-line-height` | `text-card` |
| `component.card.font-weight.title` | `--component-card-font-weight-title` | `text-card-title` |
| `component.card.font-weight` | `--component-card-font-weight` | `text-card` |

## Componente: badge

| Token | Variable CSS | Clase de Tailwind |
| --- | --- | --- |
| `component.badge.background.neutral.subtle` | `--component-badge-background-neutral-subtle` | `bg-badge-background-neutral-subtle` |
| `component.badge.background.info.subtle` | `--component-badge-background-info-subtle` | `bg-badge-background-info-subtle` |
| `component.badge.background.success.subtle` | `--component-badge-background-success-subtle` | `bg-badge-background-success-subtle` |
| `component.badge.background.warning.subtle` | `--component-badge-background-warning-subtle` | `bg-badge-background-warning-subtle` |
| `component.badge.background.error.subtle` | `--component-badge-background-error-subtle` | `bg-badge-background-error-subtle` |
| `component.badge.text.neutral` | `--component-badge-text-neutral` | `text-badge-text-neutral` |
| `component.badge.text.info` | `--component-badge-text-info` | `text-badge-text-info` |
| `component.badge.text.success` | `--component-badge-text-success` | `text-badge-text-success` |
| `component.badge.text.warning` | `--component-badge-text-warning` | `text-badge-text-warning` |
| `component.badge.text.error` | `--component-badge-text-error` | `text-badge-text-error` |
| `component.badge.icon.neutral.subtle` | `--component-badge-icon-neutral-subtle` | `text-badge-icon-neutral-subtle` |
| `component.badge.icon.info` | `--component-badge-icon-info` | `text-badge-icon-info` |
| `component.badge.icon.success` | `--component-badge-icon-success` | `text-badge-icon-success` |
| `component.badge.icon.warning` | `--component-badge-icon-warning` | `text-badge-icon-warning` |
| `component.badge.icon.error` | `--component-badge-icon-error` | `text-badge-icon-error` |
| `component.badge.border.neutral` | `--component-badge-border-neutral` | `border-badge-border-neutral` |
| `component.badge.border.info` | `--component-badge-border-info` | `border-badge-border-info` |
| `component.badge.border.success` | `--component-badge-border-success` | `border-badge-border-success` |
| `component.badge.border.warning` | `--component-badge-border-warning` | `border-badge-border-warning` |
| `component.badge.border.error` | `--component-badge-border-error` | `border-badge-border-error` |
| `component.badge.border-width` | `--component-badge-border-width` | `border-badge-border-width` |
| `component.badge.radius` | `--component-badge-radius` | `rounded-badge-radius` |
| `component.badge.padding-x` | `--component-badge-padding-x` | `px-badge-padding-x` |
| `component.badge.padding-x.sm` | `--component-badge-padding-x-sm` | `px-badge-padding-x-sm` |
| `component.badge.gap` | `--component-badge-gap` | `gap-badge-gap` |
| `component.badge.font-size` | `--component-badge-font-size` | `text-badge` |
| `component.badge.font-size.sm` | `--component-badge-font-size-sm` | `text-badge-sm` |
| `component.badge.line-height` | `--component-badge-line-height` | `text-badge` |
| `component.badge.line-height.sm` | `--component-badge-line-height-sm` | `text-badge-sm` |
| `component.badge.font-weight` | `--component-badge-font-weight` | `text-badge` |
