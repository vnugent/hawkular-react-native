import React, { Component } from 'react';
import { Button, Icon, Text, H3 } from 'native-base';
import { observer } from 'mobx-react';
import { Modal, View, Image } from 'react-native';

import store from './model/Store';


const BuildInfoPopup = observer( class BuildInfoPopup extends Component {
    constructor(props) {
        super(props);
        this.onInfoPress = this.onInfoPress.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.state = {
            modalVisible: false
        }
    }

    onInfoPress() {
        store.getHawkularStatusAction();
        this.setState({modalVisible: true});
    }


    onCloseModal() {
        this.setState({modalVisible: false});
    }

    render() {
        const show = store.hawkular_status.request_completed;
        console.log("Status popup", show);

        return (
            <View>
                <Button onPress={this.onInfoPress}>
                    <Image source={require("./hawkular_icon_48x48.png")} />
                </Button>
                <Modal animationType={"fade"} 
                        transparent={true} 
                        hardwareAccelerated={true}
                        visible={this.state.modalVisible} 
                        onRequestClose={() => store.resetHawkularStatusAction()} >

                        <View style={{
                              flex: 1,
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                          }}>
                            <View style={{
                                    padding: 20,
                                    width: 300,
                                    height: 300,
                                    backgroundColor: '#e6e6e6'}}>
                                    <Text>Version:</Text>
                                    <H3>{store.hawkular_status.version}</H3>
                                    <Text></Text>
                                    <Text>GitSHA1:</Text>
                                    <H3>{store.hawkular_status.gitSHA1}</H3>
                                    <Button onPress={this.onCloseModal}><Text>Close</Text></Button>

                            </View>
                        </View>
                </Modal>
            </View>
        );
    }
});

export default BuildInfoPopup;