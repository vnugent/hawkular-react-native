import React from 'react';
import {
  Platform, View, Button, Switch
} from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Hawkular React Native',
    headerRight: <Switch onValueChange={(value) => console.log(value)} style={{marginRight: 20}}/>
  };
  render() {
    const { navigate } = this.props.navigation;
    console.log("HomeScreen", navigate);
    return (<View><Button
          onPress={() => navigate('Status')}
          title="Chat with Lucy"
        />
        </View>);
  }
}