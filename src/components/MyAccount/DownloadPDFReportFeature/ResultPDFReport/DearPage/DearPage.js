import React from 'react'
import enbiosisBox from '../../../../../static/images/enbiosis-box.png'
import { Page, Text, Image, StyleSheet } from '@react-pdf/renderer';
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
            <Text style={styles.marginText}>
                Sana sunulmuş olan mikrobiyom analiz raporu ilk önce kendini keşfetmeni sağlar. Sonrasında, hastalıkların önlenmesi ve belli durumlarda tedavisi için destek sunarken kendini keşfettiğin dünyanda sağlıklı yaşam kaliteni artırmayı amaçlar.
            </Text>
            <Text style={styles.marginText}>
                Fakat unutmamalısın ki, bu rapor hastalıklarla ilgili herhangi bir teşhis koymaz veya onları tedavi etmez. Teşhis ve/veya tedavi için ilgili sağlık çalışanı ile iletişime geçebilirsin.
            </Text>
            <Text style={styles.marginText}>
                <Text style={styles.boldText}>ENBİOSİS Biyoteknoloji</Text> mikrobiyologlar, biyoinformatik uzmanları, uzman hekimler ve diyetisyenler ile multidisipliner olarak çalışarak ürünlerini oluşturmakta ve hizmetler sunmaktadır.
            </Text>
            <Text style={styles.marginText}>
                Yeni nesil teknolojileri hedef alıp sağlık etiği ve değerlerine bağlı kalarak mikrobiyom bilimini ilerletmek ve kişiselleştirilmiş sağlık teknolojileri üretmek adına kurulan, Imagine Tomorrow 2020’de  “2019 Sağlık Alanında Yılın Girişimi” ödülünü alan Türkiye'deki ilk ve tek şirkettir.
            </Text>
            <Text style={{...styles.profName, ...styles.boldText}}>
                Doç. Dr. Aycan GÜNDOĞDU
            </Text>
            <Image
                style={styles.kitImage}
                src={enbiosisBox}
            />
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
    title: {
        fontSize: '17pt',
        marginTop: 10
    },
    marginText: {
        marginBottom: 10
    },
    customerName: {
        color: '#e3614d'
    },
    boldText: {
        fontWeight: 'bold'
    },
    profName: {
        marginLeft: 'auto'
    },
    kitImage: {
        width: '100%',
        position: 'absolute',
        right: 0,
        bottom: 100
    }
})

export default DearPage;