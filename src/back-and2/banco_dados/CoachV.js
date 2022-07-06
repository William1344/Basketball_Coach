class CoachV{
  constructor(objct){
    this.nome       =   objct.nome; // nome do trainador
    this.image      =   0;          // imagem do trainador
    // estatos do trainador//apenas jogos oficiais!
    this.vits       =   0;          // vitorias
    this.der        =   0;          // derrotas
    this.FG         =   0;          // fg
    this.cratedAt   =   new Date(); // data de criação do app
  }
}; export default CoachV;