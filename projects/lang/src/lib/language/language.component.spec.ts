import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageComponent } from './language.component';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('language observable defined', () => {
    expect(component.languages$).toBeDefined();
  });
  
  it('loader observable defined', () => {
    expect(component.loader$).toBeDefined();
  });
  
  it('modal observable defined', () => {
    expect(component.modalObservalble).toBeTruthy();
  });
});
