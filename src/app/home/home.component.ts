import { Component, OnInit } from '@angular/core';
import {Chart } from 'chart.js';
import { EstatisticasHome } from '../_models';
import { EstatisticaHomeService } from '../_services/estatistica-home.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private DMeses = ['JANEIRO','FEVEREIRO','MARÇO','ABRIL','MAIO','JUNHO','JULHO','AGOSTO','SETEMBRO','OUTUBRO','NOVEMBRO','DEZEMBRO']
  private data: string[] = ['0','0','0','0','0','0','0','0','0','0'];
  private labels: string[] = [];
  private estatisticaHome: EstatisticasHome = new EstatisticasHome();
  private y = '';
  constructor(private estatistacaHomeService: EstatisticaHomeService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.getLabels();
    this.getData();
    this.creatChart();
  }

  getLabels(){
    let i: number = 0;
    let d = new Date();
    while(i < this.DMeses.length){ 
      //monta o label (mes/ano)
      let label = this.DMeses[d.getMonth()] +'/'+ d.getFullYear();
      // add ao array
      this.labels[i] = label;
      // subtrai um mes
      d.setMonth(d.getMonth() - 1 );
      i++;
    }

  }

  getData() {
    // this.estatistacaHomeService
    //     .getEstatisticas()
    //     .subscribe( res => {
    //       this.estatisticaHome = res;
    //   });
  }

  creatChart(){
    const CHART = new Chart('barChart',{
      type:'bar',
      data:{
        labels:this.labels,
        datasets:[{
          data:this.data,
          borderColor: "rgb(255, 205, 86)", 
          backgroundColor:"rgba(255, 205, 86, 0.6)", 
          fill: false,
          borderWidth:1 
        }]
      },
      options:{
        title:{
          text:"VALOR TOTAL DOS ULTIMOS 12 MESES",
          display:true
        },
        legend:{display:false},
        scales:{
          xAxes:[{
            display:true,
          }], 
          yAxes:[{
            // display:true,
            // // thicks:{
            // //   display:true,
            // //   labelString:"Reai(R$)",
            // //   callback: function(value,index,values){
            // //     return 'R$' + value;
            // //   }
            // }
          }]   
        }
      }
    });
  }
}