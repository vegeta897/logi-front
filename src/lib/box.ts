import { Sprite, Texture } from 'pixi.js'
import { COLORS } from './constants'

export function createBox() {
	const box = {
		rotation: 0,
		sprite: new Sprite(Texture.WHITE),
		updateLogic() {
			box.rotation += 0.02
		},
		updateSprite() {
			box.sprite.rotation = box.rotation
		},
	}

	box.sprite.width = 128
	box.sprite.height = 128
	box.sprite.anchor = 0.5
	box.sprite.tint = COLORS.GREEN

	return box
}
