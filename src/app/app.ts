import { Component, computed, effect, signal } from '@angular/core';
import { Task } from './task.model';
import { TaskForm } from './task-form/task-form';
import { TaskItem } from './task-item/task-item';

const STORAGE_KEY = 'angular-singal-tasks';

@Component({
  imports: [TaskForm, TaskItem],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  tasks = signal<Task[]>(this.loadInitialTasks());
  hideCompleted = signal(false);
  searchquery = signal('');

  remainingCount = computed(() => this.tasks().filter((t) => !t.completed).length);

  visibleTasks = computed(() => {
    const query = this.searchquery().toLowerCase().trim();
    return this.tasks().filter((task) => {
      const matchesCompletion = !this.hideCompleted() || !task.completed;
      const matchesSearch = !query || task.title.toLowerCase().includes(query);
      return matchesCompletion && matchesSearch;
    });
  });

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks()));
    });
  }

  addTask(newTask: Task): void {
    this.tasks.update((current) => [newTask, ...current]);
  }

  toggleTask(taskId: number): void {
    this.tasks.update((current) =>
      current.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    );
  }

  removeTask(taskId: number): void {
    this.tasks.update((current) => current.filter((task) => task.id !== taskId));
  }

  private loadInitialTasks(): Task[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Task[] = JSON.parse(saved);
        return parsed.map((t) => ({
          ...t,
          createdAt: t.createdAt ?? Date.now(),
        }));
      } catch {
        // Fallback to defaults if storage is corrupted
      }
    }

    return [
      {
        id: 1,
        title: 'Practice Angular standalone components',
        priority: 'High',
        isUrgent: true,
        completed: false,
        createdAt: Date.now() - 3600_000,
      },
      {
        id: 2,
        title: 'Implement custom directives',
        priority: 'Low',
        isUrgent: false,
        completed: false,
        createdAt: Date.now(),
      },
    ];
  }
}
