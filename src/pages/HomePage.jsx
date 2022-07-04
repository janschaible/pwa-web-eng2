import {
    Page,
    Card,
    CardHeader
} from 'framework7-react';

import MapComponent from '/components/Map/MapComponent'
import {Overlay} from "./HomePage.elements";
import {useDispatch, useSelector} from "react-redux";
import {setRoutingActive} from '@/features/routing/routingSlice'


const HomePage = () => {
    const dispatch = useDispatch()
    const routingActive = useSelector(state => state.routing.routingActive)

    const instruction = useSelector(state=>state.routing.instruction)
    let instructionElement = null
    if(instruction){
        instructionElement=
            <Card>
                <CardHeader>
                    {instruction.text}
                </CardHeader>
            </Card>
    }

    return (
        <Page name="home">
            <MapComponent/>
            <Overlay>
                {instructionElement}
                <button onClick={()=>{
                    dispatch(setRoutingActive(!routingActive))
                }}>
                    navigate
                </button>
            </Overlay>
        </Page>
    );
}
export default HomePage;
