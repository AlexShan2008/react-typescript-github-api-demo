import qs from "qs";
import { fetchData } from "./index";
import { ISearchResult } from "../entities";
import { trim } from "lodash";

export interface IGetRepositoriesParams {
  q: string;
  page?: number;
  per_page?: number;
}

export const getRepositories = (
  params: IGetRepositoriesParams
): Promise<ISearchResult> => {
  const query = qs.stringify(
    {
      ...params,
      q: encodeURIComponent(trim(params.q)),
    },
    { encode: false }
  );
  const url = `https://api.github.com/search/repositories?${query}`;

  return fetchData(url);
};
