import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {AddDialogComponent} from './add-dialog.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('Test AddDialog Component', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
        imports: [MatDialogModule],
        declarations: [AddDialogComponent],
        providers: [{provide: MatDialogRef, useValue: {}}],
        schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
