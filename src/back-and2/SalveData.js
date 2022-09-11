import AsyncStorage from '@react-native-async-storage/async-storage';

async function SalveData(banco){
  try{
    const jsonBD = JSON.stringify(banco);
    await AsyncStorage.setItem("Basketball_Coach", jsonBD);
    return true;
  } catch(e){
    console.log("Erro ao salvar dados");
    return false;
  }
}; export default SalveData;