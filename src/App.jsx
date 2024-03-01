import React from "react";
import {} from "antd";
import "../App.css";
import { BrowserRouter } from "react-router-dom";
import AppFooter from "./components/footer/AppFooter";
import AppHeader from "./components/header/AppHeader";
import AppPageContent from "./components/pageContent/AppPageContent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <AppPageContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
