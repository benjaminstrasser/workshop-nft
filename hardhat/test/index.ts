import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { CodingDojo } from "../typechain";

describe("CodingDojo", function () {
  let codingDojo: CodingDojo;

  before(async function () {
    const Greeter = await ethers.getContractFactory("CodingDojo");
    codingDojo = await Greeter.deploy();
    await codingDojo.deployed();
  });

  it("Should return the name CodingDojo once it's deployed", async function () {
    expect(await codingDojo.name()).to.equal("CodingDojo");
  });

  it("Should return the symbol CD once it's deployed", async function () {
    expect(await codingDojo.symbol()).to.equal("CD");
  });

  it("Should increment the total supply after item is minted", async function () {
    const totalSupply = await codingDojo.totalSupply();

    const setGreetingTx = await codingDojo.safeMint(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      "test123"
    );

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await codingDojo.totalSupply()).to.equal(totalSupply.add(1));
  });

  it("Should increment the owner balance after item is minted", async function () {
    const balanceOfOwner = await codingDojo.balanceOf(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    );

    const setGreetingTx = await codingDojo.safeMint(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      "test123"
    );

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(
      await codingDojo.balanceOf("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
    ).to.equal(balanceOfOwner.add(1));
  });

  it("Should return the owner after item is minted", async function () {
    const totalSupply = await codingDojo.totalSupply();

    const setGreetingTx = await codingDojo.safeMint(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      "test123"
    );
    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await codingDojo.ownerOf(totalSupply)).to.equal(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    );
  });

  it("The tokenUri should have a prefix ipfs://", async function () {
    const totalSupply = await codingDojo.totalSupply();

    const setGreetingTx = await codingDojo.safeMint(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      "test1234"
    );
    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await codingDojo.tokenURI(totalSupply)).to.equal("ipfs://test1234");
  });
});
