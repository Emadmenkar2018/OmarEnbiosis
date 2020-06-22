import React from 'react'
import logo from '../../../../static/images/logo.png'
import { View, Image, StyleSheet } from '@react-pdf/renderer';

const PageFooter = () => {
    return (
        <View style={styles.pageFooter}>
            <Image
                style={styles.logoImg}
                src={logo}
            />
        </View>
    )
}

// Create styles
const styles = StyleSheet.create({
    pageFooter: {
        marginTop: 'auto'
    },
    logoImg: {
        width: 80
    }
})

export default PageFooter;