import { TestBed } from '@angular/core/testing';
import { CardActivity } from './card-activity.service';

describe('CardActivity', () => {
  let service: CardActivity;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardActivity);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
