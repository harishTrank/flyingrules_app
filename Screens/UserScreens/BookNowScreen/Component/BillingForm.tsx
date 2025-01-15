import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import theme from "../../../../utils/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
// import ImageModule from "../../../../ImageModule";

const { width } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  zipCode: Yup.string()
    .required("Zip Code is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  card_number: Yup.string().required("Card number is required"),
  name_on_card: Yup.string().required("Name on card is required"),
  expiry_date: Yup.string().required("Expiry date is required"),
  cvc: Yup.string().required("CVC is required"),
  agree_terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions.")
    .required("Required"),
});

const BillingForm = () => {
  const initialValues = {
    address: "",
    country: "",
    zipCode: "",
    city: "",
    state: "",
    payment_method: "credit_card", // Initial value for radio buttons
    card_number: "",
    name_on_card: "",
    expiry_date: "",
    cvc: "",
    agree_terms: false, // Initial value for checkbox
  };

  const handleSubmit = (values: any) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
      }: any) => (
        <View style={styles.container}>
          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Billing Information</Text>
            </View>

            <View style={styles.content}>
              {/* Address */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Address</Text>
                <Field name="address">
                  {({ field, meta }: any) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Enter Address"
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                    />
                  )}
                </Field>
                {touched.address && errors.address && (
                  <Text style={styles.error}>{errors.address}</Text>
                )}
              </View>

              {/* Country */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Country</Text>
                <View style={styles.input}>
                  <RNPickerSelect
                    onValueChange={(value) => setFieldValue("country", value)}
                    items={[
                      { label: "United States", value: "USA" },
                      { label: "Canada", value: "Canada" },
                      { label: "Mexico", value: "Mexico" },
                    ]}
                    placeholder={{ label: "Select Country", value: null }}
                    value={values.country}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputAndroid: {
                        color: "black",
                        fontSize: width * 0.035,
                        padding: 0,
                        margin: 0,
                        ...theme.font.fontRegular,
                      },
                      inputIOS: {
                        color: "black",
                        fontSize: width * 0.035,
                        padding: 0,
                        margin: 0,
                        ...theme.font.fontRegular,
                      },
                    }}
                  />
                </View>
                {touched.country && errors.country && (
                  <Text style={styles.error}>{errors.country}</Text>
                )}
              </View>

              {/* Zip Code */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Zip Code</Text>
                <Field name="zipCode">
                  {({ field, meta }: any) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Enter Zip Code"
                      keyboardType="number-pad"
                      onChangeText={handleChange("zipCode")}
                      onBlur={handleBlur("zipCode")}
                      value={values.zipCode}
                    />
                  )}
                </Field>
                {touched.zipCode && errors.zipCode && (
                  <Text style={styles.error}>{errors.zipCode}</Text>
                )}
              </View>

              {/* City */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>City</Text>
                <Field name="city">
                  {({ field, meta }: any) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Enter City"
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                      value={values.city}
                    />
                  )}
                </Field>
                {touched.city && errors.city && (
                  <Text style={styles.error}>{errors.city}</Text>
                )}
              </View>

              {/* State */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>State</Text>
                <View style={styles.input}>
                  <RNPickerSelect
                    onValueChange={(value) => setFieldValue("state", value)}
                    items={[
                      { label: "California", value: "CA" },
                      { label: "New York", value: "NY" },
                      { label: "Texas", value: "TX" },
                    ]}
                    placeholder={{ label: "Select State", value: null }}
                    value={values.state}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputAndroid: {
                        color: "black",
                        fontSize: width * 0.035,
                        padding: 0,
                        margin: 0,
                        ...theme.font.fontRegular,
                      },
                      inputIOS: {
                        color: "black",
                        fontSize: width * 0.035,
                        padding: 0,
                        margin: 0,
                        ...theme.font.fontRegular,
                      },
                    }}
                  />
                </View>
                {touched.state && errors.state && (
                  <Text style={styles.error}>{errors.state}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Payment Details Section */}
          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Payment Details</Text>
            </View>

            <View style={styles.content}>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setFieldValue("payment_method", "credit_card")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      values.payment_method === "credit_card" &&
                        styles.radioCircleSelected,
                    ]}
                  >
                    <View
                      style={[
                        styles.radioCircleChild,
                        values.payment_method === "credit_card" && {
                          backgroundColor: theme.colors.primary,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.radioLabel}>Credit Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setFieldValue("payment_method", "debit_card")}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      values.payment_method === "debit_card" &&
                        styles.radioCircleSelected,
                    ]}
                  >
                    <View
                      style={[
                        styles.radioCircleChild,
                        values.payment_method === "debit_card" && {
                          backgroundColor: theme.colors.primary,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.radioLabel}>Debit Card</Text>
                </TouchableOpacity>
              </View>

              {/* Card Number */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Card Number</Text>
                <Field name="card_number">
                  {({ field, meta }: any) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Enter Card Number"
                      keyboardType="number-pad"
                      onChangeText={handleChange("card_number")}
                      onBlur={handleBlur("card_number")}
                      value={values.card_number}
                    />
                  )}
                </Field>
                {touched.card_number && errors.card_number && (
                  <Text style={styles.error}>{errors.card_number}</Text>
                )}
              </View>

              {/* Name on Card */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Name on Card</Text>
                <Field name="name_on_card">
                  {({ field, meta }: any) => (
                    <TextInput
                      {...field}
                      style={styles.input}
                      placeholder="Enter Name on Card"
                      onChangeText={handleChange("name_on_card")}
                      onBlur={handleBlur("name_on_card")}
                      value={values.name_on_card}
                    />
                  )}
                </Field>
                {touched.name_on_card && errors.name_on_card && (
                  <Text style={styles.error}>{errors.name_on_card}</Text>
                )}
              </View>

              {/* Expiry Date and CVC (Side by Side) */}
              <View style={styles.horizontalFormGroup}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>Expiry Date</Text>
                  <Field name="expiry_date">
                    {({ field, meta }: any) => (
                      <TextInput
                        {...field}
                        style={styles.input}
                        placeholder="MM/YY"
                        onChangeText={handleChange("expiry_date")}
                        onBlur={handleBlur("expiry_date")}
                        value={values.expiry_date}
                      />
                    )}
                  </Field>
                  {touched.expiry_date && errors.expiry_date && (
                    <Text style={styles.error}>{errors.expiry_date}</Text>
                  )}
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.label}>CVC</Text>
                  <Field name="cvc">
                    {({ field, meta }: any) => (
                      <TextInput
                        {...field}
                        style={styles.input}
                        placeholder="Enter CVC"
                        keyboardType="number-pad"
                        onChangeText={handleChange("cvc")}
                        onBlur={handleBlur("cvc")}
                        value={values.cvc}
                      />
                    )}
                  </Field>
                  {touched.cvc && errors.cvc && (
                    <Text style={styles.error}>{errors.cvc}</Text>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* Checkbox for Terms and Conditions */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => setFieldValue("agree_terms", !values.agree_terms)}
            >
              <View style={styles.checkbox}>
                {values.agree_terms && (
                  <Image
                    // source={ImageModule.checkIcon}
                    style={styles.checkboxChecked}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>
              By clicking "Confirm Booking", I agree that I have read the
              following Policies of flyingrules.com.
            </Text>
          </View>
          {errors.agree_terms && (
            <Text style={styles.error}>{errors.agree_terms}</Text>
          )}

          {/* Note Section */}
          <View style={styles.noteSection}>
            <Text style={styles.noteHeader}>Note</Text>
            <Text style={styles.noteText}>
              Please check if the dates and timings of flight departure are
              correct. Also, make sure that the name of the traveler is accurate
              as tickets are non-refundable and any change in the name of the
              traveler is not permitted. Date and routing changes will be
              subject to airline penalties and our service fees. Fares are not
              guaranteed until ticketed. All our service fees and taxes are
              included in the total ticket cost. Itineraries cannot be changed
              within 7 days before departure, and no credit will be issued. You
              can cancel your reservation within 24 hrs of purchase for a full
              refund by calling our 24/7 customer support provided the purchase
              was made before 7 days of departure. However, a nominal
              cancellation fee will be applicable.
            </Text>
          </View>

          {/* Book Now Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  section: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 5,
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.white,
  },
  content: {
    padding: 10,
  },
  formGroup: {
    marginBottom: 10,
  },
  horizontalFormGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    ...theme.font.fontMedium,
    fontSize: width * 0.035,
    color: theme.colors.black,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 5,
    padding: 10,
    fontSize: width * 0.035,
    ...theme.font.fontRegular,
    color: theme.colors.black,
  },
  error: {
    color: theme.colors.red,
    fontSize: width * 0.03,
    ...theme.font.fontRegular,
    marginTop: 5,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    width: 20,
    height: 20,
  },
  checkboxLabel: {
    ...theme.font.fontMedium,
    fontSize: width * 0.03,
    color: theme.colors.black,
    flex: 1,
  },
  noteSection: {
    marginBottom: 20,
    marginHorizontal: 10,
    marginTop: 5,
  },
  noteHeader: {
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
    color: theme.colors.white,
    marginBottom: 5,
    backgroundColor: theme.colors.primary,
    padding: 5,
  },
  noteText: {
    ...theme.font.fontMedium,
    fontSize: width * 0.03,
    color: theme.colors.black,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    ...theme.font.fontSemiBold,
    fontSize: width * 0.04,
  },
});

export default BillingForm;
