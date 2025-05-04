
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import { ScreenTemplate } from '../components';

const AccountSetupScreen = ({ navigateTo }) => (
  <ScreenTemplate title="Account Setup" navigateTo={navigateTo}>
    <View style={{alignItems: "center"}}>
      <Text style={{color: Colors.WHITE, fontSize: 16, marginVertical: 20}}>
        Account setup placeholder content
      </Text>
    </View>
  </ScreenTemplate>
);

export default AccountSetupScreen;
