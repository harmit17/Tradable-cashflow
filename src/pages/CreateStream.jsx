// import React from "react";

import { useState } from "react";
import "../styles/CreateStream.scss";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
const contractAddress = "0x168e732c446e82e517aa5054a237569e47ca8755";

function CreateStream() {
  const [data, setData] = useState({
    receiverAdd: "",
    flowRate: "",
  });

  const create = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        // provider and signer
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //
        const sf = await Framework.create({
          chainId: 80001,
          provider: provider,
        });
        const daix = await sf.loadSuperToken("fDAIx");

        const createFlowOperation = daix.createFlow({
          receiver: contractAddress, //tradeable cashflow address
          flowRate: ethers.utils.parseEther(String(data.flowRate)),
        });

        const txn = await createFlowOperation.exec(signer);

        const receipt = await txn.wait();

        console.log(receipt);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="create-stream-home">
      <div className="current-receiver-block">
        <div className="crd">
          <h1>Create / Update Stream</h1>
        </div>
        <div className="inputs-div">
          <label htmlFor="fname">Receiver Wallet Address</label>
          <input
            type="text"
            disabled
            id="fname"
            name="firstname"
            placeholder="0x168e732c446e82e517aa5054a237569e47ca8755"
            onChange={(e) => {
              setData({ ...data, receiverAdd: e.target.value });
            }}
          />
          <label htmlFor="fname">Super Token</label>
          <input
            disabled
            type="text"
            id="fname"
            name="firstname"
            placeholder="fDAIx"
          />
          <label htmlFor="fname">Flow Rate / Month</label>
          <input
            type="number"
            id="fname"
            min={0}
            name="firstname"
            placeholder="Flow Rate"
            onChange={(e) => {
              setData({ ...data, flowRate: e.target.value });
            }}
          />
        </div>

        <div className="button-grp">
          <button className="create-stream" onClick={() => create()}>
            Create Stream
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateStream;
