import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Person} from '../../model/person.model';

@Component({
  selector: 'pwa-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {
  @Input() person: Person;
  @Output('personDelete') delete$: EventEmitter<Person>;

  constructor() {
    this.person = null;
    this.delete$ = new EventEmitter();
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {}

  /**
   * Function to emit event to delete current person
   *
   * @param person the person to delete
   */
  delete(person: Person) {
    this.delete$.emit(person);
  }
}
