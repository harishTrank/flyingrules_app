import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import HeaderComp from "../../../ReUseComponents/HeaderComp";
import theme from "../../../../utils/theme";
import ToggleButton from "./Components/ToggleButton";
import BookFlightForm from "./Components/BookFlightForm";
import { Modalize } from "react-native-modalize";
import ImageModule from "../../../../ImageModule";
const { height, width } = Dimensions.get("window");

const classData: any = [
  {
    name: "Economy",
    image: ImageModule.economy,
  },
  {
    name: "Premium Economy",
    image: ImageModule.peconomy,
  },
  {
    name: "Business",
    image: ImageModule.business,
  },
  {
    name: "First",
    image: ImageModule.first,
  },
];

const BookFlightScreen = ({ navigation }: any) => {
  const modalizeRefTravel = useRef<Modalize>(null);
  const modalizeRefClass = useRef<Modalize>(null);
  const [tripType, setTripType]: any = useState("Round Trip");
  const [classType, setClassType]: any = useState("Economy");

  return (
    <View style={styles.screenRap}>
      <HeaderComp navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
      >
        <ToggleButton tripType={tripType} setTripType={setTripType} />
        <BookFlightForm
          tripType={tripType}
          modalizeRefTravel={modalizeRefTravel}
          modalizeRefClass={modalizeRefClass}
          classType={classType}
        />
      </ScrollView>
      <Modalize ref={modalizeRefTravel} modalHeight={height * 0.3}>
        <Text>123456</Text>
      </Modalize>
      <Modalize ref={modalizeRefClass} modalHeight={height * 0.45}>
        <View style={styles.classView}>
          {classData.map((item: any) => (
            <TouchableOpacity
              style={[
                styles.classItem,
                item.name === classType && {
                  borderColor: "green",
                },
              ]}
              key={item.name}
              onPress={() => setClassType(item.name)}
            >
              <Image style={styles.classImage} source={item.image} />
            </TouchableOpacity>
          ))}
        </View>
      </Modalize>
    </View>
  );
};

export default BookFlightScreen;

const styles = StyleSheet.create({
  screenRap: {
    flex: 1,
    backgroundColor: theme.colors.primaryLight,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // class style
  classView: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  classItem: {
    marginBottom: 7,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "transparent",
  },
  classImage: {
    height: width * 0.43,
    width: width * 0.43,
    borderColor: "red",
  },
});
