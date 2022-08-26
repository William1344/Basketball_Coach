import User_ScoresV from "./User_ScoresV";

class User_LigaV{
    constructor(users){
        this.id          = users.id             // id do usuário
        this.nome        = users.nome           // nome do usuário
        this.apelido     = users.apelido        // apelido do jogador
        this.idade       = users.idade          // idade do jogador
        this.image       = users.image          // image do usuário
        this.numero      = users.numero         // numero da camisa do jogador
        this.posicao     = users.posicao        // posição do jogador
        this.altura      = users.altura         // altura do jogador
        this.envergadura = users.envergadura    // envergadura do jogador
        this.peso        = users.peso           // peso do jogador
        this.scr3x3      = new User_ScoresV("tipo_3");  // objeto dos scores3x3
        this.scr5x5      = new User_ScoresV("tipo_5");  // objeto dos scores5x5
        this.scr5x5Tr    = new User_ScoresV("tipo_5_Traine");// objeto dos scores5x5Of
        this.scrT        = new User_ScoresV("tipo_T");  // objeto com total de scores  
    }
}; export default User_LigaV;