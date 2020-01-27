import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import { MutationOptionsAlone, QueryOptionsAlone, SubscriptionOptionsAlone, WatchQueryOptionsAlone } from 'apollo-angular/types';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** 
 * The `Date` scalar type represents a year, month and day in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
 */
  Date: any,
  /** 
 * The `DateTime` scalar type represents a date and time. `DateTime` expects
   * timestamps to be formatted in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
 */
  DateTime: any,
  /** 
 * The `DateTimeOffset` scalar type represents a date, time and offset from UTC.
   * `DateTimeOffset` expects timestamps to be formatted in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
 */
  DateTimeOffset: any,
  Decimal: any,
  /** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
  Milliseconds: any,
  /** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
  Seconds: any,
};



export type Bracket = {
   __typename?: 'Bracket',
  rounds: Array<BracketRound>,
};

export type BracketGame = {
   __typename?: 'BracketGame',
  participantNrs: Array<Scalars['Int']>,
};

export type BracketRound = {
   __typename?: 'BracketRound',
  games: Array<BracketGame>,
};






export type Query = {
   __typename?: 'Query',
  generateBracket: Bracket,
};


export type QueryGenerateBracketArgs = {
  roundCount: Scalars['Int'],
  participantCount: Scalars['Int']
};


export type GenerateBracketQueryVariables = {
  roundCount: Scalars['Int'],
  participantCount: Scalars['Int']
};


export type GenerateBracketQuery = (
  { __typename?: 'Query' }
  & { generateBracket: (
    { __typename?: 'Bracket' }
    & { rounds: Array<(
      { __typename?: 'BracketRound' }
      & { games: Array<(
        { __typename?: 'BracketGame' }
        & Pick<BracketGame, 'participantNrs'>
      )> }
    )> }
  ) }
);

export const GenerateBracketDocument = gql`
    query generateBracket($roundCount: Int!, $participantCount: Int!) {
  generateBracket(roundCount: $roundCount, participantCount: $participantCount) {
    rounds {
      games {
        participantNrs
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GenerateBracketGQL extends Apollo.Query<GenerateBracketQuery, GenerateBracketQueryVariables> {
    document = GenerateBracketDocument;
    
  }