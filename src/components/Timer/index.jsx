import { useEffect, useRef } from 'preact/hooks'
import FlipClock from 'flipclock'
import 'flipclock/dist/flipclock.css'
import t from '../../utils/i18n.js'
import './styles.css'

const Timer = ({ data: { dateOfNextIncrease: timer, language }, updateTimer }) => {
  const clockRef = useRef(null)

  useEffect(() => {
    // If the clock already exists, set a new time
    if (!clockRef.current) {
      const clock = new FlipClock(document.querySelector('#countdown'), timer, {
        countdown: true,
        face: 'DayCounter',
        autoStart: false,
        language: language,
        stop: () => {
          console.log("Timer's reset. Price updated")
        }
      })

      clockRef.current = clock
      clock.start()

      // Checking if the timer has expired
      const checkTimer = setInterval(() => {
        if (new Date() > timer) {
          clearInterval(checkTimer)
          updateTimer()
        }
      }, 1000)
    } else {
      clockRef.current.originalValue = timer
    }

    return () => {
      clockRef.current.timer.isRunning && clockRef.current.stop()
    }

  }, [timer])

  return (
    <section className="timer">
      <p>{t('timer-title')}</p>
      <div id="countdown" className="clock"></div>
    </section>
  )
}

export default Timer