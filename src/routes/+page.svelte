<script lang="ts">
	import { COLORS } from '$lib/constants'
	import { Application, Sprite, Texture } from 'pixi.js'
	import { onMount } from 'svelte'

	let mainDiv: HTMLDivElement
	let boxSprite: Sprite
	let app: Application

	onMount(async () => {
		app = new Application()
		await app.init({ background: COLORS.TAN, resizeTo: window, antialias: true })
		mainDiv.appendChild(app.canvas)

		boxSprite = new Sprite(Texture.WHITE)
		boxSprite.width = 64
		boxSprite.height = 64
		boxSprite.anchor = 0.5
		boxSprite.tint = COLORS.GREEN

		app.stage.addChild(boxSprite)

		onResize()

		app.ticker.add((time) => {
			boxSprite.rotation += 0.01 * time.deltaTime
		})
	})

	function onResize() {
		boxSprite.position.set(app.canvas.width / 2, app.canvas.height / 2)
	}
</script>

<svelte:window onresize={onResize} />
<div bind:this={mainDiv}></div>
