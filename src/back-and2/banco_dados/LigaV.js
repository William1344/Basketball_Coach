import  DestV from "./DestV";
import  Conf  from "./ConfgLV";

class LigaV{ // agora representa um time -- te vira na interpretação lkkkk
  constructor( buffer ){
    this.id          =   buffer.id;          // id da liga
    this.local       =   buffer.local;       // local da lica cidade-estado
    this.image_log   =   0;                  // guarda a referencia da imagem da liga.
    this.nome        =   buffer.nome;        // nome da liga
    this.confLiga    =   new Conf();         // configurações da liga
    this.total_pts   =   0;                  // total de pontos na liga 
    this.createdAt   =   new Date();         // data em que foi criada
    this.list_users  =   new Array();        // array de user_liga
    this.list_usersG =   new Array();        // guarda os jogadores me formato de jogo
    this.list_times3 =   new Array();        // array de times3x3
    this.list_times5 =   new Array();        // array de times5x5
    this.listJgs3x3  =   new Array();        // array de Jogos 3x3
    this.listJgs5x5T =   new Array();        // array de Jogos 5x5 trainos
    this.listJgs5x5O =   new Array();        // array de Jogos 5x5 oficiais
    this.destaques   =   new DestV();        // objeto com os destaques
  }
};
export default LigaV;