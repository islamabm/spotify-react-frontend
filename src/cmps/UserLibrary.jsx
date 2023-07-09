import React, { useState, useEffect } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { SortModal } from './Modals/SortModal'
import { useDispatch, useSelector } from 'react-redux'
import { UserStationsIndex } from './UserStations/UserStationsIndex'
import { addStation } from '../store/actions/station.actions'
import emptyImg from '../assets/imgs/empty-img.png'
import { updateUserStations } from '../store/actions/user.actions'
import { useNavigate } from 'react-router-dom'
export function UserLibrary() {
  const [showSortModal, setShowSortModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Recents')
  const [stationCounter, setStationCounter] = useState(0)
  // const [librarySize, setLibrarySize] = useState('original'); 

  const [filterUserStations, setFilterUserStations] = useState('')

  const [isScrolled, setIsScrolled] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  function onShowSortModal() {
    setShowSortModal((prevState) => !prevState)
    setShowInput(false)
  }

  function onSelectOption(ev, option) {
    ev.stopPropagation()
    setSelectedOption(option)
    setShowSortModal(false)
  }

  function createNewStation() {
    setStationCounter(stationCounter + 1)
    const name = `My Playlist #${stationCounter}`
    dispatch(addStation(name, [], emptyImg))
    // dispatch(updateUserStations(station, user))
  }

  useEffect(() => {
    const filterAndListSection = document.querySelector('.filter-and-list')
    const checkScroll = () => {
      if (filterAndListSection.scrollTop > 0 && !isScrolled) {
        setIsScrolled(true)
      } else if (filterAndListSection.scrollTop === 0 && isScrolled) {
        setIsScrolled(false)
      }
    }

    filterAndListSection.addEventListener('scroll', checkScroll)

    return () => {
      filterAndListSection.removeEventListener('scroll', checkScroll)
    }
  }, [isScrolled])

  function openInput() {
    setShowInput(true)
  }

  function goToUserLibrary() {
    navigate('/library')
    // setLibrarySize((prevSize) => (prevSize === 'original' ? 'smaller' : 'original'));
  }

  return (
    <>
      <section className={`user-library`}>
      {/* ${librarySize} */}
        <section className="library-header-wrapper">
          <div
            className={`flex align-center library-header ${
              isScrolled ? 'scrolled' : ''
            }`}
          >
            <div
              onClick={goToUserLibrary}
              className="flex align-center your-library pointer"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('libraryIconActive'),
                }}
              ></span>
               {/* {librarySize === 'original' && ( */}
                 <span>Your Library</span>
                 {/* )} */}
                
                
                
            </div>
            {/* {librarySize === 'original' && ( */}
            <span
              title="Create Playlist"
              onClick={createNewStation}
              className="plus-icon flex align-center justify-center pointer title create"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('plus'),
              }}
            ></span>
            {/* )} */}
          </div>
          {/* <div className="your-library-btns flex align-center">
            <button className="library-btn pointer">Playlists</button>
            <button className="library-btn pointer">Artists</button>
            <button className="library-btn pointer">Albums</button>
          </div> */}
        </section>
        <section className="filter-and-list">
          <div className="library-filter">
          {/* {librarySize === 'original' && ( */}
            <div className="input-container">
              <span
                onClick={openInput}
                title="Search in Your Library"
                className="smaller-search pointer flex align-center justify-center title"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('smallerSearchIcon'),
                }}
                ></span>
              {showInput && (
                // {showInput && librarySize === 'original' && (
                <input
                className={`search-input ${showInput ? 'open' : 'close'}`}
                type="text"
                placeholder="Search in Your Library"
                value={filterUserStations}
                onChange={(e) => setFilterUserStations(e.target.value)}
                />
              )}
            </div>
              {/* )} */}
               {/* {librarySize === 'original' && ( */}
            <div onClick={onShowSortModal} className="sort-by-section relative">
              <span className="sort-by-span">{selectedOption}</span>
              <span
                className="pointer arrow"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg(
                    showSortModal ? 'upperArrow' : 'bottomArrowIcon'
                    ),
                  }}
                  ></span>
              {showSortModal && <SortModal onSelectOption={onSelectOption} />}
            </div>
            {/* )} */}
          </div>
          <UserStationsIndex filterUserStations={filterUserStations} />
        </section>
      </section>
    </>
  )
}
