import React from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from './MenuButtonStyle';

export const MenuButtonComponent = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => navigation.openDrawer()}>
      <View style={styles.button}>
        <Image
          source={require('../../../assets/images/menu.png')}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};
