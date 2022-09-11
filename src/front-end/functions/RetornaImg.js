import assets from '../../../assets/index_assets';
export default function RetornaImg(value){
  function base64() {
    return value;
  }
       if(value == 0)   return assets.play_lg;
  else if(value == 1)   return assets.play_lg1;
  else if(value == 2)   return assets.play_lg2;
  else if(value == 3)   return assets.play_lg3;
  else if(value == 4)   return assets.play_lg4;
  else if(value == 5)   return assets.play_lg5;
  else if(value == 6)   return assets.play_lg6;
  else if(value == 7)   return assets.play_lg7;
  else if(value == 8)   return assets.play_lg8;
  else if(value == 9)   return assets.play_lg9;
  else if(value == 10)  return assets.play_lg10;
  else if(value == 11)  return assets.play_lg11;
  else if(value == 12)  return assets.play_lg12;
<<<<<<< HEAD
  else return value;
=======
  else if(value == 13)  return assets.logo1;
  else return base64();
>>>>>>> 1b0a43907f9630e32440d6415f8818a7f56a54bb
}