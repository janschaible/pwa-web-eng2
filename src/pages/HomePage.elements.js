import styled from 'styled-components'
import {Button} from 'framework7-react';

export const NavigateButton = styled(Button)`
    position: absolute;
    bottom: 1.5rem;
    width: 50%;
    left: 25%;
    padding: 2rem;
    z-index: 1000;
    font-size: 1.5rem;
    background-color: ${props=>props.routingActive?"red":"blue"};
    transition: 2s ease-in-out;
    transform: ${props=>props.visible?"translate(0)":"translate(0, 100px)"} !important;
`

//${props=>props.visible?"translate(0)":"translate(0, calc(1.5rem+100%))"}