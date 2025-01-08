import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ImageModule from "../../../../../ImageModule";
import theme from "../../../../../utils/theme";
import { DatePickerModal } from "react-native-paper-dates";
import dayjs from "dayjs";

const DateInputComp = ({ tripType }: any) => {
  const [date, setDate]: any = useState({
    depart: undefined,
    arrival: undefined,
  });
  const [openSingle, setOpenSingle] = useState(false);
  const [openMultiple, setOpenMultiple] = useState(false);

  useEffect(() => {
    console.log("date", date);
  }, [date]);

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
      <TouchableOpacity
        onPress={() =>
          tripType === "Round Trip"
            ? setOpenMultiple(true)
            : setOpenSingle(true)
        }
        style={[
          styles.inputWidth,
          { width: tripType === "Round Trip" ? "48%" : "100%" },
        ]}
      >
        <Text style={styles.label}>Departure</Text>
        <View style={styles.departBox}>
          <View style={styles.innerBox}>
            <Image style={styles.imageIcon} source={ImageModule.calendatIcon} />
            <Text style={styles.textDate}>
              {dayjs(date?.depart).format("MMM DD,YYYY")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {tripType === "Round Trip" ? (
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

      {tripType === "Round Trip" && (
        <View style={styles.inputWidth}>
          <Text style={[styles.label, { width: 50 }]}>Return</Text>
          <View style={styles.returnBox}>
            <Text style={styles.textDate}>
              {date?.arrival
                ? dayjs(date?.arrival).format("MMM DD,YYYY")
                : "+ Return Date"}
            </Text>
          </View>
        </View>
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  label: {
    ...theme.font.fontMedium,
    backgroundColor: theme.colors.white,
    position: "relative",
    top: 10,
    zIndex: 2,
    width: 70,
    textAlign: "center",
    left: 10,
    fontSize: 12,
    color: "#787878",
  },
  innerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageIcon: {
    height: 20,
    width: 20,
    objectFit: "contain",
  },
  textDate: {
    ...theme.font.fontSemiBold,
    color: theme.colors.black,
    paddingLeft: 5,
  },
  returnBox: {
    borderWidth: 2,
    borderColor: theme.colors.grey,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
