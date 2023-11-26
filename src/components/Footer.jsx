import telegram from "../images/telegram.png"
import linkedin from "../images/linkedin.png"
import instagram from "../images/instagram.png"
import twitter from "../images/twitter.png"
import web from "../images/web.png"

const Footer = () => {
  return (
    <footer className="bg-black p-2 text-white">
       <ul className="flex flex-wrap justify-around">
        <li className="flex">
          <img src={web} alt="" />
          <span className="ml-2"><a target="_blank" href="https://www.wearedtc.live/" rel="noreferrer">https://wearedtc.live</a></span>
        </li>
        <li className="flex">
        <img src={instagram} alt="" />
        <span className="ml-2"><a target="_blank" rel="noreferrer" href="https://www.instagram.com/diplomatechcommunity/">@diplomatechcommunity</a></span>
        </li>
        <li className="flex">
        <img src={linkedin} alt="" />
        <span className="ml-2"><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/wearedtc/">@diplomatechcommunity</a></span>
        </li>
        <li className="flex">
        <img src={twitter} alt="" />
        <span className="ml-2"><a target="_blank" rel="noreferrer" href="https://twitter.com/WeAreDTC">@twitter.com/WeAreDTC</a></span>
        </li>
        <li className="flex">
          <img src={telegram} alt="" />
          <span className="ml-2"><a target="_blank" rel="noreferrer" href="https://web.telegram.org/k/#@diplomatechcommunity">@diplomatechcommunity</a></span>
        </li>
       </ul>
    </footer>
  )
}

export default Footer
