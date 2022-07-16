import styled from 'styled-components'
import { MapContainer } from 'react-leaflet'
import { Searchbar } from 'framework7-react'

export const Map = styled(MapContainer)`
    width: 100vw;
    height:100vh;
`
export const SearchbarField = styled(Searchbar)`
    margin: calc(var(--f7-card-margin-horizontal) + var(--f7-safe-area-left));
    top: 0;
    left: 0;
    border-radius: 50%;
    border-style: none;
    box-shadow: 1px 1px 1px black;
    background-color: #EEE;
    z-index: 1000;
    margin-left: auto;
    position:absolute;

`