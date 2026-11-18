import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input({ required: true }) task!: Task;

  @Output() delete = new EventEmitter<number>();
  @Output() toggleComplete = new EventEmitter<number>();

  getCardStyles(): Record<string, string> {
    const borderColors: Record<string, string> = {
      High: '#e53e3e',
      Medium: '#dd6b20',
      Low: '#38a169',
    };

    return {
      'border-left': `6px solid ${borderColors[this.task.priority]}`,
      opacity: this.task.completed ? '0.6' : '1',
      'text-decoration': this.task.completed ? 'line-through' : 'none',
    };
  }
}
