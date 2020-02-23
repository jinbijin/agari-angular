import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { TableConfiguration } from 'src/app/instrumentation/data/table-configuration.type';

@Component({
  selector: 'agari-table',
  templateUrl: './agari-table.component.html',
  styleUrls: ['./agari-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgariTableComponent implements OnInit {
  @Input() public tableConfiguration: TableConfiguration<any>;

  public displayedColumns: string[];

  constructor() {}

  public ngOnInit(): void {
    this.displayedColumns = this.tableConfiguration.columns
      .filter(col => col.displayed !== false)
      .map(col => col.id);
  }
}
