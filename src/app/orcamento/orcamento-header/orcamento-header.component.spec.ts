import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoHeaderComponent } from './orcamento-header.component';

describe('OrcamentoHeaderComponent', () => {
  let component: OrcamentoHeaderComponent;
  let fixture: ComponentFixture<OrcamentoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcamentoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
