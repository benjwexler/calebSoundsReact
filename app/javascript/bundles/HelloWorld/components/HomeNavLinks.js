import React, { Fragment } from 'react'

const homeNavLinks = () => {
    return (
        <Fragment>
        <li className="nav-item ">
            <a id="latestReleasesLink" className="nav-link">Latest Releases</a>
        </li>

        <li className="nav-item ">
            <a id="drumMachineLink" className="nav-link">Drum Machine</a>
        </li>
    </Fragment>
    )
}

export default homeNavLinks