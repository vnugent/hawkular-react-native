import React from 'react';
import {
  Text,
} from 'react-native';


export default class StatusScreen extends React.Component {
  static navigationOptions = {
    title: 'Hawkular Status',
  };
  
  render() {
    const { params } = this.props.navigation.state;
    console.log("StatusScreen", this.props.navigation.state);
    return (<Text>Hello, Navigation!</Text>);
  }
}