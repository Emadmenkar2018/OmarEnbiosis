import React from 'react'
import logo from '../../../../static/images/logo.png'
import { Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';

const LastPage = ({activeKit}) => {
    return (
        <Page size='A4' style={styles.page}>
            <View style={styles.lastPageTitle}>
                <Image
                    style={styles.logoHead}
                    src={logo}
                />
                <Text style={styles.kitCode}>{activeKit.kit_code}</Text>
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
        textAlign: 'center'
    },
    lastPageTitle: {
        marginTop: 'auto'
    },
    logoHead: {
        width: '270px',
        alignSelf: 'center',
        marginBottom: '30px'
    },
    email: {
        fontSize: '20pt',
        marginTop: 'auto'
    }
})

export default LastPage;