import { TestBed } from '@angular/core/testing';

import { ResumenVentaService } from './resumen-venta.service';

describe('ResumenVentaService', () => {
  let service: ResumenVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumenVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
