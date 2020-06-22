import React from 'react'
import ImportantMicroItem from './ImportantMicroItem/ImportantMicroItem'

const ImportantMicrosList = ({importantMicros}) => {
    const microsList = importantMicros.map((micro, index) => 
        <ImportantMicroItem
            key={index}
            micro={micro}
        />
    );
    return (
        microsList
    )
}

export default ImportantMicrosList;