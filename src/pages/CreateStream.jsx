// import React from "react";

import "../styles/CreateStream.scss";

function CreateStream() {
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
            id="fname"
            name="firstname"
            placeholder="Receiver Wallet Address"
          />
          <label htmlFor="fname">Super Token</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Super Token"
          />
          <label htmlFor="fname">Flow Rate / Month</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Flow Rate"
          />
        </div>

        <div className="button-grp">
          <button className="create-stream">Create Stream</button>
        </div>
      </div>
    </div>
  );
}

export default CreateStream;
