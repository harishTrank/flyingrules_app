import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ImageModule from "../../../../../ImageModule";
import theme from "../../../../../utils/theme";
import { DatePickerModal } from "react-native-paper-dates";
import dayjs from "dayjs";

const { width } = Dimensions.get("window");

const DateInputComp = ({ tripType, date, setDate }: any) => {
  const [openSingle, setOpenSingle] = useState(false);
  const [openMultiple, setOpenMultiple] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpenSingle(false);
  }, [setOpenSingle]);

  const onDismissMultiple = useCallback(() => {
    setOpenMultiple(false);
  }, [setOpenMultiple]);

  const onConfirmSingle = useCallback(
    (params: any) => {
      setOpenSingle(false);
      setDate({
        depart: params.date,
        arrival: undefined,
      });
    },
    [setOpenSingle, setDate]
  );

  const onConfirmMultiple = useCallback(
    ({ startDate, endDate }: any) => {
      setOpenMultiple(false);
      setDate({ depart: startDate, arrival: endDate });
    },
    [setOpenMultiple, setDate]
  );

  return (
    <View style={styles.mainBox}>
      {tripType === "round-trip" ? (
        <DatePickerModal
          locale="en"
          mode="range"
          visible={openMultiple}
          onDismiss={onDismissMultiple}
          startDate={date.depart}
          endDate={date.arrival}
          onConfirm={onConfirmMultiple}
          validRange={{ startDate: new Date() }}
        />
      ) : (
        <DatePickerModal
          locale="en"
          mode="single"
          visible={openSingle}
          onDismiss={onDismissSingle}
          date={date.depart}
          onConfirm={onConfirmSingle}
          validRange={{ startDate: new Date() }}
        />
      )}
      <TouchableOpacity
        onPress={() =>
          tripType === "round-trip"
            ? setOpenMultiple(true)
            : setOpenSingle(true)
        }
        style={[
          styles.inputWidth,
          { width: tripType === "round-trip" ? "48%" : "100%" },
        ]}
      >
        <Text
          style={[
            styles.label,
            { width: tripType === "round-trip" ? width * 0.17 : width * 0.2 },
          ]}
        >
          Departure
        </Text>
        <View style={styles.departBox}>
          <View style={styles.innerBox}>
            <Image style={styles.imageIcon} source={ImageModule.calendatIcon} />
            <Text style={styles.textDate}>
              {date?.depart
                ? dayjs(date?.depart).format("MMM DD,YYYY")
                : "Select Date"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {tripType === "round-trip" && (
        <TouchableOpacity
          style={[styles.inputWidth, { marginLeft: width * 0.02 }]}
          onPress={() => setOpenMultiple(true)}
        >
          <Text style={[styles.label, { width: width * 0.12 }]}>Return</Text>
          <View style={styles.returnBox}>
            <Text style={styles.textDate}>
              {date?.arrival
                ? dayjs(date?.arrival).format("MMM DD,YYYY")
                : "+ Return Date"}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DateInputComp;

const styles = StyleSheet.create({
  mainBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputWidth: {
    width: "48%",
  },
  departBox: {
    borderWidth: 2,
    borderColor: theme.colors.grey,
    borderRadius: 10,
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.04,
    flexDirection: "row",
  },
  label: {
    ...theme.font.fontMedium,
    backgroundColor: theme.colors.white,
    position: "relative",
    top: width * 0.03,
    zIndex: 2,
    textAlign: "center",
    left: width * 0.025,
    fontSize: width * 0.03,
    color: "#787878",
  },
  innerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageIcon: {
    height: width * 0.05,
    width: width * 0.05,
    objectFit: "contain",
  },
  textDate: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    paddingLeft: width * 0.02,
    fontSize: width * 0.035,
  },
  returnBox: {
    borderWidth: 2,
    borderColor: theme.colors.grey,
    borderRadius: 10,
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.04,
  },
});
