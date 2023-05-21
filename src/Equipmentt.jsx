import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import {
  FaTruck,
  FaArrowDown,
  FaCheck,
  FaAngleDown,
  FaPlus,
  FaCaretDown,
  FaCaretUp,
  FaTractor,
} from "react-icons/fa";

import { GiClaws } from "react-icons/gi";

const Equipment = ({
  equipment,
  equipsModel,
  equipsState,
  equipsStateHistory,
  equipsPositionHistory,
}) => {

  const [openAccordion, setOpenAccordion] = useState(false)

  const { id, name, equipmentModelId } = equipment;
  console.log('test');
  const [icon, setIcon] = useState("");
  const [stateCss, setStateCss] = useState("");
  const [toggle, setToggle] = useState(false);


  // Encontrando modelo do equipamento
  const itemModel = equipsModel.find((equip) => equip.id === equipmentModelId);

  // Encontrando o equipamento específico para posteriormente encontrar o estado mais recente
  const itemState = equipsStateHistory.find(
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

  const sortedItemStates = itemState.states.sort(customSort);


  // Encontrando o estado mais recente do equipamento
  const gettingState = (index) => {
    const itemCurrentState = equipsState.find(
      (equip) => equip.id === sortedItemStates[index].equipmentStateId
    );
    return itemCurrentState.name;
  };

  // Criando um array com os 4 estados mais recentes do equipamento
  const itemLastStates = [
    gettingState(1),
    gettingState(2),
    gettingState(3),
    gettingState(4),
  ];

  // Acessando o estado atual do equipamento
  const itemCurrentState = gettingState(0);

  const equipPositions = equipsPositionHistory.find(
    (equip) => equip.equipmentId == id
  );

  useEffect(() => {
    console.log(id);
    const sortedEquipPositions = equipPositions.positions.sort(customSort);

    if (itemModel.name === 'Caminhão de carga') {
      setIcon(<FaTruck className="icon" />);
    } else if (itemModel.name === "Harvester") {
      setIcon(<FaTractor className="icon" />);
    } else if (itemModel.name=== "Garra traçadora") {
      setIcon(<GiClaws className="icon" />);
    }
  }, []);

  useEffect(() => {
    if (itemCurrentState == "Operando") {
      setStateCss("operando");
    } else if (itemCurrentState == "Manutenção") {
      setStateCss("manutenção");
    } else if (itemCurrentState == "Parado") {
      setStateCss("parado");
    }
  }, [toggle]);

  return (
    <article onClick={() => {setToggle(!toggle); setOpenAccordion(true)} } className="maquina-inteira">
      <div className="maquina-inicial">
        <h2 className="nome-maquina">
          {itemModel.name} / {name}
        </h2>
        <h2 className="icon">{icon}</h2>
        <h2 className={`estado-maquina ${stateCss}`}>{itemCurrentState}</h2>
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <FaCaretUp className="fa-caret-down" />
          ) : (
            <FaCaretDown className="fa-caret-down" />
          )}
        </button>
      </div>
      {toggle ? (
        <div>
          <MapContainer className="map-container"
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          <h3>Ultimas Posições</h3>
          {itemLastStates.map((item) => {
            return <p className={`estado-maquina ${stateCss}`}>{item}</p>;
          })}
        </div>
      ) : null}
    </article>
  );
};

export default Equipment;
