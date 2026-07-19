import { Application, Sprite, Texture } from 'pixi.js'
import { COLORS } from './constants'
import { initDevtools } from '@pixi/devtools'

let app: Application
let boxSprite: Sprite

export async function initPixi(div: HTMLDivElement) {
	app = new Application()
	await app.init({
		background: COLORS.TAN,
		resizeTo: window,
		antialias: true,
		autoDensity: true,
	})

	div.appendChild(app.canvas)

	boxSprite = new Sprite(Texture.WHITE)
	boxSprite.width = 64
	boxSprite.height = 64
	boxSprite.anchor = 0.5
	boxSprite.tint = COLORS.GREEN

	app.stage.addChild(boxSprite)

	app.ticker.add((time) => {
		boxSprite.rotation += 0.01 * time.deltaTime
	})

	resizePixi()
	initDevtools({ app })
}

export function resizePixi() {
	boxSprite.position.set(app.renderer.width / 2, app.renderer.height / 2)
	app.renderer.resolution = window.devicePixelRatio
}

export function pixiIsReady() {
	return !!app
}

export function destroyPixi() {
	app?.destroy(true)
}
