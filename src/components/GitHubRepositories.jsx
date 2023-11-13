import { useEffect, useState } from 'react';

const GitHubRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  // const accessToken = 'yourAccessToken';

  useEffect(() => {
    // fetch('https://api.github.com/repositories', {headers: {Authorization: `Bearer ${accessToken}`}})
    fetch('https://api.github.com/repositories')
      .then(response => response.json())
      .then(data => {
        // Map over the repositories and fetch additional data for each
        const repoPromises = data.map(repo => {
          // Fetch languages for each repository
          return fetch(repo.languages_url)
            .then(response => response.json())
            .then(languagesData => {
              // Fetch stargazers count for each repository
              return fetch(repo.stargazers_url)
                .then(response => response.json())
                .then(stargazersData => {
                  // Combine the fetched data with the repository object
                  return {
                    ...repo,
                    languages: Object.keys(languagesData).join(', '),
                    stargazers_count: stargazersData.length
                  };
                });
            });
        });

        // Wait for all promises to resolve
        return Promise.all(repoPromises);
      })
      .then(updatedRepositories => setRepositories(updatedRepositories))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Public GitHub Repositories</h1>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id} className="mb-4">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {repo.name}
            </a>
            <p className="text-gray-600">Language: {repo.languages}</p>
            <p className="text-gray-600">Stars: {repo.stargazers_count}</p>
          </li>
        ))}
      </ul>
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