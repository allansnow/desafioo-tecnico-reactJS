import React from "react";
import { useState, useEffect } from "react";
import {
  FaTruck,
  FaCaretDown,
  FaCaretUp,
  FaTractor,
} from "react-icons/fa";
import "./Equipment.css";

import { GiClaws } from "react-icons/gi";

import equipmentsModelJson from "../../data/equipmentModel.json";
import equipmentsStateJson from "../../data/equipmentState.json";
import equipmentsStateHistoryJson from "../../data/equipmentStateHistory.json";
import equipmentsPositionHistoryJson from "../../data/equipmentPositionHistory.json";
import OpenEquipment from "../OpenEquipmentComponent/OpenEquipment";

const Equipment = ({ equipment }) => {
  const { id, name, equipmentModelId } = equipment;
  const [icon, setIcon] = useState("");
  const [stateCss, setStateCss] = useState("");
  const [toggle, setToggle] = useState(false);

  // Encontrando modelo do equipamento
  const itemModel = equipmentsModelJson.find(
    (equip) => equip.id === equipmentModelId
  );

  // Encontrando o equipamento específico para posteriormente encontrar o estado mais recente
  const itemHistoryState = equipmentsStateHistoryJson.find(
    (equip) => equip.equipmentId === id
  );

  // Função para colocar a lista na ordem correta e conseguir acessar o item com a data mais recente
  const customSort = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } else return 0;
  };

  const sortedItemStates = itemHistoryState.states.sort(customSort);

  // Função para encontrar o estado mais recente do equipamento
  const gettingState = (index) => {
    const itemCurrentState = equipmentsStateJson.find(
      (equip) => equip.id === sortedItemStates[index].equipmentStateId
    );
    let data = new Date(sortedItemStates[index].date);
    return [
      itemCurrentState.name,
      `${data.getDate()}/${data.getMonth()}/${data.getFullYear()} / ${data.getHours()}:${data.getMinutes()}0`,
      itemCurrentState.color,
    ];
  };

  // Criando uma array com os 4 estados mais recentes do equipamento
  const itemLastStates = [
    gettingState(0),
    gettingState(1),
    gettingState(2),
    gettingState(3),
  ];

  // Acessando o estado atual do equipamento
  const itemCurrentState = gettingState(0);

  const equipPositions = equipmentsPositionHistoryJson.find(
    (equip) => equip.equipmentId == id
  );

  const sortedEquipPositions = equipPositions.positions.sort(customSort);

  useEffect(() => {
    if (itemModel.name === "Caminhão de carga") {
      setIcon(<FaTruck className="icon" />);
    } else if (itemModel.name === "Harvester") {
      setIcon(<FaTractor className="icon" />);
    } else if (itemModel.name === "Garra traçadora") {
      setIcon(<GiClaws className="icon" />);
    }
  }, []);

  useEffect(() => {
    if (itemCurrentState[0] == "Operando") {
      setStateCss("operando");
    } else if (itemCurrentState[0] == "Manutenção") {
      setStateCss("manutenção");
    } else if (itemCurrentState[0] == "Parado") {
      setStateCss("parado");
    }
  }, [toggle]);

  return (
    <div>
      <article className="maquina-inteira">
        <div
          onClick={() => {
            setToggle(!toggle);
          }}
          className="maquina-inicial"
        >
          <h2 className="nome-maquina">
            {itemModel.name} / {name}
          </h2>
          <h2 className="icon">{icon}</h2>
          <h2 className={`estado-maquina ${stateCss}`}>
            {itemCurrentState[0]}
          </h2>
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <FaCaretUp className="fa-caret" />
            ) : (
              <FaCaretDown className="fa-caret" />
            )}
          </button>
        </div>
        {toggle ? (
          <OpenEquipment
            itemModel={itemModel.name}
            key={id}
            itemLastStates={itemLastStates}
            stateCss={stateCss}
            equipPosition={sortedEquipPositions[0]}
          />
        ) : null}
      </article>
    </div>
  );
};

export default Equipment;
