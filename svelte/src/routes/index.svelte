<script lang='ts'>
	import Mint from './mint.svelte';
	import { getNFTsFromContract } from '$lib/nft';
	import type { NFT } from '$lib/nft';
	import { codingDojoContract } from '$lib/coding-dojo.store';
	import { onMount } from 'svelte';


	let nfts: NFT[] = [];

	onMount(async () => {
		await reload();
	});

	async function reload() {
		console.log('Load NFTs');
		nfts = await getNFTsFromContract($codingDojoContract);
	}

</script>
<div class='shadow-xl pb-10 mb-20'>
	<h1 class='text-2xl font-bold leading-7 sm:text-3xl sm:truncate text-center	mt-8 text-white'>Welcome to your NFT
		Collection</h1>
</div>


<div class='container grid grid-cols-3 gap-2 mx-auto'>
	{#each nfts as nft}
		<div class='max-w-sm bg-white rounded-lg shadow-xl my-1'>
			<div class='flex flex-col items-center justify-center'>
				<a>
					<img class='rounded-t-lg' src={nft.image} alt='' />
				</a>
			</div>
			<div class='p-5'>
				<a>
					<h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-black'>{nft.name}</h5>
				</a>
				<p class='mb-3 font-normal text-gray-900 dark:text-gray-900'>{nft.description}</p>
			</div>
		</div>
	{/each}
	<Mint on:nftMinted={reload}></Mint>
</div>


<style>
    :global(body) {
        background-image: -webkit-linear-gradient(0deg,#00B2BB, #9D1681);
    }
</style>
