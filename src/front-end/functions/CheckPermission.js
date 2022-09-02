import { PermissionsAndroid } from 'react-native';

export default async function CheckPermission(){
  // Verifica Permissões
  if(!PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA) && !PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)){
    const grantedCam = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,{
      title: "Permissão para usar a câmera",
      message: "Nós precisamos da sua permissão para usar a câmera",
      buttonNeutral: "Me lembre mais tarde",
      buttonNegative: "Não, não quero",
      buttonPositive: "Sim, quero"
    });
    const grantedGal = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
      title: "Permissão para usar a galeria",
      message: "Nós precisamos da sua permissão para usar a galeria",
      buttonNeutral: "Me lembre mais tarde",
      buttonNegative: "Não, não quero",
      buttonPositive: "Sim, quero"
    });
    if(grantedCam === PermissionsAndroid.RESULTS.GRANTED && grantedGal === PermissionsAndroid.RESULTS.GRANTED){
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }

}