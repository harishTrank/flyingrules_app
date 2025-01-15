import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../../utils/theme";
import ImageModule from "../../../ImageModule";
import { useLoginUserApi } from "../../../hooks/Auth/mutation";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [eyeSecure, setEyeSecure]: any = useState(true);
  const loginApiCaller: any = useLoginUserApi();

  const handleLogin = (values: any) => {
    loginApiCaller
      ?.mutateAsync({
        body: values,
      })
      .then((res: any) => {
        console.log("res", res);
        Toast.show({
          type: "success",
          text1: "OTP send successfully.",
        });
        navigation.replace("OTPVerification", values);
      })
      .catch((err: any) =>
        Toast.show({
          type: "error",
          text1: "Wrong Credentials",
        })
      );
  };

  return (
    <View
      style={[styles.container, { paddingTop: useSafeAreaInsets().top + 40 }]}
    >
      <FullScreenLoader loading={loginApiCaller?.isLoading} />
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back to the app</Text>

      <Formik
        initialValues={{ email: "", password: "", keepMeSignedIn: false }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }: any) => (
          <View>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="hello@example.com"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••••••"
                secureTextEntry={eyeSecure}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setEyeSecure(!eyeSecure)}
              >
                <Image
                  source={
                    eyeSecure ? ImageModule.eye_close : ImageModule.eye_open
                  }
                  style={styles.eyeImage}
                />
              </TouchableOpacity>
            </View>

            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  values.keepMeSignedIn && styles.checkboxChecked,
                ]}
                onPress={() =>
                  setFieldValue("keepMeSignedIn", !values.keepMeSignedIn)
                }
              >
                {values.keepMeSignedIn && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Keep me signed in</Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or sign in with</Text>

            <TouchableOpacity style={styles.googleButton}>
              <Image style={styles.googleImage} source={ImageModule.google} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => {
          navigation.navigate("CreateAccount");
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
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
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  forgotPassword: {
    color: theme.colors.primary,
    marginBottom: 15,
    textAlign: "right",
    ...theme.font.fontMedium,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkMark: {
    color: "white",
    fontSize: 12,
  },
  checkboxLabel: {
    ...theme.font.fontRegular,
    color: theme.colors.black,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 17,
    ...theme.font.fontMedium,
  },
  orText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
    ...theme.font.fontRegular,
    fontSize: 12,
    paddingVertical: 5,
  },
  googleButton: {
    backgroundColor: "#e9e9e9",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  googleImage: {
    height: 30,
    width: 30,
    objectFit: "contain",
  },
  googleButtonText: {
    color: "#555",
    fontSize: 16,
    marginLeft: 10,
    ...theme.font.fontMedium,
  },
  eyeImage: {
    width: width * 0.05,
    height: width * 0.05,
    tintColor: theme.colors.basicGrey,
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

export default LoginScreen;
