import React from 'react'
import Equipment from '../EquipmentComponent/Equipment';

const EquipsContainer = ({filteredEquipments}) => {
  return (
    <div>
      {filteredEquipments.map((equipment) => {
          return (
           <Equipment key={equipment.id} equipment={equipment}
            />
          );
        })}
    </div>
  )
}

export default EquipsContainer
