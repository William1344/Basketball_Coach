import { StorageAccessFramework } from 'expo-file-system';

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

} ; export default ExportJSON ;