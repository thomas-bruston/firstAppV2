import { TestBed } from '@angular/core/testing';

import { ProductStore } from './product.store';

describe('ProductStore', () => {
  let store: InstanceType<typeof ProductStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(ProductStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });
});
