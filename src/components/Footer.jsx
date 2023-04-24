import t from '../utils/i18n.js'

const Footer = ({ data }) => {
  return (
    <footer>
      <p>{t('footer-title')}</p>
      <ul className="socials">
        {data.email &&
          <li><a className="email"
               href={`mailto:${data.email}?subject=${t('footer-email-subject')} ${data.name}`}
               title={t('footer-email-title')} />
          </li>
        }
        {data.phone &&
          <li><a className="phone" href={`tel:${data.phone}`} title={t('footer-call-title')} /></li>
        }
        {data.whatsapp &&
          <li><a className="whatsapp" href={`https://wa.me/${data.whatsapp}`} title="WhatsApp" /></li>
        }
        {data.telegram &&
          <li><a className="telegram" href={`tg://resolve?domain=${data.telegram}`} title="Telegram" /></li>
        }
      </ul>
    </footer>
  )
}

export default Footer