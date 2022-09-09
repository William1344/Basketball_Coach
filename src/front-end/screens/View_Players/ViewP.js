import React, { useState, useEffect } from "react";
import {
  View, Image, Text, TouchableOpacity, ScrollView, BackHandler, Alert
    } from 'react-native';
import Icon                 from 'react-native-vector-icons/AntDesign';
import stylesVP             from './stylesVP';
import {Cor, icons, styles} from '../../styles/index_S';
import * as ImagePicker     from 'expo-image-picker';
import {useNavigation}      from '@react-navigation/native';
import banco                from '../../../back-and2/banco_local';
import SalveData            from '../../../back-and2/SalveData';
import {RetornaImg}         from '../../functions/index';

export default function ViewP({route}){
  const navigation            = useNavigation();
  const player                = route.params.player;
  const [esc, setEsc]         = useState("Escores 3x3");
  const [est, setEst]         = useState(0);
  const [state, setState]     = useState(true);
  
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => { BackHandler.removeEventListener("hardwareBackPress", backAction); }
  },[]);
  function backAction(){
    if(route.params.veio_de == "MainL"){
      navigation.replace("MainL", {
        index_time  : route.params.index_time,
        time        : route.params.time,
        dest        : route.params.dest,
      });
    } else if(route.params.veio_de == "Membros"){
      navigation.replace("Membros", {
        index_time  : route.params.index_time,
        time        : route.params.time,
        dest        : route.params.dest,
      });
    }
    return true;
  }
  
  function setaTipoEsc(){
    if(est == 0){
      setEst(1);
      setEsc("Escores 5x5");
    } else if(est == 1){
      setEst(2);
      setEsc("Escores Total");
    } else{
      setEst(0);
      setEsc("Escores 3x3");
    }
  }
  
  function rend_Escores(){
    return(
      <View style = {stylesVP.viewR}>
        <TouchableOpacity style = {stylesVP.btt_title}
          onPress = {() =>{setaTipoEsc()}}
        >
          <Text style = {{...stylesVP.texts, fontSize: 26, marginTop: 5}}> {esc} </Text>
          <Icon 
            style = {{marginLeft: 20}}
            name = {icons.seta_right}
            size = {30}
            color = {Cor.icons_cor}
          />
        </TouchableOpacity>
        {renderScores()}
      </View>
    );
  }
  
  function renderScores(){
    if(est == 0){
      return (
        <ScrollView style = {stylesVP.scrollV}>
          <View style = {stylesVP.viewEsc}>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Jogos: {player.scr3x3.jogos} </Text>
              <Text style = {stylesVP.textScor}> Vit: {player.scr3x3.vit} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> FG: {player.scr3x3.a_FG == null ? 0 : player.scr3x3.a_FG.toFixed(0)}% </Text>
              <Text style = {stylesVP.textScor}> Total Pts: {player.scr3x3.total_pts} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> 2 Pts: {player.scr3x3.a_2pts} </Text>
              <Text style = {stylesVP.textScor}> 3 Pts: {player.scr3x3.a_3pts} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Rebotes: {player.scr3x3.reb} </Text>
              <Text style = {stylesVP.textScor}> Assists: {player.scr3x3.asst} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Tocos: {player.scr3x3.block} </Text>
              <Text style = {stylesVP.textScor}> Roubos: {player.scr3x3.roubo} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {{...stylesVP.textScor, width: '96%'}}> Air Balls: {player.scr3x3.airB} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {{...stylesVP.textScor, width: '96%'}}> Médias </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> 2PPG: {player.scr3x3.a_2PG == null ? 0 : player.scr3x3.a_2PG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> 3PPG: {player.scr3x3.a_3PG == null ? 0 : player.scr3x3.a_3PG.toFixed(2)} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Total PPG: {player.scr3x3.total_PPG == null ? 0 : player.scr3x3.total_PPG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> Reb PG: {player.scr3x3.a_RPG == null ? 0 : player.scr3x3.a_RPG.toFixed(2)} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Asst PG: {player.scr3x3.a_APG == null ? 0 : player.scr3x3.a_APG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> Toco PG: {player.scr3x3.a_BPG == null ? 0 : player.scr3x3.a_BPG.toFixed(2)} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Roubo PG: {player.scr3x3.a_RouPG == null ? 0 : player.scr3x3.a_RouPG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> Air Ball PG: {player.scr3x3.a_AirB == null ? 0 : player.scr3x3.a_AirB.toFixed(2)} </Text>
            </View>
          </View>
        </ScrollView>
      );
    } else if(est == 1){
      return (
        <ScrollView style = {stylesVP.scrollV}>
          <View style = {stylesVP.viewEsc}>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Jogos: {player.scr5x5.jogos} </Text>
              <Text style = {stylesVP.textScor}> Vit: {player.scr5x5.vit} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> FG: {player.scr5x5.a_FG == null ? 0 : player.scr5x5.a_FG.toFixed(0)}% </Text>
              <Text style = {stylesVP.textScor}> Total Pts: {player.scr5x5.total_pts} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> 2 Pts: {player.scr5x5.a_2pts} </Text>
              <Text style = {stylesVP.textScor}> 3 Pts: {player.scr5x5.a_3pts} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Rebotes: {player.scr5x5.reb} </Text>
              <Text style = {stylesVP.textScor}> Assists: {player.scr5x5.asst} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Tocos: {player.scr5x5.block} </Text>
              <Text style = {stylesVP.textScor}> Roubos: {player.scr5x5.roubo} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {{...stylesVP.textScor, width: '96%'}}> Air Balls: {player.scr5x5.airB} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {{...stylesVP.textScor, width: '96%'}}> Médias </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> 2PPG: {player.scr5x5.a_2PG == null ? 0 : player.scr5x5.a_2PG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> 3PPG: {player.scr5x5.a_3PG == null ? 0 : player.scr5x5.a_3PG.toFixed(2)} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Total PPG: {player.scr5x5.total_PPG == null ? 0 : player.scr5x5.total_PPG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> Reb PG: {player.scr5x5.a_RPG == null ? 0 : player.scr5x5.a_RPG.toFixed(2)} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Asst PG: {player.scr5x5.a_APG == null ? 0 : player.scr5x5.a_APG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> Toco PG: {player.scr5x5.a_BPG == null ? 0 : player.scr5x5.a_BPG.toFixed(2)} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Roubo PG: {player.scr5x5.a_RouPG == null ? 0 : player.scr5x5.a_RouPG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> Air Ball PG: {player.scr5x5.a_AirB == null ? 0 : player.scr5x5.a_AirB.toFixed(2)} </Text>
            </View>
          </View>
        </ScrollView>
      );
    } else{
      return (
        <ScrollView style = {stylesVP.scrollV}>
          <View style = {stylesVP.viewEsc}>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Jogos: {player.scrT.jogos} </Text>
              <Text style = {stylesVP.textScor}> Vit: {player.scrT.vit} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> FG: {player.scrT.a_FG == null ? 0 : player.scrT.a_FG.toFixed(0)}% </Text>
              <Text style = {stylesVP.textScor}> Total Pts: {player.scrT.total_pts} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> 2 Pts: {player.scrT.a_2pts} </Text>
              <Text style = {stylesVP.textScor}> 3 Pts: {player.scrT.a_3pts} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Rebotes: {player.scrT.reb} </Text>
              <Text style = {stylesVP.textScor}> Assists: {player.scrT.asst} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Tocos: {player.scrT.block} </Text>
              <Text style = {stylesVP.textScor}> Roubos: {player.scrT.roubo} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {{...stylesVP.textScor, width: '96%'}}> Air Balls: {player.scrT.airB} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {{...stylesVP.textScor, width: '96%'}}> Médias </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> 2PPG: {player.scrT.a_2PG == null ? 0 : player.scrT.a_2PG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> 3PPG: {player.scrT.a_3PG == null ? 0 : player.scrT.a_3PG.toFixed(2)} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Total PPG: {player.scrT.total_PPG == null ? 0 : player.scrT.total_PPG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> Reb PG: {player.scrT.a_RPG == null ? 0 : player.scrT.a_RPG.toFixed(2)} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Asst PG: {player.scrT.a_APG == null ? 0 : player.scrT.a_APG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> Toco PG: {player.scrT.a_BPG == null ? 0 : player.scrT.a_BPG.toFixed(2)} </Text>
            </View>
            <View style = {stylesVP.viewLinha}>
              <Text style = {stylesVP.textScor}> Roubo PG: {player.scrT.a_RouPG == null ? 0 : player.scrT.a_RouPG.toFixed(2)} </Text>
              <Text style = {stylesVP.textScor}> Air Ball PG: {player.scrT.a_AirB == null ? 0 : player.scrT.a_AirB.toFixed(2)} </Text>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
  
  function ren_Dest(){
    return (
      <View>
        
      </View>
    );
  }
    
  return(
    <View style = {stylesVP.telaFull}>
     <View style = {stylesVP.viewS}>
      <TouchableOpacity style = {stylesVP.viewIMG}
        onPress = {async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.05,
            base64: true
          });
          if(!result.cancelled){
            player.image = result;
            await SalveData(banco);
            setState(!state);
            //backAction();
          } else {
            Alert.alert("Aviso", "Você não selecionou nenhuma imagem!");
          }
        }}
      >
        <Image style = {stylesVP.img}
          source = {RetornaImg(player.image)}
        />
      </TouchableOpacity>
      <TouchableOpacity style = {stylesVP.viewInfosP}
        onPress = {() => {
          if(route.params.veio_de == "MainP"){
            navigation.replace("Form_User",{
              player  : banco.userMaster,
              veio_de : "MainP",
            });
          }
        }}
      >
        <Text style = {stylesVP.text_infos}> {banco.userMaster.nome} </Text>
        <Text style = {{...stylesVP.text_infos, fontSize: 16 }}> Crie sua liga ou importe uma, cadastre os atletas e realize seus jogos </Text>
      </TouchableOpacity>
     </View>
    <View style = {{width: '100%', ...styles.border1}}/>
    <View style = {stylesVP.viewL}>
      {rend_Escores()}
    </View>
    </View>
  );
};
