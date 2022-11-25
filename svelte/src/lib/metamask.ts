import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';

const { subscribe, set } = writable(undefined);
export const walletProvider: Readable<ethers.providers.Web3Provider> = { subscribe };

export async function connectMetamask() {
	const provider: any = await detectEthereumProvider();
	if (provider) {
		const walletProvider = provider;
		await provider.request({ method: 'eth_requestAccounts' });
		set(new ethers.providers.Web3Provider(walletProvider));
	} else {
		throw new Error('Please install MetaMask!');
	}

}


