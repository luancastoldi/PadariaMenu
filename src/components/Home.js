import React, { useState, useEffect } from 'react'
import { RefreshControl, ImageBackground, AsyncStorage, View, Text, StyleSheet, Modal, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, FlatList, TextInput, Alert, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Linking } from 'react-native';

//arastar imagens pro lado com ofertas
//modo de entrega local/endereço/buscar
//codigo promocional/desconto

const FOOD = [
    {
        id: '100001',
        name: 'Xis Salada',
        price: 17,
        quantidade: 0,
        img: require('../images/xis.jpg')
    },
    {
        id: '200002',
        name: 'Xis Coração',
        price: 20,
        quantidade: 0,
        img: require('../images/xis.jpg')
    },
    {
        id: '300003',
        name: 'Xis Bacon',
        price: 22,
        quantidade: 0,
        img: require('../images/xis.jpg')
    },
];
const PORTION = [
    {
        id: '00000001',
        name: 'Batata-Frita Pequena',
        price: 7,
        quantidade: 0,
        img: require('../images/batata.jpg')
    },
    {
        id: '00000002',
        name: 'Batata-Frita Grande',
        price: 11,
        quantidade: 0,
        img: require('../images/batata.jpg')
    },
];
const DRINK = [
    {
        id: '0000001',
        name: 'Coca-Cola',
        price: 6.50,
        quantidade: 0,
        img: require('../images/refri.jpg')
    },
    {
        id: '0000002',
        name: 'Sprite',
        price: 5,
        quantidade: 0,
        img: require('../images/refri.jpg')
    },
    {
        id: '0000003',
        name: 'Pepsi',
        price: 6.50,
        quantidade: 0,
        img: require('../images/refri.jpg')
    },
    {
        id: '0000004',
        name: 'Soda',
        price: 5,
        quantidade: 0,
        img: require('../images/refri.jpg')
    },
    {
        id: '0000005',
        name: 'Kuat',
        price: 4,
        quantidade: 0,
        img: require('../images/refri.jpg')
    },
    {
        id: '0000006',
        name: 'Pepsi',
        price: 5,
        quantidade: 0,
        img: require('../images/refri.jpg')
    },
];



export default function Home() {
    const [listPortion, setListPortion] = React.useState(PORTION);

    //Action
    const [total, setTotal] = useState(0)
    const [pedidos, setPedidos] = useState([])
    const [amount, setAmount] = useState([])
    const [refreshPage, setRefreshPage] = useState("");

    //Profile
    const [name, setName] = useState(newName);
    const [newName, setNewName] = useState(name)

    const [address, setAddress] = useState(newAddress);
    const [newAddress, setNewAddress] = useState(address)

    //Modals
    const [food, setFood] = useState(false)
    const [drink, setDrink] = useState(false)
    const [portion, setPortion] = useState(false)
    const [profile, setProfile] = useState(false)
    const [finish, setFinish] = useState(false)

    var phone = 5551993554823
    var mensagem = name + " gostaria de encomendar:" + "\n" + pedidos + "\n" + "Endereço: " + address + "\n" + "Aceitar ?"

    //Save Name
    useEffect(() => {
        async function carregaDados() {
            const name = await AsyncStorage.getItem("name");

            if (name) {
                setName(JSON.parse(name));
            }
        }
        carregaDados();
    }, []);

    useEffect(() => {
        async function salvaDados() {
            AsyncStorage.setItem("name", JSON.stringify(name));
        }
        salvaDados();
    }, [name]);

    //Save Profile
    useEffect(() => {
        async function carregaDados() {
            const address = await AsyncStorage.getItem("address");

            if (address) {
                setAddress(JSON.parse(address));
            }
        }
        carregaDados();
    }, []);

    useEffect(() => {
        async function salvaDados() {
            AsyncStorage.setItem("address", JSON.stringify(address));
        }
        salvaDados();
    }, [address]);

    //Functions
    function selectItem(item) {
        setTotal(total + item.price)
        item.quantidade = (item.quantidade + 1)
        setPedidos(pedidos + item.name + "\n")
    }
    function removeItem() {
        FOOD.forEach(function (item, indice, array) {
            FOOD[indice].quantidade = 0
        });

        PORTION.forEach(function (item, indice, array) {
            PORTION[indice].quantidade = 0
        });

        DRINK.forEach(function (item, indice, array) {
            DRINK[indice].quantidade = 0
        });

    }
    function cleanWish() {
        removeItem()
        setTotal(0)
        setPedidos([])
    }
    function saveProfile() {
        setProfile(false)
        setName(name)
        setAddress(address)
        Alert.alert("Parabéns ",
            "Seu perfil foi salvo !!")
    }
    function sendZap() {
        Linking.openURL(`whatsapp://send?text=${mensagem}&phone=${phone}`);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <TouchableOpacity
                    style={styles.titleBanner}
                    onPress={() => setProfile(true)}>
                    <MaterialIcons name="tag-faces" size={40} color="black" />
                </TouchableOpacity>
                <Text style={styles.titleBanner}><MaterialIcons name="local-grocery-store" size={27} color="red" />R$: {total}</Text>

            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <TouchableOpacity style={styles.btnEnd} //Concluir Pedido
                    onPress={() => setFinish(true)}
                >
                    <Text style={{ color: "white", fontSize: 18 }}> <AntDesign name="checkcircle" size={20} color="white" /> Concluir Pedido</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.btnEnd} //Limpar Pedidos
                    onPress={() => cleanWish()}>
                    <Text style={{ color: "white", fontSize: 18 }}> <AntDesign name="closecircle" size={20} color="white" /> Limpar Lista</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Text style={{ textAlign: 'center', fontSize: 25, marginTop: 40 }} >{pedidos}</Text>
            </ScrollView>


            <Modal //Profile
                visible={profile}
                animationType="fade"
            >
                <SafeAreaView style={styles.containerModal}>
                    <TouchableOpacity
                        onPress={() => saveProfile()}
                        style={{ alignSelf: 'center', marginTop: 20, borderRadius: 7, backgroundColor: 'red', paddingHorizontal: 20 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>SALVAR</Text>
                    </TouchableOpacity>

                    <View style={{ alignSelf: 'center', marginTop: 20, backgroundColor: '#eee', padding: 30, borderRadius: 10 }}>
                        <Text>Nome do Pagador:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={name => setName(name)}
                            value={name}
                            autoFocus={true}
                            maxLength={30}
                            placeholder="Nome Completo">
                        </TextInput>

                        <Text>Endereço para a Entrega:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={address => setAddress(address)}
                            value={address}
                            maxLength={50}
                            placeholder="Endereço">
                        </TextInput>
                    </View>
                    <TouchableOpacity
                        onPress={() => { setProfile(false) }}>
                        <AntDesign name="closecircle" size={30} color="red" style={{ alignSelf: 'center', marginTop: 10 }} />
                    </TouchableOpacity>

                </SafeAreaView>
            </Modal>

            <Modal //Food
                visible={food}
                transparent={true}
                animationType="slide"
            >
                <SafeAreaView style={styles.containerModal}>

                    <TouchableOpacity //Fechar
                        onPress={() => { setFood(false) }}>
                        <AntDesign name="closecircle" size={30} color="red"
                            style={{ alignSelf: 'center', marginBottom: 10 }} />
                    </TouchableOpacity>

                    <FlatList
                        data={FOOD}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (

                            <TouchableOpacity onPress={() => selectItem(item, index)}>
                                <View style={styles.btnFood}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.txtFood}>{item.name} </Text>
                                        <Text style={styles.txtFood}>{item.quantidade} </Text>
                                    </View>

                                    <ImageBackground
                                        source={item.img}
                                        style={styles.img}
                                        imageStyle={{ borderRadius: 6 }}
                                    >

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.txtPrice}>R$ {item.price}</Text>
                                            <AntDesign name="pluscircle" size={30} color="black" style={styles.btnMore} />
                                        </View>

                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </SafeAreaView>
            </Modal>

            <Modal //Portion
                visible={portion}
                transparent={true}
                animationType="slide"
            >
                <SafeAreaView style={styles.containerModal}>

                    <TouchableOpacity //Fechar
                        onPress={() => { setPortion(false) }}>
                        <AntDesign name="closecircle" size={30} color="red"
                            style={{ alignSelf: 'center', marginBottom: 10 }} />
                    </TouchableOpacity>

                    <FlatList
                        data={PORTION}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (

                            <TouchableOpacity onPress={() => selectItem(item, index)}>
                                <View style={styles.btnFood}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.txtFood}>{item.name} </Text>
                                        <Text style={styles.txtFood}>{item.quantidade} </Text>
                                    </View>

                                    <ImageBackground
                                        source={item.img}
                                        style={styles.img}
                                        imageStyle={{ borderRadius: 6 }}
                                    >

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.txtPrice}>R$ {item.price}</Text>
                                            <AntDesign name="pluscircle" size={30} color="black" style={styles.btnMore} />

                                        </View>

                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </SafeAreaView>
            </Modal>

            <Modal //Drink
                visible={drink}
                transparent={true}
                animationType="slide"
            >
                <SafeAreaView style={styles.containerModal}>

                    <TouchableOpacity //Fechar
                        onPress={() => { setDrink(false) }}>
                        <AntDesign name="closecircle" size={30} color="red"
                            style={{ alignSelf: 'center', marginBottom: 10 }} />
                    </TouchableOpacity>

                    <FlatList
                        data={DRINK}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (

                            <TouchableOpacity onPress={() => selectItem(item, index)}>
                                <View style={styles.btnFood}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.txtFood}>{item.name} </Text>
                                        <Text style={styles.txtFood}>{item.quantidade} </Text>
                                    </View>

                                    <ImageBackground
                                        source={item.img}
                                        style={styles.img}
                                        imageStyle={{ borderRadius: 6 }}
                                    >

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.txtPrice}>R$ {item.price}</Text>
                                            <AntDesign name="pluscircle" size={30} color="black" style={styles.btnMore} />
                                        </View>

                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </SafeAreaView>


            </Modal>

            <Modal //Finish Wish
                visible={finish}
                animationType="slide"
            >
                <SafeAreaView style={styles.containerModal}>
                    <View>
                        <TouchableOpacity
                            onPress={() => { setFinish(false) }}>
                            <AntDesign name="closecircle" size={30} color="red" style={{ alignSelf: 'center', marginBottom: 10 }} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.titleBanner}>CONFIRA SEU PEDIDO</Text>
                    <ScrollView>
                        <View style={{ alignSelf: 'center' }}>
                            <Text>{pedidos}</Text>
                            <Text style={{ fontWeight: 'bold' }}>Valor: {total}</Text>
                            <Text>Cliente: {name} {"\n"}Endereço: {address}</Text>
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={{ backgroundColor: 'lime' }}
                        onPress={() => sendZap()}>
                        <Text style={styles.titleBanner}>PEDIR AGORA</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>

            <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>

                <TouchableOpacity style={styles.btnEat}
                    onPress={() => { setFood(true) }}>
                    <Text style={styles.txtEat} ><MaterialIcons name="lunch-dining" size={30} color="white" /></Text>
                    <Text style={styles.txtEat} >Lanches</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnEat}
                    onPress={() => { setPortion(true) }}>
                    <Text style={styles.txtEat} ><MaterialIcons name="dinner-dining" size={30} color="white" /></Text>
                    <Text style={styles.txtEat} >Porçoes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnEat}
                    onPress={() => { setDrink(true) }}>
                    <Text style={styles.txtEat} ><MaterialIcons name="local-drink" size={30} color="white" /></Text>
                    <Text style={styles.txtEat} >Bebidas</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1
    },
    containerModal: {
        flex: 1,
        marginTop: 50,
        backgroundColor: 'white'
    },
    btnMore: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        alignItems: 'center'
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
        color: 'white'
    },
    titleBanner: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 7,
        marginHorizontal: 10,
    },
    btnFood: {
        marginHorizontal: 15,
        marginTop: 15,
        backgroundColor: 'red',
        borderRadius: 10,
        elevation: 7,
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
    }
})
