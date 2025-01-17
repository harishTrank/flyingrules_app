import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import FlightCard from "../../../../ReUseComponents/FlightCard";
import theme from "../../../../../utils/theme";
import HeaderComp from "../../../../ReUseComponents/HeaderComp";
import ImageModule from "../../../../../ImageModule";
import Entypo from "@expo/vector-icons/Entypo";
import FlightSearchLoader from "./Component/FlightSearchLoader";
import axios from "axios";
import dayjs from "dayjs";
import { useFlightOffersApi } from "../../../../../hooks/Travel/mutation";
import { useAtom } from "jotai";
import {
  globalDictionaries,
  travellersGlobal,
} from "../../../../../JotaiStore";
import { getAirports } from "../../../../../utils/UserUtils";
import { AmadeusURL } from "../../../../../utils/api/amadeus";
const { width, height } = Dimensions.get("window");

const FlightResultScreen = ({ navigation, route }: any) => {
  const [flights, setFlights] = useState([]);
  const [dictionaries, setdictionaries]: any = useAtom(globalDictionaries);
  const [, setTravellersGlobal]: any = useAtom(travellersGlobal);
  const { params }: any = route;
  const [loading, setLoading]: any = useState(true);

  const flightListResultApiCaller: any = useFlightOffersApi();

  const flightOfferApiHandler = async () => {
    const travelData = [
      ...Array(Number(params?.travellers?.adult))
        .fill(null)
        .map((_, index) => ({
          id: (index + 1).toString(),
          travelerType: "ADULT",
        })),
      ...Array(Number(params?.travellers?.child))
        .fill(null)
        .map((_, index) => ({
          id: (index + 1 + Number(params?.travellers?.adult)).toString(),
          travelerType: "CHILD",
        })),
    ];
    setTravellersGlobal(travelData);
    const body: any = {
      ...params,
      arrival: params?.arrival
        ? dayjs(params?.arrival).format("YYYY-MM-DD")
        : "null",
      departure: dayjs(params?.departure).format("YYYY-MM-DD"),
      travellers: travelData,
      filters: {
        carrierFilter: null,
        stopsFilter: null,
        maxFlightTime: 100,
      },
      currencyCode: "USD",
      currency: "USD",
    };
    console.log("body1", body);
    // axios
    //   .post(`${AmadeusURL}/flight/flight-offer`, body)
    //   .then((res: any) => {
    //     setFlights(res?.data?.data?.data);
    //     setLoading(false);
    //     setdictionaries({
    //       ...res?.data?.data?.dictionaries,
    //       airportNames: getAirports(res?.data?.data?.dictionaries?.locations),
    //     });
    //   })
    //   ?.catch((err: any) => console.log("err", err));

    flightListResultApiCaller
      ?.mutateAsync({
        body,
      })
      .then((res: any) => {
        setFlights(res?.data?.data);
        setLoading(false);
        setdictionaries({
          ...res?.data?.dictionaries,
          airportNames: getAirports(res?.data?.dictionaries?.locations),
        });
      })
      .catch((err: any) => console.log("err", err));
  };

  useEffect(() => {
    flightOfferApiHandler();
  }, [params]);

  const handleBookNow = (flight: any) => {
    navigation.navigate("BookNowScreen", { trip: flight });
  };

  const renderItem = ({ item }: { item: any }) => (
    <FlightCard
      navigation={navigation}
      flight={item}
      dictionaries={dictionaries}
      onPress={() => handleBookNow(item)}
    />
  );

  // flight categories search
  const [currentFlight, setCurrentFlight]: any = useState("Cheapest");
  const flightCategories: any = [
    {
      name: "Cheapest",
      price: "$113.20 ⦿ 28H 45M",
    },
    {
      name: "Best",
      price: "$153.20 ⦿ 25H 45M",
    },
    {
      name: "Quickest",
      price: "$113.20 ⦿ 28H 45M",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <HeaderComp navigation={navigation} />

      {flightListResultApiCaller?.isLoading || loading ? (
        <FlightSearchLoader searchForm={route?.params} />
      ) : (
        <>
          {flights.length > 0 && (
            <View style={styles.filterSortContainer}>
              <View style={styles.filterSortRow}>
                {flightCategories.map((item: any) => (
                  <TouchableOpacity
                    style={[
                      styles.optionContainer,
                      currentFlight === item.name && {
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                    key={item.name}
                    onPress={() => setCurrentFlight(item.name)}
                  >
                    <Text
                      style={[
                        styles.optionLabel,
                        currentFlight === item.name && {
                          color: theme.colors.white,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.optionValue,
                        currentFlight === item.name && {
                          color: theme.colors.white,
                        },
                      ]}
                    >
                      {item.price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={[styles.filterSortRow, { borderWidth: 0 }]}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("FilterScreen")}
                >
                  <Image
                    source={ImageModule.filterIcon}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Filter</Text>
                  <Entypo
                    name="chevron-down"
                    size={20}
                    color={theme.colors.black}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("SortScreen")}
                >
                  <Image
                    source={ImageModule.sortIcon}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Sort</Text>
                  <Entypo
                    name="chevron-down"
                    size={20}
                    color={theme.colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <FlatList
            data={flights}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContentContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No Flights Found!</Text>
              </View>
            }
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.02,
  },
  filterSortContainer: {
    backgroundColor: theme.colors.white,
    paddingTop: height * 0.02,
  },
  filterSortRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.01,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: theme.colors.basicGrey,
    borderRadius: 5,
  },
  optionContainer: {
    alignItems: "center",
    borderRightWidth: 1,
    justifyContent: "center",
    borderRightColor: theme.colors.basicGrey,
    flexGrow: 1,
  },
  optionLabel: {
    ...theme.font.fontMedium,
    fontSize: width * 0.035,
    color: theme.colors.black,
  },
  optionValue: {
    ...theme.font.fontMedium,
    fontSize: width * 0.027,
    color: theme.colors.black,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: theme.colors.basicGrey,
    width: "40%",
    justifyContent: "space-around",
  },
  buttonIcon: {
    width: width * 0.05,
    height: width * 0.05,
    marginRight: width * 0.02,
  },
  buttonText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
  },
  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.7,
  },
  emptyText: {
    ...theme.font.fontMedium,
    color: theme.colors.primary,
    fontSize: width * 0.05,
  },
});

export default FlightResultScreen;
