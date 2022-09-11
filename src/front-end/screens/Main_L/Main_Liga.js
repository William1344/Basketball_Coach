import React, { useEffect, useState } from "react";
import {Text, FlatList, View, StatusBar, Image, 
        TouchableOpacity, Modal, KeyboardAvoidingView, 
        TextInput, Alert, Keyboard, BackHandler, ActivityIndicator
    } from 'react-native';
import { styleM, stylesCJ } from './styleshet/index_styles';
import { Cor, icons, styles} from '../../styles/index_S';
import { useNavigation } from "@react-navigation/native"
import { User_GameV } from "../../../back-and2/banco_dados/index";
import Icon from 'react-native-vector-icons/AntDesign';
import { RetornaImg, RetornaImgL } from '../../functions/index';

export default function Main_Liga({route}){
    const date          = new Date(route.params.time.createdAt);
    const navigation    = useNavigation();
    const [dest_render, setDest_render]     =  useState(route.params.dest[0]);
    const [load, setLoad]                   =  useState(false); // true -> carregando

    useEffect(()=>{
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
            index_time      : route.params.index_time,
            veio_de         : "menu_time",
            time            : route.params.time,
            dest            : route.params.dest,
        })
    }
     
    function criaTimes(){
        route.params.time.list_times3.splice(0, route.params.time.list_times3.length);
        route.params.time.list_times5.splice(0, route.params.time.list_times5.length);
        //monta os times 3x3
        for(let jg of route.params.time.listJgs3x3){
            
            let tmA = [], tmB = [];
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
        for(let jg of route.params.time.listJgs5x5T){
            let tmA = [], tmB = [];
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
    
    // componentes
    function Comp_jgdr({item}){
        
        return(
            <View style = {stylesCJ.compFull}>
            <TouchableOpacity style = {stylesCJ.btt_fl}
                onPress = {()=>{
                    navigation.replace("ViewP",{
                        player      :   item,
                        time        :   route.params.time,
                        dest        :   route.params.dest,
                        index_time  :   route.params.index_time,
                        veio_de     :   "MainL",
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
                        navigation.replace("Subst_ImgLg",{
                            time        : route.params.time,
                            dest        : route.params.dest,
                            index_time  : route.params.index_time
                        });
                    }}
                >
                    <Image style = {{height:'100%', width:'100%',borderRadius: 90}}
                        source = {RetornaImgL(route.params.time.image_log)}
                        resizeMode = "cover"
                    />
                </TouchableOpacity>
                <View style={styleM.view1_infos}>  
                    <Text style = {styleM.text}>Criada: {"" + date.getDate() + "/" + (date.getMonth()+ 1) + "/" + date.getFullYear().toString()[2]+date.getFullYear().toString()[3]}</Text>
                    <Text style = {styleM.text}>Time: {route.params.time.nome}</Text>
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
                            time        : route.params.time,
                            dest        : route.params.dest,
                            index_time  : route.params.index_time,
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
                            //console.log("Entrou aqui! btt");
                            criaTimes();
                            navigation.replace("NovoJg",{
                                time        : route.params.time,
                                dest        : route.params.dest,
                                index_time  : route.params.index_time,
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
                                time        : route.params.time,
                                dest        : route.params.dest,
                                index_time  : route.params.index_time,
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
                                time        : route.params.time,
                                dest        : route.params.dest,
                                index_time  : route.params.index_time,
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
