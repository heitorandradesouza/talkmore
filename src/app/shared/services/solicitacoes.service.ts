import { Injectable } from '@angular/core';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitacoesService {

  constructor(private http: Http) { }

  getSolicitacoes() {
    return this.http.get(`solicitacoes`);
  }

  postSolicitacao(solicitacao) {
    return this.http.post(`solicitacoes`, solicitacao);
  }

  putSolicitacao(solicitacao) {
    return this.http.put(`solicitacoes/${solicitacao._id}`, solicitacao);
  }

  deleteSolicitacao(id) {
    return this.http.delete(`solicitacoes/${id}`);
  }
}
