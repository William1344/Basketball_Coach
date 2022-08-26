import { StyleSheet } from "react-native";
import { Cor, styles, fonts } from "../../styles/index_S";
/* Estrutura da tela:
  telaFull  : 100%
    img     : 160x160 fixo?

*/


const stylesForm = StyleSheet.create({
  telaFull: {
    ...styles.tela,
    justifyContent  :   'flex-start',
    alignItems      :   'center',
  },
    btt_img:{
      marginTop: 10,
      marginBottom: 10,
      height: 160,
      width: 160,
     },
      img:{
        height: '100%',
        width: '100%',
        ...styles.border1,
        borderRadius: 90,
      },
    scrollV:{
      width: '100%',
    },
    viewForm:{
      alignItems: 'center',
      height: '82%',
      width: '99%',
    },
    viewPicker:{
      height: '100%',
      width: '40%',
      justifyContent: 'center',
      alignItems: 'center',
    },
      picker:{
        height: '80%',
        width: '100%',
        color: Cor.pri,
        backgroundColor: Cor.sec,
      },
    keyBoard:{
      marginTop: 5,
      height: '60%',
      width: '100%',
      justifyContent  : 'flex-start',
      alignItems      : 'center',
    },
      viewLinha: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 10,
          width: '100%',
          height: '10%',
      },
      title:{
        marginTop : 10,
        ...styles.texts,
        color: Cor.font,
        fontSize: 25,
      },
      texts:{
        width: '45%',
        ...styles.texts,
        fontSize: 24,
        textAlign: 'justify',
      },
      viewImput:{
        height: '100%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: Cor.sec,
      },
      txt_input:{
          ...styles.inputText,
          textAlign: 'center',
          height: "100%",
          width: "40%",  
      },
      btts:{
        ...styles.btts,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '45%',
        marginVertical: 10,
      },
      btts_text:{ 
        ...styles.text_btts,
        fontSize: 20,
      }

      
});
export default stylesForm;