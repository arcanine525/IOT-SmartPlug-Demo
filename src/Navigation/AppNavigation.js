import { createStackNavigator } from "react-navigation";
import HomeScreen from "../Screen/HomeScreen/HomeScreen";

const MainStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    }
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none"
  }
);

export default MainStack;
