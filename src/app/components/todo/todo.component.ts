import {Component, OnInit} from '@angular/core';
import '../../model/ToDo';
import '../../model/NewToDo'
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ToDoService} from "../../service/to-do.service";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  toDoList: ToDo[] = [];
  toDoText:string = "todoLine";
  newToDo:NewToDo  = {taskText: "", taskStatus: false};
  showTasks!: boolean;
  taskToUpdate!: ToDo;


  constructor(private toDoService:ToDoService) {
  }

  ngOnInit(){
    console.log("in init")
    this.refresh();
  }

  onSave(){
    console.log(this.toDoText);

    this.newToDo.taskText = this.toDoText;
    this.newToDo.taskStatus = false;

    this.toDoService.addToDo(this.newToDo).subscribe({
      next: value => this.refresh(),
      error: err => {
        console.log(err);
        this.refresh();
      }
    });
  }

  onFinished(id: number){
    this.taskToUpdate = this.toDoList.find(value => value.id === id)!;
    this.taskToUpdate.taskStatus = true;

    this.toDoService.updateToDo(id, this.taskToUpdate).subscribe();
  }

  onShowTasks(){
    this.showTasks = !this.showTasks;
  }


  onDelete(id: number){
    console.log("Delete "+ id)
    this.toDoService.deleteToDo(id).subscribe({
      next: _ => this.refresh()
      }
    );

  }

  refresh(){
    this.toDoService.getToDos().subscribe({
      next:(value:ToDo[]) => {
        this.toDoList = value;
      }
    })
  }
}
