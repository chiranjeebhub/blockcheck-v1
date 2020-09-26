import { Card, Col, Input, Row } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [list, setList] = useState([
    { name: "blah", price: "0.98" },
    { name: "blah", price: "0.98" },
    { name: "blah", price: "0.98" },
  ]);

  const [sender, setSender] = useState([]);
  const [receiver, setReceiver] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/blockcheck/request/get?bcr_type=receiver`
    ).then((res) => {
      setReceiver(res.data.bcrs);
    });

    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/blockcheck/request/get?bcr_type=sender`
    ).then((res) => {
      setSender(res.data.bcrs);
    });
  });

  return (
    <>
      <Row>
        <Col span={16} style={{ padding: "50px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              //   padding: "50px",
            }}
          >
            <img
              src={require("../images/logo_blue.svg")}
              alt=""
              width="200px"
            />
            <Input
              type="text"
              style={{ width: "300px" }}
              placeholder="Enter Check Number..."
            />
          </div>

          <Row gutter={16} style={{ marginTop: "10vh" }}>
            <Col span={12}>
              <div
                style={{
                  fontSize: "18px",
                  color: "#186AB4",
                  fontWeight: "bold",
                }}
              >
                Checks To Cash
              </div>
              {sender.map((item) => {
                return (
                  <div style={{ marginTop: "20px" }}>
                    <div
                      style={{
                        padding: "10px",
                        background: "#186AB4",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {item.amount}
                    </div>
                    <div
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        border: "solid 1px lightgray",
                      }}
                    >
                      {item.coin}
                    </div>
                  </div>
                );
              })}
            </Col>
            <Col span={12}>
              <div
                style={{
                  fontSize: "18px",
                  color: "#3B3B3B",
                  fontWeight: "bold",
                }}
              >
                Checks To Sign
              </div>
              {receiver.map((item) => {
                return (
                  <div style={{ marginTop: "20px" }}>
                    <div
                      style={{
                        padding: "10px",
                        background: "#3B3B3B",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {item.amount}
                    </div>
                    <div
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        border: "solid 1px lightgray",
                      }}
                    >
                      {item.coin}
                    </div>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Col>
        <Col
          span={8}
          style={{
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            borderLeft: "0.5px solid #E7E7E7",
          }}
        >
          <img src={require("../images/logo_blue.svg")} alt="" width="200px" />
          <p style={{ color: "#186AB4", padding: "20px", textAlign: "center" }}>
            The Safest Way To Receive Crypto From An External Wallet
          </p>

          <div
            style={{
              padding: "20px",
              textAlign: "center",
              border: "solid 0.5px #186AB4",
              width: "100%",
              fontSize: "15px",
              fontWeight: "bold",
              color: "#186AB4",
              cursor: "pointer",
            }}
          >
            Send Money
          </div>
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              border: "solid 0.5px #186AB4",
              width: "100%",
              fontSize: "15px",
              fontWeight: "bold",
              color: "#186AB4",
              marginTop: "15px",
              cursor: "pointer",
            }}
          >
            Receive Money
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Home;
