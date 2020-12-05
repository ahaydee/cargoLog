import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioOrcamentosComponent } from './relatorio-orcamentos.component';

describe('RelatorioOrcamentosComponent', () => {
  let component: RelatorioOrcamentosComponent;
  let fixture: ComponentFixture<RelatorioOrcamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioOrcamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioOrcamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
