import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './contatos/contatos.component';
import { FormContatosComponent } from './form-contatos/form-contatos.component';

const routes: Routes = [
  {path: '', redirectTo: '/contatos', pathMatch: 'full'},
  {path: 'contatos', component: ContatosComponent},
  {path: 'formcontatos', component: FormContatosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
