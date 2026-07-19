// a hub is a self-contained node on the screen
// handles all the sprites and logic of the objects simulated within it

import { Container, Sprite, Texture } from 'pixi.js'
import { createTurret, renderTurret, updateTurret, type Turret } from './turret'
import { randomInt } from './random'
import { COLORS } from './constants'

const MAX_ENEMIES = 5

type Hub = {
	turrets: Turret[]
	enemies: number
	enemySprites: Sprite[]
	enemySpawn: number
	container: Container
}

export function createHub() {
	const container = new Container()
	const hub: Hub = {
		turrets: [],
		enemies: 0,
		enemySprites: [],
		enemySpawn: randomInt(100, 250),
		container,
	}
	addTurret(hub)

	for (let i = 0; i < MAX_ENEMIES; i++) {
		const enemySprite = new Sprite(Texture.WHITE)
		enemySprite.tint = COLORS.MAROON
		enemySprite.rotation = Math.PI / 4
		enemySprite.width = 16
		enemySprite.height = 16
		enemySprite.anchor = 0.5
		enemySprite.x = i * 32
		enemySprite.y = -64
		hub.enemySprites.push(enemySprite)
		container.addChild(enemySprite)
	}

	return hub
}

function addTurret(hub: Hub) {
	const turret = createTurret()
	hub.turrets.push(turret)
	hub.container.addChild(turret.container)
}

export function updateHub(hub: Hub) {
	hub.enemySpawn--
	if (hub.enemySpawn <= 0 && hub.enemies < MAX_ENEMIES) {
		hub.enemies++
		hub.enemySpawn = randomInt(20, 120)
	}
	for (const turret of hub.turrets) {
		const turretFired = updateTurret(turret, hub.enemies)
		if (turretFired) hub.enemies--
	}
}

export function renderHub(hub: Hub) {
	for (const turret of hub.turrets) {
		renderTurret(turret)
	}
	for (let i = 0; i < hub.enemySprites.length; i++) {
		hub.enemySprites[i].visible = i < hub.enemies
	}
}
