import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AIService {

  constructor(private http:HttpClient) { }


  postMessage(message:string){
    return this.http.post(environment.URL,{message});
  }
}
