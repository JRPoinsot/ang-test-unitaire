import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Person} from '../../model/person.model';

@Component({
  selector: 'pwa-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>) {}

  closeDialog(result = null) {
    this.dialogRef.close(result);
  }

  ngOnInit() {}

  onCancel() {
    this.closeDialog();
  }

  onSave(person: Person) {
    this.closeDialog(person);
  }
}
