import {Component, OnInit} from '@angular/core';
import '../../model/ToDo';
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
  toDoLine: ToDo = {id:0, taskText: "", taskStatus: false};
  showTasks!: boolean;
  todoId: number =2;


  constructor(private toDoService:ToDoService) {
  }

  ngOnInit(){
    console.log("in init")
    this.refresh();
  }

  onSave(){
    console.log(this.toDoText);

    this.toDoLine.id = 0;
    this.toDoLine.taskText = this.toDoText;
    this.toDoLine.taskStatus = false;

    this.toDoService.addToDo(this.toDoLine).subscribe({
      next: value => this.toDoList = value
    });
  }

  onFinished(id: number){
    this.toDoLine = this.toDoList.find(value => value.id === id)!;
    this.toDoLine.taskStatus = true;

    this.toDoService.updateToDo(id, this.toDoLine).subscribe();
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
