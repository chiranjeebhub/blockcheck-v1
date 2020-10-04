import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Input, Icon, Tooltip, Card, Avatar } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Loading from "../lotties/LoadingAnimation";

const Check = () => {
  const chkNumberRef = useRef();
  const history = useHistory();
  const [checkNumber, setCheckNumber] = useState("");
  const [lottiLoading, setLottiLoading] = useState(false);
  const [trackingDataDesktop, setTrackingDataDesktop] = useState([]);
  const [isCash, setIsCash] = useState(true);
  const [checkId, setCheckId] = useState("");

  useEffect(() => {
    let chkId = window.location.href.split("\\").pop().split("/").pop();
    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/blockcheck/request/get?_id=${chkId}`
    ).then((res) => {
      if (res.data.status) {
        setTrackingDataDesktop(res.data.bcrs);

        // // setLottiLoading(false);
        // // setShowTracking(true);
        // showTrackingDataDesktop();
      }
    });
  }, []);

  const getTrackingDataDesktop1 = () => {
    setLottiLoading(true);

    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/blockcheck/request/get?_id=${checkNumber}`
    ).then((res) => {
      if (res.data.status) {
        setTrackingDataDesktop(res.data.bcrs);
      }
    });
  };

  const paste = async (input) => {
    chkNumberRef.current.focus();
    const text = await navigator.clipboard.readText();
    setCheckNumber(text);
    // chkNumberRef.current.state.value = text;
    // input.value = text;
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
      return <Loading />;
    }
  };

  return (
    <>
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
            <div>
              <img
                src={require("../images/logo_blue.svg")}
                alt=""
                width="200px"
              />
              <div style={{ fontSize: "15px", fontWeight: "600" }}>
                Check# -{" "}
                {window.location.href.split("\\").pop().split("/").pop()}
              </div>
            </div>

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
          &nbsp;
          {conditionalTracking()}
        </Col>
      </Row>
    </>
  );
};

export default Check;
