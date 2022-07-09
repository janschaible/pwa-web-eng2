import { Page,ListItem,Link } from "framework7-react"
import { BackButton,Container,ItemList,PageIcon } from '/pages/Settings/Settings.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setTargetPosition,setRoutingActive } from '@/features/routing/routingSlice'
import { useCallback } from "react";


const RecentDestinations = ()=>{
    const dispatch = useDispatch()
    const lastTargets = useSelector(state=>state.routing.lastTargets)

    const getSelectRecentCallback = useCallback((target)=>{
        return ()=>{
            dispatch(setRoutingActive(false))
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
                                    onClick={getSelectRecentCallback(target)}
                                    style={{cursor:'pointer'}} 
                                    link="/"
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