import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import {
  FaTruck,
} from "react-icons/fa";
import "./OpenEquipment.css"

const OpenEquipment = ({itemLastStates, equipPosition, itemModel}) => {
    const {lat, lon} = equipPosition;

  return (
      <div className='open-equipment'>
          <MapContainer className="map-container"
            center={[lat, lon]}
            zoom={10}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lon]}>
              <Popup>
                {itemModel}
              </Popup>
            </Marker>
          </MapContainer>
          <div className='ultimos-estados'>
          <h3>Ultimos Estados:</h3>
          {itemLastStates.map((item) => {
            let estateBackgroundColor = {backgroundColor: item[2]}
            return <p className={'estado maquina'} style={estateBackgroundColor}>{item[1]}  /  {item[0]}</p>;
          })}
          </div>
        </div>

  )
}

export default OpenEquipment
