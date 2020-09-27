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
  const [isCash, setIsCash] = useState(true);

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
      {window.innerWidth > 600 ? (
        <Row>
          <Col span={16}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "20vh",
                padding: "0px 4vw",
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
            <Row gutter={16} style={{ padding: "0px 4vw", height: "3vh" }}>
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
              </Col>
            </Row>
            <Row gutter={16} style={{ padding: "0px 4vw" }}>
              <Col
                span={12}
                className="white-scroll"
                style={{ height: "75vh", overflowY: "scroll" }}
              >
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
              <Col
                span={12}
                className="white-scroll"
                style={{ height: "75vh", overflowY: "scroll" }}
              >
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
            <img
              src={require("../images/logo_blue.svg")}
              alt=""
              width="200px"
            />
            <p
              style={{ color: "#186AB4", padding: "20px", textAlign: "center" }}
            >
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
              Request Money
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
              padding: "0px 50px",
              paddingTop: "50px",
            }}
          >
            <img
              src={require("../images/logo_blue.svg")}
              alt=""
              width="250px"
            />
            <p
              style={{
                color: "#186AB4",
                padding: "20px",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              The Safest Way To Receive Crypto From An External Wallet
            </p>
            <Input
              // value={buttonText}
              // onChange={(e) => setButtonText(e.target.value)}
              placeholder="Enter Check Number"
              style={{
                backgroundColor: "white",
                color: "#186AB4",
                border: "none !important",
                outline: "none",
                textAlign: "center",
                padding: "30px",
                fontSize: "18px",
              }}
            />
            <div
              style={{
                fontSize: "20px",
                color: "#186AB4",
                fontWeight: "700",
                paddingTop: "10px",
              }}
            >
              OR
            </div>
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                border: "solid 0.5px #186AB4",
                width: "100%",
                fontSize: "18px",
                fontWeight: "bold",
                color: "white",
                marginTop: "15px",
                cursor: "pointer",
                background: "#186AB4",
              }}
            >
              Scan The Check
            </div>
            <br />
          </div>
          <div style={{ padding: "20px", paddingBottom: "10px" }}>
            {isCash ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "23px",
                  fontWeight: "700",
                }}
              >
                <p
                  style={{ color: "#186AB4", cursor: "pointer" }}
                  onClick={(e) => setIsCash(true)}
                >
                  Cash Checks
                </p>
                <p
                  style={{ color: "lightgray", cursor: "pointer" }}
                  onClick={(e) => setIsCash(false)}
                >
                  Sign
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "23px",
                  fontWeight: "700",
                }}
              >
                <p
                  style={{ color: "#186AB4", cursor: "pointer" }}
                  onClick={(e) => setIsCash(false)}
                >
                  Sign Checks
                </p>
                <p
                  style={{ color: "lightgray", cursor: "pointer" }}
                  onClick={(e) => setIsCash(true)}
                >
                  Cash
                </p>
              </div>
            )}
          </div>
          {isCash ? (
            <div style={{ padding: "20px", paddingTop: "0px" }}>
              {sender.map((item) => {
                return (
                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "solid 0.5px #EBEBEB",
                      marginBottom: "10px",
                    }}
                  >
                    <div>{item.coin}</div>
                    <div>{item.amount}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: "20px", paddingTop: "0px" }}>
              {receiver.map((item) => {
                return (
                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "solid 0.5px #EBEBEB",
                      marginBottom: "10px",
                    }}
                  >
                    <div>{item.coin}</div>
                    <div>{item.amount}</div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
