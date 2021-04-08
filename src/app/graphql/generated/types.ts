/* eslint-disable */

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Date` scalar type represents a year, month and day in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  Date: any;
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: any;
  /** The `DateTimeOffset` scalar type represents a date, time and offset from UTC. `DateTimeOffset` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTimeOffset: any;
  Decimal: any;
  /** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
  Milliseconds: any;
  /** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
  Seconds: any;
};








export type Query = {
  __typename?: 'Query';
  generateSchedule: Schedule;
};


export type QueryGenerateScheduleArgs = {
  roundCount: Scalars['Int'];
  participantCount: Scalars['Int'];
};

/** A mahjong schedule */
export type Schedule = {
  __typename?: 'Schedule';
  /** The rounds in the schedule */
  rounds: Array<ScheduleRound>;
};

/** A game in a mahjong schedule */
export type ScheduleGame = {
  __typename?: 'ScheduleGame';
  /** The numbers of the participants in the game */
  participantNrs: Array<Scalars['Int']>;
};

/** A round in a mahjong schedule */
export type ScheduleRound = {
  __typename?: 'ScheduleRound';
  /** The games in the round */
  games: Array<ScheduleGame>;
};


export type GenerateScheduleQueryVariables = Exact<{
  roundCount: Scalars['Int'];
  participantCount: Scalars['Int'];
}>;


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
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }