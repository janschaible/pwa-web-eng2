import { Page,ListItem } from "framework7-react"
import { BackButton,Container,ItemList,PageIcon } from '/pages/Settings/Settings.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faStar } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setTargetPosition } from '@/features/routing/routingSlice'
import { useCallback } from "react";
import {f7} from 'framework7-react';


/**
 * Display all of the users favorite destinations
 * when a destination from the list is selected the destination
 * will be shown on the map
 */
const FavoritePage = ()=>{
    const dispatch = useDispatch()
    const favorites = useSelector(state=>state.routing.favorites)
    const routingActive = useSelector(state=>state.routing.routingActive)

    /**
     * returns a onclick function for a passed favorite
     * onclick will show a warning if the user wants to select a target
     * if routing is currently active otherwise it will set the target position 
     * to the passed favorite
     */
    const getOnclickListItem = useCallback((target)=>{
        return ()=>{
            if(routingActive){
                f7.dialog.alert("Bitte beenden Sie zunächst die laufende Navigation")
                return
            }
            dispatch(setTargetPosition(target))
        }
    },[])

    return(
        <Page name="favorites">
            <Container>
                <BackButton href="/settings">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </BackButton>

                <PageIcon icon={faStar}/>

                <ItemList>
                    {
                        favorites && favorites.length!=0?
                            favorites.map(favorite=>{
                                if(!favorite)return
                                return (
                                <ListItem 
                                    key={favorite.pageid} 
                                    onClick={getOnclickListItem(favorite)}
                                    style={{cursor:'pointer'}} 
                                    link={routingActive?"/settings/favorites":"/"}
                                >
                                    {favorite.title}
                                </ListItem>
                            )})
                            :
                            <ListItem>
                                Es sind noch keine Favoriten gewählt worden
                            </ListItem>
                    }
                </ItemList>
            </Container>
        </Page>
    )
}

export default FavoritePage