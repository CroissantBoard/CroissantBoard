import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Task from '../interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskCollection: AngularFirestoreCollection<Task>
  tasks: Observable<Task[]>
  taskDoc: AngularFirestoreDocument<Task>

  constructor(public afs: AngularFirestore) {
    this.taskCollection = this.afs.collection('tasks')
    this.tasks = this.taskCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Task
          data.id = a.payload.doc.id
          return data
        })
      })
    )
  }

  getOneTask(task: Task): Observable<Task> {
    return this.afs.doc(`tasks/${task.id}`).valueChanges()
  }

  getTasks(userId): Observable<any> {
    return this.afs
      .collection('tasks', (ref) => ref.where('createdBy', '==', userId))
      .valueChanges({ idField: 'id' });
  }

  addTask(task: Task) {
    this.taskCollection.add(task)
  }

  deleteTask(task: Task) {
    this.taskDoc = this.afs.doc(`tasks/${task.id}`)
    this.taskDoc.delete()
  }

  updateTask( id: string, task: Task,) {
    this.taskDoc = this.afs.doc(`tasks/${id}`)
    this.taskDoc.update(task)
  }
}
