import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

import './map.css'

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const Map = ({ location, zoomLevel, GOOGLE_MAP_API_KEY }) => (
    <div className="google-map" style={{ width: '400px', height: '400px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
        center={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
)

export default Map