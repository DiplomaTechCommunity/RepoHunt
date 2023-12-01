import {Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState } from "react";
import GitHubRepositories from "./components/GitHubRepositories";
import Search from "./components/Search";
import GhTemp from "./components/GhTemp";

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (

    // Comment main tag just to test Search Functionality
    // <>
    // <Search onSearch={handleSearch} />
    // <GitHubRepositories searchQuery={searchQuery} />
    // </>
    <main>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search onSearch={handleSearch} />}/>
          {/* <Route path="/repos" element={<GitHubRepositories searchQuery={searchQuery} />} /> */}
          <Route path="/repos" element={<GhTemp searchQuery={searchQuery} />} />
        </Routes>
      <Footer/>
    </main>
  );
}

export default App;
