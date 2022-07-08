import React, {useEffect, useState} from 'react';
import {
    Text, View, TouchableOpacity, Image, Modal, StatusBar, FlatList, 
    SafeAreaView, BackHandler, Alert
} from 'react-native';
import stylesMem        from './stylesMem';
import {useNavigation}  from '@react-navigation/native';
import {Topo}           from '../../components/index_comps';
import AsyncStorage     from '@react-native-async-storage/async-storage';
import banco            from '../../../back-and2/banco_local';
import confgBD          from '../../../../config/config.json';
import assets           from '../../../../assets/index_assets';
import SalveDate        from '../../../back-and2/SalveData';
import { RetornaImg,  MontarArrayDest}   from '../../functions/index';

export default function Membros({route}){
    const navigation = useNavigation();
    const [rend, setRender]     = useState(false);
    const [modal, setModal]     = useState(false);
    const [itemOP, setItemOP]   = useState(route.params.time.list_users[0]);
    
    useEffect(() => {
        console.log("Depois fica assim!");
        for(let x = 0 ; x < route.params.time.list_users.length ; x++)
            console.log(x ," - index vetor", route.params.time.list_users[x].id);
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => {BackHandler.removeEventListener("hardwareBackPress", backAction);}
    },[]);

    async function backAction(){
        navigation.replace("MainL", {
            dest        :   await MontarArrayDest(route.params.time.list_users),
            index_time  :   route.params.index_time,
            time        :   route.params.time,
        });
        return true;
    }

    async function removerMembro(item){
        route.params.time.list_users.splice(item.id, 1);
        route.params.time.list_usersG.splice(item.id, 1); 
        //*
            console.log("Depois fica assim!");
            for(let x = 0 ; x < route.params.time.list_users.length ; x++)
                console.log(x ," - index vetor", route.params.time.list_users[x].id);
        //*/
        let refLS  = route.params.time.list_users;
        let refLSG = route.params.time.list_usersG;
        for(let x = 0  ; x < refLS.length ; x++)  refLS[x].id  = x;
        for(let x = 0  ; x < refLSG.length ; x++) refLSG[x].id = x;

        await SalveDate(banco);
        setModal(false);
    }

    function render_Modal(){
        return(
            <Modal
                animationType = "slide"
                transparent = {true}
                visible = {modal}
                onRequestClose = {() => {
                    setModal(false);
                }}
            >
                <View style = {stylesMem.viewFullModal}>
                    <View style = {stylesMem.viewModal_confMembros}>
                        <Text style = {stylesMem.title_modal}> - Opções do time - </Text>
                        <Text style = {stylesMem.text_btt}> - {itemOP.apelido} - </Text>
                        <View style = {stylesMem.view_inputs}>
                            <TouchableOpacity style = {stylesMem.btt_Modal}
                                onPress = {() => {
                                    navigation.replace("ViewP",{
                                        time        :   route.params.time,
                                        dest        :   route.params.dest,
                                        index_time  :   route.params.index_time,
                                        player      :   itemOP,
                                        veio_de     :   "Membros",
                                    });
                                }}
                            >
                                <Text style = {stylesMem.text_btt}> Perfil </Text>
                            </TouchableOpacity>
                             
                               
                            
                            
                            <TouchableOpacity style = {stylesMem.btt_Modal}
                                onPress = {() => {
                                    removerMembro(itemOP);
                                }}
                            >
                                <Text style = {stylesMem.text_btt}> Apagar </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
            </Modal>
        )
    } 
    

    function Comp_Players({item}){
        return(
            <TouchableOpacity style = {stylesMem.viewFL}
                onPress = {() => {
                    navigation.replace("ViewP", {
                        time    : route.params.time,
                        dest    : route.params.dest,
                        veio_de : "Membros",
                        player  : item,
                    });
                }}
                onLongPress = {() => {
                    setItemOP(item);
                    setModal(true);
                }}
            >
                <Image style = {stylesMem.img_logoFL}
                    source = {RetornaImg(item.image)}
                    resizeMode="cover"
                />
                <View style = {stylesMem.viewInfos_FL}>
                    <Text style = {stylesMem.text_infos}>Nome: {item.apelido}</Text>
                    <Text style = {stylesMem.text_infos}>FG: {(item.scrT.a_FG % 1) == 0 ? item.scrT.a_FG : item.scrT.a_FG.toFixed(1)}%</Text>
                    <Text style = {stylesMem.text_infos}>Pts: {item.scrT.total_pts}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    
    return(
        <View style = {stylesMem.telaFull}>
            <StatusBar
                hidden = {true}
                barStyle="ligth-content"
            />
            <Topo/>
            
            <View style = {stylesMem.viewMembros}>
                <Text style = {stylesMem.titleM}> Membros </Text>
                <SafeAreaView style = {stylesMem.viewInferioir}>
                    <FlatList style = {stylesMem.flatList}
                        data = {route.params.time.list_users}
                        renderItem={Comp_Players}
                        keyExtractor={(item) => item.Users_idUsers}
                    />
                </SafeAreaView>  

            </View>
            {render_Modal()}          
        </View>
    );
}
