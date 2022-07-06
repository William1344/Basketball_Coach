import React, {useState, useEffect} from 'react';
import {
    Text, View, TouchableOpacity, TextInput, Modal, Image, 
    KeyboardAvoidingView, Alert, Keyboard
} from 'react-native';
import stylesC          from './styles_Cad';
import {useNavigation}  from '@react-navigation/native';
import AsyncStorage     from '@react-native-async-storage/async-storage';
import banco            from '../../../back-and2/banco_local';
import assets           from '../../../../assets/index_assets';
import SalveData        from '../../../back-and2/SalveData';
import {CoachV}         from '../../../back-and2/banco_dados/index';

export default function Cadastro(){
    const navigation = useNavigation();
    const [textName, setName] = useState("Brunão");
    
    useEffect(() => {
        
    },[]);

    
    async function cadastraUser(nm){
        let user = {
            nome: nm
        }
        banco.userMaster = new CoachV(user);
        await SalveData(banco);
        navigation.replace("MainP");
    }
    
    return(
        <View style={stylesC.telaFull}>
            <View style = {stylesC.view_img_cad}>
                <Image 
                    style = {stylesC.img} 
                    source={assets.login1}
                />
                <Text style={stylesC.title_L}> Basketball Coach </Text>
            </View>
            <View style = {stylesC.cad_view}>
                <KeyboardAvoidingView 
                    style    = {stylesC.keyBoard}
                    behavior = {Platform.select({
                        ios : 'padding',
                        android : null,
                    })}
                >
                    <TextInput style    = {stylesC.input}
                        value           = {textName}
                        onChangeText    = {(text)=>{setName(text)}}
                        keyboardType    = "default"
                        placeholder     = "Treinador"
                    />
                    <TouchableOpacity style = {stylesC.button}
                        onPress={() => cadastraUser(textName)}
                    >
                        <Text style = {stylesC.but_text}>Iniciar</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}
