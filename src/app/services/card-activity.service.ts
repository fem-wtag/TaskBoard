import { DatePipe } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

@Injectable()
export class CardActivityService {
  private datePipe = inject(DatePipe);

  hoverCount = signal(0);
  lastInspected = signal<string>('Never');

  recordHover(): void {
    this.hoverCount.update((count) => count + 1);
    const formattedTime = this.datePipe.transform(Date.now(), 'h:mm:ss a');
    if (formattedTime) {
      this.lastInspected.set(formattedTime);
    }
  }
}
