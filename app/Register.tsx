import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { supabase } from "../lib/supabase";
import React, { useState } from "react";
import { useRouter } from "expo-router";
export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    Keyboard.dismiss(); 
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return; // Stop the function
    }
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')

    router.push("/login");
    setLoading(false)
  }
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Confirm password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password again"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity style={[styles.button, loading ? styles.buttonDisabled : null ]}  onPress={signUpWithEmail}>
        {!loading ? <Text style={styles.buttonText}>Register</Text> :
        <Text style={styles.buttonText}>Loading</Text>}
      </TouchableOpacity>
      <Text
        style={{ color: "gray", marginTop: 10 }}
        onPress={() => {
            if(!loading){
          router.push("/login");
        }
        }}
      >
        Have an account? <Text style={styles.innerText}>Login</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#01b964",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  innerText: {
    color: "#01b964",
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#a9a9a9", 
  }
});

export default Register;
