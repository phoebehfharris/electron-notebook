<script>
	import { onMount } from 'svelte';
	import Icon from "svelte-awesome";
	import { timesCircle } from 'svelte-awesome/icons';
	export let note;
	export let saveHandler = () => {};
	export let closeHandler = () => {};
	let timeout = null;
	const inputHandler = (event, input) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			console.log(input.value);
			saveHandler({name: nameInput.value, content: contentInput.value, id: note.id});
		}, 2000)
	};
	let nameInput, contentInput
	onMount(() => {
		console.log("loaded")
		nameInput = document.getElementById("name");
		contentInput = document.getElementById("content");
		nameInput.addEventListener("keyup", (event) => {inputHandler(event, nameInput)})
		contentInput.addEventListener("keyup", (event) => {console.log("listener fired"); inputHandler(event, contentInput)})
	})
</script>
<div class="cover">
	<main>
	<div>
	<input type="text" id="name" value={note.name}>
	<div on:click={closeHandler} class="close">
		<Icon data={timesCircle} scale="3"/>
	</div>
	</div>
	<hr>
	<div class="textwrapper">
		<textarea id="content">{note.content}</textarea>
	</div>
</main>
</div>
<style>
	.cover {
		background-color: rgba(255, 255, 255, 0.5);
		position: fixed;
		inset: 0px;
	}
	main {
		background-color: white;
		color: black;
		position: absolute;
		inset: 40px;
		border: 2px solid #620004;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
	}
	textarea {
		resize: none;
		width: 100%;
		height: 100%;
	}
	input {
		width: 80%;
		height: 50px;
	}
	.textwrapper {
		height: 100%;
		width: 100%;
	}
	.close {
		position: absolute;
		height: fit-content;
		width: fit-content;
		top: 5px;
		right: 5px;

	}
</style>
