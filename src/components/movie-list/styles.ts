import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.ul<{ listSize: number }>`
  height: 100%;
  display: grid;
  grid-template-columns: ${({ listSize }) => `repeat(${listSize}, 1fr)`};
  gap: 1%;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  color: ${(props) => props.theme.color.white.normal};
  opacity: 0;
  transition: opacity 0.1s ease-in-out 0.2s;

  h4 {
    margin-bottom: 0.4vw;
    font-size: 2.5vw;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    @media (min-width: 769px) {
      font-size: 1.8vw;
    }

    @media (min-width: 961px) {
      font-size: 1.3vw;
    }

    @media (min-width: 1201px) {
      font-size: 16px;
    }
  }

  .genres {
    display: flex;
    gap: 5px;
    margin-top: 0.25vw;
  }

  small,
  .genres li {
    font-weight: 300;
    font-size: 1.6vw;

    @media (min-width: 961px) {
      font-size: 1.1vw;
    }

    @media (min-width: 1201px) {
      font-size: 0.9vw;
    }
  }
`;

const ListItem = styled.li`
  transition: transform 0.3s ease, margin 0.3s ease;

  &:last-of-type {
    transform-origin: center right;
  }
  &:first-of-type {
    transform-origin: center left;
  }

  &:hover {
    transform: scale(1.2);
  }

  &:hover ${ItemInfo} {
    opacity: 1;
  }

  &.before-hovered {
    transform: translateX(-10%);
  }

  &.after-hovered {
    transform: translateX(10%);
  }

  &.first-hovered.after-hovered {
    transform: translateX(20%);
  }

  &.last-hovered.before-hovered {
    transform: translateX(-20%);
  }
`;

const Link = styled(RouterLink)<{ bg: string }>`
  display: block;
  position: relative;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  background: url(${(props) => props.bg}) no-repeat center center;
  background-size: cover;
`;

const ST = { List, ListItem, ItemInfo, Link };
export default ST;
