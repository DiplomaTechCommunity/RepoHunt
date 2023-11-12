import './App.css'
import GitHubRepositories from './components/GitHubRepositories'

function App() {

  return (
    <div>
        <h1 className='text-center text-4xl font-bold text-indigo-600'>RepoHunt</h1>
        <p className='text center text-gray-400'>Under Development</p>
        <GitHubRepositories />
    </div>
  )
}

export default App
