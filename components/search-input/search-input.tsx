import clsx from "clsx";
import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";
import Link from "next/link";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

import { ISearchResult } from "shared/entities";
import { getRepositories } from "shared/api/search";
import { defaultPageSize } from "shared/variables/pagination";

import {
  SearchIconWrapper,
  SearchInputWrapper,
  SearchInputMainWrapper,
  SearchResultWrapper,
  SearchResultMainWrapper,
  SearchResultItem,
  StyledSearchInput,
  BorderLine,
  PaginationWrapper,
} from "./search-input.styled";

export default function SearchInput() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [focus, setFocus] = useState<boolean | undefined>(false);
  const [page, setPage] = useState<number | undefined>(1);
  const [perPage, setPerPage] = useState<number | undefined>(defaultPageSize);
  const [isHoveringResults, setIsHoveringResults] = useState<
    boolean | undefined
  >(false);
  const [searchResult, setSearchResult] = useState<ISearchResult | undefined>(
    null
  );

  const isSearchResultVisible = useMemo(
    () => focus && keyword && searchResult?.items?.length > 0,
    [focus, keyword, searchResult?.items]
  );

  const fetchData = async (keyword, page = 1, perPage = 20) => {
    if (!keyword) {
      return;
    }

    const repositories = await getRepositories({
      q: keyword,
      page,
      per_page: perPage,
    });

    searchInputRef.current?.focus();
    setSearchResult(repositories);
  };

  const keywordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    fetchData(event.target.value);
  };

  // Using lodash debounce because it's more stable and reliable.
  const debouncedKeywordChangeHandler = useCallback(
    debounce(keywordChangeHandler, 300),
    []
  );

  const onPageChange: PaginationProps["onChange"] = (page, pageSize) => {
    let newPage = page;
    if (pageSize !== perPage) {
      newPage = 1;
    }

    setPage(newPage);
    setPerPage(pageSize);

    fetchData(keyword, newPage, pageSize);
  };

  const renderItem = (item): JSX.Element => {
    return (
      <Link href={item.html_url} key={item.id}>
        <SearchResultItem>
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            className="octicon octicon-repo"
          >
            <path
              fillRule="evenodd"
              d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
            ></path>
          </svg>
          <span className="name">{item.full_name}</span>
          <span className="tip">jump to</span>
        </SearchResultItem>
      </Link>
    );
  };

  useEffect(() => {
    setKeyword("");
    searchInputRef.current?.focus();
  }, []);

  return (
    <SearchInputWrapper>
      <SearchInputMainWrapper
        className={clsx({
          focus: focus,
          active: isSearchResultVisible,
        })}
      >
        <SearchIconWrapper>
          <SearchOutlined />
        </SearchIconWrapper>

        <StyledSearchInput
          ref={searchInputRef}
          type="text"
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
            debouncedKeywordChangeHandler(event);
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            if (!isHoveringResults) {
              setFocus(false);
            }
          }}
        />
      </SearchInputMainWrapper>

      <SearchResultWrapper
        onMouseEnter={() => {
          setIsHoveringResults(true);
        }}
        onMouseLeave={() => {
          setIsHoveringResults(false);
        }}
        visible={isSearchResultVisible}
      >
        <BorderLine />

        <SearchResultMainWrapper>
          {searchResult?.items?.map((item) => renderItem(item))}
        </SearchResultMainWrapper>

        <PaginationWrapper>
          <Pagination
            defaultCurrent={page}
            defaultPageSize={perPage}
            current={page}
            total={searchResult?.total_count}
            onChange={onPageChange}
            showSizeChanger
          />
        </PaginationWrapper>
      </SearchResultWrapper>
    </SearchInputWrapper>
  );
}
