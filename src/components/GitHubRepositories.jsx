import { useEffect, useState, useMemo } from 'react';
import Search from './Search';
import Footer from "../components/Footer"
import Cards from './Cards';

const GitHubRepositories = () => {
  // Storing repositories fetched from Github API
  const [repositories, setRepositories] = useState([]);
  const [filterRepo, setfilterRepo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const allLanguages = useMemo(()=>new Set(), []);
 const [filter, setfilter] = useState({
  language: "Languages",
   star: "Stars",
   label: "Labels"
 })

 

  // eslint-disable-next-line no-undef
  const accessToken = process.env.NEXT_PUBLIC_TOKEN;  
  // const accessToken = process.env.VITE_TOKEN // For local Add an .env file. 

  const repoDataFilter = async (repo)=>{
    // Fetch languages for each repository
    const response = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    const data = await response.json();

    const langResponse = await fetch(repo.languages_url, { headers: { Authorization: `Bearer ${accessToken}` } });
    const languagesData = await langResponse.json();
    const languages = Object.keys(languagesData).join(', ').split(",");
    languages.forEach((lang)=>{
    allLanguages.add(lang)
    })
    
    const response_2 = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/labels`, { headers: { Authorization: `Bearer ${accessToken}` } });
    let labels = await response_2.json();
    const labelArray = []
    labels.filter((lab)=>{
      labelArray.push(lab.name)
    })
    
    return {
      ...data,
      labels: labelArray,
    };
  }

  useEffect(() => {
    fetch('https://api.github.com/repositories', { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(response => response.json())
      .then(data => {
        // Map over the repositories and fetch additional data for each
        const repoPromises = data.map(async repo => {
           return await repoDataFilter(repo)
        });

        // Wait for all promises to resolve
        return Promise.all(repoPromises);
      })
      .then(updatedRepositories => {
        setRepositories(updatedRepositories)
        setfilterRepo(updatedRepositories)
      })
      .catch(error => console.log(error));
  }, [setRepositories, allLanguages, accessToken]);



  // Search
  const search = (val) => {
    // Filter repositories based on the search query
    const filteredRepositories = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(val.toLowerCase())
    );
    // Update the state with filtered repositories
    if(val === '') setfilterRepo(repositories)
    setfilterRepo(filteredRepositories);
  }; // Re-run this effect whenever the search query changes

  const handleFilter = async (e)=>{
    let {name, value} = e.target
    setfilter((prev)=>{
     return {...prev, [name]:value}
    })

    let temp = {
      ...filter,
      [name]:value
    }

    let query = ""

    if(temp.language !== "Languages"){
      query += `language:${temp.language}`
    }

    if(temp.star !== "Stars"){
      query +=`+stars:${temp.star}`
    }
   
    await fetch(`https://api.github.com/search/repositories?q=${query}`)
    .then((response)=>response.json())
    .then(data => {
      const repoPromises = data.items.map(async repo => {
         return await repoDataFilter(repo)
      });

      return Promise.all(repoPromises);
    })
    .then(updatedRepositories => {
      if(temp.label !== "Labels"){
        updatedRepositories = updatedRepositories.filter(async (repo)=>{
          return await repo.labels.includes(temp.label)
        })
      }
      setfilterRepo(updatedRepositories)
    })
    .catch(error => console.log(error));

  }

  return (
   <div className='bg-[#0B0E1A] '>
    <div className='min-h-screen'>
      <Search onSearch={search} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
       <div className='text-center m-12 text-white text-3xl'>Filter your search using Languages, Labels and Stars</div>

<div className='flex m-12 justify-around'>
<select id="language" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="language" value={filter.language} onChange={handleFilter}>
  <option defaultValue={"Languages"}>Languages</option>
  {
    Array.from(allLanguages).map((lang, index)=>{
      if(lang !== "") {
      return <option key={index} value={lang}>{lang}</option>
      }
    })
  }
</select>

<select id="label" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='label' value={filter.label} onChange={handleFilter}>
  <option defaultChecked={"Labels"}>Labels</option>
  <option value="bug">bug</option>
  <option value="feature">feature</option>
  <option value="enhancement">enhancement</option>
  <option value="documentation">documentation</option>
  <option value="good first issue">good first issue</option>
  <option value="help wanted">help wanted</option>
  <option value="critical">critical</option>
  <option value="algorithm">algorithm</option>
</select>
<select id="star" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='star' value={filter.star} onChange={handleFilter}>
  <option defaultChecked="Stars">Stars</option>
  <option value="0..50">{'<50'}</option>
  <option value="50..100">{'<100'}</option>
  <option value="100..150">{'<150'}</option>
  <option value="150..200">{'<200'}</option>
  <option value="200..500">{'<500'}</option>
  <option value=">500">{'>500'}</option>
</select>
      </div>

      <div>
        <div className='grid grid-cols-4 justify-around p-4 items-stretch'>
          {filterRepo.map((repo, index) => (
            <Cards repo={repo} key={index}/>
          ))}
        </div>
      </div>
    </div>
      <Footer/>
 </div>
  );
};


export default GitHubRepositories;
