import React from 'react'
import './WelcomeSplash.scss'

export default function WelcomeSplash () {
  return (
    <>
      <div id='welcome-splash-container'>
        <div id='welcome-splash-content'>
          <div id='top-content'></div>

          <div id='logo_wrap'>
            <div id='global-logo'>
              <div id='logo-see'>SEE</div>
              <div id='logo-fare'>FARE</div>
            </div>
          </div>

          <div id='destination-wrap'>
            <div id='title'>Selected Location</div>
            <div id='dropdown'>
              <div id='text'>Cape Coral, FL</div>
              <div id='arrow'>▼</div>
            </div>
          </div>

          <div id='didyouknow-wrap'>
            <div id='content'>
              <div id='title'>
                Do you know what a <strong>Knot</strong> is?
              </div>
              <div id='description'>
                One knot is a speed of one nautical mile per hour or 1.852km/hr.
              </div>
            </div>
          </div>

          <div id='go_wrap'>
            <div id='button'>
                GO
            </div>
          </div>

          <div id='undergo_wrap'></div>

          <div id='bottom-content'>
            <div id='disclaimer'>
              This application is currently in beta testing, navigation results
              may not be valid. Do not use this app as a navigation tool.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
