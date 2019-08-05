import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Response } from '../../_helper/response';
import { Orcamento } from '../../_models/orcamento';
import { OrcamentoService } from '../../_services/orcamento.service';

@Component({
  selector: 'orcamento-lista',
  templateUrl: './orcamento-lista.component.html',
  styleUrls: ['./orcamento-lista.component.css']
})
export class OrcamentoListaComponent implements OnInit {

  private title = '';
  private subtitle = '';
  private orcamento: Orcamento[] = new Array();
  private formSearch: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private orcamentoService: OrcamentoService
  ){}

  ngOnInit(){
    this.title = 'ORÇAMENTOS';
    this.subtitle = 'PESQUISA DE ORÇAMENTOS';
    this.formInit();
  }

  get f(){return this.formSearch.value}

  formInit(){
      this.formSearch = this.formBuilder.group({
          id:[''],
          descricao:[''],
          cliente:['']
      });
  }

  buscar(){
    //pega valores da busca
    let id          = this.f.id;
    let description = this.f.descricao;
    let cliente     = this.f.cliente;
    
    //limpa registros para nova busca
    this.orcamento = null;

    //efetuamos a busca conforme o filtro preenchido
    if(id != 0){
        this.orcamentoService.getOrcamento(id).subscribe(res => this.orcamento.push(res));
        return
    }
    if(description != ''){
        this.orcamentoService.getOrcamentoByDescription(description).subscribe(res => this.orcamento = res)
        return
    }
    if(cliente != ''){
        this.orcamentoService.getOrcamentoByClient(cliente).subscribe(res => this.orcamento = res);
        return
    }
    //nenhum filtro informado, busca todos
    this.orcamentoService.getOrcamentos().subscribe(res => this.orcamento = res);

  }

  novo(){
    this.router.navigate(['/orcamento/','']);
  }

  editar(id: number){
    this.router.navigate(['/orcamento/',id]);
  }

  excluir(id:number, index:number){
    if(confirm("Deseja realmente excluir esse registro?")){
        //chama servico para excluir o registro
        this.orcamentoService.deleteOrcamento(id).subscribe(response => {

            //Pega retorno do servico
            let res:Response = <Response>response;

            //1 = SUCESSO
            //mostra mensagem retornada e remove o registro da tabela
            if(res.codigo == 1){
                alert(res.mensagem);
                this.orcamento.splice(index,1);
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