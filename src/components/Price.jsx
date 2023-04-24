import t from '../utils/i18n.js'

const Price = ({ data: { currentPrice: price, increasePrice, currency, timer} }) => {
  const oldPrice = price - increasePrice

  return (
    <section className="price">
      <p>{t('price-current-price-title')}</p>
      <p>
        { timer !== false &&
          <s>{`${oldPrice.toLocaleString()} ${currency}`}</s>
        }
        <b>{`${price.toLocaleString()} ${currency}`}</b>
      </p>
    </section>
  )
}

export default Price