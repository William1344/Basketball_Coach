import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, FlatList, Alert, TextInput, Image, StatusBar, BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import stylesNJ from './styleNJ3';
import { useNavigation } from '@react-navigation/native';
import { Cor, icons } from '../../styles/index_S';
import banco from '../../../back-and2/banco_local';
import { Picker }         from '@react-native-picker/picker';
import { RetornaImgL } from '../../functions/index';

    var timeA       = new Array();
    var timeB       = new Array();
    var list_subs   = new Array();
    var jogadores, timesL3, timesL5;

export default function Novo_Jg({route}){
    // variaveis de controle States
    
    function backAction(){
        navigation.replace("MainL",{
            time        : route.params.time,
            dest        : route.params.dest,
            index_time  : route.params.index_time,
        });
        return true;
    }

    const navigation                = useNavigation();
    const [state    , setState]     = useState(false);
    const [modo     , setPicker]    = useState("");
    const [modo3x3  , setModo3x3]   = useState(false);
    const [modo5x5  , setModo5x5]   = useState(false);
    const [timesOK  , setTimesOK]   = useState(false);
    const [textIA   , setTextIA]    = useState("Time A");
    const [textIB   , setTextIB]    = useState("Time B");
    const [t_times  , setTimes]     = useState("Jogadores");
    const [subs     , setSubs]      = useState(false);
    const [jgdr_time, setJT]        = useState(true);
    
    useEffect(() => { 
        jogadores   = route.params.time.list_usersG.slice();
        timesL3     = route.params.time.list_times3.slice();
        timesL5     = route.params.time.list_times5.slice();
        setJT(true);
        //_zeraTimes();//
        setTimeout(()=>{
            setState(!state);
        }, 100);
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
    useEffect(() => {
        if(jgdr_time ) setTimes("Jogadores")
        else{
            if(timesOK) setTimes("Substitutos");
            else setTimes("Times");
        }
    },[jgdr_time]);
// funções de controle::
    // zera os times
    function _zeraTimes(){
        timeA       = new Array();
        timeB       = new Array();
        list_subs   = new Array();
        timesL3     = route.params.time.list_times3.slice();
        timesL5     = route.params.time.list_times5.slice();
        jogadores   = route.params.time.list_usersG.slice();
        
        setTimesOK(false);
        setSubs(false);
        setModo3x3(false);
        setModo5x5(false);       
    }
    function preencheJgdrs(){
        if(list_subs.length > 0){
            for(let jgd of list_subs){
                jogadores.push(jgd);
            }
            list_subs.splice(0, list_subs.length);
        }
    }
    
    
    function verifyEstado(){
        if(timesOK){
            if(modo3x3)
                if(timeA.length != 3 || timeB.length != 3){
                    setTimesOK(false);
                    //preencheJgdrs();
                    setaComp();
                }
            else
                if(timeA.length != 5 || timeB.length != 5){
                    setTimesOK(false);
                    //preencheJgdrs();
                    setaComp();
                }   
        }
        
    }

    function ret_Jgdr(jgd){
        for(let jg of jogadores){
            if(jgd.Users_idUsers == jg.Users_idUsers){
                //console.log("jogador encontrado", jg, "->\n", jgd);
                return jogadores.indexOf(jg);
            }
        }
    }

    
    // adiciona e remove jogadores ao time, sempre cuidando modo de jogo
    // caso mude os times são zerados.
    function addTime(item){
        // verifica entrada picker
        if(modo == "3x3"){
            if(timeA.length < 3){
                //console.log("Jogador 0 W", jogadores[0])
                timeA.push(item);
                //console.log("Jogador veio", item);
                let pos = ret_Jgdr(item);
                //console.log("Posição", pos)
                //console.log("Encontrado", jogadores[pos]);
                jogadores.splice(pos, 1);
                setState(!state);
            } else if(timeB.length < 3){
                timeB.push(item);
                let pos = ret_Jgdr(item);
                jogadores.splice(pos, 1);
                setState(!state);
            }
            if((timeA.length == 3) && (timeB.length == 3) && !timesOK) {
                setListSubs();
                
                setTimesOK(true); 
                console.log("TimesOK -> true")
            } 
            else if((timeA.length < 3 || timeB.length < 3) && timesOK) setTimesOK(false);
            else if(timesOK && (timeA.length == 3) && (timeB.length == 3)){
                list_subs.push(item);
                let pos = ret_Jgdr(item);
                jogadores.splice(pos, 1);
                setState(!state);
            }
        } else if(modo == "5x5"){
            if(timeA.length < 5){
                timeA.push(item);
                let pos = ret_Jgdr(item);
                jogadores.splice(pos, 1);
                setState(!state);
            } else if(timeB.length < 5){
                timeB.push(item);
                let pos = ret_Jgdr(item);
                jogadores.splice(pos, 1);
                setState(!state);
            }
            if((timeA.length == 5) && (timeB.length == 5) && !timesOK){
                setListSubs();
                setJT(true);
                setTimesOK(true);
                console.log("TimesOK -> true")
            } 
            else if((timeA.length < 5 || timeB.length < 5) && timesOK) setTimesOK(false);
        } else if(modo == "5x5Of"){
            if(timeA.length < 5){
                timeA.push(item);
                let pos = ret_Jgdr(item);
                jogadores.splice(pos, 1);
                setState(!state);
            } else {
                list_subs.push(item);
                let pos = ret_Jgdr(item);
                jogadores.splice(pos, 1);
                setState(!state);
            }
        } else{
            Alert.alert("Modo de jogo não selecionado");
        }
    }
    
    // selecionando os times, só preenche se um dos times estiver vazio
    // se o time B estiver vazio, precisa verificar se 
    function _preencheTime(time){
        function removeTime(){
            if(modo3x3) {
                let p = timesL3.indexOf(time)
                timesL3.splice(p,1);
            } else if(modo5x5){
                let p = timesL5.indexOf(time)
                timesL5.splice(p,1);
            }
            setState(!state);
        }
        if(timeA.length == 0){ 
            for(let jgd of time) addTime(jgd);
            removeTime();
        } else if(timeB.length == 0 && ((modo3x3 && timeA.length == 3) ||(modo5x5 && timeA.length == 5))){
            for(let jgd of time){
                for(let jgdA of timeA){
                    if(jgd.Users_idUsers == jgdA.Users_idUsers) break;
                    else if(timeA.indexOf(jgdA) == timeA.length -1) addTime(jgd);
                }
            }
            removeTime();
        }
        

    }
    // preenche lista de subs após completar os times
    function setListSubs(){
        if(route.params.time.confLiga.selSubs){
            for (let jgd of jogadores) list_subs.push(jgd);
            jogadores = new Array();
        }
    }
    // remove time A
    function remTimeA(item){
        jogadores.push(item);
        let pos = timeA.indexOf(item);
        timeA.splice(pos, 1);
        setState(!state);
        verifyEstado();
    }
    // remove time B
    function remTimeB(item){
        jogadores.push(item);
        let pos = timeB.indexOf(item);
        timeB.splice(pos, 1);
        setState(!state);
        verifyEstado();
    }
    // remove subs
    function remSubs(item){
        jogadores.push(item);
        let pos = list_subs.indexOf(item);
        list_subs.splice(pos, 1);
        setState(!state);
    }

    // starta para a proxima tela, se modo de jogo 3x3 || 5x5 = true 
    // && timeA e timeB com 3 ou 5 jogadores conforme o modo de jogo
    function start_Game(){
        console.log("TimesOK?", timesOK)
        if(timesOK){
            console.log("timesOK -> true");
            // monta timeA com 3 ou 5 jogadores conforme o (timeN.length)
            if(modo == "3x3"){
                let dt = new Date();
                let rotulo_jogo = "Modo 3x3 | Jogo: " + (route.params.time.listJgs3x3.length + 1) + " | Data: " +
                ("" + dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear());  
               
                navigation.replace("Load3x3",{
                    nomeA   : textIA,
                    nomeB   : textIB,
                    tmA     : timeA.slice(),
                    tmB     : timeB.slice(),
                    tmS     : list_subs.slice(),
                    rotulo  : rotulo_jogo,
                    time    : route.params.time,
                    dest    : route.params.dest,               
                });
            } else if(modo == "5x5"){
                let dt = new Date();
                let rotulo_jogo = "Modo 5x5 | Jogo: " + (route.params.time.listJgs3x3.length + 1) + " | Data: " +
                ("" + dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear());
            
                navigation.replace("Load5x5",{
                    nomeA   : textIA,
                    nomeB   : textIB,
                    tmA     : timeA.slice(),
                    tmB     : timeB.slice(),
                    tmS     : list_subs.slice(),
                    rotulo  : rotulo_jogo,
                    time    : route.params.time,
                    dest    : route.params.dest,
                });
            }
        } else{
            Alert.alert("Complete os times conforme o modo de jogo para iniciar um jogo")
        }

        
    }

    // ---------- Funções renderizadoras ------------
    // renderiza os FL para montar os times!
    function renderTJS(){
        if(!timesOK){
            if(jgdr_time){ // true = jogadores
                return rend_jogadores();
            } else{ // false = times
                return rend_times();
            }
        } else{
            if(jgdr_time){ // true = jogadores
                return rend_jogadores();
            } else{ // false = times
                return rend_subs();
            }
        }
    }
    // renderiza os times da partida
    function render_times(){
        if(modo == "3x3" || modo == "5x5" || modo == "" || modo == "Definir"){
            return(
                <>
                    <View style = {stylesNJ.viewTA} > 
                        <TextInput style = {stylesNJ.textVT}
                                value={textIA}
                                onChangeText={()=>{setTextIA()}}
                        />
                        <FlatList style = {stylesNJ.flatLT}
                            data = {timeA}
                            renderItem = {compTimeA}
                            keyExtractor = {(item) => {item.id}}
                        />
                    </View>
                    <View style = {stylesNJ.viewTB} > 
                        <TextInput style = {stylesNJ.textVT}
                            value={textIB}
                            onChangeText={()=>{setTextIB()}}
                        />
                        <FlatList style = {stylesNJ.flatLT}
                            data = {timeB}
                            renderItem = {compTimeB}
                            keyExtractor = {(item) => {item.id}}
                        />
                    </View>
                </>
            );
        } else if(modo == "5x5Of"){
            return(
                <View style = {stylesNJ.viewTAOf} >
                    <TextInput style = {stylesNJ.textVT}
                            value={textIA}
                            onChangeText={()=>{setTextIA()}}
                    />
                    <FlatList style = {stylesNJ.flatLT}
                        data = {timeA}
                        renderItem = {compTimeA}
                        keyExtractor = {(item) => {item.id}}
                    />
                </View>
            );
        }
    }
    //FL jogadores 
    function rend_jogadores(){
        return(
            <FlatList style = {stylesNJ.flatLJgdrs}
                data = {jogadores}
                renderItem = {compJogadores}
                keyExtractor = {(item) => {item.id}}
                //extraData={select_ID}
            />
        );
    } 
    // FL times
    function rend_times(){
        if(modo3x3){
          if(route.params.time.list_times3.length > 0)
            return(             
                <FlatList style = {stylesNJ.flatLJgdrs}
                    data = {timesL3}
                    renderItem = {compTimes}
                    keyExtractor = {(item) => {item.id}}
                    //extraData={select_ID}
                />
            );
          else
          //console.log(timesL3)
            return(                
                <Text style = {{...stylesNJ.textModo, width: '90%'}}> 
                    Times Vazio
                </Text>
            );
        } else if(modo5x5){
          if(route.params.time.list_times5.length > 0)
            return(
                <FlatList style = {stylesNJ.flatLJgdrs}
                    data = {timesL5}
                    renderItem = {compTimes}
                    keyExtractor = {(item) => {item.id}}
                    //extraData={select_ID}
                />
            );
          else 
            return(    
                <Text style = {{...stylesNJ.textModo, width: '90%'}}> Realize pelomenos 1 jogo 5x5 para ver times </Text>
            );
          
        }  else {
            return (
                <Text style = {{...stylesNJ.textModo, height: '60%', width: '60%'}}> 
                    Times vazio 
                </Text>
            );
        }
        
    }
    // FL subs
    function rend_subs(){
        return (
             
            <FlatList style = {stylesNJ.flatLJgdrs}
                data = {list_subs}
                renderItem = {compSubs}
                keyExtractor = {(item) => {item.id}}
            />
            
        )
    }
//componentes JSX.element
    // componentes do FlatList 
        // times
    function compTimes({item}) {
        return(
            <TouchableOpacity style = {{...stylesNJ.viewCompTime, marginBottom: 3, height: 'auto'}}
                onPress = {()=>{ _preencheTime(item)}}
            >
                <Text style = {stylesNJ.textTime}> Time </Text>
                <Text style = {stylesNJ.textTime}> {item[0].apelido} | {item[1].apelido} | {item[2].apelido}</Text>
                {modo5x5 &&
                    <Text style = {stylesNJ.textTime}> {item[3].apelido} | {item[4].apelido}</Text>
                }
            </TouchableOpacity>
        );
    }
        // jogadores
    function compJogadores({item}) {
        return(
            <TouchableOpacity style = {stylesNJ.viewBttFL}
                onPress = {() => {addTime(item)}}
            >
                <Text style = {stylesNJ.textName}>{item.apelido}</Text>
            </TouchableOpacity>
            );        
    };
        // time A
    function compTimeA({item}) {
        return(
            <TouchableOpacity style = {stylesNJ.viewBttFL}
                onPress = {() => {remTimeA(item);if(timesOK) setTimesOK(false);}}
            >
                <Text style = {stylesNJ.textName}> {item.apelido} </Text>
            </TouchableOpacity>
            )        
    };
        // time B
    function compTimeB({item}) {
        return(
            <TouchableOpacity style = {stylesNJ.viewBttFL}
                onPress = {() => {remTimeB(item);if(timesOK) setTimesOK(false);}}
            >
                <Text style = {stylesNJ.textName}>{item.apelido}</Text>
            </TouchableOpacity>
            )        
    };
        // substitutos
    function compSubs({item}) {
        return(
            <TouchableOpacity style = {stylesNJ.viewBttFL}
                onPress = {() => {remSubs(item)}}
            >
                <Text style = {stylesNJ.textName}>{item.apelido}</Text>
            </TouchableOpacity>
            )        
    };
    
//funções de teste    
    //teste -> função para preencher times com 5 jogadores e list subs.
    
    return(
        <View style = {stylesNJ.telaFull}>
            <StatusBar
                hidden = {true}
                barStyle= 'light-content'
            />
            <View style = {stylesNJ.viewTopo}>
                <Image style = {stylesNJ.imgPf}
                    source = {RetornaImgL(route.params.time.image_log)}
                    resizeMode="cover"
                />
                {/*<TouchableOpacity style = {stylesNJ.bbtConf}>
                    <Icon
                        name = {icons.confgs}
                        size = {35}
                        color = {Cor.icons_cor}
                    />
                </TouchableOpacity>*/}
                <View style = {stylesNJ.viewInfos}>
                    <Text style = {stylesNJ.textInfos}>
                        Treinador: {banco.userMaster.nome} 
                    </Text>
                    <Text style = {stylesNJ.textInfos}>
                        Jgs: {""+(banco.userMaster.der + banco.userMaster.vits)} | FG: {banco.userMaster.FG.toFixed(2)}
                    </Text>
                </View>
                
            </View>
            <View style = {stylesNJ.viewMT}>
                <View style = {stylesNJ.viewModo}>
                    <View style = {stylesNJ.viewPicker}>
                    <Picker 
                        style         = {stylesNJ.picker}
                        mode          = "diálogo"
                        selectedValue = {modo}
                        onValueChange = {(itemValue, itemIndex) => setPicker(itemValue)}
                    >
                        <Picker.Item label="Definir" value="Definir" />
                        <Picker.Item label="3x3" value="3x3" />
                        <Picker.Item label="5x5" value="5x5" />
                        <Picker.Item label="5x5Of" value="5x5Of" />
                    </Picker>
                    </View>
                    
                </View>

                <View style = {stylesNJ.viewTimes}>
                    {render_times()}
                </View>
            </View>
                
            <View style = {stylesNJ.viewJgdrs}>
                <TouchableOpacity style = {{...stylesNJ.btt_jgdr, marginTop: 5}}
                    onPress = {() => {
                        setJT(!jgdr_time); 
                    }}
                >
                    <Text style = {{...stylesNJ.bttText, fontSize: 22}}>{t_times}</Text>
                </TouchableOpacity>
                <View style = {stylesNJ.viewFlats}>
                    {renderTJS()}
                </View>
            </View>
            <TouchableOpacity style = {stylesNJ.bttEnd}
                onPress = {() => {start_Game()}}
            >
                <Text style = {stylesNJ.bttText}> Jogar </Text>
            </TouchableOpacity>
        </View>
    );

}
