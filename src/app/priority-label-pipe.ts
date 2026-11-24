import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from './task.model';

@Pipe({
  name: 'priorityLabel',
})
export class PriorityLabelPipe implements PipeTransform {
  transform(priority: Priority, showSymbol = false): string {
    const labels: Record<Priority, string> = {
      High: showSymbol ? '▲ High Priority' : 'High',
      Medium: showSymbol ? '● Medium Priority' : 'Medium',
      Low: showSymbol ? '▼ Low Priority' : 'Low',
    };

    return labels[priority];
  }
}
