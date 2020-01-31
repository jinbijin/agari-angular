import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AgariComponent } from './agari.component';
import { agariRoutes } from './agari.routes';
import { CoreModule } from './core/core.module';
import { GraphQLModule } from './graphql/graphql.module';

@NgModule({
  declarations: [AgariComponent],
  imports: [BrowserModule, HttpClientModule, CoreModule, RouterModule.forRoot(agariRoutes), GraphQLModule],
  providers: [],
  bootstrap: [AgariComponent]
})
export class AgariModule {}
