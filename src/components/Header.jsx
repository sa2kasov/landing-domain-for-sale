import t from '../utils/i18n.js'

const Header = ({ name }) => {
  return (
    <header>
      <p>{t('header-domain-title')}</p>
      <p className="domainName" contentEditable="true">{name}</p>
      <p className="isAvailable" dangerouslySetInnerHTML={t('header-domain-available')} />
    </header>
  )
}

export default Header