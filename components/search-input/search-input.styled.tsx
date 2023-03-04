import styled from "styled-components";
import { colors } from "shared/variables/color";
import { FontSize } from "shared/variables/font";

export const SearchInputWrapper = styled.div`
  position: relative;
  margin: 50px auto;
  width: 638px;
  max-width: 90vw;
`;

export const StyledSearchInput = styled.input`
  outline: none;
  border: none;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  height: 34px;
  font-size: ${FontSize.Base}px;
  margin-left: 12px;
`;

export const SearchInputMainWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1;
  height: 44px;
  border: 1px solid ${colors.border};
  border-radius: 24px;
  position: relative;

  &.focus,
  &:hover {
    background-color: ${colors.white};
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
    border-color: rgba(223, 225, 229, 0);
  }

  &.active {
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const SearchIconWrapper = styled.div`
  color: ${colors.grayText};
`;

interface ISearchResultWrapperProps {
  visible: boolean;
}

export const SearchResultWrapper = styled.div<ISearchResultWrapperProps>`
  position: absolute;
  z-index: 2;
  top: 43px;
  left: 0;
  width: 100%;
  border-radius: 24px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: ${colors.white};
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
  border: 1px solid ${colors.border};
  border-color: rgba(223, 225, 229, 0);
  border-top: none;
  user-select: none;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

export const SearchResultMainWrapper = styled.ul`
  padding: 6px 0;
  margin: 0;
  max-height: 30vh;
  overflow-y: auto;
`;

export const SearchResultItem = styled.li`
  display: flex;
  align-items: center;
  padding: 6px 20px;
  cursor: pointer;

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 85%;
    margin-left: 8px;
  }

  .tip {
    color: ${colors.grayText};
    margin-left: auto;
  }

  &:hover {
    background-color: ${colors.grayBg};
  }
`;

export const BorderLine = styled.div`
  border-top: 1px solid ${colors.borderLight};
  margin: 0 20px 0;
`;

export const PaginationWrapper = styled.div`
  padding: 10px 20px;

  ul {
    display: flex;
  }

  li:last-child {
    margin-left: auto;
  }
`;
