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
import Image from "next/image";

import repoIconSrc from "public/images/octicon.svg";

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
    debounce(keywordChangeHandler, 100),
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
          <Image
            priority
            src={repoIconSrc}
            height={16}
            width={16}
            alt={item.full_name}
          />
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
