
import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Colors, URLs } from '../constants';

const SubMenuItem = ({ text, onPress, icon }) => (
  <TouchableOpacity style={styles.subMenuItemContainer} onPress={onPress}>
    <View style={styles.subMenuItem}>
      {icon && (
        <View style={styles.subMenuIconContainer}>
          <Image
            source={{ uri: `${URLs.IMAGES}/${icon}` }}
            style={styles.subMenuIcon}
            resizeMode="contain"
            alt={text}
          />
        </View>
      )}
      <Text style={styles.subMenuItemText}>{text}</Text>
      <Text style={styles.chevron}>›</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  subMenuItemContainer: {
    marginBottom: 2,
    width: "90%",
    alignSelf: "flex-end",
  },
  subMenuItem: {
    flexDirection: "row",
    backgroundColor: Colors.NAVY_BLUE,
    padding: 12,
    paddingLeft: 30,
    borderRadius: 6,
    alignItems: "center",
  },
  subMenuItemText: {
    fontSize: 14,
    color: Colors.WHITE,
    fontWeight: "500",
    flex: 1,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
  },
  subMenuIconContainer: {
    marginRight: 10,
  },
  subMenuIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.WHITE,
  },
  chevron: {
    color: Colors.WHITE,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SubMenuItem;
