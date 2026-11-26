import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Priority, Task } from '../task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  styleUrl: './task-form.css',
  templateUrl: './task-form.html',
})
export class TaskForm {
  private taskService = inject(TaskService);

  title = signal('');
  priority = signal<Priority>('Medium');
  isUrgent = signal(false);

  taskCreated = output<Task>();

  onSubmit(): void {
    const trimmedTitle = this.title().trim();
    if (!trimmedTitle) return;

    this.taskService.addTask({
      id: Date.now(),
      title: trimmedTitle,
      priority: this.priority(),
      isUrgent: this.isUrgent(),
      completed: false,
      createdAt: Date.now(),
    });

    this.title.set('');
    this.priority.set('Medium');
    this.isUrgent.set(false);
  }
}
