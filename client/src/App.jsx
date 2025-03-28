import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogSearch from "./components/BlogSearch";

function App() {
  return <div className="App">{
    <Router>
      <Routes>
        <Route path="/" element={<BlogSearch />} />
      </Routes>
    </Router>
  }</div>;
}

export default App;
