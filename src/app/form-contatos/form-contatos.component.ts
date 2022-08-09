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
  
  // formContatos = new FormGroup({
  //   id: new FormControl(''),
  //   nome: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   telefone: new FormControl('', [Validators.required])
  // });
  
  formContatos!: FormGroup;
  contatos!: Contatos;

  constructor(private router: Router, 
    private contatoService: ContatoService, 
    private formBuild: FormBuilder) { }

  ngOnInit(): void {
    this.formContatos = this.formBuild.group({
      nome: '',
      email: '',
      telefone: ''
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
    this.contatoService.createContato(contatos).subscribe(
      data => {
        setTimeout(function(){
          Swal.fire({
            icon: 'success',
            text: 'Cadastrado com sucesso!',
            timer: 5000
          });
        },2000);
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

}
