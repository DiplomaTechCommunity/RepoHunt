import {Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Navbar from './components/Navbar'
import GitHubRepositories from "./components/GitHubRepositories";

function App() {
  return (
    <main>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/repos" element={<GitHubRepositories/>} />
        </Routes>
    </main>
  );
}

export default App;
