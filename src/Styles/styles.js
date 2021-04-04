import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        // marginTop: StatusBar.currentHeight,
        flex: 1
    },
    containerModal: {
        flex: 1,
        backgroundColor: '#eee',
    },
    btnMore: {
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        alignItems: 'center',
        // backgroundColor: 'white',
        // borderRadius: 100,
        // padding: 10
    },
    btnEnd: {
        alignSelf: 'center',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 7,
        marginHorizontal: 5,
    },
    btnEat: {
        flex: 1,
        backgroundColor: 'red',
    },
    txtEat: {
        alignSelf: 'center',
        color: 'white',
        marginBottom: 0,
        fontSize: 15,
    },
    titleBanner: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 7,
        // alignItems: 'center',
        // alignSelf: 'center',
        // marginHorizontal: 10,
    },
    btnFood: {
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 5,
        backgroundColor: 'red',
        borderRadius: 10,
        elevation: 4,
    },
    txtFood: {
        fontSize: 22,
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    },
    txtPrice: {
        fontSize: 22,
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'red',
        width: 100,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 7,
    },
    titleFood: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 25
    },
    input: {
        padding: 10,
        color: 'black',
        fontSize: 20
    },
    img: {
        flex: 1,
        resizeMode: "cover",
    },
    btnProfile: {
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 7,
        backgroundColor: 'red',
        paddingHorizontal: 20
    },
    txtInfoWish: {
        fontSize: 18
    },
    pedidoInfo: {
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 7,
        elevation: 7,
        marginBottom: 10,
        marginTop: 10,
        width: 250
    },
    btnTopModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10
    }
})


export default styles;
