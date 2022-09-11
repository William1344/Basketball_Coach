import React, {useState, useEffect} from 'react';
import { 
  Alert, BackHandler, KeyboardAvoidingView, Text, 
  TextInput, TouchableOpacity, View
} from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';
import {useNavigation}  from '@react-navigation/native';
import stylesLC         from './stylesLC';
import { LigaV } from '../../../back-and2/banco_dados/index';
import Topo             from '../../components/Topo/Topo';
import banco            from '../../../back-and2/banco_local';
import SalveData        from '../../../back-and2/SalveData';

export default function LigaCreate({route}){

  const navigation                = useNavigation();
  const [textName, setTN]         = useState("");
  const [textLocal, setLocal]     = useState(""); // posso buscar o local no cel com API
    
  useEffect(() => {
    // teste de reloads
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {BackHandler.removeEventListener("hardwareBackPress", backAction);}
  },[]);

 

  function backAction(){
    navigation.replace("MainP");
    return true;
  }

  async function newLiga(){
    if(textName.length > 0 ){
      let tm = new LigaV({
        id      : banco.times.length,
        nome    : textName,
        local   : textLocal,
      });
      banco.times.push(tm);
      //console.log(banco.times);
      await SalveData(banco);
      navigation.replace("MainP");
    }else{
      Alert.alert("Preencha todos os campos");
      //console.log("Preencha todos os campos");
    }
  }

  async function ImportJSON(){
    // Requests permissions for external directory
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      // Gets SAF URI from response
      let fileUri = "";
      const path = permissions.directoryUri;
      const pathMat = await StorageAccessFramework.readDirectoryAsync(path);
      for(let i = 0; i < pathMat.length; i++){
        if(pathMat[i].includes("time.json")){
          fileUri = pathMat[i];
          break;
        }
      }
      //console.log("fileUri", fileUri);
      
      let arquivo = await StorageAccessFramework.readAsStringAsync(fileUri);
      let objeto = JSON.parse(arquivo);
      //console.log("Arquivo: ", objeto);
      banco.times.push(objeto);
      await SalveData(banco);
    }   
    return true; 
  }

  return(
    <View style = {stylesLC.telaFull}>
      <Topo/>
      <View style = {stylesLC.viewInf}>
        <Text style = {stylesLC.title_imputs}> Criar Time </Text>
        <View style = {stylesLC.viewImSup}>
          <KeyboardAvoidingView 
            style = {stylesLC.keyBoard}
            behavior = {Platform.select({
              ios : 'padding',
              android : null,
            })}
          >    
            <TextInput style = {stylesLC.txt_input}
              value           = {textName}
              onChangeText    = {(tt)=>{setTN(tt)}}
              placeholder     = "Nome do time"
            />
            <TextInput style = {stylesLC.txt_input}
              value           = {textLocal}
              onChangeText    = {(tt)=>{setLocal(tt)}}
              placeholder     = "Local"
            />
            <TouchableOpacity style = {{...stylesLC.btt_bar, width: '50%'}}
              onPress = {() => {
                newLiga();
              }}
            >
              <Text style = {stylesLC.text_btt}> Criar Time </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{...stylesLC.btt_bar, width: '50%'}}
              onPress = {() => {
                ImportJSON();
              }}
            >
              <Text style = {stylesLC.text_btt}> Importar  Time </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
}