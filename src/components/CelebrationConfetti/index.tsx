import React from 'react'
import {useWindowSize} from 'react-use'
import Confetti from 'react-confetti'

// @TODO: make it reusable for multiple holidays
export default function CelebrationConfetti() {
  const {width, height} = useWindowSize()
  const isNewYear = (new Date().getMonth() === 0) as boolean
  return (
    <Confetti run={isNewYear} recycle={false} width={width} height={height} />
  )
}
