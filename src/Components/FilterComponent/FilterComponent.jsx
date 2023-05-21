import React from "react";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import "./FilterComponent.css"

const FilterComponent = ({ setFilteredEquipments, equipments, equipmentsModelJson }) => {
  useEffect(() => {
    setFilteredEquipments(equipments);
  }, []);

  const idTodos = 1;

  const [select, setSelect] = useState("Todos");

  const handleSelect = (e) => {
    let equipmentModelIdSelected = e.target.value;
    if (equipmentModelIdSelected == idTodos) {
      setFilteredEquipments(equipments);
      setSelect(equipmentModelIdSelected);
      return;
    }
    const newEquipments = equipments.filter(
      (equip) => equip.equipmentModelId === equipmentModelIdSelected
    );
    setSelect(equipmentModelIdSelected);
    setFilteredEquipments(newEquipments);
  };

  return (
    <div>
      <div className="select-container">
        <select
          value={select}
          onChange={handleSelect}
          className="select"
          name="select"
          id="select"
        >
          <option value={idTodos}>Todos</option>
          {equipmentsModelJson.map((equip) => {
            return (
              <option key={equip.id} value={equip.id}>
                {equip.name}
              </option>
            );
          })}
        </select>
        <div className="icon-container">
          <i>
            <FaCaretDown className="select-icon"></FaCaretDown>
          </i>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
