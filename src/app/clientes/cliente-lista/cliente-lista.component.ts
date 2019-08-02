import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Response } from '../../_helper/response';
import { Cliente } from '../../_models/cliente';
import { ClienteService } from '../../_services/cliente.service';


@Component({
    selector:'cliente-lista',
    templateUrl:'cliente-lista.component.html',
    styleUrls:['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit{
    private title = '';
    private subtitle = '';
    private clientes: Cliente[] = new Array();
    private formSearch: FormGroup;
    
    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private clienteService: ClienteService){}

    ngOnInit(){
        this.title = 'CLIENTES';
        this.subtitle = 'PESQUISA DE CLIENTES';
        this.formInit();
    }

    get f(){return this.formSearch.value}

    formInit(){
        this.formSearch = this.formBuilder.group({
            id:[''],
            nome:[''],
            cpf:['']
        });
    }

    novoCliente(){
        this.router.navigate(['/cliente/','']);
    }

    buscarCliente(){
        //pega valores da busca
        let id          = this.f.id;
        let nome = this.f.nome;
        let cpf        = this.f.cpf;
        
        //limpa registros para nova busca
        this.clientes = null;

        //efetuamos a busca conforme o filtro preenchido
        if(id != 0){
            this.clienteService.getCliente(id).subscribe(res => this.clientes.push(res));
            return
        }
        if(nome != ''){
            this.clienteService.getClienteByNome(nome).subscribe(res => this.clientes = res)
            return
        }
        if(cpf != ''){
            this.clienteService.getClienteByCPF(cpf).subscribe(res => this.clientes = res);
            return
        }
        //nenhum filtro informado, busca todos
        this.clienteService.getClientes().subscribe(res => this.clientes = res);

    }

    edita(id: number){
        this.router.navigate(['/cliente/',id]);
    }

    excluir(id:number, index:number){
        if(confirm("Deseja realmente excluir esse registro?")){
            //chama servico para excluir o registro
            this.clienteService.deleteCliente(id).subscribe(response => {

                //Pega retorno do servico
                let res:Response = <Response>response;

                //1 = SUCESSO
                //mostra mensagem retornada e remove o registro da tabela
                if(res.codigo == 1){
                    alert(res.mensagem);
                    this.clientes.splice(index,1);
                    return;
                }
                //0 = EXCEPTION GERADA NO SERVIDOR
                alert(res.mensagem);
            },
            (erro) => {
                //ERROS NAO TRATADOS
                alert(erro);
            })
        }
    }
}