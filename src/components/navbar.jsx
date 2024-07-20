import React from 'react'
import { Link } from 'react-router-dom'

function navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-black">
  <div className="container-fluid">
    <a className="navbar-brand text-white" href="#">TASKBOARD</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">

        <li className="nav-item">
          <Link className="nav-link active text-success" to="/">Create Task</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active text-info" to="/all">List Task</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
  )
}

export default navbar