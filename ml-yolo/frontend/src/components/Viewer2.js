import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import config from "../config/config";

const Wrapper = styled.div`
  display: block;
  margin: 0 auto;
`;

export default function Viewer2() {
  const initialstate = {
        videoSrc:""
    }

  const webcamRef = useRef(null);
  const [capturedImg, setCapturedImg] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [videoSrc , seVideoSrc] = useState("");
  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  //  const handleChange = ({file}) => {
  //     var reader = new FileReader();
  //     console.log(file)
  //     var url = URL.createObjectURL(file.originFileObj);
  //     seVideoSrc(url);
  // };

  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    const client_id = Date.now();
    const url = `${config.WS_SERVER}/${client_id}`;
    console.log(url);
    ws.current = new WebSocket(url);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (event) => {
      if (isPaused) return;
      const message = JSON.parse(event.data);
      // console.log(message);
      setCapturedImg(message.output);
      setPrediction(message.prediction);
    };
  }, [isPaused]);

  function sendMessage(msg) {
    if (!ws.current) return;

    ws.current.send(msg);
  }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment", // Can be "environment" or "user"
  };

  const capture = useCallback(() => {
    const capturedImg = webcamRef.current.getScreenshot();
    // setCapturedImg(capturedImg);
    // console.log(capturedImg);
    sendMessage(capturedImg);
  }, [webcamRef]);

  return (
  <>
    <button onClick={handleClick}>
      Upload a file
    </button>
    <input 
      type="file"
      ref={hiddenFileInput}
      onChange={handleChange}
      style={{display: 'none'}}
    />
  </>
  );
}




