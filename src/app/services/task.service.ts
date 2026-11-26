import { DatePipe } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { PriorityLabelPipe } from '../priority-label-pipe';
import { Task } from '../task.model';

const STORAGE_KEY = 'angular-signal-tasks';

@Injectable({
  providedIn: 'root', //Creates only one instant for the whole app - Singleton
})
export class TaskService {
  private datePipe = inject(DatePipe);
  private priorityType = inject(PriorityLabelPipe);

  private _tasks = signal<Task[]>(this.loadInitialTasks());
  readonly tasks = this._tasks.asReadonly();

  readonly remainingCount = computed(() => this._tasks().filter((t) => !t.completed).length);

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks()));
    });
  }

  addTask(newTask: Task): void {
    this._tasks.update((current) => [newTask, ...current]);
  }

  toggleTask(taskId: number): void {
    this._tasks.update((current) =>
      current.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    );
  }

  removeTask(taskId: number): void {
    this._tasks.update((current) => current.filter((task) => task.id !== taskId));
  }

  generateTextReport(): string {
    const timestamp = this.datePipe.transform(Date.now(), 'medium') ?? '';
    const lines = this._tasks().map((task, index) => {
      const check = task.completed ? '[x]' : '[ ]';
      const priorityText = this.priorityType.transform(task.priority, true);
      const createdDate = this.datePipe.transform(task.createdAt, 'shortDate');
      return `${index + 1}. ${check} ${task.title} - ${priorityText} (${createdDate})`;
    });
    return `Task Report (${timestamp})\n\n${lines.join('\n') || 'No tasks available. '}`;
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
        // Fallback if storage is corrupted
      }
    }
    return [
      {
        id: 1,
        title: 'Share state across components with a Singleton service',
        priority: 'High',
        isUrgent: true,
        completed: false,
        createdAt: Date.now() - 3600_000,
      },
      {
        id: 2,
        title: 'Track per-card interactions with a Multitone service',
        priority: 'Low',
        isUrgent: false,
        completed: false,
        createdAt: Date.now(),
      },
    ];
  }
}
