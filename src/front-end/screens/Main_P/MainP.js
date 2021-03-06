import React, {useEffect, useState} from "react";
import {
    KeyboardAvoidingView, TextInput, Text, Image, View, StatusBar, Modal, 
    TouchableOpacity, Alert, FlatList, BackHandler
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SalveDados from '../../../back-and2/SalveData';
import banco from '../../../back-and2/banco_local';
import confgBD from '../../../../config/config.json';
import { Topo} from '../../components/index_comps';
import Icon from 'react-native-vector-icons/AntDesign';
import IconE from 'react-native-vector-icons/Entypo';
import assets from "../../../../assets/index_assets";
import stylesCP from '../LigaCreate/stylesCompLPesq';
import {stylesMP, stylesC} from './styles/indexStyles';
import { Cor, icons,  idiomaPort, idiomaEUA, SetaTema } from '../../styles/index_S';
import {RetornaImg, RetornaImgL, SetaDests, MontarArrayDest } from '../../functions/index';


export default function Main_Players(){
    
    const navigation = useNavigation();
    const [rend, setRender]         = useState(false);
    const [modalV1,  setMV1]        = useState(false);
    const [modalV2,  setMV2]        = useState(false);
    const [itemLiga, setItemLiga]   = useState([]);
    const [new_liga, setNewLiga]    = useState(false);
    const [index_liga, setindexL]   = useState(0);
    const [title, setTitle]         = useState("Ligas");
    const [modo, setModo]           = useState(true); // true mostra ligas, só troca para pedidos se peds > 0
    const [textName, setTN]         = useState("Sesc");
    const [textApel, setTA]         = useState("");
    const [textLocal, setLocal]     = useState("Bagé-RS"); // posso buscar o local no cel com API
    
    function backAction(){
        Alert.alert("Sair", "Você deseja sair da sua conta?", [{
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Sim", onPress: () =>  navigation.replace("Login")
        }]);
        return true;
    }

    useEffect(async () => {
        for(let lg of banco.ligas)
            lg.destaques = await SetaDests(lg.list_users);
        //console.log("Image", banco.userMaster.image);
        //console.log("Ligas ", banco.ligas.length)
        //console.log("Liga -> \n", banco.ligas[0].confLiga);
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => {BackHandler.removeEventListener("hardwareBackPress", backAction);}
    }, []);
  
    // renderiza aviso ou Flat List das ligas
    function render_Liga(){
        if(modo){
            if(banco.times.length == 0){
                return (
                    <Text style = {stylesMP.textAviso}>
                        "Crie seu primeiro time e cadastre seus atletas!" 
                    </Text>
                );
            } else {
                return(
                    <FlatList style = {stylesMP.flatLiga}
                        data = {banco.times}
                        renderItem = {Comp_Liga}
                        keyExtractor={(item) => {item.id}}
                    />
                );
            }
        } else {
            return(
                <FlatList style = {stylesMP.flatLiga}
                    data = {banco.pedidos}
                    renderItem = {Comp_Pedido}
                    keyExtractor={(item) => {item.id}}
                />
            );
            
        }
        
    }

    function render_Modal_CL(){
        /* Modal para configurar liga */
        return(
            <Modal
                animationType   ="slide"
                transparent     ={true}
                visible         ={modalV2}
                onRequestClose  = {() => {
                    setMV2(false); 
                }}
            >
                <View style = {stylesMP.viewFullModal}>
                <View style = {stylesMP.viewModal_confLiga}>
                    <Text style = {stylesMP.title_modal}> - Opções da Liga - </Text>
                    <View style = {stylesMP.view_imputs}>
                                                
                        <TouchableOpacity style = {stylesMP.btt_Modal}
                            onPress = {() => {
                                sair_da_liga();
                            }}
                        >
                            <Text style = {stylesMP.text_btt}> Sair da Liga </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
        );
    }

    function Comp_Liga({item, index}){
        const dt = new Date(item.createdAt);
        const data = "Criada: "+ dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear().toString()[2] + dt.getFullYear().toString()[3];

        // monta o array destaques
        
           
        return(
            <View style={stylesC.view_compFull}>
                <TouchableOpacity style={stylesC.btt_comp_liga}
                    onPress = {async () => {
                        //console.log(item);
                        navigation.replace("MainL",{
                            time        : item,
                            index_time  : index,
                            dest        : await MontarArrayDest(item.list_users),
                        });
                    }}
                    onLongPress = {() => {
                            setItemLiga(item);
                            setindexL(banco.ligas.indexOf(item));
                            setMV2(true);
                        }
                    }
                >
                    <Image style = {stylesC.img_logo}
                        source = {RetornaImgL(item.img_logo)}
                    /> 
                    <View style = {stylesC.viewInf}>
                        <Text style = {stylesC.textTitle}> {item.nome}</Text>
                        <Text style = {stylesC.textInfos}> Membros: {item.list_users.length} | {data} </Text>
                        <Text style = {stylesC.textInfos}> Total Pontos: {item.total_pts} </Text>
                        <Text style = {stylesC.textInfos}> Jogos Of: {item.listJgs5x5O.length} </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    
    //console.log(bd)
    return( 
        <View style = {stylesMP.telaFull}>
            <StatusBar hidden = {true}
                barStyle="ligth-content"/>
            <Topo main = {true}/>
            <View style = {stylesMP.viewLiga}>
                <Text style = {stylesMP.txt_TitleM}> Times </Text>  
                <View style = {stylesMP.viewL}> 
                    {render_Liga()} 
                </View>
                <View style = {stylesMP.viewBttns}>
                    <TouchableOpacity 
                        style = {stylesMP.btt_new_liga}
                        onPress = {() => {
                            navigation.replace("LigaCreate");
                        }} //navigation.navigate("")
                    >
                        <Icon 
                            style = {{marginTop: 10}}
                            name    = {icons.add_liga}
                            color   = {Cor.icons_cor}
                            size    = {40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {stylesMP.btt_new_liga}
                        onPress = {() => {navigation.replace("ViewP", {
                            player      : banco.userMaster,
                            veio_de     : "MainP",
                        })}}
                    >
                        <Icon 
                            style = {{marginTop: 10}}
                            name    = {icons.user}
                            color   = {Cor.icons_cor}
                            size    = {40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {stylesMP.btt_new_liga}
                        onPress = {async () => {
                            Alert.alert("Aviso", "Disponível apenas nas cores dark!");
                        }} 
                    >
                        <IconE 
                            style = {{marginTop: 10}}
                            name    = {icons.cores}
                            color   = {Cor.icons_cor}
                            size    = {40}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
