import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Icon,
  Input,
  message,
  Row,
  Tooltip,
} from "antd";
import Axios from "axios";
import Loading from "../lotties/LoadingAnimation";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const chkNumberRef = useRef();
  const history = useHistory();
  const [coins, setCoins] = useState([]);
  const [list, setList] = useState([
    { name: "blah", price: "0.98" },
    { name: "blah", price: "0.98" },
    { name: "blah", price: "0.98" },
  ]);

  const [sender, setSender] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const [isCash, setIsCash] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [lottiLoading, setLottiLoading] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [trackingData, setTrackingData] = useState([]);
  const [myError, setMyError] = useState(false);
  const [checkNumber, setCheckNumber] = useState("");
  const [allChecks, setAllChecks] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCheck, setSelectedCheck] = useState(null);
  const [trackingDataDesktop, setTrackingDataDesktop] = useState([]);

  const [allCoins, setAllCoins] = useState([]);

  useEffect(() => {
    if (showInput) {
      chkNumberRef.current.focus();
    }
  }, [showInput]);

  // let filteredCheck = allChecks.filter((item) => {
  //   const lowquery = query.toLowerCase();
  //   return item._id.toLowerCase().indexOf(lowquery) >= 0;
  // });

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

    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/blockcheck/request/get`
    ).then((res) => {
      setAllChecks(res.data.bcrs);
    });

    Axios.get(`https://comms.globalxchange.com/coin/vault/get/all/coins`).then(
      (res) => {
        setAllCoins(res.data.coins);
      }
    );
  }, []);

  const dummyFun = (item) => {
    setLottiLoading(true);
    // console.log(chkNumberRef.current.state.value);
    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/blockcheck/request/get?_id=${item}`
    ).then((res) => {
      if (res.data.status) {
        setTrackingData(res.data.bcrs);
        setLottiLoading(false);
        setShowTracking(true);
      } else {
        setLottiLoading(false);
        message.error("Tracking Details could not be fetched");
        setMyError(true);
        setCheckNumber("");
      }
    });
  };

  const getTrackingData = () => {
    setLottiLoading(true);
    // console.log(chkNumberRef.current.state.value);
    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/blockcheck/request/get?_id=${checkNumber}`
    ).then((res) => {
      if (res.data.status) {
        setTrackingData(res.data.bcrs);
        setLottiLoading(false);
        setShowTracking(true);
      } else {
        setLottiLoading(false);
        // message.error("Wrong Check Number");
        setMyError(true);
        setCheckNumber("");
        chkNumberRef.current.focus();
        setTimeout(() => {
          setMyError(false);
        }, 1500);
      }
    });
  };

  const getTrackingDataDesktop = (item) => {
    // setLottiLoading(true);

    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/blockcheck/request/get?_id=${item._id}`
    ).then((res) => {
      if (res.data.status) {
        setTrackingDataDesktop(res.data.bcrs);

        // // setLottiLoading(false);
        // // setShowTracking(true);
        // showTrackingDataDesktop();
      }
    });
  };

  const getTrackingDataDesktop1 = () => {
    setLottiLoading(true);

    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/blockcheck/request/get?_id=${checkNumber}`
    ).then((res) => {
      if (res.data.status) {
        setTrackingDataDesktop(res.data.bcrs);

        // // setLottiLoading(false);
        // // setShowTracking(true);
        // showTrackingDataDesktop();
      }
    });
  };

  const showTrackingData = () => {
    console.log(trackingData[0], "trackingdata");
    if (trackingData.length > 0) {
      return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "50px",
              paddingBottom: "10px",
            }}
          >
            <img
              src={require("../images/back.svg")}
              alt=""
              width="30px"
              onClick={(e) => setShowTracking(false)}
            />
            &nbsp;&nbsp;
            <div>
              <img
                src={require("../images/logo_blue.svg")}
                alt=""
                width="200px"
              />
            </div>
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#4D4D4D",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            In Transit
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "82vh",
            }}
          >
            <div
              style={{ padding: "0px 20px", paddingTop: "30px", zIndex: 99 }}
            >
              <Card bodyStyle={{ display: "flex", alignItems: "center" }}>
                <Avatar size="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{ color: "#186AB4" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    Initiated By {trackingData[0].initiator_name}
                  </div>
                  <small>{trackingData[0].date}</small>
                </div>
              </Card>
              <br />
              <Card bodyStyle={{ display: "flex", alignItems: "center" }}>
                <Avatar size="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{ color: "#186AB4" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    Delivered To {trackingData[0].endUser_name}
                  </div>
                  <small>{trackingData[0].date}</small>
                </div>
              </Card>
              <br />
              <Card bodyStyle={{ display: "flex", alignItems: "center" }}>
                <Avatar size="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{ color: "#186AB4" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    Seen By {trackingData[0].endUser_name}
                  </div>
                  <small>{trackingData[0].date}</small>
                </div>
              </Card>
            </div>
            <div style={{ padding: "0px 20px", zIndex: 99 }}>
              <Card bodyStyle={{ display: "flex", alignItems: "center" }}>
                <Avatar size="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{ color: "#186AB4" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    {isCash
                      ? `Cashed By ${trackingData[0].endUser_name}`
                      : `Signed by ${trackingData[0].endUser_name}`}
                  </div>
                  <small>{trackingData[0].date}</small>
                </div>
              </Card>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 0px",
                }}
              >
                <div
                  style={{
                    height: "50px",
                    border: "solid 0.5px #186AB4",
                    width: "100%",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#186AB4",
                    cursor: "pointer",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Share
                </div>
                &nbsp;&nbsp; &nbsp;&nbsp;
                <div
                  style={{
                    height: "50px",
                    border: "solid 0.5px #186AB4",
                    width: "100%",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "white",

                    cursor: "pointer",
                    background: "#186AB4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Audit
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "fixed",
              left: "15vw",
              top: "25vh",
              bottom: "10vh",
              background: "#186AB4",
              height: "55vh",
              width: "5px",
              zIndex: 0,
            }}
          >
            &nbsp;
          </div>
        </>
      );
    }
  };

  const paste = async (input) => {
    chkNumberRef.current.focus();
    const text = await navigator.clipboard.readText();
    setCheckNumber(text);
    // chkNumberRef.current.state.value = text;
    // input.value = text;
  };

  useEffect(() => {
    if (trackingData.length > 0) {
      showTrackingData();
    }
  }, [trackingData]);

  useEffect(() => {
    showTrackingData();
  }, [trackingDataDesktop]);

  const handleShowSection = () => {
    if (lottiLoading) {
      return <Loading />;
    } else {
      if (showInput && !showTracking) {
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "50px",
                paddingBottom: "10px",
              }}
            >
              <img
                src={require("../images/back.svg")}
                alt=""
                width="30px"
                onClick={(e) => setShowInput(false)}
              />
              &nbsp;&nbsp;
              <div>
                <img
                  src={require("../images/logo_blue.svg")}
                  alt=""
                  width="250px"
                />
              </div>
            </div>
            <p
              style={{
                color: "#186AB4",
                padding: "20px 60px",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              Enter The Check Number To Open Up The CheckBook.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
              }}
            >
              {/* <div
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
                
              </div> */}

              <Row style={{ width: "100%", padding: "30px" }}>
                <Col
                  span={16}
                  //   style={{ border: "solid 0.5px #EBEBEB", padding: "20px" }}
                >
                  <Input
                    size="large"
                    ref={chkNumberRef}
                    value={checkNumber}
                    onChange={(e) => setCheckNumber(e.target.value)}
                    placeholder="Enter Check Number"
                    style={{
                      borderRadius: "0px",
                      border: "none !important",
                      outline: "none !important",
                      height: "54px",
                    }}
                  />
                </Col>
                <Col
                  onClick={paste}
                  span={4}
                  style={{
                    border: "solid 1px #EBEBEB",
                    borderWidth: "1px 1px 1px 0px",
                    height: "54px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={require("../images/paste.svg")}
                    alt=""
                    width="20px"
                  />
                </Col>
                <Col
                  onClick={getTrackingData}
                  span={4}
                  style={{
                    border: "solid 0.5px #EBEBEB",
                    height: "54px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#186AB4",
                  }}
                >
                  <img src={require("../images/go.svg")} alt="" width="20px" />
                </Col>
              </Row>
              {myError ? (
                <div
                  style={
                    {
                      // padding: "10px 30px",
                      // color: "red",
                      // fontWeight: "bold",
                    }
                  }
                >
                  <Alert
                    message="Please Enter a Valid Check Number"
                    type="error"
                    showIcon
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        );
      } else if (!showInput && !showTracking) {
        return (
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
              <div
                onClick={(e) => setShowInput(true)}
                style={{
                  padding: "20px",
                  textAlign: "center",
                  border: "solid 0.5px #186AB4",
                  width: "100%",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#186AB4",
                  marginTop: "15px",
                  cursor: "pointer",
                  background: "white",
                }}
              >
                Enter Check Number
              </div>

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
              <div
                style={{
                  padding: "20px",
                  paddingTop: "0px",
                  height: "30vh",
                  overflowY: "scroll",
                }}
              >
                {sender.map((item) => {
                  return (
                    <div style={{ display: "flex", marginBottom: "15px" }}>
                      <div style={{ background: "#186AB4", width: "15px" }}>
                        &nbsp;
                      </div>

                      <div
                        onClick={(e) => dummyFun(item._id)}
                        style={{
                          width: "100%",
                          padding: "20px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "solid 0.5px #EBEBEB",
                        }}
                      >
                        {showCardData(item)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  padding: "20px",
                  paddingTop: "0px",
                  height: "30vh",
                  overflowY: "scroll",
                }}
              >
                {receiver.map((item) => {
                  return (
                    <div style={{ display: "flex", marginBottom: "15px" }}>
                      <div style={{ background: "#3B3B3B", width: "15px" }}>
                        &nbsp;
                      </div>

                      <div
                        onClick={(e) => dummyFun(item._id)}
                        style={{
                          width: "100%",
                          padding: "20px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "solid 0.5px #EBEBEB",
                        }}
                      >
                        {showCardData(item)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        );
      } else if (showTracking) {
        return showTrackingData();
      }
    }
  };

  const conditionalTracking = () => {
    if (trackingDataDesktop.length > 0) {
      console.log(trackingDataDesktop, "selectedCheck");
      return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              // padding: "50px",
              paddingBottom: "10px",
            }}
          >
            <img
              style={{ cursor: "pointer" }}
              src={require("../images/back.svg")}
              alt=""
              width="20px"
              onClick={(e) => setTrackingDataDesktop([])}
            />
            &nbsp;&nbsp; &nbsp;&nbsp;
            <div>
              <img
                src={require("../images/logo_blue.svg")}
                alt=""
                width="200px"
              />
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div
              onClick={(e) => {
                history.push(`/checks/${trackingDataDesktop[0]._id}`);
              }}
            >
              <img
                style={{ cursor: "pointer" }}
                src={require("../images/ext_link.svg")}
                alt=""
                width="20px"
              />
            </div>
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#4D4D4D",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            In Transit
          </div>

          {/* cards start */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "82vh",
            }}
          >
            <div
              style={{
                paddingTop: "30px",
                zIndex: 99,
                width: "25vw",
              }}
            >
              <Card
                bodyStyle={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar size="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{ color: "#186AB4" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    Initiated By {trackingDataDesktop[0].initiator_name}
                  </div>
                  <small>{trackingDataDesktop[0].date}</small>
                </div>
              </Card>
              <br />
              <Card bodyStyle={{ display: "flex", alignItems: "center" }}>
                <Avatar size="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{ color: "#186AB4" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    Delivered To {trackingDataDesktop[0].endUser_name}
                  </div>
                  <small>{trackingDataDesktop[0].date}</small>
                </div>
              </Card>
              <br />
              <Card bodyStyle={{ display: "flex", alignItems: "center" }}>
                <Avatar size="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{ color: "#186AB4" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    Seen By {trackingDataDesktop[0].endUser_name}
                  </div>
                  <small>{trackingDataDesktop[0].date}</small>
                </div>
              </Card>
            </div>
            <div style={{ zIndex: 99, width: "25vw" }}>
              <Card
                bodyStyle={{ display: "flex", alignItems: "center" }}
                style={{ width: "100%" }}
              >
                <Avatar size="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{ color: "#186AB4" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                    {isCash
                      ? `Cashed By ${trackingDataDesktop[0].endUser_name}`
                      : `Signed by ${trackingDataDesktop[0].endUser_name}`}
                  </div>
                  <small>{trackingDataDesktop[0].date}</small>
                </div>
              </Card>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 0px",
                }}
              >
                <div
                  style={{
                    height: "50px",
                    border: "solid 0.5px #186AB4",
                    width: "100%",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#186AB4",
                    cursor: "pointer",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Share
                </div>
                &nbsp;&nbsp; &nbsp;&nbsp;
                <div
                  style={{
                    height: "50px",
                    border: "solid 0.5px #186AB4",
                    width: "100%",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "white",

                    cursor: "pointer",
                    background: "#186AB4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Audit
                </div>
              </div>
            </div>
          </div>
          {/* cards end */}
          <div
            style={{
              position: "fixed",
              right: "20vw",
              top: "25vh",
              bottom: "10vh",
              background: "#186AB4",
              height: "55vh",
              width: "5px",
              zIndex: 0,
            }}
          >
            &nbsp;
          </div>
        </>
      );
    } else {
      return (
        <div style={{ padding: "50px", textAlign: "center" }}>
          <img src={require("../images/logo_blue.svg")} alt="" width="200px" />
          <p
            style={{
              color: "#186AB4",
              padding: "20px",
              textAlign: "center",
            }}
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
        </div>
      );
    }
  };

  const showCardData = (item) => {
    let coinMeta = allCoins.find((o) => o.coinSymbol === item.coin);
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          padding: "0px 20px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={coinMeta.coinImage} alt="" width="20px" />
            &nbsp;&nbsp;
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              {coinMeta.coinName}
            </div>
          </div>
          <div>
            <small>{new Date(item.date).toDateString()}</small>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "20px", fontWeight: "700" }}>
            {item.amount.toFixed(4)}
          </div>
          <div>
            <small>
              ${(Number(item.amount) * Number(coinMeta.usd_price)).toFixed(2)}
            </small>
          </div>
        </div>
      </div>
    );
  };

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
                ref={chkNumberRef}
                value={checkNumber}
                onChange={(e) => setCheckNumber(e.target.value)}
                style={{ width: "350px", height: "50px" }}
                placeholder="Search A Blockcheck Number..."
                suffix={
                  <>
                    <Tooltip title="Paste Check Number">
                      <Icon
                        onClick={paste}
                        type="snippets"
                        style={{ color: "rgba(0,0,0,.45)", cursor: "pointer" }}
                      />
                    </Tooltip>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon
                      onClick={getTrackingDataDesktop1}
                      type="search"
                      style={{ color: "rgba(0,0,0,.45)", cursor: "pointer" }}
                    />
                  </>
                }
              />
            </div>

            <Row gutter={20} style={{ padding: "0px 4vw", height: "3vh" }}>
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
            <Row gutter={20} style={{ padding: "0px 4vw" }}>
              <Col
                span={12}
                className="white-scroll"
                style={{ height: "75vh", overflowY: "scroll" }}
              >
                {allChecks.map((item) => {
                  if (item.bcr_type === "sender") {
                    return (
                      <div
                        onClick={(e) => getTrackingDataDesktop(item)}
                        style={{
                          display: "flex",
                          width: "100%",
                          marginTop: "20px",
                          cursor: "pointer",
                          opacity: query
                            ? item._id.toLowerCase() === query
                              ? 1
                              : 0.3
                            : 1,
                        }}
                      >
                        <div style={{ background: "#186AB4", width: "15px" }}>
                          &nbsp;
                        </div>
                        <div
                          style={{
                            // padding: "40px",
                            height: "100px",
                            textAlign: "center",
                            border: "solid 1px lightgray",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {showCardData(item)}
                        </div>
                      </div>
                    );
                  }
                })}
              </Col>
              <Col
                span={12}
                className="white-scroll"
                style={{ height: "75vh", overflowY: "scroll" }}
              >
                {allChecks.map((item) => {
                  if (item.bcr_type === "receiver") {
                    return (
                      <div
                        onClick={(e) => getTrackingDataDesktop(item)}
                        style={{
                          display: "flex",
                          width: "100%",
                          marginTop: "20px",
                          cursor: "pointer",
                          opacity: query
                            ? item._id.toLowerCase() === query
                              ? 1
                              : 0.3
                            : 1,
                        }}
                      >
                        <div style={{ background: "#3B3B3B", width: "15px" }}>
                          &nbsp;
                        </div>
                        <div
                          style={{
                            // padding: "40px",
                            height: "100px",
                            textAlign: "center",
                            border: "solid 1px lightgray",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {showCardData(item)}
                        </div>
                      </div>
                    );
                  }
                })}
              </Col>
            </Row>
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              borderLeft: "0.5px solid #E7E7E7",
            }}
          >
            {conditionalTracking()}
          </Col>
        </Row>
      ) : (
        <>{handleShowSection()}</>
      )}
    </>
  );
};

export default Home;
