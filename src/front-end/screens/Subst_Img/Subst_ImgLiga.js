import React, {useEffect, useState} from 'react';
import { 
  Text, View, Image, TouchableOpacity, ScrollView, StatusBar, BackHandler,
  Alert, PermissionsAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import {Topo} from '../../components/index_comps';
import { useNavigation } from '@react-navigation/native';
import banco from '../../../back-and2/banco_local';
import style_SI from './styleSI';
import {Cor, icons} from '../../styles/index_S';
import assets from '../../../../assets/index_assets';
import SalveDados from '../../../back-and2/SalveData';

export default function Subst_ImgLg({route}){
  const navigation = useNavigation();

  function backAction(){
    navigation.replace("MainL",{
      time        : route.params.time,
      dest        : route.params.dest,
      index_time  : route.params.index_time,
    });
    return true;
  }

  useEffect(() => {
    if(!PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA) && !PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)){
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,{
        title: "Permissão para usar a câmera",
        message: "Nós precisamos da sua permissão para usar a câmera",
        buttonNeutral: "Me lembre mais tarde",
        buttonNegative: "Não, não quero",
        buttonPositive: "Sim, quero"
      });
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
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
   
    if(route.params.time.img_log != value){
      route.params.time.img_logo = value;
      await SalveDados(banco);
      navigation.replace("MainL",{
        time        : route.params.time,
        dest        : route.params.dest,
        index_time  : route.params.index_time,
      });
    } else Alert.alert("Aviso", "Essa é sua atual imagem!");
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
                  quality: 1,
                  base64: true
                });
                if(!result.cancelled){
                  route.params.time.image_log = result;
                  SalveDados(banco);
                  backAction();
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
                source = {assets.liga_lg} 
              />  
            </TouchableOpacity>  
          </View>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(2)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg2} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(3)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg3} 
              />  
            </TouchableOpacity>  
          </View>

          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(4)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg4} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(5)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg5} 
              />  
            </TouchableOpacity>  
          </View>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(6)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg6} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(1)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg1} 
              />  
            </TouchableOpacity>  
          </View>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(8)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg8} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(7)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg7} 
              />  
            </TouchableOpacity>  
          </View>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(9)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg9} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(10)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg10} 
              />  
            </TouchableOpacity>  
          </View>
          <View style = {style_SI.linha}>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(11)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg11} 
              />  
            </TouchableOpacity>
            <TouchableOpacity style = {style_SI.btt_img}
              onPress = {() => setar_Img(12)}
            >
              <Image style = {style_SI.img_logo}
                source = {assets.liga_lg12} 
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
