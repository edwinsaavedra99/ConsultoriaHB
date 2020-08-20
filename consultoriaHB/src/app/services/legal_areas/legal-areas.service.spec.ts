import { TestBed } from '@angular/core/testing';

import { LegalAreasService } from './legal-areas.service';

describe('LegalAreasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LegalAreasService = TestBed.get(LegalAreasService);
    expect(service).toBeTruthy();
  });
});
