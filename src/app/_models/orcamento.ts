export class Orcamento{
    codigo              : number = 0;
    descricao           : string = null;
    estado              : string;
    datasinapi          : Date;
    cliente             : string = null;
    criadoem            : Date;
    islicitacao         : boolean = false;
    tipolicitacao       : string = null;
    datahoralicitacao   : Date;
    numeroprocesso      : string = null;
}