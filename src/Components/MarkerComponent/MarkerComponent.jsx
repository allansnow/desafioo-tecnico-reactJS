import React from 'react'
import { useState, useEffect } from 'react'
import { Marker, Popup} from "react-leaflet";

const MarkerComponent = ({equipment, correctModelsName}) => {

    const [icon, setIcon] = useState('https://static.vecteezy.com/system/resources/previews/014/455/904/original/delivery-truck-icon-icon-on-transparent-background-free-png.png');

    useEffect(()=>{
        if (correctModelsName === 'Caminhão de carga') {
          setIcon('https://static.vecteezy.com/system/resources/previews/014/455/904/original/delivery-truck-icon-icon-on-transparent-background-free-png.png')
          return
        }
        else if (correctModelsName === 'Harvester') {
          setIcon('https://static.thenounproject.com/png/198697-200.png')
          return
        }
        else if (correctModelsName === 'Garra traçadora') {
          setIcon('https://cdn-icons-png.flaticon.com/512/6826/6826137.png')
        }
      }, [])

      var truckIcon = L.icon({
        iconUrl: icon,

        iconSize:     [70, 70],
        shadowSize:   [50, 64], 
        iconAnchor:   [22, 94], 
        shadowAnchor: [4, 62],  
        popupAnchor:  [-3, -76] 
        
    });

  return (
    <div>
      <Marker icon={truckIcon} position={[equipment.positions[0].lat, equipment.positions[0].lon]}>
              <Popup>
               <p>{correctModelsName}</p>
              </Popup>
            </Marker>
    </div>
  )
}

export default MarkerComponent
