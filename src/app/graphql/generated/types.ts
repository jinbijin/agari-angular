import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
  DateTime: any,
  DateTimeOffset: any,
  Seconds: any,
  Milliseconds: any,
  Decimal: any,
};








export type Query = {
   __typename?: 'Query',
  generateSchedule: Schedule,
};


export type QueryGenerateScheduleArgs = {
  roundCount: Scalars['Int'],
  participantCount: Scalars['Int']
};

export type Schedule = {
   __typename?: 'Schedule',
  rounds: Array<ScheduleRound>,
};

export type ScheduleGame = {
   __typename?: 'ScheduleGame',
  participantNrs: Array<Scalars['Int']>,
};

export type ScheduleRound = {
   __typename?: 'ScheduleRound',
  games: Array<ScheduleGame>,
};


export type GenerateScheduleQueryVariables = {
  roundCount: Scalars['Int'],
  participantCount: Scalars['Int']
};


export type GenerateScheduleQuery = (
  { __typename?: 'Query' }
  & { generateSchedule: (
    { __typename?: 'Schedule' }
    & { rounds: Array<(
      { __typename?: 'ScheduleRound' }
      & { games: Array<(
        { __typename?: 'ScheduleGame' }
        & Pick<ScheduleGame, 'participantNrs'>
      )> }
    )> }
  ) }
);

export const GenerateScheduleDocument = gql`
    query generateSchedule($roundCount: Int!, $participantCount: Int!) {
  generateSchedule(roundCount: $roundCount, participantCount: $participantCount) {
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
  export class GenerateScheduleGQL extends Apollo.Query<GenerateScheduleQuery, GenerateScheduleQueryVariables> {
    document = GenerateScheduleDocument;
    
  }