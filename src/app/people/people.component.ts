import { mergeMap } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { PeopleService } from '../shared/people.service';
import { Person } from '../model/person.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pwa-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {

  public people: Array<Person> = [];
  public dialogStatus = 'inactive';

  private peopleSubscription!: Subscription;
  private addDialog: MatDialogRef<AddDialogComponent>;

  constructor(private peopleService: PeopleService, public dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.peopleSubscription = this.peopleService.fetch().subscribe(people => this.people = people);
  }

  ngOnDestroy(): void {
    this.peopleSubscription.unsubscribe();
  }

  delete(person: Person) {
    this.peopleService.delete(person.id).pipe(
      mergeMap(() => this.peopleService.fetch())
    )
    .subscribe(people => this.people = people);
  }

  add(person: Person) {
    this.peopleService.create(person)
        .pipe(mergeMap(() => this.peopleService.fetch()))
        .subscribe(people => {
          this.people = people;
          this.hideDialog();
        });
  }

  showDialog() {
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AddDialogComponent, {
      width: '450px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe(person => {
      this.dialogStatus = 'inactive';
      if (person) {
        this.add(person);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    this.addDialog.close();
  }

  trackByFn(index: number, item: Person) {
    return item.id; // or item.id
  }
}
