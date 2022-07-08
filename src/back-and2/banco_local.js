let banco_local = {
  // dados prontos para renderizar
  
  ligas           : [],   // ligas || categorias??? quem decide é usuário
  usersLocal      : [],   // para ids., todo usuário está no vetor
  // App_Basketball_Coach...
  createdAt       : "",   // data de criação do app
  times           : [],   // times do trainador [ User_LigaV{} ]
  atletas         : [],   // jogadores do time
  userMaster      : null, // Treinador e ou dono do cell!
  tema            : true, // true = dark, false = light
};export default banco_local;