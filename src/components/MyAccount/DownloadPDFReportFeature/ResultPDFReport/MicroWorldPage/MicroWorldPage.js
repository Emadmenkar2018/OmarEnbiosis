import React from 'react'
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PageHeader from '../../PageHeader/PageHeader'
import PageFooter from '../../PageFooter/PageFooter'

const MicroWorldPage = ({activeKit}) => {
    return (
        <Page size='A4' style={styles.page}>
            <PageHeader
                activeKit={activeKit}
            />
            <Text style={styles.mainTitle}>Mikrobiyom Dünyana Hoşgeldin!</Text>
            <View style={styles.marginText}>
                <Text style={styles.boldText}>
                    Mikrobiyom elemanları çeşitli ve dağılımı dengeli, 8-10 arasında ise;
                </Text>
                <Text>
                    Mikrobiyomundaki bakteri çeşitliliğinin sayısı sağlıklı bir mikrobiyom için yeterli ve dağılımı dengeli görünüyor. Şimdi yapman gereken bunu sürdürülebilir hale getirmen!
                </Text>
            </View>
            <View style={styles.marginText}>
                <Text style={styles.boldText}>
                    Mikrobiyom yaşı kronolojik yaşından daha genç ise;
                </Text>
                <Text>
                    İç dünyan olduğundan daha genç! Kronolojik yaşın ilerlerken genç kalman için sana özel kişiselleştirilmiş beslenme rehberi en iyi dostun olacak.
                </Text>
            </View>
            <View style={styles.marginText}>
                <Text style={styles.boldText}>
                    Beden kitle indeksi skorun düşük ve sağlıklı birey ortalamasına yakın ise;
                </Text>
                <Text>
                    Mikrobiyomun sana uygun besinlerle oldukça iyi anlaştığını görüyoruz. Şimdi o besinlerle beslenmeni zenginleştirerek sağlığına sağlık katmanın zamanı!
                </Text>
            </View>
            <View style={styles.marginText}>
                <Text style={styles.boldText}>
                    Karbonhidrat/ Yağ/ Protein Metabolizması sağlıklı bireylerin ortalaması düzeyinde ise;
                </Text>
                <Text>
                    Besinlerden aldığın karbonhidrat/ yağ/ protein bakterini mutlu edecek düzeyde. Beslenmende sağlıklı karbonhidrat/ yağ/ protein içeriğini artırdığında onlarla birlikte mutlu olmak artık senin elinde!
                </Text>
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
    boldText: {
        fontWeight: 'bold'
    },
    marginText: {
        marginBottom: 20
    }
})

export default MicroWorldPage;