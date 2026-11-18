import { Component, signal } from '@angular/core';
import { Task } from './task.model';
import { TaskForm } from './task-form/task-form';
import { TaskItem } from './task-item/task-item';

@Component({
  imports: [TaskForm, TaskItem],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  hideCompleted = false;

  tasks: Task[] = [
    {
      id: 1,
      title: 'Practice Angular standalone components',
      priority: 'High',
      isUrgent: true,
      completed: false,
    },
    {
      id: 2,
      title: 'Implement custom directives',
      priority: 'Low',
      isUrgent: false,
      completed: false,
    },
  ];

  get visibleTasks(): Task[] {
    return this.hideCompleted ? this.tasks.filter((t) => !t.completed) : this.tasks;
  }

  addTask(newTask: Task): void {
    this.tasks = [newTask, ...this.tasks];
  }

  toggleTask(taskId: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
  }

  removeTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
