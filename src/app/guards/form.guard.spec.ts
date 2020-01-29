import { TestBed, async, inject } from '@angular/core/testing';

import { FormGuard } from './form.guard';

describe('FormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormGuard]
    });
  });

  it('should ...', inject([FormGuard], (guard: FormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
