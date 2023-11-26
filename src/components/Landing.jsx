import React from 'react';
import './Landing.css';

const backgroundImage = 'C:/Users/aliza/OneDrive/Documents/TOOLS.png';
const adjacentImageUrl = 'https://pbs.twimg.com/media/FkEabVcWIAEhLQf?format=jpg&name=900x900';

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'
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
    </div>
  );
};

export default Landing;
