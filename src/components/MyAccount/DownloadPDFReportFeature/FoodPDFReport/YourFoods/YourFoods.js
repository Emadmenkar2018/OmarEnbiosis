import React from 'react'
import { Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
import PageHeader from '../../PageHeader/PageHeader'
import PageFooter from '../../PageFooter/PageFooter'
import goodIcon from '../../../../../static/images/Icons/good.png'
import enjoyIcon from '../../../../../static/images/Icons/enjoy.png'
import avoidIcon from '../../../../../static/images/Icons/avoid.png'

const COLORS = {
    kotu: '#e3614d',
    orta: '#edd1a1',
    iyi: '#59c5d9'
}

const YourFoods = ({activeKit, allFoods}) => {
    const viewList = allFoods.foodItems.map((list, index) => {
        let sectionTitle = '';
        let scoreImg = '';
        switch(list.rank){
            case 'iyi':
                sectionTitle = 'İşte Senin Besinlerin!';
                scoreImg = goodIcon;
                break;
            case 'orta':
                sectionTitle = 'Seninle Uyım İçinde Olan Besinler!';
                scoreImg = enjoyIcon;
                break;
            case 'kotu':
                sectionTitle = 'Kaçınman Gereken Besinler!';
                scoreImg = avoidIcon;
                break;
            default:
                break;
        }
        return (
            <View key={index}>
                <Text style={{...styles.mainTitle, color: COLORS[list.rank]}}>
                    {sectionTitle}
                </Text>
                <View style={styles.foodListWrapper}>
                    {list.items.slice(0, 6).map(item => 
                        <View key={item.foodId} style={styles.foodItemWrapper}>
                            <Text style={styles.foodTitle}>{item.foodTitle}</Text>
                            <View style={styles.scoreWrapper}>
                                <Image
                                    style={styles.scoreImage}
                                    src={scoreImg}
                                />
                                <Text style={styles.scoreValue}>{item.foodValue}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        )
    });
    return (
        <Page size='A4' style={styles.page}>
            <PageHeader
                activeKit={activeKit}
            />
            {viewList}
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
        fontWeight: 'bold',
        fontSize: '17pt',
        margin: '10px 0'
    },
    dangerText: {
        color: '#e3614d'
    },
    averageText: {
        color: '#edd1a1'
    },
    goodText: {
        color: '#59c5d9'
    },
    foodListWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    foodItemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f4f6f9',
        width: '31%',
        height: '30px',
        padding: '5px 10px',
        marginBottom: '2%',
        marginRight: '2%'
    },
    foodTitle: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#565D68',
        fontSize: '11pt'
    },
    scoreWrapper: {
        marginLeft: 'auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreImage: {
        position: 'absolute',
        width: 20,
        height: 20
    },
    scoreValue: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11pt'
    }
})

export default YourFoods;