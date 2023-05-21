import { MapContainer, TileLayer } from "react-leaflet";

import equipmentsPositionHistoryJson from "../../data/equipmentPositionHistory.json";
import equipmentsModelJson from "../../data/equipmentModel.json";
import equipmentsJson from "../../data/equipment.json";

import MarkerComponent from "../MarkerComponent/MarkerComponent";
import L from "leaflet";
import "./FullMap.css"


const FullMap = () => {

  return (
    <div className="full-map-container">
      <div id="full-map">
        <MapContainer
          className="map-container"
          center={[-19.126536, -45.947756]}
          zoom={10.5}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {equipmentsPositionHistoryJson.map((equipment) => {
            const correctEquip = equipmentsJson.find(
              (equip) => equip.id === equipment.equipmentId
            );
            const correctModels = equipmentsModelJson.find(
              (equip) => equip.id === correctEquip.equipmentModelId
            );

            return (
              <MarkerComponent
                equipment={equipment}
                correctModelsName={correctModels.name}
              />
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default FullMap;
