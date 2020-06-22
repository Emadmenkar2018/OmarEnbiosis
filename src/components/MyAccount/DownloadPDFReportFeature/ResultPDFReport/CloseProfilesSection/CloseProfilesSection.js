import React from 'react'
import { Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
import PageHeader from '../../PageHeader/PageHeader'
import PageFooter from '../../PageFooter/PageFooter'

const CloseProfilesSection = ({activeKit, closeProfiles, closeImgs}) => {
    const viewList = Object.keys(closeImgs).map((close, index) => 
        <View key={index} style={styles.closeWrapper}>
            <Text style={styles.closeTitle}>{`${close}`}</Text>
            <View style={styles.closeImgWrapper}>
                <Image
                    style={styles.closeImg}
                    src={closeImgs[close]}
                />
            </View>
        </View>
    );
    return (
        <Page size='A4' style={styles.page}>
            <PageHeader
                activeKit={activeKit}
            />
            <Text style={styles.mainTitle}>Yakın Profillerin</Text>
            <Text style={styles.secDesc}>Veri tabanımızda senin profiline benzer olan bireylerin:</Text>
            <View style={styles.closeListWrapper}>
                {viewList}
            </View>
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
        fontWeight: 'bold'
    },
    closeListWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20
    },
    closeWrapper: {
        border: 1.5,
        borderColor: '#e6e9f0',
        borderRadius: 10,
        color: '#a5a7ac',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 125,
        height: 140,
        padding: 15,
        margin: 3
    },
    closeTitle: {
        fontSize: '10pt',
        textAlign: 'center',
        textTransform: 'capitalize',
        width: '100%'
    },
    closeImgWrapper: {
        position: 'absolute'
    },
    closeImg: {
        width: 80,
        marginTop: 10,
        position: 'relative',
        top: 35
    }
})

export default CloseProfilesSection;