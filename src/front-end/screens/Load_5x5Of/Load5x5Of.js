import React, {useState, useEffect} from "react";
import styles5x5Of from "./styles5x5Of";
import Icon from 'react-native-vector-icons/Entypo';
import { View, Text, StatusBar, TouchableOpacity, Modal, FlatList, ScrollView, 
    Alert, BackHandler } from "react-native";
import SalveData from "../../../back-and2/SalveData";
import { useNavigation } from "@react-navigation/native";
import { Cor, icons } from "../../styles/index_S";
import { IncremJg } from "../../functions/index";
import banco from '../../../back-and2/banco_local';

    var tA = new Array();
    var tB = new Array();
    var listT;
    var timeA, timeB, timeS, nomeTA, nomeTB;

export default function Load5x5Of({route}){
    const navigation = useNavigation();
    const conf = route.params.time.confLiga;
    // useStates da tela
    const [time, setTime]       = useState(true); // true -> time A
    const [inc, setInc]         = useState(true); // true -> incrementa scores
    const [_modal, set_modal]   = useState(false); // solicita que o modal apareça
    const [load, setLoad]       = useState(false); // true -> carregando
    const [_subst, set_tSub]    = useState("");     // variavel para setar o nome do jogador a ser subs no Modal
    const [_pos_subs, setPSub]  = useState([]);
    
    function backAction(){
        Alert.alert("Sair do Jogo?", "Você deseja sair do jogo?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Sim", onPress: () =>  navigation.replace("NovoJg",{
                time            : route.params.time,
                dest            : route.params.dest,
                index_time      : route.params.index_time,
            })}
        ]);
        return true;
    }

    function _zeraStates(){
        setA1_2pts(0);
        setA2_2pts(0);
        setA3_2pts(0);
        setA4_2pts(0);
        setA5_2pts(0);
        
        setA1_3pts(0);
        setA2_3pts(0);
        setA3_3pts(0);
        setA4_3pts(0);
        setA5_3pts(0);
        
        setA1_Reb(0);
        setA2_Reb(0);
        setA3_Reb(0);
        setA4_Reb(0);
        setA5_Reb(0);
        
        setA1_Asst(0);
        setA2_Asst(0);
        setA3_Asst(0);
        setA4_Asst(0);
        setA5_Asst(0);
        
        setA1_2pts(0);
        setA2_2pts(0);
        setA3_2pts(0);
        setA4_2pts(0);
        setA5_2pts(0);
        
        setA1_Blk(0);
        setA2_Blk(0);
        setA3_Blk(0);
        setA4_Blk(0);
        setA5_Blk(0);
        
        setA1_AirB(0);
        setA2_AirB(0);
        setA3_AirB(0);
        setA4_AirB(0);
        setA5_AirB(0);
    }

    // 2pts Time A
    const [A1_2pts, setA1_2pts] = useState(0);
    const [A2_2pts, setA2_2pts] = useState(0);
    const [A3_2pts, setA3_2pts] = useState(0);
    const [A4_2pts, setA4_2pts] = useState(0);
    const [A5_2pts, setA5_2pts] = useState(0);
   
    // 3pts Time A
    const [A1_3pts, setA1_3pts] = useState(0);
    const [A2_3pts, setA2_3pts] = useState(0);
    const [A3_3pts, setA3_3pts] = useState(0);
    const [A4_3pts, setA4_3pts] = useState(0);
    const [A5_3pts, setA5_3pts] = useState(0);
   
    // Rebotes Time A
    const [A1_Reb, setA1_Reb]   = useState(0);
    const [A2_Reb, setA2_Reb]   = useState(0);
    const [A3_Reb, setA3_Reb]   = useState(0);
    const [A4_Reb, setA4_Reb]   = useState(0);
    const [A5_Reb, setA5_Reb]   = useState(0);
    
    // Assistencia Time A
    const [A1_Asst, setA1_Asst] = useState(0);
    const [A2_Asst, setA2_Asst] = useState(0);
    const [A3_Asst, setA3_Asst] = useState(0);
    const [A4_Asst, setA4_Asst] = useState(0);
    const [A5_Asst, setA5_Asst] = useState(0);
    
    // Tocos Time A
    const [A1_Blk, setA1_Blk]   = useState(0);
    const [A2_Blk, setA2_Blk]   = useState(0);
    const [A3_Blk, setA3_Blk]   = useState(0);
    const [A4_Blk, setA4_Blk]   = useState(0);
    const [A5_Blk, setA5_Blk]   = useState(0);
        
    // Air ball Time A
    const [A1_AirB, setA1_AirB] = useState(0);
    const [A2_AirB, setA2_AirB] = useState(0);
    const [A3_AirB, setA3_AirB] = useState(0);
    const [A4_AirB, setA4_AirB] = useState(0);
    const [A5_AirB, setA5_AirB] = useState(0);
    
    const [plcA, set_plcA]      = useState(0);
    const [plcB, set_plcB]      = useState(0);
    // seta cores dos botões
    
    const [corA, setCorA] = useState(Cor.btt_sel);
    const [corB, setCorB] = useState(Cor.btt);
    const [icon_inc, setIcon_i] = useState(icons.incrementa);
//
     
    useEffect(() => {
        _zeraStates();
        timeA   = route.params.tmA;
        timeB   = route.params.tmB;
        timeS   = route.params.tmS;
        nomeTA  = route.params.nomeA;
        nomeTB  = route.params.nomeB; 
        console.log(route.params.time.list_users[0]);
        listT = route.params.time.list_times5;
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backAction);
        }

    },[]);  
    


    // variaveis da tela   
    var jgd_cluth = new Array();
    // inicia a tela sempre que renderizar
    
    // controle do cronometro
        //variaveis
    const [playCro, setPlayCro] = useState(false);
    const [play_paused, setPP]  = useState(icons.play_cro)
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [cust_Interval , setCust_Interval] = useState()
        // funções de controle.
    function startTime(){
        setCust_Interval(
            setInterval(() => {
                changeTime();
            }, 1000)
        );
    }
    function stopTime(){
        if(cust_Interval){
            clearInterval(cust_Interval);
        }
    }
    function clearTime(){
        stopTime();
        setSeconds(0);
        setMinutes(0);
    }
    function changeTime(){
        setSeconds((prevState) => {
            if(prevState + 1 == 60){
                setMinutes(minutes + 1);
                return 0;
            }
            return prevState + 1;
        })
    }

    // controla o placar
    function renderPlacar(_2pts, a){
        if(inc){
            if(a){
                if(_2pts){
                    set_plcA(plcA + 2);
                } else{
                    set_plcA(plcA + 3);
                }
            }else {
                if(_2pts){
                    set_plcB(plcB + 2);
                } else{
                    set_plcB(plcB + 3);
                }
            }
        } else {
            if(a){
                if(_2pts){
                    set_plcA(plcA - 2);
                } else{
                    set_plcA(plcA - 3);
                }
            }else {
                if(_2pts){
                    set_plcB(plcB - 2);
                } else{
                    set_plcB(plcB - 3);
                }
            }
        }

    }
    // seta os scores do jogador
    function seta_A1(){
        setPSub([true, 0]);
        route.params.tmA[0].a_2pts  = A1_2pts;
        route.params.tmA[0].a_3pts  = A1_3pts;
        route.params.tmA[0].reb     = A1_Reb;
        route.params.tmA[0].asst    = A1_Asst;
        route.params.tmA[0].blk     = A1_Blk;
        route.params.tmA[0].roub    = 0;
        route.params.tmA[0].airB    = A1_AirB;
    }

    function seta_A2(){
        setPSub([true, 1]);
        route.params.tmA[1].a_2pts  = A2_2pts;
        route.params.tmA[1].a_3pts  = A2_3pts;
        route.params.tmA[1].reb     = A2_Reb;
        route.params.tmA[1].asst    = A2_Asst;
        route.params.tmA[1].blk     = A2_Blk;
        route.params.tmA[1].roub    = 0;
        route.params.tmA[1].airB    = A2_AirB;
    }

    function seta_A3(){
        setPSub([true, 2]);
        route.params.tmA[2].a_2pts  = A3_2pts;
        route.params.tmA[2].a_3pts  = A3_3pts;
        route.params.tmA[2].reb     = A3_Reb;
        route.params.tmA[2].asst    = A3_Asst;
        route.params.tmA[2].blk     = A3_Blk;
        route.params.tmA[2].roub    = 0;
        route.params.tmA[2].airB    = A3_AirB;
    }

    function seta_A4(){
        setPSub([true, 3]);
        route.params.tmA[3].a_2pts  = A4_2pts;
        route.params.tmA[3].a_3pts  = A4_3pts;
        route.params.tmA[3].reb     = A4_Reb;
        route.params.tmA[3].asst    = A4_Asst;
        route.params.tmA[3].blk     = A4_Blk;
        route.params.tmA[3].roub    = 0;
        route.params.tmA[3].airB    = A4_AirB;
    }

    function seta_A5(){
        setPSub([true, 4]);
        route.params.tmA[4].a_2pts  = A5_2pts;
        route.params.tmA[4].a_3pts  = A5_3pts;
        route.params.tmA[4].reb     = A5_Reb;
        route.params.tmA[4].asst    = A5_Asst;
        route.params.tmA[4].blk     = A5_Blk;
        route.params.tmA[4].roub    = 0;
        route.params.tmA[4].airB    = A5_AirB;
    }

    function setaStatesA(){
        switch (_pos_subs[1]) {
            case 0:
                setA1_2pts(route.params.tmA[0].a_2pts);
                setA1_3pts(route.params.tmA[0].a_3pts);
                setA1_Reb(route.params.tmA[0].reb);
                setA1_Asst(route.params.tmA[0].asst);
                setA1_Blk(route.params.tmA[0].blk);
                setA1_AirB(route.params.tmA[0].airB);
                break;
            case 1:
                setA2_2pts(route.params.tmA[1].a_2pts);
                setA2_3pts(route.params.tmA[1].a_3pts);
                setA2_Reb(route.params.tmA[1].reb);
                setA2_Asst(route.params.tmA[1].asst);
                setA2_Blk(route.params.tmA[1].blk);
                setA2_AirB(route.params.tmA[1].airB);
                break;
            case 2:
                setA3_2pts(route.params.tmA[2].a_2pts);
                setA3_3pts(route.params.tmA[2].a_3pts);
                setA3_Reb(route.params.tmA[2].reb);
                setA3_Asst(route.params.tmA[2].asst);
                setA3_Blk(route.params.tmA[2].blk);
                setA3_AirB(route.params.tmA[2].airB);
                break;
            case 3:
                setA4_2pts(route.params.tmA[3].a_2pts);
                setA4_3pts(route.params.tmA[3].a_3pts);
                setA4_Reb(route.params.tmA[3].reb);
                setA4_Asst(route.params.tmA[3].asst);
                setA4_Blk(route.params.tmA[3].blk);
                setA4_AirB(route.params.tmA[3].airB);
                break;
            case 4:
                setA5_2pts(route.params.tmA[4].a_2pts);
                setA5_3pts(route.params.tmA[4].a_3pts);
                setA5_Reb(route.params.tmA[4].reb);
                setA5_Asst(route.params.tmA[4].asst);
                setA5_Blk(route.params.tmA[4].blk);
                setA5_AirB(route.params.tmA[4].airB);
                break;
            default:
                break;
        }
    }

    function substituir(item){
        if(_pos_subs[0]){
            route.params.tmS.unshift(route.params.tmA[_pos_subs[1]]);
            let p = route.params.tmS.indexOf(item);
            item.bool_jogou = true;
            route.params.tmA[_pos_subs[1]] = item;
            route.params.tmS.splice(p, 1);
            setaStatesA();
        }
        set_modal(false);
    }

    // seleciona o time a ser renderizado A || B
    function renderTime(){
        if(time){        // time A 
            return(
                <View style = {styles5x5Of.viewT}>
                <ScrollView styles = {{flex: 1}}>   
                    {/* timeA[0] */}
                    <View style = {styles5x5Of.viewComp}> 
                        <TouchableOpacity style = {styles5x5Of.bttNome}
                            onPress = {() => {
                                seta_A1();
                                set_tSub(route.params.tmA[0].apelido);
                                set_modal(true);
                            }}
                        >
                            <Text style = {styles5x5Of.textNome}> {route.params.tmA[0].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA1_2pts(A1_2pts + 1)
                                else setA1_2pts(A1_2pts - 1)
                                renderPlacar(true, true);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A1_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => { 
                                if(inc) setA1_3pts(A1_3pts + 1)
                                else setA1_3pts(A1_3pts - 1)
                                renderPlacar(false, true);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A1_3pts} </Text>
                        </TouchableOpacity>

                        {conf.rebote && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA1_Reb(A1_Reb + 1);
                                else setA1_Reb(A1_Reb - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A1_Reb} </Text>
                        </TouchableOpacity>}

                        {conf.assist && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA1_Asst(A1_Asst + 1);
                                else setA1_Asst(A1_Asst - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A1_Asst} </Text>
                        </TouchableOpacity>}

                        {conf.block && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA1_Blk(A1_Blk+ 1);
                                else setA1_Blk(A1_Blk - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A1_Blk} </Text>
                        </TouchableOpacity>}

                        {conf.airB && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA1_AirB(A1_AirB + 1);
                                else setA1_AirB(A1_AirB - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A1_AirB} </Text>
                        </TouchableOpacity>}
                    </View>

                    {/* timeA[1] */}
                    <View style = {styles5x5Of.viewComp}> 
                        <TouchableOpacity style = {styles5x5Of.bttNome}
                            onPress = {() => {
                                seta_A2();
                                set_tSub(route.params.tmA[1].apelido)
                                set_modal(true);
                            }}
                        >
                            <Text style = {styles5x5Of.textNome}> {route.params.tmA[1].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA2_2pts(A2_2pts + 1)
                                else setA2_2pts(A2_2pts - 1)
                                renderPlacar(true, true);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A2_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => { 
                                if(inc) setA2_3pts(A2_3pts + 1)
                                else setA2_3pts(A2_3pts - 1)
                                renderPlacar(false, true);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A2_3pts} </Text>
                        </TouchableOpacity>

                        {conf.rebote && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA2_Reb(A2_Reb + 1);
                                else setA2_Reb(A2_Reb - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A2_Reb} </Text>
                        </TouchableOpacity>}

                        {conf.assist && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA2_Asst(A2_Asst + 1);
                                else setA2_Asst(A2_Asst - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A2_Asst} </Text>
                        </TouchableOpacity>}

                        {conf.block && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA2_Blk(A2_Blk+ 1);
                                else setA2_Blk(A2_Blk - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A2_Blk} </Text>
                        </TouchableOpacity>}

                        {conf.airB && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA2_AirB(A2_AirB + 1);
                                else setA2_AirB(A2_AirB - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A2_AirB} </Text>
                        </TouchableOpacity>}
                    </View>
                    
                    {/* timeA[2] */}
                    <View style = {styles5x5Of.viewComp}> 
                        <TouchableOpacity style = {styles5x5Of.bttNome}
                            onPress = {() => {
                                seta_A3();
                                set_tSub(route.params.tmA[2].apelido)
                                set_modal(true);
                            }}
                        >
                            <Text style = {styles5x5Of.textNome}> {route.params.tmA[2].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA3_2pts(A3_2pts + 1)
                                else setA3_2pts(A3_2pts - 1)
                                renderPlacar(true, true);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A3_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => { 
                                if(inc) setA3_3pts(A3_3pts + 1)
                                else setA3_3pts(A3_3pts - 1)
                                renderPlacar(false, true);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A3_3pts} </Text>
                        </TouchableOpacity>

                        {conf.rebote && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA3_Reb(A3_Reb + 1);
                                else setA3_Reb(A3_Reb - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A3_Reb} </Text>
                        </TouchableOpacity>}

                        {conf.assist && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA3_Asst(A3_Asst + 1);
                                else setA3_Asst(A3_Asst - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A3_Asst} </Text>
                        </TouchableOpacity>}

                        {conf.block && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA3_Blk(A3_Blk+ 1);
                                else setA3_Blk(A3_Blk - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A3_Blk} </Text>
                        </TouchableOpacity>}

                        {conf.airB && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA3_AirB(A3_AirB + 1);
                                else setA3_AirB(A3_AirB - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A3_AirB} </Text>
                        </TouchableOpacity>}
                    </View>

                    {/* timeA[3] */}
                    <View style = {styles5x5Of.viewComp}> 
                        <TouchableOpacity style = {styles5x5Of.bttNome}
                            onPress = {() => {
                                seta_A4();
                                set_tSub(route.params.tmA[3].apelido)
                                set_modal(true);
                            }}
                        >
                            <Text style = {styles5x5Of.textNome}> {route.params.tmA[3].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA4_2pts(A4_2pts + 1)
                                else setA4_2pts(A4_2pts - 1)
                                renderPlacar(true, true);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A4_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => { 
                                if(inc) setA4_3pts(A4_3pts + 1)
                                else setA4_3pts(A4_3pts - 1)
                                renderPlacar(false, true);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A4_3pts} </Text>
                        </TouchableOpacity>

                        {conf.rebote && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA4_Reb(A4_Reb + 1);
                                else setA4_Reb(A4_Reb - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A4_Reb} </Text>
                        </TouchableOpacity>}

                        {conf.assist && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA4_Asst(A4_Asst + 1);
                                else setA4_Asst(A4_Asst - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A4_Asst} </Text>
                        </TouchableOpacity>}

                        {conf.block && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA4_Blk(A4_Blk+ 1);
                                else setA4_Blk(A4_Blk - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A4_Blk} </Text>
                        </TouchableOpacity>}

                        {conf.airB && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA4_AirB(A4_AirB + 1);
                                else setA4_AirB(A4_AirB - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A4_AirB} </Text>
                        </TouchableOpacity>}
                    </View>

                    {/* timeA[4] */}
                    <View style = {styles5x5Of.viewComp}> 
                        <TouchableOpacity style = {styles5x5Of.bttNome}
                            onPress = {() => {
                                seta_A5();
                                set_tSub(route.params.tmA[4].apelido)
                                set_modal(true);
                            }}
                        >
                            <Text style = {styles5x5Of.textNome}> {route.params.tmA[4].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA5_2pts(A5_2pts + 1)
                                else setA5_2pts(A5_2pts - 1)
                                renderPlacar(true, true);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A5_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => { 
                                if(inc) setA5_3pts(A5_3pts + 1)
                                else setA5_3pts(A5_3pts - 1)
                                renderPlacar(false, true);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A5_3pts} </Text>
                        </TouchableOpacity>

                        {conf.rebote && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA5_Reb(A5_Reb + 1);
                                else setA5_Reb(A5_Reb - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A5_Reb} </Text>
                        </TouchableOpacity>}

                        {conf.assist && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA5_Asst(A5_Asst + 1);
                                else setA5_Asst(A5_Asst - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A5_Asst} </Text>
                        </TouchableOpacity>}

                        {conf.block && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA5_Blk(A5_Blk+ 1);
                                else setA5_Blk(A5_Blk - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A5_Blk} </Text>
                        </TouchableOpacity>}

                        {conf.airB && <TouchableOpacity style = {styles5x5Of.bttScor}
                            onPress = {() => {
                                if(inc) setA5_AirB(A5_AirB + 1);
                                else setA5_AirB(A5_AirB - 1);
                            }}
                        >
                            <Text style = {styles5x5Of.textScor}> {A5_AirB} </Text>
                        </TouchableOpacity>}
                    </View>
                    
                </ScrollView>
                </View>
            );
        } else{ // time B
            return( 
                <View style = {styles5x5Of.viewT}>
                <FlatList 
                    renderItem= {CompSubs}
                    data = {route.params.tmS}
                    keyExtractor = {(item) => item.id}

                />
                </View>
            );
        }
    }

    function CompSubs({item}){
        return(
            <View style = {styles5x5Of.viewComp}> 
                <TouchableOpacity style = {styles5x5Of.bttNome}>
                    <Text style = {styles5x5Of.textNome}> {item.apelido} </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles5x5Of.bttScor}>
                    <Text style = {styles5x5Of.textScor}> {item.a_2pts}</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles5x5Of.bttScor}>
                    <Text style = {styles5x5Of.textScor}> {item.a_3pts} </Text>
                </TouchableOpacity>

                {conf.rebote && <TouchableOpacity style = {styles5x5Of.bttScor}>
                    <Text style = {styles5x5Of.textScor}> {item.reb} </Text>
                </TouchableOpacity>}

                {conf.assist && <TouchableOpacity style = {styles5x5Of.bttScor}>
                    <Text style = {styles5x5Of.textScor}> {item.asst} </Text>
                </TouchableOpacity>}

                {conf.block && <TouchableOpacity style = {styles5x5Of.bttScor}>
                    <Text style = {styles5x5Of.textScor}> {item.blk} </Text>
                </TouchableOpacity>}

                {conf.airB && <TouchableOpacity style = {styles5x5Of.bttScor}>
                    <Text style = {styles5x5Of.textScor}> {item.airB} </Text>
                </TouchableOpacity>}
            </View> 
        );
    }

    // renderiza a caixa de confirmação 
    // tem certeza que quer finalizar o jogo?
    function render_end(){
        Alert.alert(
            "Finalizar Jogo",
            "Você deseja finalizar o jogo?",
            [{
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Ok",
                onPress: ()=>{end_game()}
            }]
        );
    }   
    // se sim, finaliza o jogo e vai para visualização do jogo!
    async function end_game(){
        
        if(plcA > plcB)      for(let jgd of route.params.tmA) jgd.bool_dec = true;    
        
        seta_A1();  
        seta_A2();  
        seta_A3();  
        seta_A4();  
        seta_A5();  

        //cria o jogo.
        let tmS = [];
        for(let jgd of route.params.tmS) if(jgd.bool_jogou) tmS.push(jgd); 
        let dt = new Date();
        let dd = ("" + dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear().toString()[2] + dt.getFullYear().toString()[3]);
        let hr = ("" + dt.getHours() + ":" + dt.getMinutes())
        const rotul = "Jogo " + (route.params.time.listJgs5x5O.length + 1) + " | " + dd + " | "  + hr; 
        // criar objeto jogo para enviar ao banco de dados
        let jg = {
            id              : route.params.time.listJgs5x5O.length,
            rotulo          : rotul,
            tipo_Jogo       : "5x5Of",
            timeA           : timeA,
            timeB           : [],
            timeS           : timeS,
            nomeTA          : route.params.nomeA,
            nomeTB          : "Time B",
            plcA            : plcA,
            plcB            : plcB,
        };
      
          //incrementa o jogo no perfil de cada jogador
          console.log("Jogo para incremet", jg);
          let jgV = await IncremJg(route.params.time, jg);
          route.params.time.listJgs5x5O.push(jgV);
          SalveData(banco);
          //console.log("Jogo Var -> \n",jgV);
          //route.params.time.total_pts += plcA + plcB;
          navigation.replace("ViewJG5O", {
            game        : jgV,
            de_onde     : true,
            time        : route.params.time,
            index_time  : route.params.index_time,
          });
        // salvar jogo no banco de dados
        // requisição para salvar linha jogo e receber o id do jogo!
        
        
    }

    function Comp_FL({item}){
        return(
            <TouchableOpacity style = {styles5x5Of.btt_FL}
                onPress = {() => {substituir(item)}}
            >
                <Text style = {styles5x5Of.textFL}>{item.apelido}</Text>
            </TouchableOpacity>
        );
    }

    // renderização da tela Load3x3
    return(
        <View style = {styles5x5Of.telaFull}>
            <StatusBar
                hidden = {true}
                barStyle= 'light-content'
            />
            {load && 
                <ActivityIndicator
                style = {{position : "absolute", top : '50%', right: "50%", }}
                size = "large"
                color = {Cor.sec}
                />
            }
            <View style = {styles5x5Of.viewTop}>
                <View style = {styles5x5Of.viewCro}>
                    <Text style = {styles5x5Of.textCro}> 
                        {minutes < 10 ? '0' + minutes : minutes}:
                        {seconds < 10 ? '0' + seconds : seconds}
                    </Text>
                    <View style = {styles5x5Of.view_Setings}>
                        <TouchableOpacity style = {styles5x5Of.btt_modo}
                            onPress = {() => {
                                if(!playCro) {
                                    setPlayCro(true);
                                    setPP(icons.play_cro);
                                    stopTime();
                                }
                                else {
                                    setPlayCro(false);
                                    setPP(icons.paused_cro);
                                    startTime();
                                }
                            }}

                            onLongPress = {()=>{
                                clearTime()
                                setPlayCro(true);
                                setPP(icons.play_cro);
                            }}
                        >
                            <Icon
                                name = {play_paused}
                                size = {40}
                                color = {Cor.icons_cor}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles5x5Of.btt_modo}
                            onPress = {() => {
                                if(inc){
                                    setIcon_i(icons.decrementa)
                                    setInc(false);
                                } else{
                                    setIcon_i(icons.incrementa)
                                    setInc(true);
                                }  
                            }}
                        >
                            <Icon
                                name = {icon_inc}
                                size = {40}
                                color = {Cor.icons_cor}
                            /> 
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles5x5Of.btt_modo}
                            onLongPress = {() => {
                                render_end()                                
                            }}
                        >
                            <Icon
                                name = {icons.logout}
                                size = {40}
                                color = {Cor.icons_cor}
                            /> 
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles5x5Of.viewPlacar}>
                    <Text style = {styles5x5Of.textPla}> {route.params.rotulo} </Text>
                    <View style = {styles5x5Of.viewP}>
                        <Text style = {styles5x5Of.textVP_times}> {route.params.nomeA} </Text>
                        <Text style = {styles5x5Of.textVP_}> {plcA} </Text>
                        <Text style = {styles5x5Of.textVP_}> Vs. </Text>
                        <Text style = {styles5x5Of.textVP_}
                            onPress = {() => {set_plcB(plcB + 1)}}
                        > {plcB} </Text>
                        <Text style = {styles5x5Of.textVP_times}> {route.params.nomeB} </Text>
                    </View>
                </View>
            </View>
            <View style = {styles5x5Of.viewTime}>
                <View style = {styles5x5Of.viewSelect_Time}>
                    <TouchableOpacity style = {{
                        ...styles5x5Of.btt_SelTime,
                        backgroundColor: corA
                    }}
                        onPress={() => {
                            setTime(true)
                            setCorA(Cor.btt_sel)
                            setCorB(Cor.btt)
                        }}
                    >
                        <Text style = {styles5x5Of.textBtt}> Time A </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{
                        ...styles5x5Of.btt_SelTime,
                        backgroundColor: corB
                    }}
                        onPress = {() => {
                            setTime(false)
                            setCorA(Cor.btt)
                            setCorB(Cor.btt_sel)
                        }}
                    >
                        <Text style = {styles5x5Of.textBtt}> Substitutos </Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles5x5Of.viewTabJog}>
                    <View style = {styles5x5Of.viewCab}> 
                        <Text style = {styles5x5Of.bttNome}> Jogador </Text>
                        <Text style = {styles5x5Of.bttScor}> 2Pts </Text>
                        <Text style = {styles5x5Of.bttScor}> 3Pts </Text>
                        { conf.rebote &&    <Text style = {styles5x5Of.bttScor}> Reb </Text>}
                        { conf.assist &&    <Text style = {styles5x5Of.bttScor}> Asst </Text>}
                        { conf.block &&     <Text style = {styles5x5Of.bttScor}> Blk </Text>}
                        { conf.airB &&      <Text style = {styles5x5Of.bttScor}> AirB </Text>}
                    </View>
                    <View style = {styles5x5Of.viewJog}>
                        {renderTime()}
                    </View>
                </View>
            </View>
            
            {/* Modal para substituições */}
            <Modal 
                animationType="slide"
                transparent={true}
                visible={_modal}
                onRequestClose={
                    () => {set_modal(false)}
                }
            >
                <View style = {styles5x5Of.viewFullModal}>
                <View style = {styles5x5Of.viewModal_subsT}>
                    <Text style = {styles5x5Of.title_modal}>Substituir: {_subst}</Text>
                    <View style = {styles5x5Of.viewFlat}>
                        <FlatList style = {{flex:1, width: '98%'}}
                            data = {route.params.tmS}
                            renderItem = {Comp_FL}
                            keyExtractor = {(item) => {item.id_User}}
                        />
                    </View>
                </View>
                </View>
            </Modal>

        </View>
    );
}
