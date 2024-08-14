import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const List = styled.ul<{ listSize: number }>`
  min-width: 400px;
  height: 100%;
  display: grid;
  grid-template-columns: ${({ listSize }) => `repeat(${listSize}, 1fr)`};
  gap: 1%;
`;

export const Link = styled(RouterLink)<{ $starMode: boolean }>`
  display: block;
  position: relative;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  
  img {
    height: 100%;
    position: absolute;
    object-fit: cover;
    filter: ${props => props.$starMode ? 'brightness(60%)' : 'brightness(100%)'};
  }
`;

export const ItemInfo = styled.div`
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
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
  }

  .genres {
    display: flex;
    gap: 5px;
    margin-top: 0.25vw;
  }

  .genres li {
    display: none;
    font-weight: 300;
    font-size: 12px;

    @media (min-width: 576px) {
      display: block;
    }
  }
`;

export const ListItem = styled.li`
  position: relative;
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

export const StarsBlock = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`