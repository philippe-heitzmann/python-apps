import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import Loader from "./components/Loader";
import Viewer from "./components/Viewer";
// import Viewer2 from "./components/Viewer2";
import Viewer3 from "./components/Viewer3";
import theme from "./theme/Theme";
import "./App.css";

function Page() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>DeepRoad AI</h1>
	<h3>Upload your image or video data here</h3>
        <Viewer3 />
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}
export default App;
