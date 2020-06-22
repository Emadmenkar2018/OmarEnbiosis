import React from 'react'
import fontSourceLight from '../../../../../static/fonts/Graphik/Graphik-Light.ttf'
import fontSourceBold from '../../../../../static/fonts/Graphik/Graphik-Medium.ttf'
import fontSourceBolder from '../../../../../static/fonts/Graphik/Graphik-Regular.ttf'
import { Document, Font } from '@react-pdf/renderer';
import MainPage from '../../MainPage/MainPage'
import LastPage from '../../LastPage/LastPage'
import DearPage from '../DearPage/DearPage'
import MicroTestDescPage from '../MicroTestDescPage/MicroTestDescPage'
import MicroWorldPage from '../MicroWorldPage/MicroWorldPage'
import MicroTestResultSection from '../MicroTestResultSection/MicroTestResultSection'
import TaxonomicSection from '../TaxonomicSection/TaxonomicSection'
import CloseProfilesSection from '../CloseProfilesSection/CloseProfilesSection'
import AllScoresSection from '../AllScoresSection/AllScoresSection';

Font.register({ family: 'graphik', fonts: [
    {src: fontSourceLight},
    {src: fontSourceBold, fontWeight: 'bold'},
    {src: fontSourceBolder, fontWeight: 'bolder'}
]})

const ResultDoc = ({activeKit, user, microTestResult, taxonomicResult, taxImgs, closeProfiles, closeImgs, allScores, allScoresImgs}) => {
    return (
        <Document>
            <MainPage
                reportTitle='MİKROBİYOM ANALİZİ'
                reportTitleColor='#e3614d'
                activeKit={activeKit}
            />
            <DearPage
                activeKit={activeKit}
                name={user.name}
            />
            <MicroTestDescPage
                activeKit={activeKit}
            />
            <MicroWorldPage
                activeKit={activeKit}
            />
            <MicroTestResultSection
                activeKit={activeKit}
                microTestResult={microTestResult}
            />
            <TaxonomicSection
                activeKit={activeKit}
                taxonomicResult={taxonomicResult}
                taxImgs={taxImgs}
            />
            <CloseProfilesSection
                activeKit={activeKit}
                closeProfiles={closeProfiles}
                closeImgs={closeImgs}
            />
            <AllScoresSection
                activeKit={activeKit}
                allScores={allScores}
                allScoresImgs={allScoresImgs}
            />
            <LastPage
                activeKit={activeKit}
            />
        </Document>
    )
}

export default ResultDoc;