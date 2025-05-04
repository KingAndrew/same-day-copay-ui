
import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Colors, URLs } from '../constants';

const SubMenuItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.subMenuItemContainer} onPress={onPress}>
    <View style={styles.subMenuItem}>
      <View style={styles.subMenuIconContainer}>
        <View
          style={[
            styles.subMenuIconBackground,
            { backgroundColor: Colors.NAVY_BLUE, padding: 0 },
          ]}
        >
          <Image
            source={{ uri: `${URLs.IMAGES}/${icon}` }}
            style={{ width: 24, height: 24 }}
            alt={text}
          />
        </View>
      </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  subMenuIconBackground: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  chevron: {
    color: Colors.WHITE,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SubMenuItem;
