import { getSpotifySvg } from '../services/SVG.service'
import { useLocation, Link } from 'react-router-dom'
import { UserModal } from './UserModal'
import { useState, useEffect, useCallback } from 'react'

export function AppHeader() {
  const [showModal, setShowModal] = useState(false)
  const location = useLocation()
  // const [headerOpacity, setHeaderOpacity] = useState(0)
  const [headers, setHeaders] = useState({})
  function updateHeaderOpacity() {
    console.log('hi')
    const headerStyles = {
      backgroundColor: 'red',
    }
    setHeaders(headerStyles)
  }
  useEffect(() => {
    console.log('scroll')
    console.log('window', window)
    window.addEventListener('scroll', updateHeaderOpacity)

    return () => {
      window.removeEventListener('scroll', updateHeaderOpacity)
    }
  }, [])
  function onShowModal() {
    setShowModal(true)
  }

  function onCloseModal() {
    setShowModal(false)
  }
  return (
    <header
      className="app-header"
      style={{ headers }}
      // style={{ backgroundColor: `rgba(10,10,10, ${headerOpacity})` }}
    >
      <section className="arrows-and-input">
        <section className="arrows">
          <div className="black-circle">
            <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('leftArrowIcon'),
              }}
            ></span>
          </div>
          <div className="black-circle">
            <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('rightArrowIcon'),
              }}
            ></span>
          </div>
        </section>
        {location.pathname === '/search' && (
          <div className="flex align-center justify-center">
            <input placeholder="What do you want to listen to?" />
          </div>
        )}
      </section>

      <div className="user-actions">
        <button className="sign-up pointer">Sign up</button>
        <Link to="/login">
          <button className="login pointer">Log in</button>
        </Link>
        <img
          onClick={onShowModal}
          src="https://i.scdn.co/image/ab6761610000e5eb601fb0059594d52f3f7939a9"
          className="pointer"
        />
      </div>
      {showModal && <UserModal onClose={onCloseModal} />}
    </header>
  )
}
