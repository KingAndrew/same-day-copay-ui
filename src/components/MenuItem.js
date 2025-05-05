import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Colors, URLs } from '../constants/index.js';

const MenuItem = ({ icon, text, onPress, chevronText = "›" }) => (
  <TouchableOpacity style={styles.menuItemContainer} onPress={onPress}>
    <View style={styles.menuItem}>
      <View style={styles.menuIconContainer}>
        <View
          style={[
            styles.menuIcon,
            { backgroundColor: Colors.NAVY_BLUE, padding: 0 },
          ]}
        >
          <Image
            source={{ uri: `${URLs.IMAGES}/${icon}` }}
            style={{ width: 36, height: 36 }}
            alt={text}
          />
        </View>
      </View>
      <Text style={styles.menuItemText}>{text}</Text>
      <Text style={styles.chevron}>{chevronText}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItemContainer: {
    marginBottom: 2,
    width: "100%",
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: Colors.NAVY_BLUE,
    padding: 16,
    borderRadius: 6,
    alignItems: "center",
    width: "100%",
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: "700",
    flex: 1,
    fontFamily: "Montserrat, sans-serif",
  },
  menuIconContainer: {
    marginRight: 15,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  chevron: {
    color: Colors.WHITE,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MenuItem;