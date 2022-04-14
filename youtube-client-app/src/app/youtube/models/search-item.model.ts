/* eslint-disable @typescript-eslint/indent */

import { TResponseIntersectTypes } from 'src/app/shared/models/common.model';
import { TStatistics } from 'src/app/shared/models/statistics.model';

export interface IItem extends TResponseIntersectTypes {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: ISnippet;
  statistics: TStatistics;
}

interface ISnippet extends TSnippetStringChars {
  thumbnails: TThumbnails;
  tags: TTags;
  localized: TLocalizedParams;
}

export type TSnippetStringChars = Record<
  | 'publishedAt'
  | 'channelId'
  | TUnionSnippetInfoTypes
  | 'channelTitle'
  | 'categoryId'
  | 'liveBroadcastContent'
  | 'defaultAudioLanguage',
  string
>;

export type TThumbnails = Record<
  'default' | 'medium' | 'high' | 'standard' | 'maxres',
  IResolutionParams
>;

export interface IResolutionParams {
  url: string;
  width: number;
  height: number;
}

export type TTags = [string];

export type TUnionSnippetInfoTypes = 'title' | 'description';

export type TLocalizedParams = Record<TUnionSnippetInfoTypes, string>;
