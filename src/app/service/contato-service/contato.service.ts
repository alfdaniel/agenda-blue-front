import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Contatos } from 'src/app/entities/contato';
import { environment } from 'src/environments/environment';
import { __values } from 'tslib';
import { RepositorioService } from '../repository.service';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  
  private dataEdit = new BehaviorSubject<Contatos>(null!);
  clickEdit = this.dataEdit.asObservable();
  api_url = environment.api_url;

  constructor(private repositoryService: RepositorioService, private http: HttpClient) { }
  
  getContatoListById(contatos: Contatos){
    this.dataEdit.next(contatos);
  }

  getContatosList(): Observable<HttpResponse<Contatos[]>> {
    return this.repositoryService.get<Contatos[]>(this.api_url, RepositorioService.MEDIA_TYPE_APP_JSON);
  }

  listConatos(){
    return this.http.get<Contatos[]>(this.api_url).pipe(
      map(
        data => {
          if (data){
            return data;
          }else{
            return [];
          }
        }
      )
    )
  }

  getContatoById(contato: Contatos){
    const id = contato.id
    return this.http.get<Contatos>(this.api_url + '/' + id).pipe(
      map(dataContato => {
        if(dataContato){
          return dataContato          
        }else{
          return [];
        }
      })
    )
  }

  createContato(contato: Contatos){
    return this.http.post<Contatos>(this.api_url, contato).pipe(
      map(dataContato => {
        if(dataContato){
          return dataContato;
        }else{
          return[];
        }
      })
    )
  }

  deleteContatos(contato: Contatos){
    const id = contato.id
    return this.http.delete<Contatos>(this.api_url + '/' + id).pipe(
      map(dataContato => {
        if (dataContato){
          return dataContato
        }else {
          return [];
        }
      })
    )
  }

  updateContatos(contato: Contatos){
    console.log('chegou no update do service ' + contato);
    console.log(contato);
    
    const id = contato.id;
    console.log(id);
    
    return this.http.put<Contatos>(this.api_url + '/' + id, contato).pipe(
      map(dataContato => {
        if (dataContato){
          return dataContato
        }else {
          return [];
        }
      })
    )
  }


}
