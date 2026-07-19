import { Application } from 'pixi.js'
import { COLORS } from './constants'
import { initDevtools } from '@pixi/devtools'

let app: Application

export async function initPixi(div: HTMLDivElement) {
	app = new Application()
	await app.init({
		background: COLORS.TAN,
		resizeTo: window,
		antialias: true,
		autoDensity: true,
	})

	div.appendChild(app.canvas)

	resizePixi()
	initDevtools({ app })
}

export const getPixiApp = () => app

export function resizePixi() {
	app.renderer.resolution = window.devicePixelRatio
}

export function destroyPixi() {
	try {
		app?.destroy(true)
	} catch (_) {}
}
