import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Switch, Text } from 'native-base';
import { observer } from 'mobx-react';

import store from './model/Store';
import BuildInfoPopup from './BuildInfoPopup';
import HawkularPedometer from './HawkularPedometer';


const App = observer(class App extends Component {
    constructor(props) {
        super(props);
        this.onPowerToggle = this.onPowerToggle.bind(this);
    }


    onPowerToggle(value) {
        store.togglePower(value);
    }


    render() {
        const currentState = store.powerState.get();
        return (
            <Container>
                <Header>
                    <Left>
                        <BuildInfoPopup/>
                    </Left>
                    <Right>
                        <Text>Off&nbsp;</Text>
                        <Switch onValueChange={this.onPowerToggle} value={currentState}/>
                        <Text>&nbsp;On</Text>
                    </Right>
                </Header>
                <Content>
                    <HawkularPedometer />
                </Content>
            </Container>
        );
    }


});


export default App;

