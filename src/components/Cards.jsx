import web from "../images/web.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Cards = () => {
  return (
    <div className="text-white m-2">
       <div className="flex justify-between bg-[#A06BE3] p-4 rounded-t-md">
        <h3>Langugae</h3>
        <p>80 issues</p>
       </div>
       <div className="bg-[#24262E] p-4 rounded-b-md">
       <div  className="flex my-2">
        <img src={web} alt=""  className="mr-2"/>
        <span> Username</span>
       </div>
       <div  className="flex justify-between my-2">
        <span className="bg-red-400 p-1 m-1 rounded-lg">Labels</span>
        <span className="bg-yellow-400 p-1 m-1 rounded-lg">Good first Issue</span>
        <span className="bg-green-400 p-1 m-1 rounded-lg">Bug</span>
       </div>
       <div className="flex justify-between">
       <FontAwesomeIcon icon={faStar} />
       </div>
       </div>
       
    </div>
  )
}

export default Cards
