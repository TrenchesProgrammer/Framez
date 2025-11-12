import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
    const {  profile } = useAuth();
    
  return (
    <View>
      <TextInput>{profile?.username}</TextInput>
      <TextInput>{profile?.bio}</TextInput>
    </View>
  )
}

export default Profile