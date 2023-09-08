import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";

import { NOTIFICATION, BROADCAST_NOTIFICATION } from "./constants/api";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{ title: "Notification App" }}
        />
      </Stack.Navigator>
      <NotificationScreen />
    </NavigationContainer>
  );
};

const NotificationScreen = () => {
  const [notifytitle, setNotifyTitle] = useState("");
  const [notifymessage, setNotifyMessage] = useState("");
  const [mobile, setMobile] = useState("");

  const BroadcastNotification = async () => {
    if (mobile == "") {
      try {
        await axios.post(`${BROADCAST_NOTIFICATION}`, {
          notification_message: `${notifymessage}`,
          message_title: `${notifytitle}`,
        });
        await axios.post(`https://app.nativenotify.com/api/notification`, {
          appId: 10536,
          appToken: "VbOlb9uQLyJKJsVilsiAZY",
          title: notifytitle,
          body: notifymessage,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post(`${NOTIFICATION}/${mobile}`, {
          notification_message: `${notifymessage}`,
          message_title: `${notifytitle}`,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mobile Number</Text>
        <TextInput
          onChangeText={setMobile}
          label="Mobile number"
          style={styles.input}
          maxLength={10}
          keyboardType="phone-pad"
          // multiline={true}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Title</Text>
        <TextInput
          onChangeText={setNotifyTitle}
          label="Notification Title"
          style={styles.input}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Message</Text>
        <TextInput
          onChangeText={setNotifyMessage}
          label="Notification Message"
          style={styles.input}
          multiline={true}
        />
      </View>

      <Button
        // onPress={BroadcastNotification}
        mode="contained"
        style={styles.button}
      >
        Broadcast
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3a3332",
    flex: 1,
    padding: 20,
  },
  section: {
    // backgroundColor: "black",
    color: "white",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    // backgroundColor: "#75706f",
    elevation: 3,
    borderRadius: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: "rgb(132,194,37)", // Adjust color as needed
  },
});

export default App;
