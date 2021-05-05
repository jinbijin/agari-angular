import { Component, Input } from '@angular/core';

@Component({
    selector: 'agari-page-content',
    templateUrl: './page-content.component.html',
    styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent {
    @Input() public header: string;
}
