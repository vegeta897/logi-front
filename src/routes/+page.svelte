<script lang="ts">
	import { onMount } from 'svelte'
	import { initPixi, resizePixi, pixiIsReady, destroyPixi } from '$lib/pixi'

	let mainDiv: HTMLDivElement

	onMount(() => {
		initPixi(mainDiv)
		return destroyPixi
	})

	function onResize() {
		if (pixiIsReady()) resizePixi()
	}
</script>

<svelte:window onresize={onResize} />
<div bind:this={mainDiv}></div>
