import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View>
      <Text>Framez</Text>
      <View style={styles.footer}>
        <View style={styles.line} />
        
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    footer:{
        width:'100%'
    },
    line:{
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
    }
})