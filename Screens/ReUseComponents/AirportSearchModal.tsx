import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ImageModule from "../../ImageModule";
import theme from "../../utils/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { AmadeusURL } from "../../utils/api/amadeus";

const { width, height } = Dimensions.get("window");

const AirportSearchModal = ({
  isVisible,
  onClose,
  onAirportSelect,
  selectedAirport,
}: any) => {
  const [searchText, setSearchText] = useState("");
  const [apiResponse, setApiResponse]: any = useState([]);

  const listApiHandler = async () => {
    try {
      const response = await axios.post(`${AmadeusURL}/flight/search-airport`, {
        searchTerm: searchText,
      });
      setApiResponse(response?.data?.data);
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      listApiHandler();
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    if (isVisible) {
      setSearchText("");
    }
  }, [isVisible]);

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.airportItem,
          item?.iataCode === selectedAirport?.iataCode &&
            styles.selectedAirportItem,
        ]}
        key={item.id}
        onPress={() => {
          onAirportSelect(item);
          onClose();
        }}
      >
        <View style={styles.cityContainer}>
          <View style={styles.cityTextBox}>
            <Text style={styles.airportText}>{item?.address?.cityName}</Text>
          </View>
          <Text style={styles.airportCode}>{item?.iataCode}</Text>
        </View>

        <View style={styles.airportNameContainer}>
          <Image style={styles.airportIconImg} source={ImageModule.plane} />
          <Text style={styles.airportName}>{item?.address?.countryName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.modalContainer,
            { paddingTop: useSafeAreaInsets().top },
          ]}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.modalTitle}>Select Airport</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          >
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by city"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus={true}
                autoCorrect={false}
              />
              {searchText && (
                <Text style={styles.matchingText}>
                  Matching with {searchText}
                </Text>
              )}
            </View>
            <FlatList
              data={apiResponse}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
              contentContainerStyle={styles.flatListContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AirportSearchModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    padding: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.basicGrey,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: {
    ...theme.font.fontBold,
    fontSize: width * 0.045,
    color: theme.colors.black,
  },
  closeButton: {
    padding: width * 0.02,
  },
  closeButtonText: {
    fontSize: width * 0.06,
    color: theme.colors.black,
  },
  searchContainer: {
    padding: width * 0.04,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: theme.colors.grey,
    borderRadius: 10,
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.04,
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  matchingText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
    color: theme.colors.basicGrey,
    marginTop: width * 0.02,
  },
  airportItem: {
    padding: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.basicGrey,
  },
  selectedAirportItem: {
    backgroundColor: theme.colors.primaryLight,
  },
  airportText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  airportCode: {
    ...theme.font.fontBold,
    fontSize: width * 0.045,
    color: theme.colors.primary,
  },
  airportName: {
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
    color: theme.colors.basicGrey,
    marginTop: width * 0.01,
  },
  flatListContent: {
    paddingBottom: height * 0.1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  airportNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  airportIconImg: {
    height: width * 0.05,
    width: width * 0.05,
    objectFit: "contain",
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cityTextBox: {
    flexDirection: "row",
    alignItems: "center",
  },
});
