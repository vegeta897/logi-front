import { Container, Sprite, Texture } from 'pixi.js'
import { COLORS } from './constants'

const SIZE = 64
const RELOAD = 60

export type Turret = {
	ammo: number
	reload: number
	container: Container
	baseSprite: Sprite
	reloadSprite: Sprite
}

export function createTurret() {
	const container = new Container()
	const baseSprite = new Sprite(Texture.WHITE)
	const reloadSprite = new Sprite(Texture.WHITE)

	const turret: Turret = {
		ammo: 50,
		reload: 0,
		container,
		baseSprite,
		reloadSprite,
	}
	container.addChild(baseSprite)

	baseSprite.width = SIZE
	baseSprite.height = SIZE
	baseSprite.anchor = 0.5
	baseSprite.tint = COLORS.BLUE

	reloadSprite.width = SIZE
	reloadSprite.height = 8
	reloadSprite.anchor = 0.5
	reloadSprite.y = SIZE / 2 - 4
	reloadSprite.tint = COLORS.RED

	container.addChild(reloadSprite)

	return turret
}

export function updateTurret(turret: Turret, enemies: number) {
	if (turret.reload > 0) turret.reload--
	let fired = false
	if (turret.reload <= 0 && enemies > 0) {
		// Fire!
		fired = true
		turret.reload = RELOAD
	}
	return fired
}

export function renderTurret(turret: Turret) {
	turret.reloadSprite.width = (SIZE * (RELOAD - turret.reload)) / RELOAD
}
