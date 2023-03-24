import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { ITask } from '../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
 
 
  todoForm!:FormGroup;//strict ckecking so used !
  tasks :ITask [] = [];
  Inprogress :ITask [] = [];
  done :ITask [] = [];
  updateID!:any;
  isEditEnable :boolean =false;


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['',Validators.required]
    })
  }
 
  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    })
    this.todoForm.reset();
  }
  onEdit(item:ITask, i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateID = i;
    this.isEditEnable =true;
  }
  updateTask(){
    this.tasks[this.updateID].description = this.todoForm.value.item;
    this.tasks[this.updateID].done = false;
    this.todoForm.reset();
    this.updateID = undefined;
    this.isEditEnable = false;
  }
  deleteTask(i: number){
    this.tasks.splice(i,1)
  }
  deleteInprogress(i: number){
    this.Inprogress.splice(i,1)
  }
  deleteDoneTask(i: number){
    this.done.splice(i,1)
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
