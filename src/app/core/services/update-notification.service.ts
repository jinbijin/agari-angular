import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class UpdateNotificationService {
  public constructor(updates: SwUpdate, snackBar: MatSnackBar, @Inject(DOCUMENT) document: Document) {
    updates.available.subscribe(event => snackBar.open(`An update to a new version (${event.available}) is available. Refresh the page to perform the update.`, 'Got it!'));
    updates.activated.subscribe(event => snackBar.open(`Update successful, welcome to version ${event.current}!`, undefined, { duration: 5000 }));
  }
}
