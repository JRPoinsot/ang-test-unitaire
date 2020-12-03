import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { PeopleService } from './people.service';

fdescribe('Test People Service', () => {
  let service: PeopleService;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
  }));

  beforeEach(() => {
    service = TestBed.inject(PeopleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // => afterEach verify no pending request
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call fetch api', () => {
    const response = fakePersonList;
    service.fetch().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].id).toBe('5763cd4d9d2a4f259b53c901');
      expect(data[0].lastname).toBe('Woodard');
    });
    const req = httpTestingController.expectOne('http://127.0.0.1:9000/api/people');
    req.flush(response);
  });

  it('should call fetchOne api', () => {
    const response = fakePersonList[0];
    service.fetchOne(fakePersonList[0].id).subscribe(data => {
      expect(data).toBeDefined();
      expect(data[0].id).toBe('5763cd4d9d2a4f259b53c901');
      expect(data[0].lastname).toBe('Woodard');
    });
    const req = httpTestingController.expectOne(`http://127.0.0.1:9000/api/person/${fakePersonList[0].id}`);
    req.flush(response);
  });

  it('should call create api', () => {
    const request = fakePersonList[0];
    const response = fakePersonList[0];
    service.create(request).subscribe(data => {
      expect(data).toBeDefined();
      expect(data.id).toBe('5763cd4d9d2a4f259b53c901');
      expect(data.lastname).toBe('Woodard');
    });
    const req = httpTestingController.expectOne('http://127.0.0.1:9000/api/people');
    req.flush(response);
  });

  it('should call fetch random api', () => {
    const request = fakePersonList[0];
    const response = fakePersonList[0];
    service.fetchRandom().subscribe(data => {
      expect(data).toBeDefined();
      expect(data.id).toBe('5763cd4d9d2a4f259b53c901');
      expect(data.lastname).toBe('Woodard');
    });
    const req = httpTestingController.expectOne('http://127.0.0.1:9000/api/people/random');
    req.flush(response);
  });
});


const fakePersonList = [{
  id: '5763cd4d9d2a4f259b53c901',
  photo: 'https://randomuser.me/portraits/women/59.jpg',
  firstname: 'Leanne',
  lastname: 'Woodard',
  entity: 'BIOSPAN',
  entryDate: '27/10/2015',
  birthDate: '02/01/1974',
  gender: '',
  email: 'Leanne.Woodard@custom.com',
  skills: ['pariatur', 'ipsum', 'laboris', 'nostrud', 'elit'],
  geo: {
    lat: 48.854107964410616,
    lng: 2.2486534555789013
  },
  phone: '0784112248',
  address: {
    street: 'Narrows Avenue',
    postalCode: 70534,
    city: 'Boling'
  },
  links: {
    twitter: 'https://twitter.com/laboris',
    slack: 'https://slack.com/fugiat',
    github: 'https://github.com/velit',
    linkedin: 'https://www.linkedin.com/in/voluptate'
  },
  isManager: false,
  manager: 'Erika',
  managerId: '5763cd4d3b57c672861bfa1f'
}];
