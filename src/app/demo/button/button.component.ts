import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './button.component.html',
})
export class DemoButtonComponent {
  public readonly color: string;
  public readonly content: string;

  public constructor(private readonly activatedRoute: ActivatedRoute) {
    this.color = this.activatedRoute.snapshot.queryParamMap.get('color') ?? '';
    this.content = this.activatedRoute.snapshot.queryParamMap.get('content') ?? '';
  }
}
