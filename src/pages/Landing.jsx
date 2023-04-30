// import React from "react";
import { useEffect, useState } from "react";
import "../styles/Landing.scss";
import { useNavigate } from "react-router-dom";
// import { createClient } from "urql";
import { request } from "graphql-request";
import { myBlockies } from "../components/Blockies";

function Landing() {
  const navigate = useNavigate();
  const [showSwitch, setShowSwitch] = useState({
    contractStream: true,
    receiverStream: false,
    incoming: true,
    outgoing: false,
  });
  const [inflowsContract, setInflowsContract] = useState([]);
  const [outflowsContract, setOutflowsContract] = useState([]);
  const [inflowsReceiver, setInflowsReceiver] = useState([]);

  const loadIncomingContractStream = async () => {
    const tokensQuery_incoming = `
    query {
      account(id: "0x168e732c446e82e517aa5054a237569e47ca8755") {
        inflows(orderBy: createdAtTimestamp, orderDirection: desc) {
          createdAtTimestamp
          currentFlowRate
          streamedUntilUpdatedAt
          sender {
            id
          }
        }
      }
    }
  `;
    request(
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai",
      tokensQuery_incoming
    )
      .then((data) => {
        console.log(data.account.inflows);
        setInflowsContract(data.account.inflows);
        const uniqueInflows = new Set(data.account.inflows);
        console.log(uniqueInflows);
        // let arr =[]
        // for(let i=0;i<data.account.inflows.length;i++){
        //   arr.push()
        // }
        // setInflowsContract() // do something with the data
      })
      .catch((error) => console.error(error));
    // const client = createClient({
    //   url: APIURL,
    // });
    // const loadedData_incoming = await client
    //   .query(tokensQuery_incoming)
    //   .toPromise();
  };
  const loadIncomingReceiverStreams = async () => {
    const tokensQuery_incoming = `
    query {
      account(id: "0x168e732c446e82e517aa5054a237569e47ca8755") {
        inflows(orderBy: createdAtTimestamp, orderDirection: desc) {
          createdAtTimestamp
          currentFlowRate
          streamedUntilUpdatedAt
          sender {
            id
          }
        }
      }
    }
  `;
    request(
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai",
      tokensQuery_incoming
    )
      .then((data) => {
        console.log(data.account.inflows);
        setInflowsReceiver(data.account.inflows);
        const uniqueInflows = new Set(data.account.inflows);
        console.log(uniqueInflows);
        // let arr =[]
        // for(let i=0;i<data.account.inflows.length;i++){
        //   arr.push()
        // }
        // setInflowsContract() // do something with the data
      })
      .catch((error) => console.error(error));
    // const client = createClient({
    //   url: APIURL,
    // });
    // const loadedData_incoming = await client
    //   .query(tokensQuery_incoming)
    //   .toPromise();
  };
  const loadOutgoingContractStream = async () => {
    const tokensQuery_outgoing = `
    query {
      account(id: "0x168e732c446e82e517aa5054a237569e47ca8755") {
        outflows(orderBy: createdAtTimestamp, orderDirection: desc) {
          createdAtTimestamp
          currentFlowRate
          streamedUntilUpdatedAt
          receiver {
            id
          }
        }
      }
    }
  `;
    request(
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai",
      tokensQuery_outgoing
    )
      .then((data) => {
        console.log(data.account.outflows);
        setOutflowsContract(data.account.outflows);
        const uniqueInflows = new Set(data.account.outflows);
        console.log(uniqueInflows);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadIncomingContractStream();
    loadOutgoingContractStream();
    loadIncomingReceiverStreams();
  }, []);

  return (
    <div className="landing-home">
      <div className="current-receiver-block">
        <div className="crd">
          <h1>Current Receiver Details</h1>
          <h3>Address</h3>
          <p>
            210928310823091273-5781234750918{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#ffffff"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm.59 4.59l4.83 4.83c.37.37.58.88.58 1.41V21c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h6.17c.53 0 1.04.21 1.42.59zM15 12h4.5L14 6.5V11c0 .55.45 1 1 1z" />
            </svg>
          </p>
        </div>
        <div className="button-grp">
          <button
            className="create-stream"
            onClick={() => navigate("/create-update-stream")}
          >
            Create Stream
          </button>
          <button className="change-receiver">Change Receiver</button>
        </div>
      </div>

      <div className="streams">
        <div className="buttons-group">
          <button
            className={
              showSwitch.contractStream ? "nav-button active" : "nav-button"
            }
            onClick={() => {
              setShowSwitch({
                contractStream: true,
                incoming: true,
                outgoing: false,
                receiverStream: false,
              });
            }}
          >
            Contract Streams
          </button>
          <button
            className={
              showSwitch.receiverStream ? "nav-button active" : "nav-button"
            }
            onClick={() => {
              setShowSwitch({
                contractStream: false,
                outgoing: false,
                incoming: false,
                receiverStream: true,
              });
            }}
          >
            Receiver Streams
          </button>
        </div>
        <div className="incoming-outgoing-btn-grps">
          <button
            className={showSwitch.incoming ? "active in-out" : "in-out"}
            onClick={() => {
              setShowSwitch({
                ...showSwitch,
                incoming: true,
                outgoing: false,
              });
            }}
          >
            Incoming
          </button>
          {showSwitch.receiverStream ? (
            ""
          ) : (
            <button
              className={showSwitch.outgoing ? "active in-out" : "in-out"}
              onClick={() => {
                setShowSwitch({
                  ...showSwitch,
                  incoming: false,
                  outgoing: true,
                });
              }}
            >
              Outgoing
            </button>
          )}
        </div>
        <div className="streams-table">
          <table>
            <thead>
              <tr>
                <th>To / From</th>
                <th>All Time Flow</th>
                <th>Flow rate</th>
                <th>Start / End Date</th>
                <th></th>
              </tr>
            </thead>
            {showSwitch.contractStream ? (
              <tbody>
                {showSwitch.incoming
                  ? inflowsContract.length > 0 &&
                    inflowsContract.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            {" "}
                            {myBlockies(0xec4f1075)}{" "}
                            {item.sender.id.slice(0, 4) +
                              "..." +
                              item.sender.id.slice(
                                item.sender.id.length - 4,
                                item.sender.id.length
                              )}
                          </td>
                          <td>
                            {item.streamedUntilUpdatedAt / Math.pow(10, 18)}
                          </td>
                          <td>{item.currentFlowRate / Math.pow(10, 18)}</td>
                          <td>
                            {new Date(
                              item.createdAtTimestamp * 1000
                            ).toLocaleString()}
                          </td>
                          <td>
                            <button className="update">Update</button>
                            <button className="delete">Delete</button>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
                {showSwitch.outgoing
                  ? outflowsContract.length > 0 &&
                    outflowsContract.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            {" "}
                            {myBlockies(0xec4f1075)}{" "}
                            {item.receiver.id.slice(0, 4) +
                              "..." +
                              item.receiver.id.slice(
                                item.receiver.id.length - 4,
                                item.receiver.id.length
                              )}
                          </td>
                          <td>
                            {item.streamedUntilUpdatedAt / Math.pow(10, 18)}
                          </td>
                          <td>{item.currentFlowRate / Math.pow(10, 18)}</td>
                          <td>
                            {new Date(
                              item.createdAtTimestamp * 1000
                            ).toLocaleString()}
                          </td>
                          <td>
                            <button className="update">Update</button>
                            <button className="delete">Delete</button>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            ) : (
              ""
            )}
            {showSwitch.receiverStream ? (
              <tbody>
                {inflowsReceiver.length > 0 &&
                  inflowsReceiver.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          {" "}
                          {myBlockies(0xec4f1075)}{" "}
                          {item.sender.id.slice(0, 4) +
                            "..." +
                            item.sender.id.slice(
                              item.sender.id.length - 4,
                              item.sender.id.length
                            )}
                        </td>
                        <td>
                          {item.streamedUntilUpdatedAt / Math.pow(10, 18)}
                        </td>
                        <td>{item.currentFlowRate / Math.pow(10, 18)}</td>
                        <td>
                          {new Date(
                            item.createdAtTimestamp * 1000
                          ).toLocaleString()}
                        </td>
                        <td>
                          <button className="update">Update</button>
                          <button className="delete">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              ""
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Landing;
