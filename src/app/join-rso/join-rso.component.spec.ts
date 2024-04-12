import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRsoComponent } from './join-rso.component';

describe('JoinRsoComponent', () => {
  let component: JoinRsoComponent;
  let fixture: ComponentFixture<JoinRsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinRsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinRsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
