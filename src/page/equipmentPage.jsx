import { useEffect, useState } from "react";
import "./EquipmentPage.css"
import aikoImg from "../img/aiko.png";
import equipmentsJson from "../data/equipment.json";
import equipmentsModelJson from "../data/equipmentModel.json";
import FilterComponent from "../Components/FilterComponent/FilterComponent";
import EquipsContainer from "../Components/EquipsContainerComponent/EquipsContainer";
import FullMap from "../Components/FullMapComponent/FullMap";

function EquipmentPage() {
  const [equipments] = useState(equipmentsJson);
  const [filteredEquipments, setFilteredEquipments] = useState([]);

  return (
    <main>
      <img src={aikoImg} alt="hey" />
      <section className="equipamentos-container">
        <FilterComponent
          setFilteredEquipments={setFilteredEquipments}
          equipments={equipments}
          equipmentsModelJson={equipmentsModelJson}
        />
        <EquipsContainer filteredEquipments={filteredEquipments}/>
      </section>
      <FullMap />
    </main>
  );
}

export default EquipmentPage;
