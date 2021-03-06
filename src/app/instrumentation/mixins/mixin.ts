import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Constructor } from './types/constructor';

export class Mixin {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static Reactive<T extends Constructor<any>>(Base: T) {
    return class Reactive extends Base implements OnDestroy {
      protected readonly subscription: Subscription;

      public constructor(...args: any[]) {
        super(...args);
        this.subscription = new Subscription();
      }

      public ngOnDestroy(): void {
        if (super.ngOnDestroy !== undefined) {
          // Not covered as this function is never applied to an implementation of `ngOnDestroy`
          super.ngOnDestroy();
        }
        this.subscription.unsubscribe();
      }
    };
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static TrackByIndex<T extends Constructor<any>>(Base: T) {
    return class TrackByIndex extends Base {
      public trackByIndex(index: number, item: any): number {
        return index;
      }
    };
  }
}
