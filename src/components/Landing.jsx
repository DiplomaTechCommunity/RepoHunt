import './Landing.css';

const backgroundImage = "../images/homepage-bg.jpg";
const adjacentImageUrl = 'https://pbs.twimg.com/media/FkEabVcWIAEhLQf?format=jpg&name=900x900';

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    padding: 0
  }
};

const Landing = () => {
  return (
    <div className="landing-container" style={{ backgroundColor: '#241e44' }}>
    <div style={styles.container}>
      <div className="content">
      <h1 className="title">Welcome to RepoHunt</h1>
        <div className="description-container">
          <div className="description-text">
            <p>
              RepoHunt is an efficient GitHub repository search platform. Simplify your exploration of GitHub repositories with precision and ease through customized search functionalities. Whether you seek projects in specific programming languages, prefer repositories with a particular star rating, or prioritize labeled repositories. RepoHunt empowers you to explore the vast GitHub landscape with efficiency. Explore, evaluate, and elevate your GitHub experience with our streamlined repository search.
            </p>
          </div>
          <img src={adjacentImageUrl} alt="Adjacent Image" className="adjacent-image" />
        </div>
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
            <img src="images/searchOptimization.png"/>
          </div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <p>Preference-Based Experience</p>
          </div>
          <div className="card-img">
            <img src="images/preferenceBased.png"/>
          </div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <p>Prioritized Results</p>
          </div>
          <div className="card-img">
            <img src="images/prioritizedResults.png"/>
          </div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <p>Time Effefiency</p>
          </div>
          <div className="card-img">
            <img src="images/timeEfficiency.png"/>
          </div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <p>Exploration Made Easy</p>
          </div>
          <div className="card-img">
            <img src="images/exploration.png"/>
          </div>
        </div>
      </div>
    </div>
    <div id="Additional-info" className="additional-section">
      <div className="section-header">REPOHUNT IS A DTC BASED CREATION</div>
      <div className="information">
        <p>Diploma Tech Community is a thriving hub for coding enthusiasts among diploma students. DTC is committed to encourage learning and collaboration in the dynamic field of computer science. Our community organizes an array of events, including sessions, workshops, open source programs, hackathons, and more.</p>
      </div>
    </div>
    </div>
  );
};

export default Landing;
