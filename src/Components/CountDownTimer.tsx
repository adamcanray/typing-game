import { useEffect, useState } from "react"

interface ICountDownTimer {
  className?: string
  hours: number
  showHours?: boolean
  minutes: number
  showMinutes?: boolean
  seconds: number
  showSeconds?: boolean
  timeoutSetter?: (timeout: boolean) => void
}

const CountDownTimer = ({
  className,
  hours = 0,
  showHours = true,
  minutes = 0,
  showMinutes = true,
  seconds = 0,
  showSeconds = true,
  timeoutSetter = () => false, 
}: ICountDownTimer) => {
  const [time, timeSetter] = useState<ICountDownTimer>({ hours, minutes, seconds })
  
  const tick = () => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) return
    else if (time.minutes === 0 && time.seconds === 0) {
      timeSetter({hours: time.hours - 1, minutes: 59, seconds: 59})
    }
    else if (time.seconds === 0) {
      timeSetter({hours: time.hours, minutes: time.minutes - 1, seconds: 59})
    }
    else {
      timeSetter({hours: time.hours, minutes: time.minutes, seconds: time.seconds - 1})
    }
  }
  
  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000)
    return () => clearInterval(timerId)
  })

  useEffect(() => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) timeoutSetter(true)
  }, [time, timeoutSetter])

  return (
    <p className={className}>
      <span>{`${showHours ? time.hours.toString().padStart(2, '0') : ''}`}</span>
      <span>{`${showHours === false || showMinutes === false? '' : ':'}`}</span>
      <span>{`${showMinutes ? time.minutes.toString().padStart(2, '0') : ''}`}</span>
      <span>{`${showMinutes === false || showSeconds === false ? '' : ':'}`}</span>
      <span>{`${showSeconds ? time.seconds.toString().padStart(2, '0') : ''}`}</span>
    </p>
  )
}

export default CountDownTimer