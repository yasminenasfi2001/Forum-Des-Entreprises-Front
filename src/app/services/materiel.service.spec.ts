import { TestBed } from '@angular/core/testing';

import { MaterielService } from './materiel.service';

describe('MaterielService', () => {
  let service: MaterielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
