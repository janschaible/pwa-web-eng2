import { Page,ListItem } from "framework7-react"
import { BackButton,Container,ItemList,PageIcon } from '/pages/Settings/Settings.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setTargetPosition } from '@/features/routing/routingSlice'
import { useCallback } from "react";
import {f7} from 'framework7-react';

/**
 * Display all of the users recent destinations
 * when a destination from the list is selected the destination
 * will be shown on the map
 */
const RecentDestinations = ()=>{
    const dispatch = useDispatch()
    const lastTargets = useSelector(state=>state.routing.lastTargets)
    const routingActive = useSelector(state=>state.routing.routingActive)

    /**
     * returns a onclick function for a passed destination
     * onclick will show a warning if the user wants to select a target
     * if routing is currently active otherwise it will set the target position 
     * to the passed destination
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
        <Page name="recent-destinations">
            <Container>
                <BackButton href="/settings">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </BackButton>

                <PageIcon icon={faMapLocationDot}/>

                <ItemList>
                    {
                        lastTargets && lastTargets.length!=0?
                            lastTargets.map(target=>{
                                if(!target)return
                                return (
                                <ListItem 
                                    key={target.pageid} 
                                    onClick={getOnclickListItem(target)}
                                    style={{cursor:'pointer'}} 
                                    link={routingActive?"/settings/recent-destinations":"/"}
                                >
                                    {target.title}
                                </ListItem>
                            )})
                        :
                        <ListItem>
                            Es sind noch keine Ziele besucht worden
                        </ListItem>
                    }
                </ItemList>
            </Container>
        </Page>
    )
}

export default RecentDestinations