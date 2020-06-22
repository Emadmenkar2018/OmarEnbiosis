import React from 'react'
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PageHeader from '../../PageHeader/PageHeader'
import PageFooter from '../../PageFooter/PageFooter'

const MicroTestDescPage = ({activeKit}) => {
    return (
        <Page size='A4' style={styles.page}>
            <PageHeader
                activeKit={activeKit}
            />
            <Text style={styles.mainTitle}>ENBİOSİS Mikrobiyom Analizi</Text>
            <Text style={styles.marginText}>
                Mikrobiyomun doğumdan itibaren seninle gelişir, farklılaşır ve yaşlanır. Öyle ki, doğum şeklin, anne sütü alıp almaman, ek gıdaya geçiş zamanın, ilaç kullanımların, beslenme şeklin, kırsal/kentsel çevrede yaşıyor olman, geçirdiğin hastalıklar, çevre koşulları başta olmak üzere birçok dış etken mikrobiyomunun çeşitliliğini, dengesini ve dolayısıyla sağlığını etkiler.
            </Text>
            <Text>
                Sağlıklı Mikrobiyom ile;
            </Text>
            <View style={styles.marginText}>
                <Text>- İdeal kiloya ulaşman,</Text>
                <Text>- Bağışıklık sisteminin güçlenmesi</Text>
                <Text>- Sindirim sisteminin düzenlenmesi,</Text>
                <Text>- Kronik hastalıkların önlenmesi/iyileştirilmesi,</Text>
                <Text>- Uyku kalitenin artırılması,</Text>
                <Text>- Psikolojik problemlerin azalması mümkün olabilir.</Text>
            </View>
            <Text style={styles.marginText}>
                Mikrobiyom dünyanı keşfederek sorunların kaynağına inmek, vücudunu kontrol eden bakterilerinle tanışmak ve onları yönetmek artık senin elinde!
            </Text>
            <Text style={styles.marginText}>
                ENBIOSIS teknolojisi, geniş veri tabanı üzerinden Mikrobiyom-Beslenme-Sağlık ilişkisi öğretilmiş yapay zeka algoritmaları ile mikrobiyomuna ait yeni nesil dizileme (NGS) çıktılarını analiz eder.  Bu analiz sonucunda kendini tanımanı sağlayacak rapor ile senin için sağlıklı olan besin skorlarından oluşan kişiselleştirilmiş beslenme rehberi oluşturulur.
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
    marginText: {
        marginBottom: 10
    }
})

export default MicroTestDescPage;