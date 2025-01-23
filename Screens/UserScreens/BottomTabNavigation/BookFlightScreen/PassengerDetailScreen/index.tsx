import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import theme from "../../../../../utils/theme";
import HeaderComp from "../../../../ReUseComponents/HeaderComp";
import { DatePickerModal } from "react-native-paper-dates";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import {
  currentPassengerIndex,
  passengerDetailsGlobal,
} from "../../../../../JotaiStore";

const { width } = Dimensions.get("window");

const PassengerDetailScreen = ({ navigation, route }: any) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(undefined);
  const { flight } = route.params;

  const [currentTravelerIndex, setCurrentTravelerIndex]: any = useAtom(
    currentPassengerIndex
  );
  const [passengerDetails, setPassengerDetails]: any = useAtom(
    passengerDetailsGlobal
  );

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params: any, setFieldValue: any) => {
      setOpen(false);
      setDate(params.date);
      setFieldValue("date", params.date);
    },
    [setOpen, setDate]
  );

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    date: undefined,
    gender: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    date: Yup.date().required("Date is required"), // Handle invalid date input
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["Male", "Female"], "Invalid Gender"),
  });

  const handleSubmit = (values: any) => {
    if (flight?.travelerPricings?.length > currentTravelerIndex) {
      setPassengerDetails((oldVal: any) => {
        return [
          ...oldVal,
          {
            passenger: `${
              flight?.travelerPricings?.[currentTravelerIndex]?.travelerType
            } ${currentTravelerIndex + 1}`,
            ...values,
          },
        ];
      });
      setCurrentTravelerIndex((oldVal: any) => oldVal + 2);
      navigation.push("PassengerDetail", { flight });
    } else {
      setCurrentTravelerIndex(0);
      navigation.navigate("BookNowScreen", { flight });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setCurrentTravelerIndex((oldVal: any) => oldVal - 1);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <HeaderComp navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Traveler Details</Text>
          <Text style={styles.subHeader}>
            {flight?.travelerPricings?.[currentTravelerIndex]?.travelerType}{" "}
            {currentTravelerIndex + 1}
          </Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            touched,
            errors,
            setFieldValue,
            values,
            handleChange,
            handleBlur,
          }: any) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
                <Field name="firstName">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      name="firstName"
                      placeholder="Enter First Name"
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                      autoCorrect={false}
                    />
                  )}
                </Field>
                {touched.firstName && errors.firstName && (
                  <Text style={styles.error}>{errors.firstName}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Middle Name</Text>
                <Field name="middleName">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      name="middleName"
                      placeholder="Enter Middle Name"
                      onChangeText={handleChange("middleName")}
                      onBlur={handleBlur("middleName")}
                      value={values.middleName}
                      autoCorrect={false}
                    />
                  )}
                </Field>
                {touched.middleName && errors.middleName && (
                  <Text style={styles.error}>{errors.middleName}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <Field name="lastName">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      name="lastName"
                      placeholder="Enter Last Name"
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                      autoCorrect={false}
                    />
                  )}
                </Field>
                {touched.lastName && errors.lastName && (
                  <Text style={styles.error}>{errors.lastName}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpen(true)}
                >
                  <Text>
                    {date ? dayjs(date).format("YYYY-MM-DD") : "Select Date"}
                  </Text>
                </TouchableOpacity>
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={(val) => onConfirmSingle(val, setFieldValue)}
                  validRange={{ endDate: new Date() }}
                />
                {touched.date && errors.date && (
                  <Text style={styles.error}>{errors.date}</Text>
                )}
              </View>

              <View style={styles.genderContainer}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => setFieldValue("gender", "Male")}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        values.gender === "Male" && styles.radioCircleSelected,
                      ]}
                    >
                      <View
                        style={[
                          styles.radioCircleChild,
                          values.gender === "Male" && {
                            backgroundColor: theme.colors.primary,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.radioLabel}>Male</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => setFieldValue("gender", "Female")}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        values.gender === "Female" &&
                          styles.radioCircleSelected,
                      ]}
                    >
                      <View
                        style={[
                          styles.radioCircleChild,
                          values.gender === "Female" && {
                            backgroundColor: theme.colors.primary,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.radioLabel}>Female</Text>
                  </TouchableOpacity>
                </View>
                {touched.gender && errors.gender && (
                  <Text style={styles.error}>{errors.gender}</Text>
                )}
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    padding: width * 0.04,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  headerTitle: {
    ...theme.font.fontBold,
    fontSize: width * 0.05,
    color: theme.colors.black,
  },
  subHeader: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  formContainer: {
    padding: width * 0.04,
  },
  inputContainer: {
    marginBottom: width * 0.04,
  },
  label: {
    ...theme.font.fontRegular,
    fontSize: width * 0.04,
    color: theme.colors.black,
    marginBottom: width * 0.01,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: width * 0.02,
    padding: width * 0.03,
    ...theme.font.fontRegular,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  error: {
    color: theme.colors.red,
    marginTop: width * 0.01,
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
  },
  genderContainer: {
    marginBottom: width * 0.04,
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.black,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  radioCircleSelected: {
    borderColor: theme.colors.black,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  radioCircleChild: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.white,
  },
  radioLabel: {
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
    color: theme.colors.black,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: "center",
    marginTop: width * 0.02,
  },
  buttonText: {
    color: theme.colors.white,
    ...theme.font.fontBold,
    fontSize: width * 0.045,
  },
});

export default PassengerDetailScreen;
