import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedComponent } from './deleted.component';

describe('DeletedComponent', () => {
  let component: DeletedComponent;
  let fixture: ComponentFixture<DeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
