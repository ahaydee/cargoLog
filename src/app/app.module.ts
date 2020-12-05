import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrcamentosComponent } from './orcamentos/orcamentos.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { RelatorioOrcamentosComponent } from './relatorio-orcamentos/relatorio-orcamentos.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    OrcamentosComponent,
    OrcamentoComponent,
    RelatorioOrcamentosComponent,
    EmpresasComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'cargolog'),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      { path: "orcamentos", component: OrcamentosComponent },
      { path: "orcamentos/:id", component: OrcamentoComponent },
      {
        path: "relatorios/orcamentos",
        component: RelatorioOrcamentosComponent
      },
      { path: "empresas", component: EmpresasComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
