import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import Loader from "./components/Loader";
import Viewer from "./components/Viewer";
import theme from "./theme/Theme";
import "./App.css";

function Page() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>DeepRoad AI</h1>
	<h3>Upload your image or video data here</h3>
        <Viewer />
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
