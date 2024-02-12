import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import '../model/NewToDo'

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  /**
   * In CRUD operations, this is the C part, Create
   * @param task
   */
  addToDo(task:NewToDo){
    return this.http.post<ToDo[]>(`${environment.apiRoot}` + "/api/tasks/", task);
  }

  /**
   *In CRUD operations, this is the R part, Read
   */
  getToDos(){
    return this.http.get<ToDo[]>(`${environment.apiRoot}` + "/api/tasks/");
  }

  /**
   * In CRUD operations, this is the U part, Update
   *
   * @param id of the task to update
   * @param task task updated but not sent yet
   */
  updateToDo(id: number, task: ToDo){
    return this.http.put(`${environment.apiRoot}` + "/api/tasks/"+id+"/", task );

  }

  /**
   * In CRUD operations, this is the D part, Delete
   *
   * @param id
   */
  deleteToDo(id: number){
    return this.http.delete(`${environment.apiRoot}` + "/api/tasks/"+id+"/");

  }
}
