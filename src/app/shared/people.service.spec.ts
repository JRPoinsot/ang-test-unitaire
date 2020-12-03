import {TestBed} from '@angular/core/testing';
import {PeopleService} from './people.service';
import {HttpClientModule} from '@angular/common/http';

describe('Test People Service', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule]}));

  it('should be created', () => {
    const service: PeopleService = TestBed.inject(PeopleService);
    expect(service).toBeTruthy();
  });
});
