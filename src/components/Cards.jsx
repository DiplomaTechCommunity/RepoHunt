import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from "@fortawesome/free-regular-svg-icons";
import PropTypes from 'prop-types';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Cards = ({repo}) => {
  return (
    <Link to={repo.html_url} target="_blank">
    <div className="text-white m-2">
       <div className="flex justify-between bg-[#A06BE3] p-4 rounded-t-md">
        <h3>{repo.language}</h3>
        <p><FontAwesomeIcon  icon={faInfoCircle} /> {repo.open_issues_count} issues</p>
       </div>
       <div className="bg-[#24262E] p-4 rounded-b-md">
       <div  className="flex my-2">
        <img src={repo.owner.avatar_url} alt=""  className="mr-2 w-[30px] h-[30px] rounded-[100%]"/>
        <span> {repo.owner.login}</span>
       </div>
       <h3 className=" text-md font-medium text-start py-1">{repo.name}</h3>
     {repo.labels.length> 0 && <div  className="flex justify-around my-2">
        <span className="bg-red-400 p-1 m-1 rounded-lg">{repo.labels[0]}</span>
       {repo.labels.length> 1 &&<span className="bg-yellow-400 p-1 m-1 rounded-lg">{repo.labels[1]}</span>}
       {repo.labels.length>2 && <span className="bg-red-400 p-1 m-1 rounded-lg">Others</span>}
       </div>}
       <div className="flex justify-between">
       <span  className="border-white border-[1px] rounded-md p-1"> <FontAwesomeIcon icon={faStar} className=" pr-2"/> {repo.stargazers_count} Stars</span>
       </div>
       </div>
       
    </div>
    </Link>
  )
}

Cards.defaultProps = {
  repo: {},
};

Cards.propTypes = {
    repo: PropTypes.object.isRequired,
};

export default Cards
