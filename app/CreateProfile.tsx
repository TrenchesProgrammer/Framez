import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const CreateProfile = () => {

    const [username, setUsername] = React.useState('');
    const [loading, setLoading] = React.useState(false);
  return (
       <View style={styles.container}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Username"
            keyboardType="default"
            value={username}
            onChangeText={setUsername}
          />
    
   
    
          <TouchableOpacity
            style={[styles.button, loading ? styles.buttonDisabled : null]}
            // onPress={}
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
      innerText: {
        color: "#01b964",
        fontWeight: "bold",
        marginTop: 10,
      },
      buttonDisabled: {
        backgroundColor: "#a9a9a9",
      },
    });
    
    export default CreateProfile;
    