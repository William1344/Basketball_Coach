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
                    //navigation.replace("Subst_Img");
                }}
            >
                <Image style = {styles.img_logo}
                    source = {RetornaImg(13)}
                />
            </TouchableOpacity>
            <View style = {styles.view1_infos}>
                <Text style = {styles.text_infos}> {banco.userMaster.nome} </Text>
<<<<<<< HEAD
                <Text style = {styles.text_infos}> Times: {banco.times.length} </Text>
                <Text style = {styles.text_infos}> Atletas: {banco.atletas.length} </Text>    
=======
                <Text style = {{...styles.text_infos, fontSize: 16 }}> Crie sua liga ou importe uma, cadastre os atletas e realize seus jogos </Text>  
>>>>>>> 1b0a43907f9630e32440d6415f8818a7f56a54bb
            </View>
          </View>
          <View style = {styles.barra}/>
        </>
    );
}
