import { View, ActivityIndicator } from 'react-native';
import React from 'react';
const Index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#01b964" />
    </View>
  );
};

export default Index;