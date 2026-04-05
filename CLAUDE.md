# Proyecto Emergencias - Guía para Claude

## 📋 Resumen del Proyecto

Aplicación web de entrenamiento gamificado en primeros auxilios, construida con:
- **SvelteKit** con Svelte 5 (runes mode)
- **TypeScript**
- **TailwindCSS**
- **Adapter static** (para despliegue estático)
- **PWA** (instalable como app)

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
│   │   │   └── distractions.ts      # Pool de distracciones
│   │   ├── app.css                 # Estilos globales
│   │   └── index.ts
│   └── routes/
│       ├── +layout.svelte          # Layout principal
│       ├── +page.svelte            # Página de inicio
│       ├── ajustes/
│       │   └── +page.svelte        # Página de ajustes
│       └── juego/
│           └── [id]/
│               ├── +layout.svelte  # Layout del juego
│               └── +page.svelte    # Página de juego dinámica
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

## 🎯 Roadmap a Versión de Producción

### Fase 1: Funcionalidad Core ✅
- [x] Build sin errores
- [x] Página principal funcional
- [x] Sistema de juego básico funcionando
- [x] Sistema de distracciones implementado
- [x] Página de ajustes funcional

### Fase 2: Corrección de Bugs ✅
- [x] Verificar que las pruebas de distracciones en ajustes funcionan
- [x] Verificar que las situaciones del juego cargan correctamente
- [x] Verificar que el flujo completo del juego funciona (inicio → juego → victoria/derrota)
- [x] Verificar persistencia de datos (localStorage)
- [x] Verificar navegación entre páginas

### Fase 3: Contenido
- [x] Agregar situación de "Incendio Doméstico" 🔥
- [x] Revisar y mejorar textos de la situación "Parada Cardíaca"
- [ ] Agregar más situaciones de emergencia (ahogamiento, hemorragias, etc.)
- [x] Verificar que todos los feedbacks de decisiones son claros
- [x] Agregar imágenes/íconos para cada situación

### Fase 4: Experiencia de Usuario
- [ ] Mejorar animaciones y transiciones
- [ ] Agregar sonidos (opcional)
- [ ] Mejorar responsive en móviles pequeños
- [ ] Agregar indicadores de progreso visuales
- [ ] Mejorar accesibilidad (warnings de svelte-check)

### Fase 5: PWA
- [ ] Verificar instalación como app funciona
- [ ] Agregar iconos personalizados para la app
- [ ] Verificar funcionamiento offline
- [ ] Probar en dispositivos reales (iOS/Android)

### Fase 6: Testing
- [ ] Probar en diferentes navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Probar en dispositivos móviles reales
- [ ] Verificar que no hay memory leaks
- [ ] Verificar performance en dispositivos lentos

### Fase 7: Pre-producción
- [ ] Eliminar logs de console
- [ ] Minimizar código CSS no utilizado
- [ ] Optimizar imágenes
- [ ] Verificar SEO básico
- [ ] Agregar favicon

### Fase 8: Despliegue ✅
- [x] Elegir plataforma de hosting (GitHub Pages)
- [ ] Configurar dominio personalizado
- [ ] Configurar HTTPS
- [x] Verificar que el build de producción funciona
- [x] **PRODUCCIÓN** 🚀 (https://vtornet.github.io/emergencias/)

### Fase 9: Post-lanzamiento
- [ ] Monitorear errores (si se agrega sistema de logging)
- [ ] Recopilar feedback de usuarios
- [ ] Planificar mejoras futuras

---

**Última actualización:** 5 de abril de 2026
**Versión:** 1.1
**Estado:** Desplegado en GitHub Pages ✅
**Repositorio:** https://github.com/vtornet/emergencias
**URL Producción:** https://vtornet.github.io/emergencias/

## 📝 Cambios recientes (5 abril 2026)

### Correcciones implementadas:
- Fix flujo de situaciones secuenciales (cardiac-1 → cardiac-2 → ...)
- Agregado display de imágenes en el juego
- Mejorado visualización de corazones/intentos
- Configurado deploy automático con GitHub Actions

### Imágenes:
- Formatos: PNG para situaciones principales, SVG para situaciones "wrong" y gameover
- Dimensiones: 800x600px (4:3)
- Ubicación: `static/images/scenarios/`
