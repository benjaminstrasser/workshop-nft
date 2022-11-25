import * as ethers from 'ethers';
import { CodingDojo__factory, deploymentAddresses } from '../../../hardhat';
import type { CodingDojo } from '../../../hardhat';
import { derived, readable, writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { walletProvider } from './metamask';

function getContract(): CodingDojo {
	const provider = new ethers.providers.JsonRpcProvider(
		'http://127.0.0.1:8545/'
	);
	return CodingDojo__factory.connect(
		deploymentAddresses.codingDojo,
		provider
	);
}

export const codingDojoContract: Readable<CodingDojo> = readable(getContract());

export const codingDojoContractWithWallet = derived(
	[walletProvider, codingDojoContract],
	([$walletProvider, $codingDojoContract]) => {
		if (!$walletProvider || !codingDojoContract) {
			return undefined;
		}
		return $codingDojoContract.connect($walletProvider.getSigner());
	}
);


export const myAddress = deasync(derived(
	[walletProvider],
	async ([$walletProvider]) => {
		if(!$walletProvider){
			return undefined;
		}
		return await $walletProvider.getSigner().getAddress();
	}
));

export function deasync<T>(store: Readable<Promise<T>>): Readable<T> {
	return (() => {
		const { subscribe, set } = writable(null);
		store.subscribe((value) => {
			value.then((value) => {
				set(value);
			});
		});
		return {
			subscribe
		};
	})();
}
