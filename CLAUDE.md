# Proyecto Código Cero - Guía para Claude

## 🏢 Información de la Empresa

**Prevengo Tech** - Emergencias Sanitarias

### Visión
"Salvando vidas, formando y anticipando"

### Misión
- Formar
- Anticipar
- Salvar

### Valores
- Profesionalidad
- Innovación
- Calidad humana

---

## 📋 Resumen del Proyecto

**Código Cero** - Plataforma de entrenamiento en emergencias sanitarias.

Aplicación web de entrenamiento gamificado en primeros auxilios, construida con:
- **SvelteKit** con Svelte 5 (runes mode)
- **TypeScript**
- **TailwindCSS** con diseño system profesional
- **Adapter static** (para despliegue estático)
- **PWA** (instalable como app)

### Problema que resuelve
- Muerte súbita: 20-140 casos por 100,000 habitantes/año
- Supervivencia RCP en España: solo 5-10%
- Formación actual: costosa, presencial, teórica, aburrida

### Solución Código Cero
- Económica (gratuita o low-cost)
- Accesible (cualquier lugar, momento)
- Eficaz (práctica, realista, basada en decisiones)
- Formativa (feedback inmediato, progresión gamificada)

---

## 🎯 Público Objetivo

1. **Población general** - Ciudadanos que quieren aprender primeros auxilios
2. **Empresas** - Formación obligatoria para empleados
3. **Colectivos de riesgo** - Personal sanitario, bomberos, policías
4. **Administraciones públicas** - Protección civil, emergencias

---

## 📱 Características del Producto

### Funcionalidades Core
- ✅ Escenarios interactivos de emergencia
- ✅ Toma de decisiones con límite de tiempo
- ✅ Sistema de puntos y rangos gamificado
- ✅ Insignias y logros desbloqueables
- ✅ Feedback inmediato tras cada decisión
- ✅ Distracciones simuladas (notificaciones, llamadas)
- ✅ Pista con coste de puntos
- ✅ Niveles de dificultad progresivos
- ✅ Juego "Encuentra los Errores" - Búsqueda visual de peligros

### Situaciones implementadas
- ✅ **Parada Cardíaca** - 4 escenarios consecutivos
- ✅ **Incendio Doméstico** - 4 escenarios con ramificaciones
- ✅ **Encuentra los Errores** - Vigilancia Playa (5 errores, 45s)
- 🚧 **Atragantamiento** - Pendiente
- 🚧 **Hemorragias** - Pendiente
- 🚧 **Ahogamiento** - Pendiente
- 🚧 **Convulsiones** - Pendiente

---

## 💰 Modelo de Negocio

### Fuentes de ingresos
1. **Freemium** - Contenido básico gratis, contenido premium de pago
2. **Suscripción Premium** - €4.99/mes para empresas y profesionales
3. **Certificados Oficiales** - €10-€50 por certificación
4. **B2B** - Programas empresariales personalizados
5. **Publicidad segmentada** - Servicios de emergencia
6. **Datos agregados** (anónimos) - Estadísticas de formación

### Inversión solicitada
- **Total**: €40,000
- **Desarrollo**: 45% (€18,000)
- **Marketing**: 30% (€12,000)
- **Operaciones**: 10% (€4,000)
- **Reservas**: 10% (€4,000)
- **Certificaciones**: 5% (€2,000)

---

## 🛣️ Roadmap de Desarrollo

### Fase 1: MVP (Actual) ✅
- [x] Desarrollo de plataforma (SvelteKit)
- [x] Escenarios básicos funcionales
- [x] Sistema de gamificación
- [x] PWA funcional
- [x] Despliegue en GitHub Pages

### Fase 2: Beta Testing
- [ ] Prueba con usuarios reales
- [ ] Feedback y mejoras
- [ ] Optimización de flujos

### Fase 3: Lanzamiento
- [ ] Publicación en stores (App Store, Google Play)
- [ ] Campaña de marketing inicial
- [ ] Expansión de contenido (más escenarios)

### Fase 4: Funciones Sociales
- [ ] Ranking global online
- [ ] Multijugador cooperativo
- [ ] Retos entre amigos
- [ ] Comunidad y foro

### Fase 5: Programa Empresas
- [ ] Panel de administración para empresas
- [ ] Seguimiento de progreso de empleados
- [ ] Certificados automáticos
- [ ] API para integración con otras plataformas

### Fase 6: Certificaciones Oficiales
- [ ] Acreditación de contenidos con autoridades
- [ ] Certificados válados legalmente
- [ ] Integración con sistemas de formación homologados

### Fase 7: Tecnologías Avanzadas
- [ ] Integración con wearables (Apple Watch, Fitbit)
- [ ] Sensores para práctica de RCP (acelerómetros)
- [ ] Realidad Aumentada para localizar AEDs
- [ ] IA para generar escenarios personalizados

### Fase 8: Expansión Internacional
- [ ] Localización a otros idiomas
- [ ] Adaptación cultural de escenarios
- [ ] Partners internacionales

---

## 🎨 Diseño Visual (Actualizado 2026)

### Design System
- **Tipografía**: Inter (Google Fonts)
- **Colores principales**:
  - Primary Red: #DC2626
  - Primary Blue: #1E40AF
  - Accent Gold: #F59E0B
- **Glassmorphism**: Efectos blur con transparencia
- **Sombras**: Sistema de sombras de 5 niveles
- **Border Radius**: 8px system (múltiplos de 4px)
- **Animaciones**: Fade-in, Scale-in, Slide-up con stagger

### Componentes UI
- Cards elevados con hover effects
- Botones con gradientes y micro-interacciones
- Progress bars animadas
- Badges con gradientes
- Icon boxes con sombras sutiles

## 🏗️ Estructura del Proyecto

```
E:/Emergencias/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Game.svelte          # Componente principal del juego
│   │   │   └── Distractions.svelte  # Sistema de distracciones
│   │   ├── stores/
│   │   │   ├── game.ts             # Estado del juego
│   │   │   └── distractions.ts      # Estado de distracciones
│   │   ├── types/
│   │   │   ├── game.ts             # Tipos del juego
│   │   │   └── distractions.ts      # Tipos de distracciones
│   │   ├── data/
│   │   │   ├── situations.ts       # Situaciones del juego
│   │   │   ├── fire-situations.ts  # Situaciones de incendio
│   │   │   ├── find-errors.ts      # Datos del juego "Encuentra los Errores"
│   │   │   └── distractions.ts     # Pool de distracciones
│   │   ├── app.css                 # Estilos globales
│   │   └── index.ts
│   └── routes/
│       ├── +layout.svelte          # Layout principal
│       ├── +page.svelte            # Página de inicio (dashboard)
│       ├── ajustes/
│       │   └── +page.svelte        # Página de ajustes
│       ├── encuentra-errores/
│       │   └── +page.svelte        # Juego "Encuentra los Errores"
│       └── juego/
│           └── [id]/
│               ├── +layout.svelte  # Layout del juego
│               └── +page.svelte    # Página de juego dinámica
├── static/
│   ├── images/
│   │   └── scenarios/              # Imágenes de las situaciones
│   └── logo/
│       └── logo.png               # Logo principal de la app
```

## ⚠️ REGLA DE ORO

**NO TOCAR NADA QUE YA FUNCIONE.**

Si un componente, página o funcionalidad está trabajando correctamente, NO se debe:
- Refactorizar "por limpieza"
- Cambiar la estructura "para que sea más consistente"
- Mover archivos de lugar
- Reescribir usando diferentes patrones

**Solo se debe modificar código cuando:**
1. Hay un bug reportado y confirmado
2. Se solicita explícitamente una nueva funcionalidad
3. El código está roto (no compila o no funciona)

## 🔧 Problemas Conocidos y Soluciones

### Incompatibilidad Stores Svelte vs Runes Svelte 5

El proyecto usa **stores antiguos de Svelte** (`writable`) con **runes de Svelte 5** (`$state`, `$derived`). Esta combinación tiene problemas de inferencia de tipos.

**Solución implementada:**
- Usar `any` para estados que vienen de stores
- Suscribirse manualmente con `.subscribe()` y actualizar `$state`

**NO cambiar a**:
- `$derived(get(store))` - NO funciona
- `$store` directamente - NO funciona con runes

Ejemplo correcto:
```typescript
let distraction: any = $state(null);

distractionStore.subscribe((state: any) => {
    distraction = state.current;
});
```

### Componente Distractions Global

El componente `Distractions.svelte` está en `+layout.svelte` para funcionar globalmente. **NO moverlo a otros componentes.**

## 📁 Archivos Críticos

### stores/game.ts
- Maneja todo el estado del juego
- Persistencia en localStorage
- NO modificar sin entender completamente el flujo
- **Métodos clave**: `makeDecision()`, `useTip()`, `startGame()`, `updateGameState()`

### Sistema de Puntuación
- **Respuesta correcta**: +100 puntos
- **Bonus rapidez (<10s)**: +50 puntos adicionales
- **Uso de pista**: -10 puntos (se descuenta automáticamente)
- **Pistas solo disponibles** cuando el jugador tiene puntos (> 0)

### Juego "Encuentra los Errores"
- **Ruta**: `/encuentra-errores`
- **Archivo**: `routes/encuentra-errores/+page.svelte`
- **Datos**: `lib/data/find-errors.ts`
- **Tipos**: `FindErrorsGame`, `FindErrorsError` en `types/game.ts`
- **Mecánica**: Usuario toca zonas en la imagen para encontrar errores
- **Puntuación**: 50 pts por error + 100 pts bonus si termina en <30s
- **Coordenadas**: Porcentaje desde izquierda (x) y arriba (y), radio en porcentaje
- **Imágenes**: Original y con solución (círculos rojos)

### stores/distractions.ts
- Maneja las distracciones (notificaciones, llamadas, modales)
- NO modificar lógica de timers

### components/Game.svelte
- Componente principal del juego
- Usa suscripciones manuales a stores
- NO cambiar la lógica de suscripciones

### components/Distractions.svelte
- Sistema de visualización de distracciones
- Funciona con props `distraction`, `onDismiss`, `timeRemaining`

### routes/+layout.svelte
- Layout principal
- Inicializa el componente Distractions global
- **NO eliminar** la suscripción a `distractionStore`

### routes/ajustes/+page.svelte
- Página de configuración
- Usa `bind:checked` para checkboxes
- Tiene botones para probar distracciones

### routes/juego/[id]/+page.svelte
- Carga situaciones dinámicamente por URL
- Inicializa el juego con `gameStore.startGame()`

## 🎯 Flujo del Juego

1. Usuario entra a la página principal (`+page.svelte`)
2. Selecciona una situación → navega a `/juego/{id}`
3. `juego/[id]/+page.svelte`:
   - Busca la situación en `situationsMap`
   - Llama a `gameStore.startGame(situation)`
   - Renderiza `Game.svelte`
4. `Game.svelte`:
   - Se suscribe a `gameStore` para obtener situación actual
   - Muestra opciones, timer, vidas
   - Procesa decisiones con `gameStore.makeDecision()`
5. Al completar:
   - Victoria → `gameStore.updateGameState('victory')`
   - Derrota → `gameStore.updateGameState('gameover')`

## 🐛 Bugs ya resueltos

1. **Bloque sin cerrar en Distractions.svelte** - Agregado `{/if}` de cierre
2. **`currentState()` no existe** - Cambiado a suscripción manual
3. **`set()` vs `update()` en stores** - Usar `update()` para mutaciones
4. **Tipos duplicados en types/game.ts** - Eliminadas líneas 137-145
5. **Carácter extra `t` en ajustes/+page.svelte** - Eliminado
6. **Referencia circular en distractions.ts** - Movido `handleTimeout` dentro de `createDistractionStore()`
7. **Tipos implícitos en game.ts** - Agregados tipos `Badge` a parámetros de `.map()`
8. **Situaciones terminan en primera pregunta** - Arreglado flujo de `nextSituation` en `continueAfterFeedback()`
9. **Imágenes no visibles** - Agregado tag `<img>` con `base` path en Game.svelte
10. **GitHub Pages routing 404** - Configurado base path `/emergencias` y creado 404.html
11. **Enlaces rotos en GitHub Pages** - Importado `{ base }` de `$app/paths` en todos los archivos con enlaces
12. **`nextSituationId` vs `nextSituation`** - El store devolvía `nextSituation` pero el componente usaba `nextSituationId`
13. **Opciones en orden fijo** - Agregada función `shuffle()` para aleatorizar opciones en cada pregunta
14. **`hearts <= 0` siempre falso** - Eliminada la condición incorrecta, ahora solo se usa `feedbackData?.gameOver`
15. **Mensaje falso de "+X puntos" en distracciones** - Eliminado, los puntos nunca se sumaban
16. **Pistas no descontaban puntos** - Implementado `gameStore.useTip(cost)` que descuenta puntos realmente
17. **Forzar actualización de situación** - Después de `gameStore.update()` se asigna directamente a `currentSituation`
18. **Favicon 404** - Agregado link a favicon.png en layout
19. **Caracteres sueltas "t"** - Corregidos en múltiples archivos
20. **Logo path incorrecto** - Corregido a /images/logo/logo.png
21. **Footer texto desactualizado** - Cambiado a "Entrenamiento en emergencias"

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Verificar tipos
npx svelte-check

# Previsualizar build
npm run preview
```

## 📝 Notas de Desarrollo

- El proyecto usa `adapter-static` - genera archivos estáticos en `build/`
- Las rutas son del servidor de desarrollo (`http://localhost:5173`)
- Los cambios en archivos `.svelte` requieren recarga del navegador (HMR funciona pero a veces requiere refresh completo)
- Los stores guardan en `localStorage` con clave `emergencias-game`

## 🎨 Estilos

- TailwindCSS configurado y funcionando
- Clases personalizadas en `app.css`
- Animaciones definidas en componentes `<style>`
- **Colores principales**: Gradiente `from-red-600 via-red-500 to-blue-600` (emergencias)
- **Logo**: `/logo/logo.png` con fondo transparente (predominio azul)

## 🔐 Variables de Entorno

No se usan variables de entorno en este proyecto.

## 📦 Dependencias Clave

- `svelte` - Framework UI
- `@sveltejs/kit` - Framework full-stack
- `svelte-store` - Manejo de estado (no confundir con stores del proyecto)
- `tailwindcss` - Estilos
- `lucide-svelte` - Iconos
- `vite-plugin-pwa` - Funcionalidad PWA

## ⚡ Sintaxis Svelte 5 Runes

- `$state(...)` - Estado reactivo local
- `$derived(...)` - Valores derivados (NO usar con `get()`)
- `$effect(...)` - Efectos secundarios
- `$props()` - Props del componente
- `{@render children?.()}` - Renderizar slots

## 🚫 NO HACER

1. NO cambiar stores de `writable` a runes (rompe la persistencia)
2. NO mover el componente Distractions del layout
3. NO refactorizar "para mejorar" código que funciona
4. NO usar `$derived(get(store))` - no funciona correctamente
5. NO eliminar la suscripción manual en layout y Game

## ✅ CHECKLIST antes de hacer cambios

- [ ] El cambio es necesario (bug o nueva funcionalidad)
- [ ] Entiendo cómo funciona el código actual
- [ ] He probado que mi cambio no rompe nada existente
- [ ] He ejecutado `npx svelte-check` sin errores
- [ ] He ejecutado `npm run build` exitosamente

---


**Última actualización:** 6 de abril de 2026 (juego Encuentra los Errores)
**Versión:** 2.0
**Nombre:** Código Cero
**Empresa:** Prevengo Tech
**Estado:** Desplegado en GitHub Pages ✅
**Repositorio:** https://github.com/vtornet/emergencias
**URL Producción:** https://vtornet.github.io/emergencias/

## 📝 Cambios recientes (6 abril 2026)

### Rediseño visual profesional:
- **Sistema de diseño** con variables CSS
- **Tipografía Inter** de Google Fonts
- **Glassmorphism** y efectos profesionales
- **Animaciones** con stagger y micro-interacciones
- **Hero section** rediseñado con stats cards
- **Footer profesional** con 3 secciones
- **Sistema de colores** refinado con palette completa
- **Cards elevados** con hover effects
- **Wave SVG** como divisor entre secciones

### Correcciones implementadas:
- Fix favicon 404 - agregado link en layout
- Eliminados caracteres "t" sueltas
- Logo path corregido a /images/logo/logo.png

### Información del proyecto añadida:
- Documentación completa de Prevengo Tech (visión, misión, valores)
- Público objetivo detallado
- Modelo de negocio documentado
- Roadmap de desarrollo actualizado (8 fases)
- Inversión y uso de fondos especificado
- **Colores actualizados**: Gradiente rojo/azul de emergencias
- **Sistema de pistas**: Descuento de puntos con confirmación visual
- **Opciones aleatorizadas**: Cambian de orden en cada partida
- **Juego "Encuentra los Errores"**: Nueva modalidad de búsqueda visual de peligros
  - Escenario "Vigilancia Playa" con 5 errores identificables
  - Sistema de coordenadas para detección de toques en imagen
  - Timer de 45 segundos con bonus por rapidez
  - Feedback detallado con consecuencias de cada error
  - Pantalla de resultados con aprendizaje

### Imágenes:
- Formatos: PNG para situaciones principales, SVG para situaciones "wrong" y gameover
- Dimensiones: 800x600px (4:3)
- Ubicación: `static/images/scenarios/`
- Logo: `static/logo/logo.png`
