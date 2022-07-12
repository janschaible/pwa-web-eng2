import styled from 'styled-components'
import {Link,Button, Sheet} from 'framework7-react';

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  *{
    pointer-events: all;
  }
`

export const SettingsButton = styled(Link)`
  height: 3.5rem;
  width: 3.5rem;
  font-size: 2rem;
  border-radius: 50%;
  border-style: none;
  background-color: #EEE;
  box-shadow: 2px 2px 1px black;
  margin: calc(var(--f7-card-margin-horizontal) + var(--f7-safe-area-right));
  align-self: flex-end;
  cursor: pointer;
`

export const NavigateButton = styled(Button)`
    position: absolute;
    bottom: 1rem;
    width: 25%;
    right: 5%;
    padding: 2rem;
    z-index: 1000;
    font-size: 3vw;
    background-color: ${props=>props.routingActive?"red":"blue"};
    transition: 2s ease-in-out;
`

export const NavigateSheet = styled(Sheet)`
    height: 15%;
    width: 100%;
    border-radius: 25px;
`

export const DetailSheet = styled(Sheet)`
    height: 20%;
    width: 100%;
    border-radius: 25px;
`

export const SheetControlButton = styled(Button)`
    position: absolute;
    width: 25%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
`

export const FavoritesButton = styled(Button)`
    position: absolute;
    width: 5%;
    bottom: 5.5rem;
    right: 5%;
    background-color: "blue";
`
//${props=>props.visible?"translate(0)":"translate(0, calc(1.5rem+100%))"}
