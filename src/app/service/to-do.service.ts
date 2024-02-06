import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import '../model/NewToDo'

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  addToDo(task:NewToDo){
    console.log(task)
    return this.http.post<ToDo[]>(`${environment.apiRoot}` + "/api/tasks/", task);
  }

  getToDos(){
    return this.http.get<ToDo[]>(`${environment.apiRoot}` + "/api/tasks/");
  }

  updateToDo(id: number, task: ToDo){
    return this.http.put(`${environment.apiRoot}` + "/api/tasks/"+id+"/", task );

  }

  deleteToDo(id: number){
    return this.http.delete(`${environment.apiRoot}` + "/api/tasks/"+id+"/");

  }
}
