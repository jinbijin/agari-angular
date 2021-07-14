import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class UpdateNotificationService {
  public constructor(updates: SwUpdate, snackBar: MatSnackBar, @Inject(DOCUMENT) document: Document) {
    updates.available.subscribe(event => {
      const snackBarRef = snackBar.open('An update to a new version is available.', 'Update');
      snackBarRef.onAction().subscribe(() => updates.activateUpdate().then(() => document.location.reload()))
    });
    updates.activated.subscribe(event => snackBar.open(`Update to version ${event.current} has succeeded!`, undefined, { duration: 5000 }));
  }
}
