import { Component, computed, input, output } from '@angular/core';
import { Task } from '../task.model';
import { DatePipe, NgStyle, UpperCasePipe } from '@angular/common';
import { UrgentHighlight } from '../urgent-highlight';
import { TruncatePipe } from '../truncate-pipe';
import { PriorityLabelPipe } from '../priority-label-pipe';

@Component({
  imports: [NgStyle, UrgentHighlight, DatePipe, UpperCasePipe, TruncatePipe, PriorityLabelPipe],
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
