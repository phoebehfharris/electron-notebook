<script>
	export let card;
	export let openHandler = () => {};
</script>

<main on:click={openHandler(card)}>
	<div class="title"><h3>{card.name}</h3></div>
	<div class="content">{@html card.content.replace(/\n/g, '<br/>')}</div>
</main>

<style>
	main {
		background-color: #620004;
		color: white;
		text-align: center;
		overflow-wrap: break-word;
	}
	.content {
		padding-bottom: 30px;
		
	}
</style>
