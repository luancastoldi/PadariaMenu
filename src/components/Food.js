import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableOpacity, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import Home from './Home'

const DATA = [
    {
        id: '000001',
        name: 'Batata-Frita',
        price: 17,
        quantidade: 0
    },
    {
        id: '000002',
        name: 'Porção Frango',
        price: 20,
        quantidade: 0
    },
    {
        id: '000003',
        name: 'Xis Salada',
        price: 18,
        quantidade: 0
    },
];



export default function Food() {

    const [total, setTotal] = useState(0)
    const [quantidade, setQuantidae] = useState(0)
    const [minus, setMinus] = useState(false)


    function selectItem(item) {
        setTotal(total + item.price)
        item.quantidade = (item.quantidade + 1)
        setMinus(false)
    }

    function selectItemRemove(item) {
        if (item.quantidade === 0) {
            setMinus(true)
        } else {
            item.quantidade = (item.quantidade - 1)
            setTotal(total - item.price)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Home/>
            <Text style={styles.titleFood}>Lanches / Total R$: {total}</Text>
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                // extraData={selectedId}
                renderItem={({ item }) => (
                    <View style={styles.btnFood}>
                        <Text style={styles.txtFood}>{item.name} </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.txtFood}>R$:{item.price}</Text>


                            <View style={{ flexDirection: 'row', marginBottom: 10, marginRight: 10, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => selectItemRemove(item)}
                                    disabled={minus}
                                >
                                    <AntDesign name="minuscircle" size={30} color="black" style={{ marginTop: 10 }} />
                                </TouchableOpacity>

                                <Text style={styles.txtFood}> {item.quantidade}</Text>

                                <TouchableOpacity onPress={() => selectItem(item)}>
                                    <AntDesign name="pluscircle" size={30} color="black" style={{ marginTop: 10 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1
    },
    btnFood: {
        marginHorizontal: 25,
        marginTop: 15,
        backgroundColor: 'red',
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 2,
        // flexDirection: 'row'
    },
    txtFood: {
        fontSize: 20,
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    },
    titleFood: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 25
    }
})
