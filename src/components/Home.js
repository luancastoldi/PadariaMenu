import React, { useState, useEffect } from 'react'
import { ImageBackground, AsyncStorage, View, Text, StyleSheet, Modal, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, FlatList, TextInput, Alert } from 'react-native'
import { Checkbox } from 'react-native-paper';

import { Linking } from 'react-native';
import NumberFormat from 'react-number-format';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from '../Styles/styles'
//modo de entrega local/endereço/buscar
//X codigo promocional/desconto
//X observação no lanche

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
        price: 5.00,
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
        price: 5.00,
        quantidade: 0,
        img: require('../images/refri.jpg')
    },
    {
        id: '0000005',
        name: 'Kuat',
        price: 4.99,
        quantidade: 0,
        img: require('../images/refri.jpg')
    },
    {
        id: '0000006',
        name: 'Pepsi',
        price: 5.00,
        quantidade: 0,
        img: require('../images/refri.jpg')
    },
];

export default function Home() {

    //Action
    const [total, setTotal] = useState(0)
    const [pedidos, setPedidos] = useState([])

    //Profile
    const [name, setName] = useState(newName);
    const [newName, setNewName] = useState(name)

    const [address, setAddress] = useState(newAddress);
    const [newAddress, setNewAddress] = useState(address)

    const [payment, setPayment] = useState(newPayment)
    const [newPayment, setNewPayment] = useState(payment)

    const [money, setMoney] = useState()
    const [card, setCard] = useState()

    const [promo, setPromo] = useState('')
    const [obs, setObs] = useState('')

    //Modals
    const [food, setFood] = useState(false)
    const [drink, setDrink] = useState(false)
    const [portion, setPortion] = useState(false)
    const [profile, setProfile] = useState(false)
    const [finish, setFinish] = useState(false)

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

    //Save Address
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

    //Save Payment
    useEffect(() => {
        async function carregaDados() {
            const payment = await AsyncStorage.getItem("payment");

            if (payment) {
                setPayment(JSON.parse(payment));
            }
        }
        carregaDados();
    }, []);
    useEffect(() => {
        async function salvaDados() {
            AsyncStorage.setItem("payment", JSON.stringify(payment));
        }
        salvaDados();
    }, [payment]);

    //Functions
    function selectItem(item) {

        setPedidos(pedidos + item.name + "\n")
        setTotal(total + item.price)
        item.quantidade = (item.quantidade + 1)
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
        setObs('')
        setPedidos([])
    }
    function saveProfile() {
        if(money === 'checked'){
            setPayment("Dinheiro")
        }
        if(card === 'checked'){
            setPayment("Cartão")
        }
        setProfile(false)
        setName(name)
        setAddress(address)
        Alert.alert("Parabéns ",
            "Seu perfil foi salvo !!")
    }
    function sendZap() {
        if (obs === '') {
            Linking.openURL(`whatsapp://send?text=${mensagem2}&phone=${phone}`);
        } else {
            Linking.openURL(`whatsapp://send?text=${mensagem}&phone=${phone}`);
        }
    }

    //CLIENTE - ENTREGA
    const [inAddress, setInAddress] = useState("checked")
    const [inLancheria, setInLancheria] = useState("unchecked")
    const [inLocal, setInLocal] = useState("unchecked")
    const [inFinal, setInFinal] = useState("Endereço Cadastrado")

    var phone = 5551993554823
    var mensagem = name + " gostaria de encomendar:" + "\n" + "\n" + pedidos + "\n"  + "Obs: " + obs + "\n" + "\n" + "Pagamento: " + payment + "\n" + "Endereço: " + address + "\n"  + "Entrega: " + inFinal + "\n" + "\n" + "Aceitar ?"
    var mensagem2 = name + " gostaria de encomendar:" + "\n" + "\n" + pedidos + "\n" + "Pagamento: " + payment + "\n" + "Endereço: " + address + "\n"  + "Entrega: " + inFinal + "\n" + "\n" + "Aceitar ?"

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar
                animated={false}
                backgroundColor="red"
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <TouchableOpacity
                    style={styles.titleBanner}
                    onPress={() => setProfile(true)}>
                    <MaterialCommunityIcons name="home-account" size={40} color="black" />
                </TouchableOpacity>

                <NumberFormat
                    value={total}
                    decimalSeparator=","
                    decimalScale={2}
                    displayType={'text'}
                    prefix={'R$: '}
                    renderText={(value) =>
                        <Text style={styles.titleBanner}><MaterialCommunityIcons name="cart" size={27} color="red" />{value}</Text>
                    } />
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center' }} /* btns home screen*/>
                <TouchableOpacity style={styles.btnEnd} //Concluir Pedido
                    onPress={() => setFinish(true)}>
                    <Text style={{ color: "white", fontSize: 18 }}> <MaterialCommunityIcons name="check-circle" size={24} color="white" /> Concluir Pedido</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnEnd} //Limpar Pedidos
                    onPress={() => cleanWish()}>
                    <Text style={{ color: "white", fontSize: 18 }}> <MaterialCommunityIcons name="close-circle" size={24} color="white" /> Limpar Lista</Text>
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
                        style={styles.btnProfile}>
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
                        <Text>Pagamento: {payment}</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Checkbox
                                    style={{ alignItems: 'center' }}
                                    status={money}
                                    disabled={false}
                                    color="red"
                                    onPress={() => { setMoney("checked"), setCard("unchecked")}}
                                />
                                <Text style={{ fontSize: 24 }}>Dinheiro</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Checkbox
                                    style={{ alignItems: 'center' }}
                                    status={card}
                                    disabled={false}
                                    color="red"
                                    onPress={() => { setMoney("unchecked"), setCard("checked")}}
                                />
                                <Text style={{ fontSize: 24 }}>Cartão</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => { setProfile(false) }}>
                        <MaterialCommunityIcons name="close-circle" size={30} color="red" style={{ alignSelf: 'center', marginTop: 10 }} />
                    </TouchableOpacity>

                </SafeAreaView>
            </Modal>

            <Modal //Food
                visible={food}
                transparent={true}
                animationType="slide"
            >
                <SafeAreaView style={styles.containerModal}>

                    <NumberFormat
                        value={total}
                        decimalSeparator=","
                        decimalScale={2}
                        displayType={'text'}
                        prefix={'R$: '}
                        renderText={(value) =>
                            <Text style={styles.titleBanner}><MaterialCommunityIcons name="cart" size={27} color="red" />{value}</Text>
                        } />

                    <TouchableOpacity //Fechar
                        onPress={() => { setFood(false) }}>
                        <MaterialCommunityIcons name="close-circle" size={30} color="red" style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>

                    <FlatList
                        data={FOOD}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (

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

                                        <TouchableOpacity onPress={() => selectItem(item, index)}>
                                            <MaterialCommunityIcons name="plus-circle-outline" size={40} color="black" style={styles.btnMore} />
                                        </TouchableOpacity>

                                    </View>

                                </ImageBackground>

                            </View>
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

                    <NumberFormat
                        value={total}
                        decimalSeparator=","
                        decimalScale={2}
                        displayType={'text'}
                        prefix={'R$: '}
                        renderText={(value) =>
                            <Text style={styles.titleBanner}><MaterialCommunityIcons name="cart" size={27} color="red" />{value}</Text>
                        } />

                    <TouchableOpacity //Fechar
                        onPress={() => { setPortion(false) }}>
                        <MaterialCommunityIcons name="close-circle" size={30} color="red" style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>

                    <FlatList
                        data={PORTION}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (

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

                                        <TouchableOpacity onPress={() => selectItem(item, index)}>
                                            <MaterialCommunityIcons name="plus-circle-outline" size={40} color="black" style={styles.btnMore} />
                                        </TouchableOpacity>

                                    </View>

                                </ImageBackground>

                            </View>
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

                    <NumberFormat
                        value={total}
                        decimalSeparator=","
                        decimalScale={2}
                        displayType={'text'}
                        prefix={'R$: '}
                        renderText={(value) =>
                            <Text style={styles.titleBanner}><MaterialCommunityIcons name="cart" size={27} color="red" />{value}</Text>
                        } />

                    <TouchableOpacity //Fechar
                        onPress={() => { setDrink(false) }}>
                        <MaterialCommunityIcons name="close-circle" size={30} color="red" style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>

                    <FlatList
                        data={DRINK}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (

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

                                        <TouchableOpacity onPress={() => selectItem(item, index)}>
                                            <MaterialCommunityIcons name="plus-circle-outline" size={40} color="black" style={styles.btnMore} />
                                        </TouchableOpacity>

                                    </View>

                                </ImageBackground>

                            </View>
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
                            <MaterialCommunityIcons name="close-circle" size={30} color="red" style={{ alignSelf: 'center', marginBottom: 10 }} />
                        </TouchableOpacity>
                    </View>


                    <ScrollView>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={styles.titleBanner}>PEDIDO</Text>
                            <Text>{pedidos}</Text>

                            <NumberFormat
                                value={total}
                                decimalSeparator=","
                                decimalScale={2}
                                displayType={'text'}
                                prefix={'R$ '}
                                renderText={(value) =>
                                    <Text style={{ fontWeight: 'bold' }}>Valor: {value}</Text>
                                } />



                            <Text>Observações:</Text>
                            <TextInput
                                placeholder="(ex: X Salada sem tomate)"
                                value={obs}
                                autoFocus={true}
                                onChangeText={obs => setObs(obs)}
                            />


                            {/* <TextInput
                            placeholder="CODIGO PROMOCIONAL"
                            value={promo}
                            onChangeText={promo => setPromo(promo)}
                            /> */}
                        </View>
                        <Text style={styles.titleBanner}>DADOS</Text>
                        <View style={{ alignSelf: 'center' }}>
                            <Text>Cliente: {name} {"\n"}Endereço: {address} {"\n"}Pagamento: {payment}</Text>

                            <TouchableOpacity
                                style={styles.btnProfile}
                                onPress={() => setProfile(true)}>
                                <Text style={{ color: 'white', padding: 10 }}>ALTERAR DADOS</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.titleBanner}>ENTREGA</Text>
                        <View style={{ alignSelf: 'center' }}>
                        
                        <View style={{flexDirection: 'row'}} /* ADDRESS */>
                            <Checkbox
                                status={inAddress}
                                color="red"
                                onPress={() => { setInAddress("checked"), setInLancheria("unchecked"), setInLocal("unchecked"), setInFinal("Endereço Cadastrado") }}
                            />
                            <Text style={{fontSize: 20}}>{address}</Text>
                        </View>
                        
                        <View style={{flexDirection: 'row'}} /* LANCHERIA */>
                            <Checkbox
                                status={inLancheria}
                                color="red"
                                onPress={() => {setInAddress("unchecked"), setInLancheria("checked"), setInLocal("unchecked"), setInFinal("Lancheria") }}
                            />
                            <Text style={{fontSize: 20}}>Comer na Lancheria</Text>
                        </View>

                        
                        <View style={{flexDirection: 'row'}} /* IREI BUSCAR */>
                            <Checkbox
                                status={inLocal}
                                color="red"
                                onPress={() => {setInAddress("unchecked"), setInLancheria("unchecked"), setInLocal("checked"), setInFinal("Buscar") }}
                            />
                            <Text style={{fontSize: 20}}>Vou buscar</Text>
                        </View>

                        </View>
                    </ScrollView>

                    <TouchableOpacity style={{ backgroundColor: 'lime' }}
                        onPress={() => sendZap()}>
                        <Text style={styles.titleBanner}>PEDIR AGORA</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>

            <View style={{ flexDirection: 'row', backgroundColor: 'red' }}>

                <TouchableOpacity style={styles.btnEat}
                    onPress={() => { setFood(true) }}>
                    <Text style={styles.txtEat} ><MaterialCommunityIcons name="hamburger" size={30} color="white" /></Text>
                    <Text style={styles.txtEat} >Lanches</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnEat}
                    onPress={() => { setPortion(true) }}>
                    <Text style={styles.txtEat} ><MaterialCommunityIcons name="food-drumstick" size={30} color="white" /></Text>
                    <Text style={styles.txtEat} >Porções</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnEat}
                    onPress={() => { setDrink(true) }}>
                    <Text style={styles.txtEat} ><MaterialCommunityIcons name="beer" size={30} color="white" /></Text>
                    <Text style={styles.txtEat} >Bebidas</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}