import React from 'react'
import {useWindowSize} from 'react-use'
import Confetti from 'react-confetti'

// @TODO: make it reusable for multiple holidays
export default function CelebrationConfetti() {
  const {width, height} = useWindowSize()
  const today = new Date()
  const isNewYear = (today.getMonth() === 0 && today.getDate() <= 5) as boolean

  return (
    <Confetti run={isNewYear} recycle={false} width={width} height={height} />
  )
}
