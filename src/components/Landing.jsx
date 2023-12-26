import './Landing.css';
import Footer from "../components/Footer" 
import adjacentImg from "../images/adjacent img.png"
import exploration from "../images/exploration.png"
import preferenceBased from "../images/preferencebased.png"
import prioritizedResults from "../images/prioritizedResults.png"
import searchOptimization from "../images/searchOptimization.png"
import timeEfficiency from "../images/timeEfficiency.png"


const Landing = () => {
  return (
    <div className="landing-container">
      <div className="content">
        <div className="description-container">
          <div className="description-text">
        <h1 className='section-header'>Welcome to RepoHunt</h1>
            <p>
              RepoHunt is an efficient GitHub repository search platform. Simplify your exploration of GitHub repositories with precision and ease through customized search functionalities. Whether you seek projects in specific programming languages, prefer repositories with a particular star rating, or prioritize labeled repositories. RepoHunt empowers you to explore the vast GitHub landscape with efficiency. Explore, evaluate, and elevate your GitHub experience with our streamlined repository search.
            </p>
          </div>
             <img src={adjacentImg} className="adjacent-image" />
        </div>
      </div>

    <div id="Benefits" className="benefits-section">
      <div className="section-header">Benefits</div>
      <div className="cards">
        <div className="card-body">
          <div className="card-text">
            <p>Search Optimization</p>
          </div>
          <div className="card-img">
            <img src={searchOptimization}/>
          </div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <p>Preference-Based Experience</p>
          </div>
          <div className="card-img">
            <img src={preferenceBased}/>
          </div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <p>Prioritized Results</p>
          </div>
          <div className="card-img">
            <img src={prioritizedResults}/>
          </div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <p>Time Effefiency</p>
          </div>
          <div className="card-img">
            <img src={timeEfficiency}/>
          </div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <p>Exploration Made Easy</p>
          </div>
          <div className="card-img">
            <img src={exploration}/>
          </div>
        </div>
      </div>
    </div>
    <div id="Additional-info" className="additional-section">
      <div className="section-header">REPOHUNT IS A DTC BASED CREATION</div>
      <div className="information">
        <p>
        Diploma Tech Community is a thriving hub for coding enthusiasts among diploma students. DTC is committed to encourage learning and collaboration in the dynamic field of computer science. Our community organizes an array of events, including sessions, workshops, open source programs, hackathons, and more.
        </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Landing;
