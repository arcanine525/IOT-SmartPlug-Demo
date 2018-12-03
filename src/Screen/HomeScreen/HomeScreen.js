/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import SwitchCardComponent from "../../Components/SwitchCardComponent/SwitchCardComponent";
import { Card, Button } from "react-native-elements";
import Images from "../../Theme/Image";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this._turnOffAll = this._turnOffAll.bind(this);
    this._goToDetail = this._goToDetail.bind(this);
    
    //GET socket ID
    const { socketID } = this.props.navigation.state.params;
    
    this.state = {
      switchs: [
        { name: "SW1", state: false },
        { name: "SW2", state: false },
        { name: "SW3", state: false },
        { name: "SW4", state: false }
      ],
      socketID: socketID

    };
  }

  _turnOffAll() {
    alert("Turn off all sockets");
    this.setState({
      switchs: [
        { name: "SW1", state: false },
        { name: "SW2", state: false },
        { name: "SW3", state: false },
        { name: "SW4", state: false }
      ]
    });
  }

  _goToDetail() {
    this.props.navigation.navigate("DetailScreen", {socketID: this.state.socketID});
  }

  _renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={this._goToDetail}>
      <SwitchCardComponent
        switchState={item.state}
        switchName={item.name}
        // onPress={(item.state = !item.state)}
      />
    </TouchableOpacity>
  );

  _keyExtractor = (item, index) => item.name;
  render() {
    return (
      <View>
        <Card styles={styles.cardContainer}>
          <View style={styles.headContainter}>
            <Image source={Images.dashboard} style={styles.dashboardImg} />
            <View style={styles.textContainer}>
              <Text style={styles.text}> Active: #{this.state.socketID}</Text>
              <Text style={styles.text}> Inactive: ##</Text>
            </View>
          </View>

          <Button
            textStyle={styles.text}
            title="TURN OFF ALL"
            onPress={this._turnOffAll}
          />
        </Card>

        <FlatList
          data={this.state.switchs}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headContainter: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 15
  },

  dashboardImg: {
    width: 128,
    height: 128
  },
  textContainer: {
    justifyContent: "space-around",
    marginLeft: 25
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

/*
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import SocketIOClient from "socket.io-client";
//import { environment } from "../config/environment";

export default class Play extends React.Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient(""); // replace 'environment.serverUrl' with your server url
    this.socket.emit("channel1", "Hi server"); // emits 'hi server' to your server

    // Listens to channel2 and display the data recieved
    this.socket.on("channel2", data => {
      console.log("Data recieved from server", data); //this will console 'channel 2'
    });
  }

  clicked = () => {
    const dataObj = {
      action: "click"
    };

    this.socket.emit("channel2", dataObj);
  };

  render() {
    return (
      <View>
        <Text> Socket.io with react native </Text>
        <TouchableOpacity onPress={() => this.clicked}>
          <Text> Socket.io with react native - click </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
*/
