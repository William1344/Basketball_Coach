import React, { useEffect, useState } from "react";
import {Text, FlatList, View, StatusBar, Image, 
        TouchableOpacity, Modal, KeyboardAvoidingView, 
        TextInput, Alert, Keyboard, BackHandler, ActivityIndicator
    } from 'react-native';
import { styleM, stylesJ, stylesCJ, stylesModal } from './styleshet/index_styles';
import { Cor, icons, styles} from '../../styles/index_S';
import { useNavigation } from "@react-navigation/native"
import { User_GameV, User_LigaV } from "../../../back-and2/banco_dados/index";
import Icon             from 'react-native-vector-icons/AntDesign';
import AsyncStorage     from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import SalveDados from '../../../back-and2/SalveData';
import assets from "../../../../assets/index_assets";
import banco from "../../../back-and2/banco_local";
import configBD from "../../../../config/config.json";
import { RetornaImg, RetornaImgL } from '../../functions/index';

export default function Main_Liga({route}){
    const date          = new Date(route.params.time.createdAt);
    const navigation    = useNavigation();
    const [cod_NewUser, setCod_NewUser]     =  useState("");
    const [textApel, setTA]                 =  useState("");
    const [modalAdd, setModalAdd]           =  useState(false);
    const [ped, setPedido]                  =  useState(Cor.white);
    const [tipoJG, setTipoJG]               =  useState(true);
    const [rend, setRend]                   =  useState(true);
    const [dest_render, setDest_render]     =  useState(route.params.dest[0]);
    const [load, setLoad]                   =  useState(false); // true -> carregando

    useEffect(()=>{
        //console.log("Scores 5x5", route.params.time.list_users[0].scr5x5);
        //console.log(route.params.time.pedidos);
        //console.log("Image -> ", route.params.time.img_logo);
        //console.log("User da liga -> ", banco.ligas[0].list_users[0]);
        //console.log("Liga -> ", route.params.time.list_users[1]);
        //console.log("Liga -> ", route.params.time.list_usersG[1]);

        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => {BackHandler.removeEventListener("hardwareBackPress", backAction);}
    }, []);

    // funcoes da tela
    function backAction(){
        navigation.replace("MainP");
        return true;
    }

    async function add_jogadorB(){
        navigation.replace("Form_User", {
            index_time      : route.params.index,
            veio_de         : "ML",
            time            : route.params.time,
            dest            : route.params.dest,
        })
    }
     
    async function criaTimes(){
        route.params.time.list_times3.splice(0, route.params.time.list_times3.length);
        route.params.time.list_times5.splice(0, route.params.time.list_times5.length);
        //monta os times 3x3
        for(let jg of route.params.time.listJgs3x3){
            
            let tmA = [], tmB = [], jj = {};
            for(let jgd of jg.timeA){
                let uGV = new User_GameV({
                    id      : jgd.Users_idUsers,
                    numero  : jgd.numero,
                    apelido : jgd.apelido,
                });
                tmA.push(uGV);
            }
            for(let jgd of jg.timeB){
                let uGV = new User_GameV({
                    id      : jgd.Users_idUsers,
                    numero  : jgd.numero,
                    apelido : jgd.apelido,
                });
                tmB.push(uGV);
            }
            route.params.time.list_times3.unshift(tmA);
            route.params.time.list_times3.unshift(tmB);
            //console.log("Times criados",route.params.time.list_times3);
        }
        //monta os times 5x5
        for(let jg of route.params.time.listJgs5x5){
            let tmA = [], tmB = [], jj = {};
            for(let jgd of jg.timeA){
                let uGV = new User_GameV({
                    id      : jgd.Users_idUsers,
                    numero  : jgd.numero,
                    apelido : jgd.apelido,
                });
                tmA.push(uGV);
            }
            for(let jgd of jg.timeB){
                let uGV = new User_GameV({
                    id      : jgd.Users_idUsers,
                    numero  : jgd.numero,
                    apelido : jgd.apelido,
                });
                tmB.push(uGV);
            }
            route.params.time.list_times5.push(tmA);
            route.params.time.list_times5.push(tmB);
        }
        return true;
    }
    
    async function montarArrayDest(liga){
        let array = [];
        array.push(liga.destaques.jgd_Cluth);
        array.push(liga.destaques.jgd_Fominha);
        array.push(liga.destaques.jgd_Vencedor);
        array.push(liga.destaques.jgd_Pontuador);
        array.push(liga.destaques.jgd_2Pts);
        array.push(liga.destaques.jgd_3Pts);
        array.push(liga.destaques.jgd_Reboteiro);
        array.push(liga.destaques.jgd_Assist);
        array.push(liga.destaques.jgd_Ladrao);
        array.push(liga.destaques.jgd_Bloker);
        array.push(liga.destaques.jgd_AirBall);
        array.push(liga.destaques.jgd_FG);
        array.push(liga.destaques.jgd_PPG);
        array.push(liga.destaques.jgd_2PPG);
        array.push(liga.destaques.jgd_3PPG);
        array.push(liga.destaques.jgd_APG);
        array.push(liga.destaques.jgd_RPG);    
        array.push(liga.destaques.jgd_BPG);
        array.push(liga.destaques.jgd_AirBPG);
        array.push(liga.destaques.jgd_RouPG);
        return array;
    }

    // componentes
    function Comp_jgdr({item}){
        
        return(
            <View style = {stylesCJ.compFull}>
            <TouchableOpacity style = {stylesCJ.btt_fl}
                onPress = {()=>{
                    navigation.replace("ViewP",{
                        player  :   item,
                        liga    :   route.params.time,
                        dest    :   route.params.dest,
                        veio_de :   "MainL",
                    });
                }}
            >
                <Image
                    style = {stylesCJ.img}
                    source = {RetornaImg(item.image)}
                />
                <View style = {stylesCJ.viewInfos}>
                    <Text style = {stylesCJ.text_infos}>{item.apelido} | {item.numero}|</Text>
                    <Text style = {stylesCJ.text_infos}> {item.posicao} </Text>
                    <Text style = {{...stylesCJ.text_infos, fontSize: 14}}>Jgs: {item.scrT.jogos} | FG: {(item.scrT.a_FG % 1) == 0 ? item.scrT.a_FG : item.scrT.a_FG.toFixed(0)}%</Text>
                </View>                
            </TouchableOpacity>
            </View>
        );
    }

    function comp_destaques(item){
        function nextDest(){
            const pos = route.params.dest.indexOf(dest_render);
            if(pos == route.params.dest.length - 1) setDest_render(route.params.dest[0]);
            else setDest_render(route.params.dest[pos + 1]);
        } 
        return(
            <TouchableOpacity style = {styleM.comp_destaques}
             // passagens -> e <- devem mover os tipos de destaques na liga
             // os destaques devem rolar conforme o passa o tempo 3s ->
                onPress = {()=>{
                    nextDest();
                }}
            >
              <View style = {styleM.view1CompDest}>
                <Image
                    style = {styleM.imgCompDest}
                    source = {RetornaImg(item.user.image)}
                />
                <View style = {styleM.viewInfosCompDest}>
                    <Text style = {{...styleM.textsInfos, fontSize: 16}}>{item.title}</Text>
                    <Text style = {{...styleM.textsInfos, fontSize: 14, textAlign : 'justify'}}>{item.desc}</Text>
                </View>
              </View>
              <View style = {styleM.view2CompDest}>
                <Text style = {{...styleM.textsInfos, marginLeft: 8, marginTop: 5}}>{item.user != null ? item.user.apelido : "Vazio"} | Jogos: {item.user != null ? item.user.scrT.jogos : 0}</Text>
                {item.title != "Fominha" && <Text style = {{...styleM.textsInfos, marginLeft: 8, marginTop: 2, alignSelf: 'center'}}>{item.value % 1 === 0 ? item.value : item.value.toFixed(2)} {item.rotulo}</Text>}
              </View>
            </TouchableOpacity>
        );
    }

    function comp_sem_destaques(){
        return(
            <View style = {styleM.comp_destaques}>
              <View style = {styleM.view1CompDest}>
                <Text style = {styleM.textsInfos}>Não há jogadores cadastrados no time!</Text>
              </View>
            </View>
        );
    }

    return (
        <View style = {styleM.telaFull}>
            
            <StatusBar hidden = {false}
                barStyle="ligth-content"/>
            {load && 
                <ActivityIndicator
                    style = {{position : "absolute", top : '50%', right: "50%", }}
                    size = "large"
                    color = {Cor.sec}
                />
            }
            <View style = {styleM.viewS}>         
                <TouchableOpacity style = {styleM.img_logo}
                    onPress = { () => {
                        /* Requisito: Para logos da liga, o treinador terá opção de escolher 
                            uma foto do diretório ou logos padrão disponibilizados 
                            pelo aplicativo.

                        */
                        /*navigation.replace("Subst_ImgLg",{
                            liga        : route.params.time,
                            dest        : route.params.dest,
                            index_liga  : route.params.index_liga
                        });*/

                    }}
                >
                    <Image style = {{height:'100%', width:'100%',borderRadius: 90}}
                        source = {RetornaImgL(route.params.time.img_logo)}
                        resizeMode = "cover"
                    />
                </TouchableOpacity>
                <View style={styleM.view1_infos}>  
                    <Text style = {styleM.text}>Criada: {"" + date.getDate() + "/" + (date.getMonth()+ 1) + "/" + date.getFullYear().toString()[2]+date.getFullYear().toString()[3]}</Text>
                    <Text style = {styleM.text}>Liga: {route.params.time.nome}</Text>
                    <Text style = {styleM.text}>Jogadores: {route.params.time.list_users.length}</Text>
                    <Text style = {styleM.text}>Jogos: {(route.params.time.listJgs5x5O.length) + (route.params.time.listJgs3x3.length)}</Text>
                    <Text style = {styleM.text}>Pontos: {route.params.time.total_pts}</Text>
                </View>
            </View>
            <View style = {styleM.view_infer} >
                <View style = {styleM.viewBtt}>
                    <TouchableOpacity 
                        style = {styleM.btt_opacit}
                        onPress = {() => navigation.replace("Ranking",{
                            liga        : route.params.time,
                            dest        : route.params.dest,
                            index_liga  : route.params.index_liga,
                        })} //navigation.navigate("")
                    >
                        <Icon 
                            name    = {icons.rankink} 
                            size    = {30}
                            color   = {Cor.icons_cor}
                        />
                        <Text style = {styleM.btt_text}> Ranking </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styleM.btt_opacit}
                        onPress = {async () => {
                            console.log("Entrou aqui! btt");
                            await criaTimes();
                            navigation.replace("NovoJg",{
                                liga        : route.params.time,
                                dest        : route.params.dest,
                                index_liga  : route.params.index_liga,
                            });
                        }} 
                    >
                        <Icon 
                            name    = {icons.new_jg} 
                            size    = {30}
                            color   = {Cor.icons_cor}
                        />
                        <Text style = {styleM.btt_text}> Novo Jogo </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style = {styleM.btt_opacit}
                        onPress = {() => {
                            navigation.replace("List_Jgs",{
                                liga        : route.params.time,
                                dest        : route.params.dest,
                                index_liga  : route.params.index_liga,
                            });
                        }}
                        
                        //navigation.navigate("")
                    >
                        <Icon 
                            name    = {icons.champ}
                            size    = {30}
                            color   = {Cor.icons_cor}
                        />
                        <Text style = {styleM.btt_text}>Jogos</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style = {styleM.btt_opacit}
                        onPress = {() => {
                            add_jogadorB();      
                        }} //navigation.navigate("")
                    >
                        <Icon 
                            name    = {icons.add_jgdr} 
                            size    = {30}
                            color   = {Cor.icons_cor}
                        />
                        <Text style = {styleM.btt_text}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styleM.btt_opacit}
                        onPress = { () => {    
                            navigation.replace("ConfigLiga",{
                                liga        : route.params.time,
                                dest        : route.params.dest,
                                index_liga  : route.params.index_liga,
                            });
                        }} 
                    >
                        <Icon 
                            name    = {icons.setting} 
                            size    = {30}
                            color   = {Cor.icons_cor}
                        />
                        <Text style = {styleM.btt_text}> Confgs </Text>
                    </TouchableOpacity>    
                    
                </View>
                <View style = {styleM.view_Comps}>
                    <View style = {styleM.view_jgdrs}>
                        <Text style = {{...styles.texts, fontSize: 22}}> 
                            Destaques 
                        </Text>
                        {route.params.time.list_users.length > 0 ?
                            comp_destaques(dest_render)
                                :
                            comp_sem_destaques()
                        }
                    </View>
                    <View style = {styleM.view_jgdrs}>
                        <TouchableOpacity style = {styleM.btt_pedidos}
                            onPress = {()=>{
                                navigation.replace("Membros",{
                                    time        : route.params.time,
                                    dest        : route.params.dest,
                                    index_time  : route.params.index_time,
                                });
                            }}
                        >
                            <Text style = {{...styles.texts, fontSize: 24,...styles.btts, width: '80%'}}> 
                                Membros  
                            </Text>
                        </TouchableOpacity>
                      
                        <FlatList style = {styleM.flat_List}
                            data = {route.params.time.list_users}
                            renderItem = {Comp_jgdr}
                            keyExtractor = {(item) => {item.idUsers}}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
} 
