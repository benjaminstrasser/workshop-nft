import type { CodingDojo } from '../../../hardhat/typechain/CodingDojo';


export type NFT =  {
	name: string;
	description: string;
	image: string;
}

const GATEWAY = `https://w3s.link/ipfs/`

export async function getNFTsFromContract(contract: CodingDojo): Promise<NFT[]> {
	const result = [];
	const totalSupply = await contract.totalSupply();
	console.log(`Contract has ${totalSupply} NFTs`);

	for (let i = 0; i < totalSupply.toNumber(); i++) {
		const uri = await contract.tokenURI(i);
		console.log(`Received Uri: ${uri}`);
		const response = await fetch(GATEWAY + uri.replace("ipfs://", ""));
		const metadata = await response.json();
		console.log(`Received metadata for uri: ${uri}`);

		result.push(
			{
				...metadata,
				image: GATEWAY + metadata.image.replace("ipfs://", "")
			}
		);
	}
	return result;
}
