import styled from 'styled-components'
import {Link} from 'framework7-react';

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
  background-color: white;
  box-shadow: 2px 2px 1px black;
  margin: calc(var(--f7-card-margin-horizontal) + var(--f7-safe-area-right));
  align-self: flex-end;
  cursor: pointer;
`