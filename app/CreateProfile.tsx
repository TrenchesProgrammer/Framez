import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";

const CreateProfile = () => {
  const { createProfile } = useAuth();
  const [username, setUsername] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [full_name, setFullName] = React.useState("");

  const handleCreateProfile = async () => {
    if (!username) {
      alert("Username cannot be empty");
      return;
    }
    if (!bio) {
      alert("Bio cannot be empty");
      return;
    }
    setLoading(true);
    await createProfile(username, full_name, bio);
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your Profile</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Full Name"
        keyboardType="default"
        value={full_name}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Username"
        keyboardType="default"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Bio"
        keyboardType="default"
        value={bio}
        onChangeText={setBio}
      />
      <TouchableOpacity
        style={[styles.button, loading ? styles.buttonDisabled : null]}
        onPress={handleCreateProfile}
      >
        {!loading ? (
          <Text style={styles.buttonText}>Save</Text>
        ) : (
          <Text style={styles.buttonText}>Loading</Text>
        )}
      </TouchableOpacity>
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
  title: {
    color: "black",
    fontWeight: "800",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#a9a9a9",
  },
});

export default CreateProfile;
