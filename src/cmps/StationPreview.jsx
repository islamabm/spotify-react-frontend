import React from "react"
import { Link } from "react-router-dom"

export function StationPreview({ station }) {
  return (
    <Link to={`/station/${station._id}`} className="info">
      <article className="station-preview">
        <div className="station-img">
          <img src={station.imgUrl} alt="" />
        </div>
        <div className="station-info">
          <h3>{station.name}</h3>
          <p>{station.description}</p>
        </div>
      </article>
    </Link>
  )
}
