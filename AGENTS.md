# AGENTS.md

Manual de trabajo para este repositorio. Léelo antes de cada tarea.

## Qué es

Este repositorio es **DSHealth**, mi design system para **Health**, una app de salud.

En Health, cada persona entra en su portal y ve sus recetas y medicación, sus análisis y chequeos del año y sus citas. También puede grabar sus consultas y tomar notas, hablar con un agente de IA sobre cómo se siente y ponerse objetivos de revisiones anuales, todo con un panel de datos y métricas.

DSHealth reúne las piezas con las que se construye la interfaz de Health: fundamentos visuales (colores, tipografía, espaciados), componentes base y componentes propios de salud. Más contexto en el [README](README.md).

## Tecnología

- **React con TypeScript**, usando **Vite** para desarrollar y compilar.
- **Tailwind** para los estilos.
- **Tabler Icons** para los iconos.
- **Ninguna librería de componentes:** los componentes los creamos desde cero. No añadas librerías como MUI, Chakra, shadcn/ui, Radix, Headless UI o similares.

## Cómo trabajamos

- **En español:** conversaciones, explicaciones, commits y PR.
- **Siempre en una rama con PR:** nunca se trabaja directamente en `main`. Cada cambio va en su propia rama y se propone mediante una pull request.
- **Explica los cambios sin jerga:** di qué has cambiado y por qué con palabras sencillas, para que cualquiera lo entienda aunque no programe.
- **Si cambias `package.json`, actualiza `package-lock.json` en la misma PR**, para que los dos archivos vayan siempre a la par.

## Decisiones

Las decisiones del design system viven en `docs/adr/`, una por archivo. Cada una es un ADR (*Architecture Decision Record*, registro de decisión).

- **Léelas antes de proponer cualquier cambio** que afecte al alcance de DSHealth o a sus principios.
- **Nunca las contradigas sin escribir un ADR nuevo.** Si un cambio va en contra de una decisión, primero se escribe un ADR que la sustituya y se explica por qué. Después se hace el cambio.
- **Cada ADR nuevo se apunta en la lista de abajo en la misma PR** en la que se crea.

| ADR | Qué decide |
| --- | --- |
| [ADR-001 · Alcance y principios](docs/adr/001-alcance.md) | Qué entra y qué queda fuera de DSHealth, los cinco principios que debe cumplir todo cambio y la lista de comprobación de cada PR. |
