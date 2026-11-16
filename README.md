# DSHealth

**DSHealth** es el design system de **Health**, una app de salud personal.

> **Estado:** en fase inicial. Todavía no hay componentes publicados. Ver [Estado del proyecto](#estado-del-proyecto).

---

## Qué es Health

Health es un portal personal de salud. Cada persona entra en su portal y tiene en un solo lugar:

- **Recetas y medicación:** qué recetas tiene activas y qué medicación tiene que tomar, y cuándo.
- **Análisis y chequeos:** los análisis y revisiones que se ha hecho a lo largo del año.
- **Citas:** sus próximas citas médicas, por ejemplo con el dentista.
- **Consultas grabadas y notas:** puede grabar sus consultas y tomar notas para no olvidar lo que le dijeron.
- **Agente de IA:** puede hablar con un asistente sobre cómo se siente.
- **Objetivos anuales de revisiones:** puede marcarse objetivos de revisiones para el año (vista, dientes, medicina general…).
- **Panel de datos y métricas:** un panel para seguir todo lo anterior de un vistazo.

## Qué es DSHealth

DSHealth es el **design system** de Health: el conjunto de piezas compartidas con las que se construye la interfaz de la app. Incluye:

- **Fundamentos (tokens):** colores, tipografía, espaciados, radios, sombras y modo claro/oscuro.
- **Componentes:** botones, campos de formulario, tarjetas, listas, avisos, navegación, etc.
- **Patrones de salud:** piezas propias del dominio, como tarjeta de medicación, resultado de análisis, cita, nota de consulta, objetivo anual o gráfica de métricas.
- **Documentación:** cada componente se documenta y se prueba de forma aislada en Storybook.

El objetivo es que Health se vea y funcione igual en todas sus pantallas, y que el equipo construya más rápido sin rehacer lo mismo varias veces.

## Para quién es

- **Diseño:** para tener una única fuente de verdad sobre cómo se ve y se comporta cada elemento.
- **Desarrollo:** para usar componentes ya hechos, probados y accesibles al construir Health.
- **Producto y negocio:** para revisar los componentes en Storybook sin necesidad de abrir la app.

Y, al final, para **las personas que usan Health**: gente de todas las edades y niveles de experiencia con la tecnología, que necesita entender información de salud con claridad y sin estrés.

## Principios

- **Claridad ante todo:** la información de salud tiene que leerse y entenderse sin esfuerzo.
- **Accesible por defecto:** buen contraste, textos legibles, uso con teclado y lector de pantalla (objetivo: WCAG 2.2 AA).
- **Calma y confianza:** un tono visual tranquilo, sin alarmar innecesariamente.
- **Privacidad visible:** la interfaz deja claro qué datos se muestran, se graban o se comparten.
- **Coherencia:** las mismas piezas en todas las pantallas.

## Qué vamos a construir

1. **Fundamentos:** tokens de color, tipografía, espaciado y temas claro/oscuro.
2. **Componentes base:** botón, enlace, campos de formulario, tarjeta, lista, insignia, aviso, modal, pestañas y navegación.
3. **Componentes de salud:**
   - Medicación y recetas (tarjeta de medicamento, pauta de tomas, recordatorio)
   - Análisis y chequeos (resultado, valores de referencia, historial anual)
   - Citas (tarjeta de cita, calendario)
   - Consultas (grabadora, nota de consulta)
   - Agente de IA (interfaz de conversación)
   - Objetivos anuales (progreso por tipo de revisión: vista, dientes, medicina general)
4. **Visualización de datos:** gráficas y tarjetas de métricas para el panel.
5. **Documentación en Storybook:** cada componente con ejemplos, variantes y guía de uso.

## Tecnología

- [React](https://react.dev/): librería para construir los componentes
- [Vite](https://vite.dev/): entorno de desarrollo y compilación
- [Storybook](https://storybook.js.org/): catálogo y documentación de componentes

### Requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) LTS, **versión 22.12 o superior**

Comprueba lo que tienes instalado con:

```bash
git --version
node --version
```

## Estado del proyecto

🟡 **Fase inicial (preparación).**

- [x] Repositorio creado
- [x] README con la visión del proyecto
- [ ] Preparar el entorno (Git y Node.js)
- [ ] Crear el proyecto con React + Vite
- [ ] Añadir Storybook
- [ ] Definir los fundamentos (tokens)
- [ ] Primeros componentes base
- [ ] Primeros componentes de salud

Este README se irá actualizando a medida que avance el proyecto.
