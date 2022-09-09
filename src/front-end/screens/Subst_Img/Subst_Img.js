import React, {useEffect, useState} from 'react';
import { 
  Text, View, Image, TouchableOpacity, ScrollView, StatusBar, BackHandler,
  Alert, PermissionsAndroid
} from 'react-native';
import {Topo} from '../../components/index_comps';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import {Cor, icons} from '../../styles/index_S';
import style_SI from './styleSI';
import assets from '../../../../assets/index_assets';
import SalveData from '../../../back-and2/SalveData';
import banco from '../../../back-and2/banco_local';

export default function Subst_Img(){
  const navigation = useNavigation();

  function backAction(){
    navigation.replace("MainP");
    return true;
  }

  useEffect(async () => {
    // Verificar se tem acesso a camera e galeria, caso não, pedir permissão...
    if(!PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA) && !PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)){
      const grantedCam = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,{
        title: "Permissão para usar a câmera",
        message: "Nós precisamos da sua permissão para usar a câmera",
        buttonNeutral: "Me lembre mais tarde",
        buttonNegative: "Não, não quero",
        buttonPositive: "Sim, quero"
      });
      const grantedGal = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
        title: "Permissão para usar a galeria",
        message: "Nós precisamos da sua permissão para usar a galeria",
        buttonNeutral: "Me lembre mais tarde",
        buttonNegative: "Não, não quero",
        buttonPositive: "Sim, quero"
      });
    }
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {BackHandler.removeEventListener('hardwareBackPress', backAction);};
  }, []);


  
  async function setar_Img(value){ // value é o valor referente ao icon
    
    if(banco.userMaster.image != value){
      banco.userMaster.image = value;
      await SalveData(banco);
      navigation.replace("MainP");
    } 
    else Alert.alert("Aviso", "Essa é sua atual imagem!");
    
  }

  function render_grande(){
    return (
      <View style = {style_SI.tela}>
        <Text style = {style_SI.title}> Selecione Imagem </Text>
        <ScrollView style = {style_SI.scrool}>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {{...style_SI.btt_img, justifyContent: 'center', alignItems: 'center'}}
              onPress = {async () => {
                // Adicionar imagem da galeria pelo ImagePicker
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 0.1,
                  base64: true
                });
                if(!result.cancelled){
                  banco.userMaster.image = result;
                  await SalveData(banco);
                  navigation.replace("MainP");
                } else {
                  Alert.alert("Aviso", "Você não selecionou nenhuma imagem!");
                }
              }}
            >
              <Icon
                name    = {icons.mais}
                color   = {Cor.sec}
                size    = {100}
              /> 
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(0)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg} 
              />  
            </TouchableOpacity>  
          </View>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {async () => await setar_Img(2)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg2} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(3)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg3} 
              />  
            </TouchableOpacity>  
          </View>

          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(4)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg4} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(5)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg5} 
              />  
            </TouchableOpacity>  
          </View>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(6)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg6} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(1)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg1} 
              />  
            </TouchableOpacity>  
          </View>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(8)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg8} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(7)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg7} 
              />  
            </TouchableOpacity>  
          </View>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(9)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg9} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(10)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg10} 
              />  
            </TouchableOpacity>  
          </View>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(11)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg11} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(12)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.play_lg12} 
              />  
            </TouchableOpacity>  
          </View>
  
        </ScrollView>  
      </View>
    );
  }

  // Topo = 23% da altura da tela
  return (
    <View style = {style_SI.telaFull}>
      <Topo main = {false}/> 
      {render_grande()}
    </View>
  )
}
