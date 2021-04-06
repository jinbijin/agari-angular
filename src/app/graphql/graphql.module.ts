import { NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

import { environment } from '../../environments/environment';

const uri = `${environment.apiBaseUrl}/graphql`;
export function createApollo(httpLink: HttpLink, snackBar: MatSnackBar) {
  const error = onError(({ graphQLErrors, networkError }) => {
    let message = 'An unknown error has occurred';
    if (graphQLErrors) {
      const errorCode = graphQLErrors[0].extensions?.code;
      switch (errorCode) {
        case 'SEED_NOT_FOUND':
          message = 'Timed out while generating a random schedule.';
          break;
      }
    }
    const netError = networkError as any;
    if (netError?.status === 504) {
      message = 'The server cannot be reached at this moment. Please try again later.';
    }
    snackBar.open(message, undefined, {
      duration: 5000
    });
  });

  const http = httpLink.create({ uri });

  const link = ApolloLink.from([error, http]);
  const cache = new InMemoryCache();

  return { link, cache };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  imports: [MatSnackBarModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, MatSnackBar]
    }
  ]
})
export class GraphQLModule {}
