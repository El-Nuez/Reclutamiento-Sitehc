import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPaginadaComponent } from './lista-paginada.component';

describe('ListaPaginadaComponent', () => {
  let component: ListaPaginadaComponent;
  let fixture: ComponentFixture<ListaPaginadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPaginadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPaginadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
