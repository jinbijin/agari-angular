import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EmptyBase } from './base-class/empty-base';
import { Constructor } from './types/constructor';

export class Mixin {
  public static Reactive<T extends Constructor<any>>(Base?: T) {
    const BaseClass = Base || EmptyBase;
    return class Reactive extends BaseClass implements OnDestroy {
      protected readonly subscription: Subscription;

      public constructor(...args: any[]) {
        super(...args);
        this.subscription = new Subscription();
      }

      public ngOnDestroy(): void {
        if (super.ngOnDestroy !== undefined) {
          super.ngOnDestroy();
        }
        this.subscription.unsubscribe();
      }
    };
  }
}
