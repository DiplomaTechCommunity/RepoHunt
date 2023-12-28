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
  // eslint-disable-next-line no-undef
  const accessToken = process.env.VITE_TOKEN // For local Add an .env file. 

// const accessToken = process.env.NEXT_PUBLIC_TOKEN;  

  useEffect(() => {
    fetch('https://api.github.com/repositories', { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(response => response.json())
      .then(data => {
        // Map over the repositories and fetch additional data for each
        const repoPromises = data.map(async repo => {
          // Fetch languages for each repository
          const response = await fetch(repo.languages_url, { headers: { Authorization: `Bearer ${accessToken}` } });
          const languagesData = await response.json();
          const languages = Object.keys(languagesData).join(', ').split(",");
          languages.forEach((lang)=>{
          allLanguages.add(lang)
            
          })
          const response_1 = await fetch(repo.stargazers_url, { headers: { Authorization: `Bearer ${accessToken}` } });
          const stargazersData = await response_1.json();
          const response_2 = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/labels`, { headers: { Authorization: `Bearer ${accessToken}` } });
          let labels = await response_2.json();
          const labelArray = []
          labels.filter((lab)=>{
            labelArray.push(lab.name)
          })
          const response_3 = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}`, { headers: { Authorization: `Bearer ${accessToken}` } });
          let issuenumber = await response_3.json();
          issuenumber = issuenumber.open_issues_count
          
          return {
            ...repo,
            languages: languages,
            stargazers_count: stargazersData.length,
            labels: labelArray,
            issues: issuenumber
          };
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
  return (
   <div className='bg-[#0B0E1A] '>
    <div className='min-h-screen'>
      <Search onSearch={search} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
       <div className='text-center m-12 text-white text-3xl'>Filter your search using Languages, Labels and Stars</div>

<div className='flex m-12 justify-around'>
<select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-16">
  <option defaultValue={"Language"}>Language</option>
  {
    Array.from(allLanguages).map((lang, index)=>{
      return <option key={index} value={lang}>{lang}</option>
    })
  }
</select>

<select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-16">
  <option defaultChecked={"Labels"}>Labels</option>
  <option value="Bug">Bug</option>
  <option value="Feature">Feature</option>
  <option value="Enhancement">Enhancement</option>
  <option value="Documentation">Documentation</option>
  <option value="Good First Issue">Good First Issue</option>
  <option value="Help Wanted">Help Wanted</option>
  <option value="Critical">Critical</option>
</select>
<select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-16">
  <option defaultChecked="Stars">Stars</option>
  <option value="50">{'>50'}</option>
  <option value="100">{'>100'}</option>
  <option value="150">{'>150'}</option>
  <option value="200">{'>200'}</option>
</select>
      </div>

      <div>
        <div className='grid grid-cols-4 justify-around p-4'>
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

/*
An object:
{
  id: 369,
  node_id: 'MDEwOlJlcG9zaXRvcnkzNjk=',
  name: 'css_naked_day',
  full_name: 'collectiveidea/css_naked_day',
  private: false,
  owner: {
    login: 'collectiveidea',
    id: 128,
    node_id: 'MDEyOk9yZ2FuaXphdGlvbjEyOA==',
    avatar_url: 'https://avatars.githubusercontent.com/u/128?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/collectiveidea',
    html_url: 'https://github.com/collectiveidea',
    followers_url: 'https://api.github.com/users/collectiveidea/followers',
    following_url: 'https://api.github.com/users/collectiveidea/following{/other_user}',
    gists_url: 'https://api.github.com/users/collectiveidea/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/collectiveidea/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/collectiveidea/subscriptions',
    organizations_url: 'https://api.github.com/users/collectiveidea/orgs',
    repos_url: 'https://api.github.com/users/collectiveidea/repos',
    events_url: 'https://api.github.com/users/collectiveidea/events{/privacy}',
    received_events_url: 'https://api.github.com/users/collectiveidea/received_events',
    type: 'Organization',
    site_admin: false
  },
  html_url: 'https://github.com/collectiveidea/css_naked_day',
  description: 'A Rails plugin that disables all CSS on CSS Naked Day',
  fork: false,
  url: 'https://api.github.com/repos/collectiveidea/css_naked_day',
  forks_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/forks',
  keys_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/keys{/key_id}',
  collaborators_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/collaborators{/collaborator}',
  teams_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/teams',
  hooks_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/hooks',
  issue_events_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/issues/events{/number}',
  events_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/events',
  assignees_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/assignees{/user}',
  branches_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/branches{/branch}',
  tags_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/tags',
  blobs_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/git/blobs{/sha}',
  git_tags_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/git/tags{/sha}',
  git_refs_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/git/refs{/sha}',
  trees_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/git/trees{/sha}',
  statuses_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/statuses/{sha}',
  languages_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/languages',
  stargazers_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/stargazers',
  contributors_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/contributors',
  subscribers_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/subscribers',
  subscription_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/subscription',
  commits_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/commits{/sha}',
  git_commits_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/git/commits{/sha}',
  comments_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/comments{/number}',
  issue_comment_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/issues/comments{/number}',
  contents_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/contents/{+path}',
  compare_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/compare/{base}...{head}',
  merges_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/merges',
  archive_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/{archive_format}{/ref}',
  downloads_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/downloads',
  issues_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/issues{/number}',
  pulls_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/pulls{/number}',
  milestones_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/milestones{/number}',
  notifications_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/notifications{?since,all,participating}',
  labels_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/labels{/name}',
  releases_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/releases{/id}',
  deployments_url: 'https://api.github.com/repos/collectiveidea/css_naked_day/deployments'
}
*/
