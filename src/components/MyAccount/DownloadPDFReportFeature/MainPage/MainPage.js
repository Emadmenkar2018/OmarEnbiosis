import React from 'react'
import logo from '../../../../static/images/logo.png'
import eLogo from '../../../../static/images/e-.png'
import { Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';

const MainPage = ({reportTitle, reportTitleColor, activeKit}) => {
    return (
        <Page size='A4' style={styles.page}>
            <Image
                style={styles.eLogo}
                src={eLogo}
            />
            <View style={styles.mainPageHead}>
                <Image
                    style={styles.logoHead}
                    src={logo}
                />
                <Text style={styles.kitCode}>{activeKit.kit_code}</Text>
            </View>
            <View>
                {reportTitle.split(' ').map((t, index) =>
                    <Text key={index} style={{color: reportTitleColor, ...styles.reportTitle}}>
                        {t}
                    </Text>
                )}
            </View>
            <Text style={styles.email}>enbiosis.com</Text>
        </Page>
    )
}

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'graphik',
        fontSize: '15pt',
        color: '#15171a',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between'
    },
    eLogo: {
        position: 'absolute',
        width: '100%',
        top: '22.5%',
        left: '5.5%'
    },
    mainPageHead: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    logoHead: {
        width: '270px'
    },
    reportTitle: {
        fontSize: '65pt',
        textAlign: 'center'
    },
    email: {
        fontSize: '20pt'
    }
})

export default MainPage;