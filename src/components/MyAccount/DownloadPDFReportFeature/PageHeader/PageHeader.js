import React, { Fragment } from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const PageHeader = ({activeKit}) => {
    return (
        <Fragment>
            <View style={styles.pageHeader}>
                <View style={styles.reportTitle}>
                    <Text style={styles.label}>
                        RAPOR:
                    </Text>
                    <Text style={styles.text}>
                        ENBİOSİS MİKROBİYOM ANALİZİ
                    </Text>
                </View>
                <View style={styles.customerTitle}>
                    <Text style={styles.label}>
                        KULLANICI:
                    </Text>
                    <Text style={styles.text}>
                        {activeKit.kit_code}
                    </Text>
                </View>
                <View >
                    <Text style={styles.label}>
                        TARİH:
                    </Text>
                    <Text style={styles.text}>
                        {activeKit.registered_at.split(' ')[0]}
                    </Text>
                </View>
            </View>
            <View style={styles.lineBreaker}></View>
        </Fragment>
    )
}

// Create styles
const styles = StyleSheet.create({
    pageHeader: {
        display: 'flex',
        flexDirection: 'row'
    },
    reportTitle: {
        marginRight: '60px'
    },
    customerTitle: {
        marginRight: '40px'
    },
    label: {
        color: '#e3614d',
        fontSize: '7pt',
        fontWeight: 'bold'
    },
    text: {
        fontSize: '10pt'
    },
    lineBreaker: {
        margin: '20px 0',
        borderTop: 2,
        borderColor: '#e6e9f0'
    }
})

export default PageHeader;