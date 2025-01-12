import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
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
import TravellerQuantity from "../../../ReUseComponents/TravellerQuantity";
import PopularDestination from "../../../ReUseComponents/PopularDestination";

const { height, width } = Dimensions.get("window");

const classData: any = [
  {
    name: "Economy",
    image: ImageModule.economy,
  },
  {
    name: "P.Economy",
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
  const [travellers, setTravellers]: any = useState({
    adult: 1,
    child: 0,
  });

  return (
    <View style={styles.screenRap}>
      <HeaderComp navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.mainContainer]}
      >
        <ToggleButton tripType={tripType} setTripType={setTripType} />
        <BookFlightForm
          tripType={tripType}
          modalizeRefTravel={modalizeRefTravel}
          modalizeRefClass={modalizeRefClass}
          classType={classType}
          travellers={travellers}
        />
        <PopularDestination/>
      </ScrollView>
      <Modalize
        ref={modalizeRefTravel}
        modalHeight={height * 0.25}
        handleStyle={styles.modalHandle}
        handlePosition="inside"
        modalStyle={styles.modalStyle}
      >
        <TravellerQuantity
          travellers={travellers}
          setTravellers={setTravellers}
        />
      </Modalize>

      <Modalize
        ref={modalizeRefClass}
        modalHeight={height * 0.5}
        handleStyle={styles.modalHandle}
        handlePosition="inside"
        modalStyle={styles.modalStyle}
      >
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
    paddingHorizontal: width * 0.04,
  },

  // class style
  classView: {
    padding: width * 0.04,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  classItem: {
    marginBottom: width * 0.02,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "transparent",
  },
  classImage: {
    height: width * 0.4,
    width: width * 0.4,
    resizeMode: "contain",
  },

  // Modal styles
  modalHandle: {
    backgroundColor: theme.colors.grey,
    width: width * 0.15,
    height: width * 0.015,
    top: width * 0.03
  },
  modalStyle: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  }
});