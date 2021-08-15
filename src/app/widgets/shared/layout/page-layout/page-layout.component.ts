import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent implements OnInit, OnDestroy {
  readonly #subscriptions: Subscription = new Subscription();

  title: string;
  
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.#subscriptions.add(this.activatedRoute.data.subscribe(data => this.title = data?.title));
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
