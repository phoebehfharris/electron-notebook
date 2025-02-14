<script>
	export let name;
	window.postMessage({
		myTypeField: "requestSave",
	});
	const openHandler = (card) => {currentNote = card;};
	const closeHandler = (data) => {sendHandler(data); currentNote = null;};
	const newHandler = () => {notes.push({name: "New Note", content: "", id: notes.length+1}); notes = notes; sendHandler();};
	import Card from "./Card.svelte";
	import Note from "./Note.svelte";
	function sendHandler() {
		window.postMessage({
			myTypeField: "saveData",
			data: notes
		});
	}
	function saveHandler(data) {
		notes[notes.findIndex((note) => note.id == data.id)] = data;
		sendHandler();
	}
	let notes = [
	]
window.addEventListener("message", event => {
	if (event.data.myTypeField === "data") {
		notes = event.data.data; 
	}
});
	
	let currentNote = null;
</script>

<main>
	{#if currentNote}
		<Note note={currentNote} saveHandler = {saveHandler} closeHandler = {closeHandler}/>
        {/if}
<div class="grid-container" id="grid">
	{#each notes as card}
	<div class="gridchild">
		<Card card={card} openHandler = {openHandler}/>
	</div>
	{/each}
</div>
<div class="new" on:click={newHandler}>
	New File
</div>
</main>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		background-color: #FFFFFF;
		grid-gap: 20px;
		padding-bottom: 75px;
	}
	.new {
		background-color: #620004;
		color: white;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: auto;
		text-align: center;
		vertical-align: middle;
		line-height: 25px;
	}
	.gridchild {
		min-width: 200px;
		
	}
</style>
