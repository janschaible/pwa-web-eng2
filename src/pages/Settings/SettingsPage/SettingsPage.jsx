import { Page,ListItem,Toggle } from 'framework7-react';
import { BackButton,Container,ItemList,PageIcon } from '/pages/Settings/Settings.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faUser } from '@fortawesome/free-solid-svg-icons'
import { setShowLastPath } from '@/features/routing/routingSlice'
import { useDispatch, useSelector } from 'react-redux';

const SettingsPage = ()=>{
    const dispatch = useDispatch()
    const showLastPath = useSelector(state => state.routing.showLastPath)

    return (
        <Page name="settings">
            <Container>
                <BackButton href="/">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </BackButton>

                <PageIcon icon={faUser}/>
                <ItemList>
                    <ListItem link="/settings/favorites">
                        Favoriten anzeigen
                    </ListItem>
                    <ListItem>
                        <span>Letzte Wege anzeigen</span>
                        <Toggle onChange={e=>dispatch(setShowLastPath(!showLastPath))} checked={showLastPath}/>
                    </ListItem>
                    <ListItem link="/settings/recent-destinations">
                        Zuletzt besuchte Ziele
                    </ListItem>
                </ItemList>
            </Container>
        </Page>
    )
}

export default SettingsPage