export class ComposicaoItem{
    codcomposicao:      number = 0;
    coditem:            number = 0;
    descricao:          string = null;
    maodeobra:          boolean = false;
    tipoclasse:         string = null;
    unidade:            string = null;
    valornaodesonerado: number = 0;
    valordesonerado:    number = 0;
    quantidade:         number = 0;
    tipobanco:          string = null; /** SINAPI ou PROPRIO */
    tipoitem:           string = null; /** INSUMO OU COMPOSICAO */
}