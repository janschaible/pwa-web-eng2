import styled from 'styled-components'
import {Button, Sheet} from 'framework7-react';

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
    position: absolute
    width: 25%;
    margin-left: auto;
    margin-right: auto;
`

//${props=>props.visible?"translate(0)":"translate(0, calc(1.5rem+100%))"}