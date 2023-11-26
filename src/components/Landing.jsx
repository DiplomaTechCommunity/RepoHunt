import "./Landing.css";

const backgroundImage = "C:/Users/aliza/OneDrive/Documents/TOOLS.png";
const adjacentImageUrl =
  "https://pbs.twimg.com/media/FkEabVcWIAEhLQf?format=jpg&name=900x900";

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "90vh",
  },
};

const Landing = () => {
  return (
    <div className="landing-container" style={{ backgroundColor: "#241e44" }}>
      <div style={styles.container}>
        <div className="content">
          <h1 className="title">Welcome to RepoHunt</h1>
          <div className="description-container">
            <div className="description-text">
              <p>
                RepoHunt is an efficient GitHub repository search platform.
                Simplify your exploration of GitHub repositories with precision
                and ease through customized search functionalities. Whether you
                seek projects in specific programming languages, prefer
                repositories with a particular star rating, or prioritize
                labeled repositories. RepoHunt empowers you to explore the vast
                GitHub landscape with efficiency. Explore, evaluate, and elevate
                your GitHub experience with our streamlined repository search.
              </p>
            </div>
            <img
              src={adjacentImageUrl}
              alt="Adjacent Image"
              className="adjacent-image"
            />
          </div>
        </div>
      </div>
      <div id="Benefits" className="benefits-section space-y-5 p-6">
        <div className="section-header text-5xl font-semibold bg-gradient-to-r from-pink-500 via-purple-200 to-blue-400 bg-clip-text">
          Benefits
        </div>
        <div className="cards flex justify-around">
          <div className="card-body flex flex-col items-center space-y-2">
            <div className="card-text text-xl">Search Optimization</div>
            <div className="card-img">
              <img
                src="images/searchOptimization.png"
                className="w-20 h-20"
                alt="Search Optimization"
              />
            </div>
          </div>
          <div className="card-body flex flex-col items-center space-y-2">
            <div className="card-text text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              <p>Preference-Based Experience</p>
            </div>
            <div className="card-img">
              <img className="w-20 h-20" src="images/preferenceBased.png" />
            </div>
          </div>
          <div className="card-body flex flex-col items-center space-y-2">
            <div className="card-text text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              <p>Prioritized Results</p>
            </div>
            <div className="card-img">
              <img className="w-20 h-20" src="images/prioritizedResults.png" />
            </div>
          </div>
          <div className="card-body flex flex-col items-center space-y-2">
            <div className="card-text text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              <p>Time Effefiency</p>
            </div>
            <div className="card-img">
              <img className="w-20 h-20" src="images/timeEfficiency.png" />
            </div>
          </div>
          <div className="card-body flex flex-col items-center space-y-2">
            <div className="card-text text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              <p>Exploration Made Easy</p>
            </div>
            <div className="card-img">
              <img className="w-20 h-20" src="images/exploration.png" />
            </div>
          </div>
        </div>
      </div>

      <div
        id="Additional-info"
        className="additional-section text-center py-12"
      >
        <div className="section-header text-4xl font-semibold bg-gradient-to-r from-pink-500 via-purple-200 to-blue-400 bg-clip-text">
          REPOHUNT IS A DTC BASED CREATION
        </div>
        <div className="information text-lg text-white w-3/4 mx-auto">
          <p>
            Diploma Tech Community is a thriving hub for coding enthusiasts
            among diploma students. DTC is committed to encourage learning and
            collaboration in the dynamic field of computer science. Our
            community organizes an array of events, including sessions,
            workshops, open source programs, hackathons, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
