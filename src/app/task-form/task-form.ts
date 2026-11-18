import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Priority, Task } from '../task.model';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  styleUrl: './task-form.css',
  templateUrl: './task-form.html',
})
export class TaskForm {
  title = '';
  priority: Priority = 'Medium';
  isUrgent = false;

  @Output() taskCreated = new EventEmitter<Task>();

  onSubmit(): void {
    const trimmedTitle = this.title.trim();
    if (!trimmedTitle) return;

    const newTask: Task = {
      id: Date.now(),
      title: trimmedTitle,
      priority: this.priority,
      isUrgent: this.isUrgent,
      completed: false,
    };

    this.taskCreated.emit(newTask);

    this.title = '';
    this.priority = 'Medium';
    this.isUrgent = false;
  }
}
