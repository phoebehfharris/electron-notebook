<script>
	export let card;
	export let openHandler = () => {};
</script>

<main on:click={openHandler(card)}>
	<div class="title"><h3>{card.name}</h3></div>
	<div class="content">{card.content}</div>
</main>

<style>
	main {
		background-color: #620024;
		color: white;
		text-align: center;
	}
	title {
		padding: 40px;
		width: 100%;
	}
	content {
		padding: 30px;
		width: 100%;
	}
</style>
