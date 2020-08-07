import { Component, OnInit } from '@angular/core';
import { SolicitacoesService } from 'src/app/shared/services/solicitacoes.service';
import { NovaSolicitacao } from 'src/app/shared/interfaces/nova-solicitacao';
import { Planos } from 'src/app/shared/interfaces/planos';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DadosTabela } from 'src/app/shared/interfaces/dados-tabela';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss'],
  providers: [DatePipe]
})
export class SolicitacoesComponent implements OnInit {
  sourceTable: DadosTabela[];
  displayedColumns: string[] = ['id', 'empresa', 'plano', 'tarifa', 'minutos', 'valorPlano', 'dataAdesao', 'dataEnvio', 'acao'];
  errosInput = true;

  novaSolicitacao: NovaSolicitacao = {
    _id: null,
    empresa: '',
    cnpj: '',
    plano: '',
    tarifa: null,
    minutos: null,
    valorPlano: null,
    dataAdesao: null,
    dataEnvio: new Date()
  };

  planos: Planos[] = [{
    _id: '188b8beaae2a4a25bd479facb78d9ce8',
    descricao: 'P30',
    minutos: 30
  },
  {
    _id: '5d851e1af9284878badb50906c3d8896',
    descricao: 'P60',
    minutos: 60
  },
  {
    _id: '1bb49a6b8a1448bab3e22d519683f739',
    descricao: 'P120',
    minutos: 120
  }];

  constructor(
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private solicitacoesService: SolicitacoesService
  ) { }

  ngOnInit(): void {
    this.getSolicitacoes();
  }

  getSolicitacoes() {
    this.solicitacoesService.getSolicitacoes().subscribe(retorno => {
      this.sourceTable = retorno;
    });
  }

  verificarInputs() {
    if (this.novaSolicitacao.cnpj?.length === 14 &&
      this.novaSolicitacao.dataAdesao &&
      this.novaSolicitacao.empresa &&
      this.novaSolicitacao.minutos &&
      this.novaSolicitacao.plano &&
      this.novaSolicitacao.tarifa &&
      this.novaSolicitacao.valorPlano
    ) {
      this.errosInput = false;
    } else {
      this.errosInput = true;
    }
  }

  adicionarOuEditarSolicitacao() {
    if (this.novaSolicitacao._id) {
      this.verificarInputs();
      if (this.errosInput) { return; }
      this.solicitacoesService.putSolicitacao(this.novaSolicitacao).subscribe(retorno => {
        this.openSnackBar('Solicitação editada com sucesso!', 'Fechar');
        this.getSolicitacoes();
      }, err => {
        this.openSnackBar('Não foi possível criar a solicitacação!', 'Fechar');
      });
    } else {
      this.verificarInputs();
      if (this.errosInput) { return; }
      if (this.novaSolicitacao.cnpj) {
        this.solicitacoesService.postSolicitacao(this.novaSolicitacao).subscribe(retorno => {
          this.openSnackBar('Solicitação cadastrada com sucesso!', 'Fechar');
          this.getSolicitacoes();
          this.limparSolicitacao();
        }, err => {
          this.openSnackBar('Não foi possível editar a solicitacação!', 'Fechar');
        });
      }
    }
  }

  deletarSolicitacao(id) {
    this.solicitacoesService.deleteSolicitacao(id).subscribe(retorno => {
    }, err => {
      this.openSnackBar('Não foi possível excluir a solicitacação!', 'Fechar');
    });
  }

  formatarData(data) {
    return this.datePipe.transform(data, 'dd/MM/yyyy');
  }

  selecionarSolicitacao(solicitacao) {
    this.novaSolicitacao = solicitacao;
    this.verificarInputs()
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  limparSolicitacao() {
    this.getSolicitacoes();
    this.novaSolicitacao = {
      _id: null,
      empresa: null,
      cnpj: null,
      plano: null,
      tarifa: null,
      minutos: null,
      valorPlano: null,
      dataAdesao: null,
      dataEnvio: new Date()
    };
    this.verificarInputs();
  }

}
