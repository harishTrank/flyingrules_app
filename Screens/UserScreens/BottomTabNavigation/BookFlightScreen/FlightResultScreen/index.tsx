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
import dayjs from "dayjs";
import { useFlightOffersApi } from "../../../../../hooks/Travel/mutation";
import { useAtom } from "jotai";
import {
  currentPassengerIndex,
  globalDictionaries,
  selectedOptionsGlobal,
  sortFilter,
  travellersGlobal,
} from "../../../../../JotaiStore";
import {
  convertToNumber,
  formatTravellerData,
  getAirports,
  getCodesFromAirlines,
  replaceNamesWithCodes,
  shuffle,
} from "../../../../../utils/UserUtils";
import { calculateTotalDuration, categorizeFlights } from "./FlightUtils";
const { width, height } = Dimensions.get("window");

const FlightResultScreen = ({ navigation, route }: any) => {
  const [apiResponse, setApiResponse] = useState([]);
  const [flights, setFlights] = useState([]);
  const [dictionaries, setdictionaries]: any = useAtom(globalDictionaries);
  const [, setTravellersGlobal]: any = useAtom(travellersGlobal);
  const { params }: any = route;
  const [loading, setLoading]: any = useState(true);
  const [selectedOptions, setSelectedOptions] = useAtom(selectedOptionsGlobal);
  const [currentSort]: any = useAtom(sortFilter);
  const [, setCurrentTravelerIndex]: any = useAtom(currentPassengerIndex);

  const flightListResultApiCaller: any = useFlightOffersApi();

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setCurrentTravelerIndex(0);
    });
  }, [navigation]);

  const flightOfferApiHandler = async () => {
    setSelectedOptions({});
    setCurrentTravelerIndex(0);
    const travelData = formatTravellerData(params?.travellers);
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
    flightListResultApiCaller
      ?.mutateAsync({
        body,
      })
      .then((res: any) => {
        setFlights(res?.data?.data);
        setApiResponse(res?.data?.data);
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

  const filterSearchManager = () => {
    if (selectedOptions?.Stops) {
      setFlights((oldValue: any) =>
        oldValue.filter((obj: any) =>
          selectedOptions?.Stops?.map((item: any) =>
            Number(item === "NON-STOP" ? 0 : item?.split(" ")?.[0])
          ).includes(obj?.itineraries?.[0]?.segments?.length - 1)
        )
      );
    }
    if (selectedOptions?.Airlines) {
      const filterList = getCodesFromAirlines(
        dictionaries?.carriers,
        selectedOptions?.Airlines
      );
      setFlights((oldValue: any) =>
        oldValue.filter((item: any) =>
          filterList.includes(item?.validatingAirlineCodes?.[0])
        )
      );
    }
    if (selectedOptions?.Airport) {
      const currentAirport = getAirports(dictionaries?.locations);
      const filterList = replaceNamesWithCodes(
        currentAirport,
        selectedOptions?.Airport
      );
      setFlights((oldValue: any) => {
        return oldValue.filter((flight: any) => {
          return flight.itineraries.some((itinerary: any) => {
            return itinerary.segments.some((segment: any) => {
              return (
                filterList.includes(segment.departure?.iataCode) ||
                filterList.includes(segment.arrival?.iataCode)
              );
            });
          });
        });
      });
    }
    if (selectedOptions?.Aircraft) {
      const filterList = getCodesFromAirlines(
        dictionaries?.aircraft,
        selectedOptions?.Aircraft
      );
      setFlights((oldValue: any) => {
        return oldValue.filter((flight: any) => {
          return flight.itineraries.some((itinerary: any) => {
            return itinerary.segments.some((segment: any) => {
              return filterList.includes(segment.aircraft?.code);
            });
          });
        });
      });
    }
  };

  useEffect(() => {
    if (Object.keys(selectedOptions).length !== 0) {
      filterSearchManager();
    }
  }, [selectedOptions]);

  const sortScreenDataHandler = () => {
    setFlights((oldVal) => {
      const newVal = [...oldVal];

      if (currentSort === "Relevance") {
        return shuffle(newVal);
      } else if (currentSort === "Price : High to Low") {
        newVal.sort((a: any, b: any) => {
          const priceA = convertToNumber(a.price?.total);
          const priceB = convertToNumber(b.price?.total);

          if (isNaN(priceA) && isNaN(priceB)) return 0;
          if (isNaN(priceA)) return 1;
          if (isNaN(priceB)) return -1;

          return priceB - priceA;
        });
      } else if (currentSort === "Price : Low to High") {
        newVal.sort((a: any, b: any) => {
          const priceA = convertToNumber(a.price?.total);
          const priceB = convertToNumber(b.price?.total);

          if (isNaN(priceA) && isNaN(priceB)) return 0;
          if (isNaN(priceA)) return 1;
          if (isNaN(priceB)) return -1;

          return priceA - priceB;
        });
      }
      return newVal;
    });
  };

  useEffect(() => {
    sortScreenDataHandler();
  }, [currentSort]);

  const handleBookNow = (flight: any) => {
    navigation.navigate("PassengerDetail", { flight });
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
  const [flightCategories, setFlightCategories]: any = useState([]);

  useEffect(() => {
    const flightCategories = categorizeFlights(flights);
    setFlightCategories(flightCategories);
  }, [flights]);

  const filterArrayAccordingToCategories = () => {
    if (apiResponse.length === 0) return;
    let filteredFlights = [...apiResponse];
    if (currentFlight === "Cheapest") {
      filteredFlights.sort(
        (a: any, b: any) =>
          parseFloat(a.price.total) - parseFloat(b.price.total)
      );
    } else if (currentFlight === "Best") {
      filteredFlights.sort(
        (a: any, b: any) =>
          parseFloat(b.price.total) - parseFloat(a.price.total)
      );
    } else if (currentFlight === "Quickest") {
      filteredFlights.sort(
        (a: any, b: any) =>
          calculateTotalDuration(a.itineraries) -
          calculateTotalDuration(b.itineraries)
      );
    }

    setFlights(filteredFlights);
  };
  useEffect(() => {
    filterArrayAccordingToCategories();
  }, [currentFlight]);

  const handleClearAll = () => {
    setSelectedOptions({});
    setFlights(apiResponse);
  };

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
                {Object.keys(selectedOptions).length !== 0 && (
                  <TouchableOpacity
                    style={styles.borderBtn}
                    onPress={handleClearAll}
                  >
                    <Text style={styles.clearAllText}>Clear Filter</Text>
                  </TouchableOpacity>
                )}
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
    paddingRight: width * 0.02,
    objectFit: "contain",
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
  borderBtn: {
    padding: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  clearAllText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.032,
    color: theme.colors.white,
  },
});

export default FlightResultScreen;
