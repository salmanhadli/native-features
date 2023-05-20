import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

export default ({ place, onSelect }) => {
  return (
    <Pressable
      styles={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect}
    >
      <Image styles={styles.image} source={{ uri: place.imageUri }} />
      <View styles={styles.info}>
        <Text styles={styles.title}>{place.title}</Text>
        <Text styles={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
