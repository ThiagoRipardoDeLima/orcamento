import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoMenuComponent } from './orcamento-menu.component';

describe('OrcamentoMenuComponent', () => {
  let component: OrcamentoMenuComponent;
  let fixture: ComponentFixture<OrcamentoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcamentoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
