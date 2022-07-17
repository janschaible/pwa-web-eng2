import styled from 'styled-components'
import { Link, Button, Sheet,FabButton,Searchbar} from 'framework7-react';

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
  padding-bottom: 75px; //controls where the layerbutton sits since it sits at the bottom of the container
  display: flex;
  flex-direction: column;
  *{
    pointer-events: all;
  }
`

export const SearchbarField = styled(Searchbar)`
  width: 100% !important;
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
    max-width: 500px;
    flex-grow: 1;
    margin-right: 2rem;
    font-size: min(10vw,2rem);
    background-color: ${props=>{
        if(props.disabled){
          return "gray"          
        }
        if(props.routingActive){
            return "red"
          }else{
            return "blue"
          }
      }};
    transition: 2s ease-in-out;
`

export const NavigateSheet = styled(Sheet)`
    height: 25%;
    width: 100%;
    border-radius: 25px;
`

export const DetailSheet = styled(Sheet)`
    height: auto;
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
    flex-grow: 1;
    max-width: 100px;
    color: ${props=>props.favorite?"yellow":"white"};
    background-color: ${props=>{
        if(props.disabled){
          return "gray"
        }
        return "blue"
      }};
`

export const FabRegular = styled(FabButton)`
  background-image: url(/images/map_img1.png) !important;
  background-size: 50px;
`

export const FabSattelite = styled(FabButton)`
  background-image: url(/images/map_img2.png) !important;
  background-size: 50px;
`

export const FabPainting = styled(FabButton)`
  background-image: url(/images/map_img3.png) !important;
  background-size: 50px;
`

export const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  font-size: 2rem;
  flex-direction: column;
`

export const DetailButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
`