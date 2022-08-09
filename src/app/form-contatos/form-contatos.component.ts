import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contatos } from '../entities/contato';
import { ContatoService } from '../service/contato-service/contato.service';


@Component({
  selector: 'app-form-contatos',
  templateUrl: './form-contatos.component.html',
  styleUrls: ['./form-contatos.component.scss']
})
export class FormContatosComponent implements OnInit {
  
  formContatos!: FormGroup;
  contatos!: Contatos;

  constructor(private router: Router, 
    private contatoService: ContatoService, 
    private formBuild: FormBuilder) { }

  ngOnInit(): void {
    this.formContatos = this.formBuild.group({
      nome: '',
      email: '',
      telefone: '',
      id: ''
      });

     this.contatoService.clickEdit.subscribe(edit => {
        if (edit !== null){ 
          console.log(edit, 'valor do edit');
          this.formContatos.get('nome')?.setValue(edit.nome);
          this.formContatos.get('email')?.setValue(edit.email);
          this.formContatos.get('telefone')?.setValue(edit.telefone);
          this.formContatos.get('id')?.setValue(edit.id);          
        }
      });
  }

  cancelar(){
    this.router.navigate(['contatos'])
  }

  saveContato(){
    const {nome, email, telefone} = this.formContatos.value;
    const contatos: Contatos ={
      nome,
      email,
      telefone
    };
    console.log('valor do save contato ' + contatos);
    this.contatoService.createContato(contatos).subscribe(
      data => {
        setTimeout(function(){
          Swal.fire({
            icon: 'success',
            text: 'Cadastrado com sucesso!',
            timer: 5000
          });
        },100);
          this.router.navigate(['contatos']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: 'Erro ao cadastrar contato!'
          });
        }
    );    
  }

  editContatoForm(contato: Contatos){
    const {nome, email, telefone, id} = this.formContatos.value;
    contato = {
      nome,
      email,
      telefone,
      id
    };
    this.contatoService.updateContatos(contato).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Eeeeeba..',
          text: 'Contato editado com sucesso!'
        });
        this.router.navigate(['contatos']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: 'Erro ao editar contato!'
          });
        }
    );
  }

}
