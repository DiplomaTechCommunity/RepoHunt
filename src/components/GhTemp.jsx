import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
// import dotenv from 'dotenv';
// dotenv.config();

// const accessToken = process.env.GITHUB_ACCESS_TOKEN;
const accessToken = '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';
console.log(accessToken);

async function fetchRepositories() {
  try {
    const response = await fetch('https://api.github.com/repositories', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('fetchRepositories():', data);
    return data;
  } catch (error) {
    console.error('Error fetching repositories data:', error);
    throw error;
  }
}

async function fetchIndividualRepoStargazersCount(repo) {
  try {
    const stargazersResponse = await fetch(repo.stargazers_url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const stargazersData = await stargazersResponse.json();
    const stargazersCount = stargazersData.length;
    console.log('fetchIndividualRepoStargazersCount():', stargazersCount);
    return stargazersCount;
  } catch (error) {
    console.error('Error fetching individual repository stargazers count:', error);
    throw error;
  }
}

async function fetchAllReposStargazersCount(repositories) {
  try {
    return await Promise.all(
      repositories.map(repo => fetchIndividualRepoStargazersCount(repo))
    );
  } catch (error) {
    console.error('Error fetching all repositories stargazers counts:', error);
  }
}

async function fetchLanguages(repositories) {
  try {
    const languagesDataArray = [];
    for (const repo of repositories) {
      const languagesResponse = await fetch(repo.languages_url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const languagesData = languagesResponse.json();
      languagesDataArray.push(languagesData);
    }
    console.log('fetchLanguages():', languagesDataArray);
    return languagesDataArray;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
}

function extractUniqueLanguages(languagesDataArray) {
  const uniqueLanguagesSet = new Set();
  languagesDataArray.forEach(languagesData => {
    const languages = Object.keys(languagesData);
    languages.forEach(language => uniqueLanguagesSet.add(language));
  });
  console.log('extractUniqueLanguages():', Array.from(uniqueLanguagesSet));
  return Array.from(uniqueLanguagesSet);
}


function GhTemp({ searchQuery }) {
  const [repositories, setRepositories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [uniqueLanguages, setUniqueLanguages] = useState([]);
  const [stargazersCounts, setStargazersCounts] = useState([]);

  const [filteredRepositories, setFilteredRepositories] = useState([]);

  const [minStargazers, setMinStargazers] = useState('');
  const [maxStargazers, setMaxStargazers] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const repositoriesData = await fetchRepositories();
        setRepositories(repositoriesData);

        const languagesDataArray = await fetchLanguages(repositoriesData);
        setLanguages(languagesDataArray);

        const uniqueLanguagesArray = extractUniqueLanguages(languagesDataArray);
        setUniqueLanguages(uniqueLanguagesArray);

        const stargazersCountsArray = await fetchAllReposStargazersCount(repositoriesData);
        setStargazersCounts(stargazersCountsArray);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);

  const handleFilterChange = () => {
    const filteredRepos = repositories.filter((repo) => {
      const repoIndex = repositories.indexOf(repo);
      const repoLanguages = languages[repoIndex];
      const repoStargazersCount = stargazersCounts[repoIndex];
      const languageCondition = !selectedLangauge || repoLanguages.includes(selectedLanguage);
      const stargazersCondition = (!minStargazers || repoStargazersCount >= parseInt(minStargazers, 10)) && (!maxStargazers || repoStargazersCount <= parseInt(maxStargazers, 10));
      return languageCondition && stargazersCondition;
    });
    setFilteredRepositories(filteredRepos);
  };

  const handleLangaugeChange = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
    handleFilterChange();
  };

  // Search
  useEffect(() => {
    // Filter repositories based on the search query
    const filteredRepositories = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Update the state with filtered repositories
    setRepositories(filteredRepositories);
  }, [searchQuery]); // Re-run this effect whenever the search query changes

  return (
    <div className='bg-[#0B0E1A]'>
      <Search />
      <div>
        <div>
          <h2>Filter by Language</h2>
          <select onChange={(e) => handleLangaugeChange(e.target.value)}>
            <option value="">Select Language</option>
            {uniqueLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="minStargazers">
            Min:
          </label>
          <input type="number"
            id="minStargazers"
            value={minStargazers}
            onChange={(e) => setMinStargazers(e.target.value)}
            min={0}
          />
        </div>
        <div>
          <label htmlFor="maxStargazers">
            Max:
          </label>
          <input
            type="number"
            id="maxStargazers"
            value={maxStargazers}
            onChange={(e) => setMaxStargazers(e.target.value)}
            min={0}
          />
        </div>
        {repositories.length > 0 && (
          <div className='flex justify-around flex-wrap'>
            {filteredRepositories.map(repo => (
              <div key={repo.id} className='mb-4 bg-purple-200'>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {repo.name}
                </a>
                <p className='text-gray-600'>Language(s): {languages[repositories.indexOf(repo)]}</p>
                <p className="text-gray-600">Stargazers Count: {stargazersCounts[repositories.indexOf(repo)]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

GhTemp.defaultProps = {
  searchQuery: '',
};

// PropTypes for better code validation
GhTemp.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default GhTemp;