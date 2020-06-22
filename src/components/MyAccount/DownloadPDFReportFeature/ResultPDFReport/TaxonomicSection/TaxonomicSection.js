import React from 'react'
import { Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
import PageHeader from '../../PageHeader/PageHeader'
import PageFooter from '../../PageFooter/PageFooter'

const TaxonomicSection = ({activeKit, taxonomicResult, taxImgs}) => {
    const viewList = taxonomicResult.map((tax, index) => 
        <View key={index}>
            <Text style={styles.altTitle}>{tax.title}</Text>
            <Text>{tax.desc}</Text>
            <View debug={false} style={styles.myImgData}>
                <Image 
                    style={styles.myImg}
                    src={taxImgs[`${tax.title}_0`]}
                />
            </View>
            <View debug={false} style={styles.otherImgData}>
                <Image 
                    style={styles.otherImg}
                    src={taxImgs[`${tax.title}_1`]}
                />
            </View>
        </View>
    );
    return (
        viewList.map((view, index) => 
            <Page key={index} size='A4' style={styles.page}>
                <PageHeader
                    activeKit={activeKit}
                />
                {index === 0 && 
                    <Text style={styles.mainTitle}>Taksonomik Analizin</Text>
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
    myImgData: {
        display: 'flex',
        alignSelf: 'center',
        width: '70%',
        margin: '20px 0',
        border: 1.5,
        borderColor: '#e6e9f0',
        borderRadius: 15
    },
    myImg: {
        width: '95%',
        alignSelf: 'center',
    },
    otherImgData: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        border: 1.5,
        borderColor: '#e6e9f0',
        borderRadius: 15,
        padding: '10px'
    },
    otherImg: {
        width: '95%',
        alignSelf: 'center'
    }
})

export default TaxonomicSection;