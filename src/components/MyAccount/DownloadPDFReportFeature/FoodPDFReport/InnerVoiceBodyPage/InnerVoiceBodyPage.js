import React, { Fragment } from 'react'
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PageHeader from '../../PageHeader/PageHeader'
import PageFooter from '../../PageFooter/PageFooter'

const InnerVoiceBodyPage = ({activeKit}) => {
    return (
        <Fragment>
            <Page size='A4' style={styles.page}>
                <PageHeader
                    activeKit={activeKit}
                />
                <View>
                    <Text style={styles.mainTitle}>Bedeninin İç Sesi!</Text>
                    <Text style={styles.marginText}>Unutma, mikrobiyomun senin ikizin, içindeki sen!</Text>
                    <Text style={styles.marginText}>Sana sunduğumuz besin skorları, mikrobiyomunun homojen olarak çeşitlenmesi ve dengelenmesi için sana özel!</Text>
                    <Text style={styles.marginText}>Şimdi senin için yararlı - nötr- zararlı olacak besinleri skorlayıp önerilerimizi sunacağız.</Text>
                    <View style={styles.marginText}>
                        <Text>Bunu yaparken;</Text>
                        <Text>
                            <Text style={{...styles.boldText, ...styles.dangerText}}>0-3 arasında</Text> skorlanan besinleri daha az tüketmeni
                        </Text>
                        <Text>
                            <Text style={{...styles.boldText, ...styles.averageText}}>4-7 arasında skorlanan besinleri</Text> dengeli ve çeşitli olacak şekilde tüketmeni
                        </Text>
                        <Text>
                            <Text style={{...styles.boldText, ...styles.goodText}}>8-10 arasında skorlanan besinleri ise</Text> beslenme rehberinde zenginleştirmeni isteyeceğiz.
                        </Text>
                    </View>
                    <Text style={styles.marginText}>Hazırsan, iç dünyanı yönetmeye başlıyoruz!</Text>
                    <Text style={styles.marginText}>Başarılı olman bizim için önemli, o yüzden aşağıda yazanları dikkatlice oku ve kendini yönetmeye başla!</Text>
                </View>
                <View>
                    <Text style={styles.mainTitle}>Alerjin var mı?</Text>
                    <Text style={styles.marginText}>Önerilen besin skorlarında alerjin ve/veya intoleransın olan besinleri de görebilirsin.</Text>
                    <Text style={styles.marginText}>Eğer bir besine karşı alerjin ve/veya intoleransın olduğunu biliyorsan lütfen bu besinleri tüketme. Unutma, besin önerilerin alerjin ve/veya intoleransına göre değil, mikrobiyomuna göre sana sunuluyor.</Text>
                </View>
                <View>
                    <Text style={styles.mainTitle}>En iyi öğün sayısı ve zamanı?</Text>
                    <Text style={styles.marginText}>Günde 2-8 öğün şeklinde beslenebilirsin, bu tamamen senin yaşam şekline ve ihtiyaçlarına göre değişecektir. Sana en uygun öğün sayısı için vücudunu dinle.</Text>
                    <Text style={styles.marginText}>Öğünler arasında 2-4 saat boşluk bırakmak sana iyi gelebilir. Yatmadan en az 2 saat önce yemek yemeyi bırakmalısın.</Text>
                </View>
                <View>
                    <Text style={styles.mainTitle}>Çeşitlilik sağla!</Text>
                    <Text style={styles.marginText}>Daha önce denemediğin yiyecekleri keşfet ve sana sunduğumuz besinlerle her gün aynı yemeği yemek yerine alternatif seçenekler oluştur.</Text>
                    <Text style={styles.marginText}>Beslenme rehberini zenginleştiren besinlerin her birinden farklı öğünler yarat ve miktarını ayarlayarak besin skorlarının keyfini çıkar!</Text>
                </View>
                <PageFooter/>
            </Page>
            <Page size='A4' style={styles.page}>
                <PageHeader
                    activeKit={activeKit}
                />
                <View>
                    <Text style={styles.mainTitle}>Vücudunu Dinle!</Text>
                    <Text style={styles.marginText}>Besin skorları kişiselleştirilmiş beslenme rehberini oluşturman için var. Kendini daha iyi hissetmek için %100 doygunluk hissini bekleme, %80 doygunluğa ulaştığında yemeyi bırak.</Text>
                    <Text style={styles.marginText}>Yemekten 2-4 saat sonra açlığını, enerji düzeyini, ruh halini yani nasıl hissettiğini izle, kendini dinle. Sürekli kötü hissediyorsan yiyecek tercihlerini yeniden ayarlaman gerekebilir.</Text>
                </View>
                <View>
                    <Text style={styles.mainTitle}>Ek olarak,</Text>
                    <Text style={styles.marginText}>Mikrobiyomun ve metabolizman sürekli hareketten ekstra fayda sağlayacaktır.</Text>
                    <Text style={styles.marginText}>Haftada 3 ila 5 kez egzersiz yapmak, besinlerin metabolize edilmesinin dengelenmesinde önemli bir faktördür.</Text>
                    <Text style={styles.marginText}>Beslenme uzmanı ve spor eğitmeninden alacağın profesyonel destek metabolik verimliliği artırmanda büyük fayda sağlayacaktır.</Text>
                </View>
                <PageFooter/>
            </Page>
        </Fragment>
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
    marginText: {
        marginBottom: 10
    },
    boldText: {
        fontWeight: 'bold'
    },
    dangerText: {
        color: '#e3614d'
    },
    averageText: {
        color: '#edd1a1'
    },
    goodText: {
        color: '#59c5d9'
    }
})

export default InnerVoiceBodyPage;