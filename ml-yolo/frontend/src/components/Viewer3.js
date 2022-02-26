import React from 'react';
// extends React.Component
export default function Viewer3() {

    const [capturedImg, setCapturedImg] = useState(null);
    const [prediction, setPrediction] = useState("");

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

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }
    onChangeHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        });
        console.log(event.target.files[0]);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        const { selectedFile } = this.state;
        formData.append('inputFile', selectedFile);
        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
    };

//can only return on JSX at a time 
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload a file: <br /><br />
                    <input type="file" name="file" onChange={this.onChangeHandler} />
                </label>
                <br /><br />
                <button type="submit">
                    Upload
                </button>
            </form >
        </div >
    );
}