import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache, ApolloLink} from '@apollo/client/core';
import {onError} from '@apollo/client/link/error';
import { NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

const uri = `${environment.apiBaseUrl}/graphql`;
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
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
