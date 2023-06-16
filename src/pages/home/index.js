import { View, Text, Button } from "react-native";
import React from "react";
import { AuthContext } from "../../routes/index";

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

export default HomeScreen;
