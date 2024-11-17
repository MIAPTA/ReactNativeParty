import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const Nosotros = () => {
  return (
    <ScrollView>
      {/* Sección del título */}
      <View style={styles.sectionTitle}>
        <Text style={styles.title}>Nosotros</Text>
      </View>

      {/* Sección ¿Quiénes somos? */}
      <View style={styles.promoSection}>
        <View style={styles.textSection}>
          <Text style={styles.subtitle}>¿Quiénes somos?</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
        <Image
          style={styles.image}
          source={require("../assets/Party.jpg")} // Cambia la ruta según tu estructura
        />
      </View>

      {/* Sección Misión y Visión */}
      <View style={styles.missionVisionContainer}>
        <View style={styles.missionVisionSection}>
          <Text style={styles.subtitle}>Misión</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <View style={styles.missionVisionSection}>
          <Text style={styles.subtitle}>Visión</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </View>

      {/* Sección Historia */}
      <View style={styles.promoSection}>
        <Image
          style={styles.image}
          source={require("../assets/Party.jpg")} // Cambia la ruta según tu estructura
        />
        <View style={styles.textSection}>
          <Text style={styles.subtitle}>Historia</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            vulputate enim ac dolor pulvinar, vitae interdum enim laoreet. Nam
            sagittis suscipit massa cursus rhoncus. Nulla id vehicula neque.
            Vestibulum leo nulla, sagittis in lacinia sed, faucibus ut mauris.
            Fusce porta, sapien non fringilla rutrum, velit massa feugiat orci,
            eu feugiat lacus arcu id nunc. Nulla mattis venenatis nibh, quis
            pharetra purus varius pulvinar.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "right",
  },
  promoSection: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 20,
    alignItems: "center",
  },
  textSection: {
    flex: 1,
    padding: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  paragraph: {
    fontSize: 14,
    color: "white",
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: 10,
  },
  missionVisionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  missionVisionSection: {
    flex: 1,
    padding: 10,
  },
});

export default Nosotros;
