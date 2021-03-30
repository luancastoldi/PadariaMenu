import React from 'react'
import { View, Text, StyleSheet, StatusBar  } from 'react-native'
import Home from './Home'

export default function Drink() {
    return (
        <View style={styles.container}>
            <Home/>
            <Text>TESTETTsdsdTTTTTTTTTT</Text>
            <Text>TESTETTsdsdTTTTTTTTTT</Text>
            <Text>TESTETTsdsdTTTTTTTTTT</Text>
            <Text>TESTETTsdsdTTTTTTTTTT</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
    },

})