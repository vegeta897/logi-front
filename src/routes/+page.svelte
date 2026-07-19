<script lang="ts">
	import { onMount } from 'svelte'
	import { initPixi, resizePixi, getPixiApp, destroyPixi } from '$lib/pixi'
	import { initLoop } from '$lib/game'

	let mainDiv: HTMLDivElement

	onMount(() => {
		initPixi(mainDiv).then(() => {
			initLoop()
		})
		return destroyPixi
	})

	function onResize() {
		if (getPixiApp()) resizePixi()
	}
</script>

<svelte:window onresize={onResize} />
<div bind:this={mainDiv}></div>
