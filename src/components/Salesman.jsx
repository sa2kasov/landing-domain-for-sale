import { useEffect, useState } from 'preact/hooks'
import salesman from '../ui/img/salesman.png'

const Salesman = ({ hints }) => {
  const [state, setState] = useState({ hintIndex: 0, isVisible: false })

  useEffect(() => {
    let intervalId

    if (hints && hints.length !== 0) {
      intervalId = setInterval(() => {
        setState(state => {
          const index = state.isVisible ? (state.hintIndex + 1) % hints.length : state.hintIndex
          return { hintIndex: index, isVisible: !state.isVisible }
        })
      }, 6000)
    }

    return () => clearInterval(intervalId)
  }, [hints])

  const { hintIndex, isVisible } = state

  return (
    <div className="salesman">
      <img src={salesman} alt="Hurry up! The domain name is available for sale!" />
      {isVisible && (hints && hints.length !== 0) &&
        <div className="hints">
          <p>{hints[hintIndex]}</p>
        </div>
      }
    </div>
  )
}

export default Salesman