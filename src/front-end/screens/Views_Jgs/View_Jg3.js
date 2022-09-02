import React, {useState, useEffect} from "react";
import stylesV3 from "./stylesVJ";
import { View, Text, StatusBar, BackHandler, TouchableOpacity, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Cor} from "../../styles/index_S";
import { MontarArrayDest } from "../../functions/";
import banco from "../../../back-and2/banco_local";


export default function ViewGame_3x3({route}){
    const navigation = useNavigation();
    // useStates da tela
    const [time, setTime] = useState(true);
    const [corA, setCorA] = useState(Cor.btt_sel);
    const [corB, setCorB] = useState(Cor.btt);
    const conf_Liga = route.params.time.confLiga;
    var timeA   = route.params.game.timeA;
    var timeB   = route.params.game.timeB;
    var nomeTA  = route.params.game.nomeTA;
    var nomeTB  = route.params.game.nomeTB;
    var plcA    = route.params.game.plcA;
    var plcB    = route.params.game.plcB;
    
    async function backAction(){
        if(route.params.de_onde){
            navigation.replace("MainL",{
                time        :   route.params.time,
                dest        :   await MontarArrayDest(route.params.time.list_users),
                index_time  :   route.params.index_time,
            });
        } else {
            navigation.replace("List_Jgs",{
                time        :   route.params.time,
                dest        :   route.params.dest,
                index_time  :   route.params.index_time,
            });
        }
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    },[]);
    
    

    // seleciona o time a ser renderizado A || B
    function renderTime(){
        if(time){        
            return(
                <View style = {stylesV3.viewT}>   
                    {/* timeA[0] */}
                    <View style = {stylesV3.viewComp}> 
                        <TouchableOpacity style = {stylesV3.bttNome}>
                            <Text style = {stylesV3.textNome}> {timeA[0].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>                        
                            <Text style = {stylesV3.textScor}> {timeA[0].a_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[0].a_3pts} </Text>
                        </TouchableOpacity>

                        {conf_Liga.rebote && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[0].reb} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.assist && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[0].asst} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.block && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[0].blk} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.airB && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[0].airB} </Text>
                        </TouchableOpacity>}
                    </View>

                    {/* timeA[1] */}
                    <View style = {stylesV3.viewComp}> 
                        <TouchableOpacity style = {stylesV3.bttNome}>
                            <Text style = {stylesV3.textNome}> {timeA[1].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>                        
                            <Text style = {stylesV3.textScor}> {timeA[1].a_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[1].a_3pts} </Text>
                        </TouchableOpacity>

                        {conf_Liga.rebote && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[1].reb} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.assist && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[1].asst} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.block && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[1].blk} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.airB && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[1].airB} </Text>
                        </TouchableOpacity>}
                    </View>

                    {/* timeA[2] */}
                    <View style = {stylesV3.viewComp}> 
                        <TouchableOpacity style = {{...stylesV3.bttNome, borderBottomLeftRadius: 30}}>
                            <Text style = {stylesV3.textNome}> {timeA[2].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>                        
                            <Text style = {stylesV3.textScor}> {timeA[2].a_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[2].a_3pts} </Text>
                        </TouchableOpacity>

                        {conf_Liga.rebote && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[2].reb} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.assist && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[2].asst} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.block && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeA[2].blk} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.airB && <TouchableOpacity style = {{...stylesV3.bttScor, borderBottomRightRadius: 30}}>
                            <Text style = {stylesV3.textScor}> {timeA[2].airB} </Text>
                        </TouchableOpacity>}
                    </View>

                </View>
            );
        } else{
            return(
                <View style = {stylesV3.viewT}>
                    {/* timeB[0] */}
                    <View style = {stylesV3.viewComp}> 
                        <TouchableOpacity style = {stylesV3.bttNome}>
                            <Text style = {stylesV3.textNome}> {timeB[0].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>                        
                            <Text style = {stylesV3.textScor}> {timeB[0].a_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[0].a_3pts} </Text>
                        </TouchableOpacity>

                        {conf_Liga.rebote && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[0].reb} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.assist && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[0].asst} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.block && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[0].blk} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.airB && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[0].airB} </Text>
                        </TouchableOpacity>}
                    </View>

                    {/* timeB[1] */}
                    <View style = {stylesV3.viewComp}> 
                        <TouchableOpacity style = {stylesV3.bttNome}>
                            <Text style = {stylesV3.textNome}> {timeB[1].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>                        
                            <Text style = {stylesV3.textScor}> {timeB[1].a_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[1].a_3pts} </Text>
                        </TouchableOpacity>

                        {conf_Liga.rebote && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[1].reb} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.assist && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[1].asst} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.block && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[1].blk} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.airB && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[1].airB} </Text>
                        </TouchableOpacity>}
                    </View>

                    {/* timeB[2] */}
                    <View style = {stylesV3.viewComp}> 
                        <TouchableOpacity style = {{...stylesV3.bttNome, borderBottomLeftRadius: 30}}>
                            <Text style = {stylesV3.textNome}> {timeB[2].apelido} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>                        
                            <Text style = {stylesV3.textScor}> {timeB[2].a_2pts}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[2].a_3pts} </Text>
                        </TouchableOpacity>

                        {conf_Liga.rebote && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[2].reb} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.assist && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[2].asst} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.block && <TouchableOpacity style = {stylesV3.bttScor}>
                            <Text style = {stylesV3.textScor}> {timeB[2].blk} </Text>
                        </TouchableOpacity>}

                        {conf_Liga.airB && <TouchableOpacity style = {{...stylesV3.bttScor, borderBottomRightRadius: 30}}>
                            <Text style = {stylesV3.textScor}> {timeB[2].airB} </Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            );
        }
    }

    
    // renderização da tela Load3x3
    return(
        <View style = {stylesV3.telaFull}>
            <StatusBar
                hidden = {false}
                barStyle= 'light-content'
            />
            <View style = {stylesV3.viewTop}>        
                <Text style = {stylesV3.textPla}> {route.params.game.nome} </Text>
                <View style = {stylesV3.viewP}>
                    <Text style = {stylesV3.textVP_times}> {nomeTA} </Text>
                    <Text style = {stylesV3.textVP_}> {plcA} </Text>
                    <Text style = {stylesV3.textVP_}> Vs. </Text>
                    <Text style = {stylesV3.textVP_}> {plcB} </Text>
                    <Text style = {stylesV3.textVP_times}> {nomeTB} </Text>
                </View>
            </View>
            <View style = {stylesV3.viewTime}>
                <View style = {stylesV3.viewSelect_Time}>
                    <TouchableOpacity style = {{
                        ...stylesV3.btt_SelTime,
                        backgroundColor: corA
                    }}
                        onPress={() => {
                            setTime(true)
                            setCorA(Cor.btt_sel)
                            setCorB(Cor.btt)
                        }}
                    >
                        <Text style = {stylesV3.textBtt}> Time A </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{
                        ...stylesV3.btt_SelTime,
                        backgroundColor: corB
                    }}
                        onPress = {() => {
                            setTime(false)
                            setCorA(Cor.btt)
                            setCorB(Cor.btt_sel)
                        }}
                    >
                        <Text style = {stylesV3.textBtt}> Time B </Text>
                    </TouchableOpacity>
                </View>
                <View style = {stylesV3.viewTabJog}>
                    <View style = {stylesV3.viewCab}> 
                        <Text style = {stylesV3.bttNome}> Jogador </Text>
                        <Text style = {stylesV3.bttScor}> 2Pts </Text>
                        <Text style = {stylesV3.bttScor}> 3Pts </Text>
                        { conf_Liga.rebote && <Text style = {stylesV3.bttScor}> Reb </Text>}
                        { conf_Liga.assist && <Text style = {stylesV3.bttScor}> Asst </Text>}
                        { conf_Liga.block && <Text style = {stylesV3.bttScor}> Blk </Text>}
                        { conf_Liga.airB && <Text style = {stylesV3.bttScor}> AirB </Text>}
                    </View>
                    <View style = {stylesV3.viewJog}>
                        {renderTime()}
                        
                    </View>
                    
                </View>
                
            </View>
            
        </View>
    );
}
