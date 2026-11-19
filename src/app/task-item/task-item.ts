import { Component, computed, EventEmitter, input, output, Output } from '@angular/core';
import { Task } from '../task.model';
import { NgStyle } from '@angular/common';
import { UrgentHighlight } from '../urgent-highlight';

@Component({
  imports: [NgStyle, UrgentHighlight],
  selector: 'app-task-item',
  styleUrl: './task-item.css',
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();

  delete = output<number>();
  toggleComplete = output<number>();

  cardStyles = computed<Record<string, string>>(() => {
    const currentTask = this.task();
    const borderColors: Record<string, string> = {
      High: '#e53e3e',
      Medium: '#dd6b20',
      Low: '#38a169',
    };

    return {
      'border-left': `6px solid ${borderColors[currentTask.priority]}`,
      opacity: currentTask.completed ? '0.6' : '1',
      'text-decoration': currentTask.completed ? 'line-through' : 'none',
    };
  });
}
