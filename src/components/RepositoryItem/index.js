import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, starsCount, name, issuesCount} = repoDetails
  return (
    <li className="repoList-details">
      <img src={avatarUrl} alt={name} className="avatarImage" />
      <h1 className="repo-name">{name}</h1>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p className="repoCountDetails">{starsCount} starts</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p className="repoCountDetails">{forksCount} forks</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p className="repoCountDetails">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
