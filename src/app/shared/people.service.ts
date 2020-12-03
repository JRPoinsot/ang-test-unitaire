import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Person} from '../model/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(
      k => (this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`)
    );
  }

  fetch(): Observable<Array<Person>> {
    return this._http.get<Array<Person>>(this._backendURL.people);
  }

  fetchRandom(): Observable<Person> {
    return this._http.get<Person>(this._backendURL.randomPerson);
  }

  fetchOne(id: string): Observable<Person> {
    return this._http.get<Person>(this._backendURL.person.replace(':id', id));
  }

  delete(id: string): Observable<Array<Person>> {
    return this._http.delete<Array<Person>>(this._backendURL.person.replace(':id', id));
  }

  update(person: Person): Observable<Person> {
    return this._http.put<Person>(this._backendURL.person.replace(':id', person.id), person);
  }

  create(person: Person): Observable<Person> {
    return this._http.post<Person>(this._backendURL.people, person);
  }
}
