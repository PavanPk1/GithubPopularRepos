import './index.css'

const LanguageFilterItem = props => {
  const {eachLang, isActive, onClickLanguage} = props
  const {id, language} = eachLang
  const className = isActive ? 'active-nav nav-option' : 'nav-option'
  return (
    <li>
      <button
        type="button"
        className={className}
        onClick={() => onClickLanguage(id)}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
