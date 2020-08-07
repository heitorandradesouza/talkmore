import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitacoesComponent } from './pages/solicitacoes/solicitacoes.component';


const routes: Routes = [
  { path: '', component: SolicitacoesComponent },
  { path: 'solicitacoes', component: SolicitacoesComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
