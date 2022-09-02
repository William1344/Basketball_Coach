import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, 
  KeyboardAvoidingView, Alert, BackHandler, ScrollView
} from 'react-native';
import stylesF            from './stylesForm';
import { useNavigation }  from '@react-navigation/native';
import SalveData          from '../../../back-and2/SalveData';
import banco              from '../../../back-and2/banco_local';
import { User_LigaV, User_GameV }          from '../../../back-and2/banco_dados/index';
import assets             from '../../../../assets/index_assets';
import { Picker }         from '@react-native-picker/picker';
import { MontarArrayDest } from '../../functions/index';

export default function Form_User({route}){
  const navigation = useNavigation();
  const [txt_altura, setAltura]   = useState("1.95");
  const [posicao, setPosicao]     = useState("");
  const [txt_idade, setIdade]     = useState("18");
  const [txt_peso, setPeso]       = useState("80");
  const [txt_numC, setNumC]       = useState("22");
  const [txt_env, setEnv ]        = useState("1.95");
  const [textApel, setTA]         = useState("Maria");
  const [textNom, setTN]          = useState("Maria");

  useEffect(() => {
    // verifica se veio de viewPlayer
    if(route.params.veio_de == "editit"){
      // pega os dados do player e coloca nos campos
      setPosicao(route.params.player.posicao);
      setTA(route.params.player.apelido);
      setTN(route.params.player.nome);
      setIdade(route.params.player.idade);
      setAltura(route.params.player.altura);
      setPeso(route.params.player.peso);
      setEnv(route.params.player.envergadura);
      setNumC(route.params.player.numero);
    }
    //AddPlayers();
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {BackHandler.removeEventListener("hardwareBackPress", backAction);}
  },[])
  // função teste -- AddPlayers();
  async function AddPlayers(){
    async function cadastrarUser(player){
      // verifica se veio de viewPlayer ou se é um novo cadastro
      let us = {
        id : route.params.time.list_users.length,   // id vai ser o index do vetor de usersLocal
        image         : 0,                          // image do usuário
        nome          : player.nome,                    // nome do usuário
        apelido       : player.apelido,                   // apelido do jogador
        idade         : player.idade,                  // idade do jogador
        peso          : player.peso,                   // peso do jogador
        altura        : player.altura,                 // altura do jogador
        envergadura   : player.env,                    // envergadura do jogador
        numero        : player.numC,                   // numero da camisa do jogador
        posicao       : player.posicao,                    // posição do jogador
      }
      let jgdr = new User_LigaV(us);
      route.params.time.list_users.push(jgdr);
      let jgdrG = new User_GameV(us);
      route.params.time.list_usersG.push(jgdrG);     
    }
   let player = {
      nome          : "Jeovane",
      apelido       : "Jeovane",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "22",
      posicao       : "armador"
    }
    await cadastrarUser(player);
    player = {
      nome          : "Arnaldo",
      apelido       : "Arnaldo",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "24",
      posicao       : "ala-armador"
    }
    await cadastrarUser(player);
    player = {
      nome          : "José",
      apelido       : "José",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "26",
      posicao       : "ala-armador"
    }
    await cadastrarUser(player);
    player = {
      nome          : "Rubens",
      apelido       : "Rubens",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "28",
      posicao       : "ala-armador"
    }
    await cadastrarUser(player);
    player = {
      nome          : "Marcio",
      apelido       : "Marcio",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "30",
      posicao       : "ala-armador"
    }
    await cadastrarUser(player);
    player = {
      nome          : "JoséFaustino",
      apelido       : "Faustino",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "32",
      posicao       : "pivô"
    }
    await cadastrarUser(player);
    player = {
      nome          : "Robertin",
      apelido       : "Robertin",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "34",
      posicao       : "pivô"
    }
    await cadastrarUser(player);
    player = {
      nome          : "Arnaldo",
      apelido       : "Arnaldo",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "24",
      posicao       : "ala-armador"
    }
    await cadastrarUser(player);
    player = {
      nome          : "Louize",
      apelido       : "Louize",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "24",
      posicao       : "ala-armador"
    }
    await cadastrarUser(player);
    player = {
      nome          : "Ricardo",
      apelido       : "Ricardo",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "24",
      posicao       : "ala-armador"
    }
    await cadastrarUser(player);
    player = {
      nome          : "Adão",
      apelido       : "Adão",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "24",
      posicao       : "ala-armador"
    }
    await cadastrarUser(player);
    
    player = {
      nome          : "Viuvo",
      apelido       : "Viuvo",
      idade         : "18",
      peso          : "80",
      altura        : "1.95",
      env           : "1.95",
      numC          : "24",
      posicao       : "ala-armador"
    }

    await cadastrarUser(player);
    
    await SalveData(banco);
    navigation.replace("MainL",{
      time        : route.params.time,
      dest        : await MontarArrayDest(route.params.time.list_users),
      index_time  : route.params.index_time,
    });

  }
 
  function backAction(){
    if(route.params.veio_de == "menu_time"){
      navigation.replace("MainL",{
        time        : route.params.time,
        index_time  : route.params.index_time,
        dest        : route.params.dest
      });
    }else{
      // pode ter vindo do viewPlayer, 
      // ou seja precisa carregar as configs do jogador e ser capaz de salvar
      navigation.replace("Membros",{
        time        : route.params.time,
        dest        : route.params.dest,
        index_time  : route.params.index_time,
      });
    }
    return true;
  }

  async function cadastrarUser(){
    // verifica se veio de viewPlayer ou se é um novo cadastro
    if(route.params.veio_de == "menu_time"){
      let us = {
        id : route.params.time.list_users.length,   // id vai ser o index do vetor de usersLocal
        image         : 0,                          // image do usuário
        nome          : textNom,                    // nome do usuário
        apelido       : textApel,                   // apelido do jogador
        idade         : txt_idade,                  // idade do jogador
        peso          : txt_peso,                   // peso do jogador
        altura        : txt_altura,                 // altura do jogador
        envergadura   : txt_env,                    // envergadura do jogador
        numero        : txt_numC,                   // numero da camisa do jogador
        posicao       : posicao,                    // posição do jogador
      }

      let jgdr = new User_LigaV(us);
      route.params.time.list_users.push(jgdr);
      let jgdrG = new User_GameV(us);
      route.params.time.list_usersG.push(jgdrG);
      await SalveData(banco);
      navigation.replace("MainL",{
        time        : route.params.time,
        dest        : await MontarArrayDest(route.params.time.list_users),
        index_time  : route.params.index_time,
      });
    }else{
      
    }
  }

  return(
    <View style={stylesF.telaFull}>
      <TouchableOpacity style = {stylesF.btt_img} 
        onPress = {()=>{
          // setar a imagem do jogador
        }}
      >
        <Image style={stylesF.img} source={assets.play_lg9}/>
      </TouchableOpacity>
      <Text style={stylesF.title}>- Dados do jogador -</Text>
      <ScrollView style = {stylesF.scrollV}>
        <View style = {stylesF.viewForm}>
        {/*Picker*/}
        <View style = {{...stylesF.viewLinha, height: '15%'}}> 
          <Text style={stylesF.texts}>Posição</Text>
          <View style = {stylesF.viewPicker}>
          <Picker 
            style         = {stylesF.picker}
            mode          = "dropdown"
            selectedValue = {posicao}
            onValueChange = {(itemValue, itemIndex) => setPosicao(itemValue)}
           >
            <Picker.Item label="Definir" value="Definir" />
            <Picker.Item label="Armador" value="Armador" />
            <Picker.Item label="Ala" value="Ala" />
            <Picker.Item label="Ala-Armador" value="Ala-Armador" />
            <Picker.Item label="Ala-Pivô" value="Ala-Pivô" />
            <Picker.Item label="Pivô" value="Pivô" />
          </Picker>
          </View>
        </View>
        {/*Nome*/}
        <View style = {{...stylesF.viewLinha, justifyContent: 'flex-start', height: '10%'}}> 
          <View style = {stylesF.viewImput}>
          <TextInput style = {{...stylesF.txt_input, width: '100%', marginLeft: 10, textAlign: 'justify', borderWidth: 0}}
            value           = {textNom}
            onChangeText    = {(tt)=>{setTN(tt)}}
            placeholder     = "  Nome do jogador"
          />
          </View>
        </View>
        {/*Apelido*/}
        <View style = {{...stylesF.viewLinha, justifyContent: 'flex-start', height: '10%'}}> 
          <View style = {stylesF.viewImput}>
          <TextInput style = {{...stylesF.txt_input, width: '100%', marginLeft: 10, textAlign: 'justify', borderWidth:0}}
            value           = {textApel}
            onChangeText    = {(tt)=>{setTA(tt)}}
            placeholder     = "  Apelido (único)"
          />
          </View>
        </View>
        {/*Idade*/}
        <View style = {stylesF.viewLinha}>
          <Text style={stylesF.texts}>Idade</Text>
          <TextInput style = {stylesF.txt_input}
            value           = {txt_idade}
            onChangeText    = {(tt)=>{setIdade(tt)}}
            placeholder     = "Idade"
            keyboardType    = "numeric"
          />
        </View>
        {/*Altura*/}
        <View style = {stylesF.viewLinha}> 
          <Text style={stylesF.texts}>Altura</Text>
          <TextInput style = {stylesF.txt_input}
            value           = {txt_altura}
            onChangeText    = {(tt)=>{setAltura(tt)}}
            keyboardType    = "numeric"
            placeholder     = {"Altura (m)"} 
          /> 
        </View>
        {/*Peso*/}
        <View style = {stylesF.viewLinha}> 
          <Text style={stylesF.texts}>Peso</Text>
          <TextInput style = {stylesF.txt_input}
            value           = {txt_peso}
            onChangeText    = {(tt)=>{setPeso(tt)}}
            keyboardType    = "numeric"
            placeholder     = {"Peso (kg)"}
          />
        </View>
        {/*Envergadura*/}
        <View style = {stylesF.viewLinha}> 
          <Text style={stylesF.texts}>Envergadura</Text>
          <TextInput style = {stylesF.txt_input}
            value           = {txt_env}
            onChangeText    = {(tt)=>{setEnv(tt)}}
            keyboardType    = "numeric"
            placeholder     = {"Envergadura (m)"}
          />
        </View>
        {/*Numero da camisa*/}
        <View style = {stylesF.viewLinha}>
          <Text style={stylesF.texts}>Nº Regata</Text>
          <TextInput style = {stylesF.txt_input}
            value           = {txt_numC}
            onChangeText    = {(tt)=>{setNumC(tt)}}
            keyboardType    = "numeric"
            placeholder     = {"Nº Regata"}
          />
        </View>
        {/*Botao*/}
        
        </View>
      </ScrollView>
      <View style = {{...stylesF.viewLinha, height : '7%'}}>
          <TouchableOpacity style = {stylesF.btts} 
            onPress={()=> cadastrarUser()}
          >
            <Text style={stylesF.btts_text}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {stylesF.btts}
            onPress={()=>{navigation.replace("MainL",{
              time        : route.params.time,
              dest        : route.params.dest,
              index_time  : route.params.index_time,
            })}}
          >
            <Text style={stylesF.btts_text}>Cancelar</Text>
          </TouchableOpacity>  
        </View>
    </View>
  );
};