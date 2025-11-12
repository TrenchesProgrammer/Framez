import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";

const EditProfile = () => {
  const { profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setUsername(profile.username || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const handleSave = async () => {
    await updateProfile(username, fullName, bio);
    setIsEditing(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Full name:</Text>
      <TextInput
        keyboardType="default"
        value={fullName}
        editable={isEditing}
        style={styles.input}
        onChangeText={setFullName}
      />
      <Text style={styles.label}>Username:</Text>
      <TextInput
        keyboardType="default"
        value={username}
        editable={isEditing}
        style={styles.input}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Bio:</Text>
      <TextInput
        keyboardType="default"
        value={bio}
        editable={isEditing}
        style={styles.input}
        onChangeText={setBio}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:10 }}>
        <TouchableOpacity 
          style={{backgroundColor: isEditing? 'darkgray': 'lightgray', display:'flex', justifyContent:'center', alignItems:'center', width:100, padding:10, borderRadius:5, marginTop:10}}
          onPress={() => setIsEditing(true)}
        >
          <Text style={{ color: "black"}}>Edit </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{backgroundColor: '#01b964',  flex:1, width:100, padding:10, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:5, marginTop:10}}
          onPress={handleSave}
          disabled={!isEditing}
        >
          <Text style={{ color: "white" }}>Save </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  avatar:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "gray",
    marginBottom: 20,
  }
});
