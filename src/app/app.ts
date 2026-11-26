import { Component, computed, effect, inject, signal } from '@angular/core';
import { Task } from './task.model';
import { TaskForm } from './task-form/task-form';
import { TaskItem } from './task-item/task-item';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';

const STORAGE_KEY = 'angular-singal-tasks';

@Component({
  imports: [FormsModule, TaskForm, TaskItem],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected taskService = inject(TaskService);

  hideCompleted = signal(false);
  searchquery = signal('');
  reportOutput = signal('');

  visibleTasks = computed(() => {
    const query = this.searchquery().toLowerCase().trim();
    return this.taskService.tasks().filter((task) => {
      const matchesCompletion = !this.hideCompleted() || !task.completed;
      const matchesSearch = !query || task.title.toLowerCase().includes(query);
      return matchesCompletion && matchesSearch;
    });
  });

  exportSummary(): void {
    this.reportOutput.set(this.taskService.generateTextReport());
  }
}
