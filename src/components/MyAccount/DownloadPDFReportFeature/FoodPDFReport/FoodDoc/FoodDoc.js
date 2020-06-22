import React from 'react'
import fontSourceLight from '../../../../../static/fonts/Graphik/Graphik-Light.ttf'
import fontSourceBold from '../../../../../static/fonts/Graphik/Graphik-Medium.ttf'
import fontSourceBolder from '../../../../../static/fonts/Graphik/Graphik-Regular.ttf'
import { Document, Font } from '@react-pdf/renderer'
import MainPage from '../../MainPage/MainPage'
import LastPage from '../../LastPage/LastPage'
import DearPage from '../DearPage/DearPage'
import InnerVoiceBodyPage from '../InnerVoiceBodyPage/InnerVoiceBodyPage'
import YourFoods from '../YourFoods/YourFoods'
import FoodScoresPage from '../FoodScoresPage/FoodScoresPage'

Font.register({ family: 'graphik', fonts: [
    {src: fontSourceLight},
    {src: fontSourceBold, fontWeight: 'bold'},
    {src: fontSourceBolder, fontWeight: 'bolder'}
]})

const FoodDoc = ({activeKit, user, foodList}) => {
    const allFoods = foodList.find(foods => foods.foodType === 'Tümü');
    const otherFoods = foodList.filter(foods => foods.foodType !== 'Tümü');
    return (
        <Document>
            <MainPage
                reportTitle='BESİN SKORLARI'
                reportTitleColor='#e3614d'
                activeKit={activeKit}
            />
            <DearPage
                activeKit={activeKit}
                name={user.name}
            />
            <InnerVoiceBodyPage
                activeKit={activeKit}
            />
            <YourFoods
                activeKit={activeKit}
                allFoods={allFoods}
            />
            <FoodScoresPage
                activeKit={activeKit}
                foodList={otherFoods}
            />
            <LastPage
                activeKit={activeKit}
            />
        </Document>
    )
}

export default FoodDoc;