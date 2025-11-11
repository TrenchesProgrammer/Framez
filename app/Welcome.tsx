import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { wp } from "@/helpers/common";
import { router, useRouter } from "expo-router";
const Welcome = () => {
  return (
      <View style={styles.container}>
        <StatusBar />
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../assets/welcome.png")}
        />
        <View>
          <Text style={styles.title}>Framez</Text>
          <Text style={styles.punchline}>
            Ditch the bland platforms and endless scrolling; we're where
            authentic engagement and good laughs actually happen.
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={() => {router.push('/login')}}>
            <Text style={styles.buttonText}>Getting Started</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    width: wp(100),
    height: wp(70),
    alignSelf: "center",
  },
  title:{
    color: 'black',
    fontWeight: '800',
    fontSize: 24,
    textAlign: 'center',
  },
  punchline:{
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  footer:{
    width: '100%',
  },
  button:{
    backgroundColor: '#01b964',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 16,
  }
});
