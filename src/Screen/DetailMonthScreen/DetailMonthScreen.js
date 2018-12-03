import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Images from "../../Theme/Image";
import styles from "./DetailMonthScreenStyles";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

//Calculate total
const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
};

export default class DetailMonthScreen extends Component {
  constructor(props) {
    super(props);
    //GET socket ID
    const { socketID } = this.props.navigation.state.params;
    this.state = {
      socketID: socketID
    };
  }
  static navigationOptions = {
    title: "MONTH"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.primaryTextContainer}>
          Details for socket: {this.state.socketID}
        </Text>

        <LineChart
          data={data}
          width={Dimensions.get("screen").width}
          height={(Dimensions.get("screen").height * 2) / 3}
          chartConfig={chartConfig}
        />
      </View>
    );
  }
}
