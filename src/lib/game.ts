import { createBox } from './box'
import { TIMESTEP } from './constants'
import { getPixiApp } from './pixi'

let delta = 0

export function initLoop() {
	const pixiApp = getPixiApp()

	const box = createBox()
	pixiApp.stage.addChild(box.sprite)
	box.sprite.position.set(pixiApp.renderer.width / 2, pixiApp.renderer.height / 2)

	pixiApp.ticker.add((time) => {
		let renderDelta = time.elapsedMS
		if (renderDelta > 250) renderDelta = 250 // Slow down if lagging too far
		delta += renderDelta
		while (delta >= TIMESTEP) {
			box.updateLogic()
			delta -= TIMESTEP
		}
		box.updateSprite()
	})
}
