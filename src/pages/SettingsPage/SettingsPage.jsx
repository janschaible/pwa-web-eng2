import { Page,ListItem,Toggle } from 'framework7-react';
import { BackButton,Container,Anon,ItemList } from './SettingsPage.elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faUser } from '@fortawesome/free-solid-svg-icons'

const SettingsPage = ()=>{

    return (
        <Page name="settings">
            <Container>
                <BackButton href="/">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </BackButton>

                <Anon icon={faUser}/>
                <ItemList>
                    <ListItem>
                        <span>Letzte Wege anzeigen</span>
                        <Toggle onToggleChange={e=>console.log(e)} value={0}/>
                    </ListItem>
                </ItemList>
            </Container>
        </Page>
    )
}

export default SettingsPage