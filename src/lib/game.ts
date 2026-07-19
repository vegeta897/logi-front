import { TIMESTEP } from './constants'
import { getPixiApp } from './pixi'
import { createHub, renderHub, updateHub } from './hub'

let delta = 0

export function initLoop() {
	const pixiApp = getPixiApp()

	const hub = createHub()
	pixiApp.stage.addChild(hub.container)
	hub.container.position.set(pixiApp.renderer.width / 2, pixiApp.renderer.height / 2)

	pixiApp.ticker.add((time) => {
		let renderDelta = time.elapsedMS
		if (renderDelta > 250) renderDelta = 250 // Slow down if lagging too far
		delta += renderDelta
		while (delta >= TIMESTEP) {
			updateHub(hub)
			delta -= TIMESTEP
		}
		renderHub(hub)
	})
}
