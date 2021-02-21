import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const NotificationBanner = (props) => {
  const { text, dismissible = false, enabled = false } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('seen')

    if (seen !== 'yes') {
      setVisible(true)
      if (dismissible) {
        setTimeout(() => {
          setVisible(false)
          sessionStorage.setItem('seen', 'yes')
        }, 5000)
      }
    }
  }, [])

  return ((enabled)
    ? (visible) && <div className='flex items-center justify-center pa4 bg-lightest-blue navy avenir'>
      <svg className='w1' data-icon='info' viewBox='0 0 32 32'>
        <title>Notification</title>

        <path d='M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6' />
      </svg>

      <span className='lh-title ml3'>{text}</span>
    </div>
    : <></>)
}

NotificationBanner.propTypes = {
  text: PropTypes.string,
  dismissible: PropTypes.bool,
  enabled: PropTypes.bool,
}

export default NotificationBanner
