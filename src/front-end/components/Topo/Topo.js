import React, {useState, useEffect} from "react";
import { View, Text, Image, StatusBar, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from './styles_T';
import banco from '../../../back-and2/banco_local';
import {RetornaImg} from '../../functions/index';


export default function Topo(){
        
    const navigation = useNavigation();
    
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
            </View>
          </View>
          <View style = {styles.barra}/>
        </>
    );
}
