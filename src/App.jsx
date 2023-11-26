import {Route, Routes } from "react-router-dom";
import "./App.css";
import GitHubRepositories from "./components/GitHubRepositories";
import Landing from "./components/Landing";
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <main>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/repos" element={<GitHubRepositories />} />
        </Routes>
      <Footer/>
    </main>
  );
}

export default App;
