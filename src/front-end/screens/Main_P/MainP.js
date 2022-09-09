import React, {useEffect, useState} from "react";
import {
    Text, Image, View, StatusBar, Modal, PermissionsAndroid,
    TouchableOpacity, Alert, FlatList, BackHandler, 
    
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import banco from '../../../back-and2/banco_local';
import { Topo} from '../../components/index_comps';
import Icon from 'react-native-vector-icons/AntDesign';
import IconE from 'react-native-vector-icons/Entypo';
import {stylesMP, stylesC} from './styles/indexStyles';
import { Cor, icons } from '../../styles/index_S';
import { CheckPermission, ExportJSON, MontarArrayDest, RetornaImgL, SetaDests } from '../../functions/index';


export default function Main_Players(){
    
    const navigation = useNavigation();
    const [item, setItemLiga]   = useState({}); // true mostra ligas, só troca para pedidos se peds > 0
    const [modal, setModal]     = useState(false);
    
    
    useEffect(() => {
        
    },[]);

    

    useEffect(async () => {
        await CheckPermission();
        
        for(let tm of banco.times)
            tm.destaques = await SetaDests(tm.list_users);
        //console.log("Image", banco.userMaster.image);
        //console.log("Ligas ", banco.ligas.length)
        //console.log("Liga -> \n", banco.ligas[0].confLiga);
    }, []);
    // Funções
        
    function deleteLiga(){
        Alert.alert("Deletar Time", "Você deseja deletar este time?", [{
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Sim", onPress: () =>  {
                banco.times.splice(item, 1);
                setModal(false);
            }
        }]);
    }
    /*
    async function ExportJSON(time){
        // Requests permissions for external directory
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
            // Gets SAF URI from response
            const path = permissions.directoryUri;
            const uri = await StorageAccessFramework.createFileAsync(path, 'time.json', 'application/json');
            // Transforma objeto em JSON
            
            let json = JSON.stringify(time);
            // Escreve os dado no arquivo criado
            await StorageAccessFramework.writeAsStringAsync(uri, json);            
            let arquivo = await StorageAccessFramework.readAsStringAsync(uri);
            let objeto = JSON.parse(arquivo);
            console.log("Arquivo: ", objeto);
        }    
        
        return true;
    }
    */
    // renderiza aviso ou Flat List das ligas
    function render_Liga(){
        
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
        
        
    }
    function render_Modal_CL(){
        /* Modal para configurar liga */
        return(
            <Modal
                animationType   ="slide"
                transparent     ={true}
                visible         ={modal}
                onRequestClose  = {() => {
                    setModal(false); 
                }}
            >
                <View style = {stylesMP.viewFullModal}>
                <View style = {stylesMP.viewModal_confLiga}>
                    <Text style = {stylesMP.title_modal}> - Opções da Liga - </Text>
                    <View style = {stylesMP.view_imputs}>
                        <TouchableOpacity style = {stylesMP.btt_Modal}
                            onPress = {async () => {
                                if(await ExportJSON(banco.times[item])){
                                    Alert.alert("Sucesso", "Dados exportados com sucesso!");
                                } else {
                                    Alert.alert("Erro", "Erro ao exportar dados!");
                                }
                            }}
                        >
                            <Text style = {stylesMP.text_btt}> Exportar JSON </Text>
                        </TouchableOpacity>                   
                        
                        <TouchableOpacity style = {stylesMP.btt_Modal}
                            onPress = {() => {
                                deleteLiga();
                            }}
                        >
                            <Text style = {stylesMP.text_btt}> Deletar Time </Text>
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
                            setItemLiga(index);
                            setModal(true);
                        }
                    }
                >
                    <Image style = {stylesC.img_logo}
                        source = {RetornaImgL(item.image_log)}
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
            {render_Modal_CL()}
            <StatusBar hidden = {true}
                barStyle="ligth-content"/>
            <Topo main = {true}/>
            <View style = {stylesMP.viewLiga}>
                <Text style = {stylesMP.txt_TitleM}> Ligas </Text>  
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
                        onPress = {async () => {
                            await export_JSON();
                        }}
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
