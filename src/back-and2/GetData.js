import AsyncStorage from '@react-native-async-storage/async-storage';

async function GetData(){
  const jsBanco = await AsyncStorage.getItem("Basketball_Coach");
  if (jsBanco) {
    let banco = JSON.parse(jsBanco);
    return { banco: banco, status: true };
  } else return { banco: null,  status: false };
}; export default GetData;