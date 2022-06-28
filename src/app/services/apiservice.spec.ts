import { TestBed } from '@angular/core/testing';
import { Apiservice } from './apiservice';

describe('Apiservice', () => {
  let service: Apiservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apiservice);
  });
  it('should create created', () => {
    expect(service).toBeTruthy();
  });
});
