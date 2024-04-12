import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsoTableComponent } from './rso-table.component';

describe('RsoTableComponent', () => {
  let component: RsoTableComponent;
  let fixture: ComponentFixture<RsoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RsoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
