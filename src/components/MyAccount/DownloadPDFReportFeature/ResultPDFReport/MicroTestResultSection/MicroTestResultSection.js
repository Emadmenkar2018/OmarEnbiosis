import React from 'react'
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PageHeader from '../../PageHeader/PageHeader'
import PageFooter from '../../PageFooter/PageFooter'

const COLORS = {
    kotu: '#e3614d',
    orta: '#edd1a1',
    iyi: '#59c5d9'
}

const MicroTestResultSection = ({activeKit, microTestResult}) => {
    const {range, Age} = microTestResult;
    return (
        <Page size='A4' style={styles.page}>
            <PageHeader
                activeKit={activeKit}
            />
            <Text style={styles.mainTitle}>Mikrobiyom Çeşitliliğin</Text>
            <View style={{...styles.wrapper, ...styles.range}}>
                <Text style={styles.rangeValue}>
                    {range.value}
                </Text>
                <Text style={{color: COLORS[range.rank], ...styles.rangeTitle}}>
                    {range.rank_title}
                </Text>
            </View>
            <Text style={styles.secDesc}>{range.desc}</Text>
            
            <Text style={styles.mainTitle}>Mikrobiyom Yaşı</Text>
            <View style={{...styles.wrapper, ...styles.age}}>
                <Text style={styles.ageTitle}>
                    {Age.title}
                </Text>
                <Text style={styles.ageValue}>
                    {Age.value}
                </Text>
            </View>
            <Text style={styles.secDesc}>{Age.desc}</Text>
            <PageFooter/>
        </Page>
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
    secDesc: {
        marginBottom: 10
    },
    wrapper: {
        fontWeight: 'bold',
        border: 1,
        borderColor: '#e6e9f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: '10px 0 20px'
    },
    range: {
        width: 110,
        height: 110,
        borderRadius: 100
    },
    age: {
        width: 120,
        height: 130,
        borderRadius: 10
    },
    rangeTitle: {
        width: '100%',
        textAlign: 'center',
        fontSize: '20pt'
    },
    rangeValue: {
        color: '#95989e',
        fontSize: '25pt'
    },
    ageTitle: {
        width: '100%',
        color: '#565d68',
        textAlign: 'center',
        padding: '0 20px',
        marginBottom: 20
    },
    ageValue: {
        color: '#fe7a6e',
        fontSize: '25pt'
    }
})

export default MicroTestResultSection;