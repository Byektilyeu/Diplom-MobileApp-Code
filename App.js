import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import MyDrawerNavigator from "./src/navigation/MyDrawerNavigator";

import { UserStore } from "./src/contexts/UserContext";

function App() {
  return (
    <NavigationContainer>
      <UserStore>
        <MyDrawerNavigator />
      </UserStore>
    </NavigationContainer>
  );
}

export default App;
