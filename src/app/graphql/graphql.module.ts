import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

import { environment } from '../../environments/environment';

const uri = `${environment.apiBaseUrl}/graphql`;
export function createApollo(httpLink: HttpLink) {
  const link = ApolloLink.from([httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return { link, cache };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
