import {
    Block,
    Button,
    Col, List, ListButton,
    MenuDropdown,
    MenuDropdownItem,
    MenuItem,
    Navbar,
    Page,
    Panel,
    View
} from "framework7-react";
import React from "react";
import {MyBlock, MyButton, MyListButton, MyMenu, MyPanel} from "./MenuComponent.elements";
import menuIcon from "../../img/menu_v3_48.png";

const MenuComponent = () => {
    return (
        <div>
            <MyPanel resizable right light>
                <View>
                    <Page>
                        <Block>
                            <Navbar title={"MENU"} noShadow={true}/>

                            <List inset>
                                <MyListButton title="List Button 1" />
                                <ListButton title="List Button 2" />
                                <ListButton title="List Button 3" />
                            </List>

                            <Navbar title={"MENU"} noShadow={true}/>

                            {/*<MyMenu>*/}
                            {/*    <MenuItem text="Menu" />*/}
                            {/*    <MenuItem divider />*/}
                            {/*    <MenuItem text="MyMenu" dropdown>*/}
                            {/*        <MenuDropdown left>*/}
                            {/*            <MenuDropdownItem href="#" text="Menu Item 1" />*/}
                            {/*            <MenuDropdownItem href="#" text="Menu Item 2" />*/}
                            {/*            <MenuDropdownItem href="#" text="Menu Item 3" />*/}
                            {/*            <MenuDropdownItem href="#" text="Menu Item 4" />*/}
                            {/*            <MenuDropdownItem divider />*/}
                            {/*            <MenuDropdownItem href="#" text="Menu Item 5"/>*/}
                            {/*        </MenuDropdown>*/}
                            {/*    </MenuItem>*/}
                            {/*</MyMenu>*/}
                        </Block>
                    </Page>
                </View>
            </MyPanel>
            <MyBlock>
                <Col tag="span">
                    <MyButton raised fill panelOpen="right">
                        <img src={menuIcon} alt={"Menu"}/>
                    </MyButton>
                </Col>
            </MyBlock>
        </div>
    );
}

export default MenuComponent;