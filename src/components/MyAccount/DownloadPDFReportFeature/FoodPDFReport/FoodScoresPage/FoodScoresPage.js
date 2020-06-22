import React, { Fragment } from 'react'
import logoIcon from '../../../../../static/images/logo-icon.png'
import { Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
import PageHeader from '../../PageHeader/PageHeader'
import PageFooter from '../../PageFooter/PageFooter'
import goodIcon from '../../../../../static/images/Icons/good.png'
import enjoyIcon from '../../../../../static/images/Icons/enjoy.png'
import avoidIcon from '../../../../../static/images/Icons/avoid.png'

const FoodScoresPage = ({activeKit, foodList}) => {
    let viewList = foodList.map((food, index) => {
        let itemsList = food.foodItems.map(list => {
            let scoreImg = '';
            switch(list.rank){
                case 'iyi':
                    scoreImg = goodIcon;
                    break;
                case 'orta':
                    scoreImg = enjoyIcon;
                    break;
                case 'kotu':
                    scoreImg = avoidIcon;
                    break;
                default:
                    break;
            }
            return (
                list.items.map(item => 
                    <View key={item.foodId} style={styles.foodItemWrapper}>
                        <Image
                            style={styles.foodImg}
                            src={logoIcon}
                        />
                        <Text style={styles.foodTitle}>{item.foodTitle}</Text>
                        <View style={styles.scoreWrapper}>
                            <Image
                                style={styles.scoreImage}
                                src={scoreImg}
                            />
                            <Text style={styles.scoreValue}>{item.foodValue}</Text>
                        </View>
                    </View>
                )
            )
        })
        itemsList = itemsList.reduce((acc, currentValue) => {
            return [...acc, ...currentValue]
        }, [])
        if(itemsList.length > 22){
            return ([
                <Fragment key={`${food.foodType}_${index}`}>
                    <Text style={styles.altTitle}>{food.foodType}</Text>
                    <View style={styles.foodListWrapper}>
                        {itemsList.slice(0, 22)}
                    </View>
                </Fragment>,
                <Fragment key={`${food.foodType}_${index + 1}`}>
                    <View style={styles.foodListWrapper}>
                        {itemsList.slice(22)}
                    </View>
                </Fragment>
            ])
        }
        return (
            <Fragment key={index}>
                <Text style={styles.altTitle}>{food.foodType}</Text>
                <View style={styles.foodListWrapper}>
                    {itemsList}
                </View>
            </Fragment>
        )
    });
    return (
        viewList.flat().map((view, index) => 
            <Page key={index} size='A4' style={styles.page}>
                <PageHeader
                    activeKit={activeKit}
                />
                {index === 0 && 
                    <Text style={styles.mainTitle}>Besin Skorların</Text>
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
    foodListWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    foodItemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '46%',
        height: '45px',
        padding: '10px 15px',
        marginBottom: '2%',
        marginRight: '2%',
        border: 1,
        borderColor: '#e9ecf0',
        borderRadius: 10
    },
    foodImg: {
        width: 30,
        height: 30,
        marginRight: 15
    },
    foodTitle: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#565D68'
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
        width: 25,
        height: 25
    },
    scoreValue: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11pt'
    }
})

export default FoodScoresPage;