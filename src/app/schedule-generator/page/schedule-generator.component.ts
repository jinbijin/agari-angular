import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GenerateScheduleGQL } from 'src/app/graphql/generated/types';

@Component({
  templateUrl: './schedule-generator.component.html',
  styleUrls: ['./schedule-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
