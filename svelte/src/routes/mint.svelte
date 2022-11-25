<script lang='ts'>
	import { codingDojoContractWithWallet, myAddress } from '$lib/coding-dojo.store';
	import { makeFileObjects, storeFiles } from '$lib/web3.storage';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let name, description, imgPreview, fileInput;
	let infoText = '';
	let inputName, inputDescription;

	let loading = false;

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = e => {
			imgPreview = e.target.result;
		};
	};

	async function onSubmit() {
		if (isFormValid()) {
			toggleLoading();
			try {
				infoText = 'Loading - Storing files into ipfs';
				const imgCid = await storeFiles(fileInput.files);
				const files = makeFileObjects({
					name: name,
					description: description,
					image: `ipfs://${imgCid}`
				});
				const cid = await storeFiles(files);
				infoText = 'Sign transaction with your Metamask Plugin';
				await $codingDojoContractWithWallet.safeMint($myAddress, cid);
				dispatch('nftMinted');
				clearFields();
			} catch (e) {
				console.error(e);
			}
			toggleLoading();
		} else {
			infoText = 'Input not valid';
		}
	}

	function isFormValid() {
		return name && description && fileInput;
	}

	function toggleLoading() {
		loading = !loading;
	}

	function clearFields() {
		fileInput.value = '';
		inputName.value = '';
		inputDescription.value = '';
		imgPreview = null;
	}
</script>


<form class='max-w-sm bg-white rounded-lg shadow-xl my-1' on:submit|preventDefault={onSubmit}>
	<h2 class='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate m-3'>Create New Item</h2>
	<div class='flex items-center justify-center m-2'>
		<label
			class='avatar flex flex-col border-4 border-dashed hover:bg-gray-100 hover:border-gray-300'
			for='image'>
			<div class='flex flex-col items-center justify-center'>
				{#if imgPreview}
					<img class='uploadPreview max-w-xs max-h-56' src='{imgPreview}' alt='d' />
				{:else}
					<svg xmlns='http://www.w3.org/2000/svg'
							 class='text-gray-400 group-hover:text-gray-600'
							 fill='none'
							 viewBox='0 0 24 24'
							 stroke='currentColor'
							 style='height: 100px; width: 100px'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
									d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
					</svg>
				{/if}
			</div>
			<input style='display:none' type='file' accept='.jpg, .jpeg, .png' id='image'
						 on:change={(e)=>onFileSelected(e)}
						 bind:this={fileInput}
			>
		</label>
	</div>
	<div class='p-4'>
		<div class='mb-4'>
			<label class='block text-gray-700 text-sm font-bold mb-2' for='name'>
				Name
			</label>
			<input
				class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				id='name' type='text' placeholder='Name' bind:value={name} bind:this={inputName}>
		</div>
		<div class='mb-4'>
			<label class='block text-gray-700 text-sm font-bold mb-2' for='description'>
				Description
			</label>
			<input
				class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				id='description' type='text' placeholder='Text' bind:value={description} bind:this={inputDescription}>
		</div>
		<div class='flex justify-center mt-2'>
			{infoText}
		</div>
		<div class='flex justify-center mt-2'>
			{#if !loading}
				<button
					class='w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl'
					type='submit'>
					Create
				</button>
			{/if}
		</div>
	</div>
</form>

<style>
    button {
				background: #00B2BB;
    }

    button:hover {
        background: #028183;
    }
</style>