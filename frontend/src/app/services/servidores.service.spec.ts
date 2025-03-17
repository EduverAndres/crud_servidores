import { TestBed } from '@angular/core/testing';

import { ServidoresService } from './servidores.service';

describe('ServidoresService', () => {
  let service: ServidoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServidoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
