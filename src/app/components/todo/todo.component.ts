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

  /**
   * On add a new to-do
   */
  onSave(){
    //Task added by a user
    this.newToDo.taskText = this.toDoText;
    // By default, the task isn't finished so is set to false
    this.newToDo.taskStatus = false;

    // Sending the task in the backend
    this.toDoService.addToDo(this.newToDo).subscribe({
      next: value => {
        this.toDoText = ""; // Clearing the variable
        this.refresh(); // Refreshing the component
      },
      error: err => {
        console.log(err);
        this.refresh();
      }
    });
  }

  /**
   * On task completed
   * @param id of the task
   */
  onFinished(id: number){
    this.taskToUpdate = this.toDoList.find(value => value.id === id)!;
    this.taskToUpdate.taskStatus = true; // Task completed

    //Updating in the backend
    this.toDoService.updateToDo(id, this.taskToUpdate).subscribe();
  }

  /**
   * On show a list of all todos
   */
  onShowTasks(){
    this.showTasks = !this.showTasks;
  }

  /**
   * On delete a specific task
   * @param id of the task
   */
  onDelete(id: number){
    console.log("Delete "+ id)
    this.toDoService.deleteToDo(id).subscribe({
      next: _ => this.refresh()
      }
    );

  }

  /**
   * Refresh the to-do list
   */
  refresh(){
    this.toDoService.getToDos().subscribe({
      next:(value:ToDo[]) => {
        this.toDoList = value;
      }
    })
  }
}
