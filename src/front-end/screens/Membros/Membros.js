import React, {useEffect, useState} from 'react';
import {
    Text, View, TouchableOpacity, Image, Modal, StatusBar, FlatList, 
    SafeAreaView, BackHandler, Alert
} from 'react-native';
import stylesMem        from './stylesMem';
import {useNavigation}  from '@react-navigation/native';
import {Topo}           from '../../components/index_comps';
import banco            from '../../../back-and2/banco_local';
import SalveDate        from '../../../back-and2/SalveData';
import { RetornaImg,  MontarArrayDest}   from '../../functions/index';

export default function Membros({route}){
    const navigation = useNavigation();
    const [modal, setModal]     = useState(false);
    const [itemOP, setItemOP]   = useState(route.params.time.list_users.length ? route.params.time.list_users[0] : {apelido: ""});
    
    useEffect(() => {
<<<<<<< HEAD
=======
        
>>>>>>> 1b0a43907f9630e32440d6415f8818a7f56a54bb
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
                                    navigation.replace("Form_User", {
                                        index_time      : route.params.index_time,
                                        veio_de         : "editit",
                                        player          : itemOP,
                                        time            : route.params.time,
                                        dest            : route.params.dest,
                                    })
                                }}
                            >
                                <Text style = {stylesMem.text_btt}> Editar </Text>
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
