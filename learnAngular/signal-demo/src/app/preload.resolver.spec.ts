import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { preloadResolver } from './preload.resolver';

describe('preloadResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => preloadResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
