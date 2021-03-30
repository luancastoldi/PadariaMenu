import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'

export default function Home() {

    const [wish, setWish] = useState(false)

    return (
        <View >
            <Text style={styles.titleBanner}>Mini-Lanches</Text>
            <TouchableOpacity
                onPress={() => { setWish(true) }}>
                <Text>Pedidos</Text>
            </TouchableOpacity>
            <Modal
                visible={wish}
                transparent={false}
                animationType="slide"
            >
                <View>
                    <TouchableOpacity
                        onPress={() => { setWish(false) }}>
                        <Text>FECHAR</Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    titleBanner: {
        fontSize: 30,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: 20,
        // borderColor: 'black',
        // borderWidth: 2,
        padding: 5,
        borderRadius: 7,
    }
})
