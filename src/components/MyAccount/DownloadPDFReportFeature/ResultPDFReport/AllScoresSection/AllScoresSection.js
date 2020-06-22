import React from 'react'
import { Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
import PageHeader from '../../PageHeader/PageHeader'
import PageFooter from '../../PageFooter/PageFooter'

const AllScoresSection = ({activeKit, allScores, allScoresImgs}) => {
    let viewList = allScores.map(score => {
        return score.items.map((item, index) => 
            <View key={index}>
                <Text style={styles.altTitle}>{item.head}</Text>
                {item.desc.map((d, dIndex) => 
                    <Text 
                        key={dIndex}
                        style={styles.scoreDesc}
                    >
                        {d}.
                    </Text>
                )}
                <View style={styles.lineBreaker}></View>
                <Text style={styles.altTitle}>Sizin Örneğiniz</Text>
                <Image
                    style={styles.scoreBarImg}
                    src={allScoresImgs[item.head]}
                />
            </View>
        )
    });
    viewList = viewList.reduce((acc, currentValue) => {
        return [...acc, ...currentValue]
    }, [])
    return (
        viewList.map((view, index) => 
            <Page key={index} size='A4' style={styles.page}>
                <PageHeader
                    activeKit={activeKit}
                />
                {index === 0 && 
                    <Text style={styles.mainTitle}>Bağırsak Skorların</Text>
                }
                {view}
                <PageFooter/>
            </Page>
        )
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'graphik',
        fontSize: '13pt',
        color: '#15171a'
    },
    mainTitle: {
        color: '#e3614d',
        fontWeight: 'bold',
        fontSize: '17pt',
        margin: '10px 0'
    },
    altTitle: {
        color: '#e3614d',
        margin: '10px 0',
        fontSize: '20pt',
        fontWeight: 'bold'
    },
    scoreDesc: {
        marginBottom: 10
    },
    lineBreaker: {
        margin: '20px 0',
        borderTop: 2,
        borderColor: '#e6e9f0'
    },
    microScoreWrapper: {
        width: '100%',
        height: '55px',
        margin: '40px 0 30px'
    },
    scoreBarImg: {
        width: '100%'
    }
})

export default AllScoresSection;