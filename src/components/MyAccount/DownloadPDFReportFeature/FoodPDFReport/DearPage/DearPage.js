import React from 'react'
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PageHeader from '../../PageHeader/PageHeader'
import PageFooter from '../../PageFooter/PageFooter'

const DearPage = ({activeKit, name}) => {
    return (
        <Page size='A4' style={styles.page}>
            <PageHeader
                activeKit={activeKit}
            />
            <Text style={{...styles.title, ...styles.marginText, ...styles.boldText}}>
                Sevgili <Text style={styles.customerName}>{name},</Text>
            </Text>
            <Text style={{...styles.marginText, ...styles.boldText}}>
                Mikrobiyom dünyanı keşfettiğin ENBIOSIS ailesinde sana sunulan besin skorları ile bağırsağında bulunan bakterilerini yönetmek artık daha kolay!
            </Text>

            <Text style={styles.marginText}>
                Bağırsağındaki bakterilerin çeşitliliği ve her bir çeşidin miktarı;
            </Text>
            <View style={styles.marginText}>
                <View style={styles.itemWrapper}>
                    <View style={styles.dot}></View>
                    <Text style={styles.marginAltText}>
                        Beslenme şeklin (yiyecek ve içeceklerde bulunan bileşenler gibi),
                    </Text>
                </View>
                <View style={styles.itemWrapper}>
                    <View style={styles.dot}></View>
                    <Text style={styles.marginAltText}>
                        Bağırsak ortamının onlara sunduğu biyokimyasal süreçler (safra asitleri, kolesterol, sindirim enzimleri vb.) ve
                    </Text>
                </View>
                <View style={styles.itemWrapper}>
                    <View style={styles.dot}></View>
                    <Text style={styles.marginAltText}>
                        Onları maruz bıraktığın antibakteriyellere, toksinlere göre değişir.
                    </Text>
                </View>
            </View>

            <Text style={styles.marginText}>
                <Text style={styles.boldText}>ENBİOSİS</Text> senin için besin skorlarını oluştururken;
            </Text>
            <View style={styles.marginText}>
                <View style={styles.itemWrapper}>
                    <View style={styles.dot}></View>
                    <Text style={styles.marginAltText}>
                        Bakterilerin üretim yolağında rol aldığı metabolitlerin üretimi nasıl sağlanabilir?
                    </Text>
                </View>
                <View style={styles.itemWrapper}>
                    <View style={styles.dot}></View>
                    <Text style={styles.marginAltText}>
                        Mikrobiyom elemanları birbirlerine ve/veya sana ne tür sinyaller iletir?
                    </Text>
                </View>
                <View style={styles.itemWrapper}>
                    <View style={styles.dot}></View>
                    <Text style={styles.marginAltText}>
                        Bakteriler enerji üretmek için hangi yolakları ya da besinleri kullanır?
                    </Text>
                </View>
                <View style={styles.itemWrapper}>
                    <View style={styles.dot}></View>
                    <Text style={styles.marginAltText}>
                        Mikrobiyomun glikoz, fruktoz veya daha kompleks nişastalar gibi karbonhidratlardan hangilerini tüketir?
                    </Text>
                </View>
                <View style={styles.itemWrapper}>
                    <View style={styles.dot}></View>
                    <Text style={styles.marginAltText}>
                        Hangi mikrobiyal faaliyetler senin için zararlı olabilir?
                    </Text>
                </View>
                <Text style={{...styles.boldText, ...styles.smallText}}>
                    sorularını gözeterek doğru çözümleri sana sunuyor.
                </Text>
            </View>

            <Text style={styles.mainTitle}>
                ENBİOSİS Besin Skorları
            </Text>
            <Text style={styles.marginText}>
                Sana herhangi bir teşhis koymaz, seni tedavi etmez. Teşhis ve tedavi için ilgili sağlık çalışanın ile iletişime geçmelisin.
            </Text>
            <Text>
                Sana sunulmuş olan mikrobiyom analiz raporu ilk önce kendini tanımanı sağlar. Sonrasında, hastalıkların önlenmesi ve belli durumlarda tedavisi için destek sunarken kendini keşfettiğin dünyanda sağlıklı yaşam kaliteni artırmayı amaçlar.
            </Text>
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
    title: {
        fontSize: '17pt',
        marginTop: 10
    },
    marginText: {
        marginBottom: 10
    },
    marginAltText: {
        marginBottom: 5
    },
    customerName: {
        color: '#e3614d'
    },
    boldText: {
        fontWeight: 'bold'
    },
    smallText: {
        fontSize: '11pt'
    },
    itemWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    dot: {
        backgroundColor: '#e3614d',
        width: 6,
        height: 4,
        borderRadius: 50,
        marginRight: 5,
        marginTop: 3
    }
})

export default DearPage;