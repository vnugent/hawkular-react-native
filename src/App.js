import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Switch, Text } from 'native-base';
import { observer } from 'mobx-react';

import store from './model/Store';
import BuildInfoPopup from './BuildInfoPopup';

const App = observer(class App extends Component {
    constructor(props) {
        super(props);
        this.onPowerChange = this.onPowerChange.bind(this);
    }


    onPowerChange(value) {
        store.toggle(value);
    }

    
    onInfoPress() {
        store.getHawkularStatusAction();
    }


    render() {
        const currentState = store.powerState.get();
        return (
            <Container>
                <Header>
                    <Left>
                        <Button large light outline bordered transparent><Text>Hawkular React Native</Text></Button>
                    </Left>
                    <Body>
                        <BuildInfoPopup/>
                    </Body>
                    <Right>
                        <Text>Off&nbsp;</Text>
                        <Switch onValueChange={this.onPowerChange} value={currentState}/>
                        <Text>&nbsp;On</Text>
                    </Right>
                </Header>
                <Content>
                </Content>
            </Container>
        );
    }


});

export default App;

