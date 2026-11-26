import {
  Component,
  computed,
  inject,
  Input,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../task.model';
import { DatePipe, NgStyle, UpperCasePipe } from '@angular/common';
import { UrgentHighlight } from '../urgent-highlight';
import { TruncatePipe } from '../truncate-pipe';
import { PriorityLabelPipe } from '../priority-label-pipe';
import { CardActivityService } from '../services/card-activity.service';
import { TaskService } from '../services/task.service';

@Component({
  imports: [NgStyle, UrgentHighlight, DatePipe, UpperCasePipe, TruncatePipe, PriorityLabelPipe],
  selector: 'app-task-item',
  providers: [CardActivityService],
  styleUrl: './task-item.css',
  templateUrl: './task-item.html',
})
export class TaskItem implements OnInit, OnChanges, OnDestroy {
  protected taskService = inject(TaskService);
  protected activity = inject(CardActivityService);

  private currentTask = signal<Task | null>(null);
  changeCount = signal(0);

  @Input({ required: true })
  set task(value: Task) {
    this.currentTask.set(value);
  }
  get task(): Task {
    return this.currentTask()!;
  }
  cardStyles = computed<Record<string, string>>(() => {
    const t = this.currentTask();
    if (!t) return {} as Record<string, string>;

    const borderColors: Record<string, string> = {
      High: '#e53e3e',
      Medium: '#dd6b20',
      Low: '#38a169',
    };

    return {
      'border-left': `6px solid ${borderColors[t.priority]}`,
      opacity: t.completed ? '0.6' : '1',
      'text-decoration': t.completed ? 'line-through' : 'none',
    };
  });

  ngOnInit(): void {
    console.log(`[TaskItem Init] Task #${this.task.id}: "${this.task.title}"`);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.changeCount.update((c) => c + 1);
      const prev: Task | undefined = changes['task'].previousValue;
      const curr: Task = changes['task'].currentValue;

      if (prev && !changes['task'].firstChange) {
        console.log(
          `[TaskItem Changes] Task #${curr.id} updated (completed: ${prev.completed} -> ${curr.completed})`,
        );
      }
    }
  }
  ngOnDestroy(): void {
    console.log(`[TaskItem Destroy] Removed or hidden Tasl #${this.task.id}`);
  }
}
