import { Page,ListItem } from "framework7-react"
import { BackButton,Container,ItemList,PageIcon } from '/pages/Settings/Settings.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faStar } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setTargetPosition } from '@/features/routing/routingSlice'
import { useCallback } from "react";
import {f7} from 'framework7-react';


const RecentDestinations = ()=>{
    const dispatch = useDispatch()
    const favorites = useSelector(state=>state.routing.favorites)
    const routingActive = useSelector(state=>state.routing.routingActive)

    const getSelectRecentCallback = useCallback((target)=>{
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
                            favorites.map(faforite=>{
                                if(!faforite)return
                                return (
                                <ListItem 
                                    key={faforite.pageid} 
                                    onClick={getSelectRecentCallback(faforite)}
                                    style={{cursor:'pointer'}} 
                                    link={routingActive?"/settings/favorites":"/"}
                                >
                                    {faforite.title}
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

export default RecentDestinations