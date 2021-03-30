import React from 'react'
import { View, Text, StyleSheet, StatusBar  } from 'react-native'
import Home from './Home'

export default function Portion() {
    return (
        <View style={styles.container}>
            <Home/>
            <Text>Portion</Text>
            <Text>Portion</Text>
            <Text>Portion</Text>
            <Text>Portion</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
    },

})