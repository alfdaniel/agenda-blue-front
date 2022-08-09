import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Contatos } from '../entities/contato';
import { ContatoService } from '../service/contato-service/contato.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  listContatos: Contatos[] = [];

  constructor(private contatoService: ContatoService) { }

  ngOnInit(): void {
    console.log(this.listContatos)
    this.getLista();    
  }


  getLista(){
    this.contatoService.listConatos().subscribe(
      data => {
        this.listContatos = data;
        console.log(data);
      },
      error => {
        this.listContatos = [];
        console.log(error);
      }
    )
  }

  getContatos() {
    this.contatoService.getContatosList().subscribe(
      (map) =>{
        const lista = map.body;
        if(lista)
        this.listContatos = lista;
      }
    );
  }

  deleteContatos(contato: Contatos){
    const id = contato.id
    Swal.fire({
      //title: 'Você tem certeza?',
      text: 'Deseja deletar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contatoService.deleteContatos(contato).subscribe(
          data => {
            Swal.fire(
              String(data),
              );
              this.getLista();
          }
        );
      }
    });
  }

}
