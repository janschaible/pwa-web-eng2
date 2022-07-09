import { Page } from "framework7-react"
import { BackButton,Container,ItemList } from '/pages/Settings/Settings.elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const RecentDestinations = ()=>{

    return(
        <Page name="recent-destinations">
            <Container>
                <BackButton href="/settings/">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </BackButton>

                <ItemList>
                </ItemList>
            </Container>
        </Page>
    )
}

export default RecentDestinations