import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { PeopleService } from './people.service';

fdescribe('Test People Service', () => {
  let service: PeopleService;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
  }));

  beforeEach(() => {
    service = TestBed.inject(PeopleService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetch api', () => {
    //
  });

  it('should call fetchOne api', () => {
    //
  });

  it('should call create api', () => {
    //
  });

  it('should call fetch random api', () => {
    //
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

