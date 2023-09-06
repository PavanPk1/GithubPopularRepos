import './index.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositoriesData: [],
    languageId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {languageId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${languageId}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessView(data)
    } else {
      this.onFailureView()
    }
  }

  onSuccessView = data =>
    this.setState({
      repositoriesData: data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      })),
      apiStatus: apiStatusConstants.success,
    })

  onFailureView = () => this.setState({apiStatus: apiStatusConstants.failure})

  renderGithubRepos = () => {
    const {repositoriesData, apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <ul className="unorderedRepoLists">
            {repositoriesData.map(eachRepo => (
              <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
            ))}
          </ul>
        )
      case apiStatusConstants.failure:
        return (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
            <h1>Something Went Wrong</h1>
          </>
        )
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderHeader = () => {
    const {languageId} = this.state
    return (
      <ul className="navbar">
        {languageFiltersData.map(eachLang => (
          <LanguageFilterItem
            eachLang={eachLang}
            key={eachLang.id}
            isActive={languageId === eachLang.id}
            onClickLanguage={this.onClickLanguage}
          />
        ))}
      </ul>
    )
  }

  onClickLanguage = id => {
    this.setState({languageId: id}, this.getPopularRepos)
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        {this.renderHeader()}
        {this.renderGithubRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
