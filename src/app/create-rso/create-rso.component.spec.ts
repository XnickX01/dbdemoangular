import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRsoComponent } from './create-rso.component';

describe('CreateRsoComponent', () => {
  let component: CreateRsoComponent;
  let fixture: ComponentFixture<CreateRsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
