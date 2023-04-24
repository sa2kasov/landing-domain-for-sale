import { useState } from 'preact/hooks'
import { config } from './config'
import { domainInfo } from './utils/domainInfo'

import Header from './components/Header.jsx'
import Price from './components/Price.jsx'
import Timer from './components/Timer'
import Salesman from './components/Salesman.jsx'
import Footer from './components/Footer.jsx'

export function App() {
  const [domainData, updateDomainData] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const domainName = params.get('name')
    if (domainName) {
      const foundDomain = config.domains.filter(({ name }) => domainName === name)
      if (foundDomain.length > 0) {
        // Moving to home page
        const url = new URL(window.location.href)
        url.searchParams.delete('name')
        window.history.replaceState({}, '', url)

        return domainInfo(foundDomain[0])
      }
    }

    return domainInfo()
  })

  return (
    <>
      <Header name={domainData.name} />
      <Price data={domainData} />
      {domainData.timer !== false &&
        <Timer data={domainData} timer={domainData.dateOfNextIncrease}
               updateTimer={() => updateDomainData(domainInfo())}/>
      }
      <Salesman hints={domainData.hints} />
      <Footer data={domainData} />
    </>
  )
}