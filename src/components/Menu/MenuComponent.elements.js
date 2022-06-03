import styled from "styled-components";
import {Block, Button, ListButton, Menu, Page, Panel} from "framework7-react";

export const MyMenu = styled(Menu)`
  z-index: 10000;
  position: absolute;
  top: 5vh;
  left: 2vw;
  height: 100px;
  width: 100px;
`

export const MyBlock = styled(Block)`
  z-index: 10000;
  position: absolute;
  top: 3vh;
  left: 93vw;
`

export const MyButton = styled(Button)`
  height: 55px;
  width: 55px;
  background-color: #48ACF0;
`

export const MyListButton = styled(ListButton)`
    background-color: black;
`

export const MyPanel = styled(Panel)`
  min-width: 100px;
  max-width: 90vw;
`