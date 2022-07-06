import React, {useState, useEffect} from "react";
import { View, Text, Image, StatusBar, TouchableOpacity} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import configsBD from '../../../../config/config.json';
import styles from './styles_T';
import banco from '../../../back-and2/banco_local';
import AsyncStorage from "@react-native-async-storage/async-storage";
import assets from '../../../../assets/index_assets';
import SalveData from '../../../back-and2/SalveData';
import {RetornaImg} from '../../functions/index';


export default function Topo(){
    
    useEffect(() => {
        
    }, []);
    
    const navigation = useNavigation();
    const [photo, setImg_perfil]  = useState(true);
    
    return(
        <>
        <View style = {styles.viewSuperior}>
            <StatusBar
                hidden = {true} // esconde a barra "true"
                barStyle="ligth-content"
            />
            <TouchableOpacity style = {styles.btt_img}
                onPress = {() => {
                    navigation.replace("Subst_Img");
                }}
            >
                <Image style = {styles.img_logo}
                    source = {RetornaImg(banco.userMaster.image)}
                />
            </TouchableOpacity>
            <View style = {styles.view1_infos}>
                <Text style = {styles.text_infos}> {banco.userMaster.nome} </Text>
                <Text style = {styles.text_infos}> Times: {banco.times.length} </Text>
                <Text style = {styles.text_infos}> Atletas: {banco.atletas.length} </Text>    
                <Text style = {styles.text_infos}> Vit: {banco.userMaster.vits} | FG: {banco.userMaster.FG} </Text>
            </View>
        </View>
        <View style = {styles.barra}/>
        </>
    );
}
