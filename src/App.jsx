import {Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Navbar from './components/Navbar'
import { useState } from "react";
import Search from "./components/Search";
import GitHubRepositories from "./components/GitHubRepositories";

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search onSearch={handleSearch} />}/>
          <Route path="/repos" element={<GitHubRepositories searchQuery={searchQuery} />} />
        </Routes>
    </main>
  );
}

export default App;
