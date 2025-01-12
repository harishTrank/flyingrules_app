import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import theme from "../../../utils/theme";
import BackButtonComp from "../../ReUseComponents/BackButtonComp";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const ResetPasswordScreen: React.FC = ({ navigation }: any) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);

  const handleResetPasswordSubmit = (values: any) => {
    // Handle password reset submission logic here (e.g., API call)
    console.log("Reset Password values:", values);
    // Replace this with your actual password reset implementation
    alert(
      `New Password: ${values.newPassword}\nConfirm Password: ${values.confirmPassword}`
    );
  };

  return (
    <View
      style={[styles.container, { paddingTop: useSafeAreaInsets().top + 40 }]}
    >
      <StatusBar barStyle="dark-content" />
      <BackButtonComp navigation={navigation} />

      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Enter your new password twice below to reset a new password
      </Text>

      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleResetPasswordSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }: any) => (
          <View>
            <Text style={styles.label}>Enter new password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="152@@##PAss"
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
                secureTextEntry={secureTextEntry}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <Text
                  style={[
                    secureTextEntry && { textDecorationLine: "line-through" },
                  ]}
                >
                  👁️
                </Text>
              </TouchableOpacity>
            </View>
            {touched.newPassword && errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}

            <Text style={styles.label}>Re-enter new password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••••••"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={confirmSecureTextEntry}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() =>
                  setConfirmSecureTextEntry(!confirmSecureTextEntry)
                }
              >
                <Text
                  style={[
                    confirmSecureTextEntry && {
                      textDecorationLine: "line-through",
                    },
                  ]}
                >
                  👁️
                </Text>
              </TouchableOpacity>
            </View>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity style={styles.resetButton} onPress={handleSubmit}>
              <Text style={styles.resetButtonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => {
          // Handle create account logic (e.g., navigation)
          console.log("Create an account pressed");
        }}
      >
        <Text style={styles.createAccountButtonText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    marginBottom: 10,
    ...theme.font.fontSemiBold,
    fontSize: 30,
    color: theme.colors.black,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    ...theme.font.fontMedium,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 15,
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 17,
    ...theme.font.fontMedium,
  },
  createAccountButton: {
    padding: 15,
    alignItems: "center",
  },
  createAccountButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    ...theme.font.fontMedium,
  },
});

export default ResetPasswordScreen;
