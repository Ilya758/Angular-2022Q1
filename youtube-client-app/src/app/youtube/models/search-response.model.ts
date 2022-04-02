import { TResponseIntersectTypes } from 'src/app/shared/models/common.model';
import { IItem } from './search-item.model';

export interface IResponse extends TResponseIntersectTypes {
  pageInfo: TPageInfo;
  items: [IItem];
}

export type TPageInfoKeys = 'totalResults' | 'resultsPerPage';

export type TPageInfo = {
  [key in TPageInfoKeys]: string;
};
