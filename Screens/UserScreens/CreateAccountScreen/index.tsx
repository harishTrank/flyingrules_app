import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import theme from "../../../utils/theme";
import ImageModule from "../../../ImageModule";

const { width, height } = Dimensions.get("window");

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const CreateAccountScreen: React.FC = ({ navigation }: any) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);

  const handleCreateAccount = (values: any) => {
    // Handle account creation logic here (e.g., API call)
    console.log("Account created with:", values);
    alert(
      `Name: ${values.name}\nEmail: ${values.email}\nPassword: ${values.password}\nConfirmPassword: ${values.confirmPassword}`
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.white }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View
        style={[
          styles.container,
          { paddingTop: useSafeAreaInsets().top + height * 0.05 },
        ]}
      >
        <StatusBar barStyle="dark-content" />

        <Text style={styles.title}>Create an Account</Text>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateAccount}
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
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                autoCorrect={false}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="hello@example.com"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCorrect={false}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••••••"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={secureTextEntry}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                >
                  <Image
                    source={
                      secureTextEntry
                        ? ImageModule.eye_close
                        : ImageModule.eye_open
                    }
                    style={styles.eyeImage}
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <Text style={styles.label}>Confirm Password</Text>
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
                  <Image
                    source={
                      confirmSecureTextEntry
                        ? ImageModule.eye_close
                        : ImageModule.eye_open
                    }
                    style={styles.eyeImage}
                  />
                </TouchableOpacity>
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <Text style={styles.termsText}>
                By continuing, you agree to our{" "}
                <Text style={{ color: theme.colors.primary }}>
                  terms of service.
                </Text>
              </Text>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSubmit}
              >
                <Text style={styles.signupButtonText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Image style={styles.googleImage} source={ImageModule.google} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.signInButtonText}>Sign in here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: width * 0.04,
  },
  title: {
    marginBottom: height * 0.02,
    ...theme.font.fontSemiBold,
    fontSize: width * 0.08,
    color: theme.colors.black,
  },
  label: {
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 5,
    padding: width * 0.04,
    marginBottom: height * 0.01,
    fontSize: width * 0.04,
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 5,
    marginBottom: height * 0.01,
  },
  passwordInput: {
    flex: 1,
    padding: width * 0.03,
    fontSize: width * 0.04,
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  eyeIcon: {
    padding: width * 0.03,
  },
  eyeImage: {
    width: width * 0.05,
    height: width * 0.05,
    tintColor: theme.colors.basicGrey,
  },
  errorText: {
    color: theme.colors.red,
    fontSize: width * 0.03,
    marginBottom: height * 0.01,
  },
  termsText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
    color: theme.colors.black,
    marginBottom: height * 0.02,
  },
  signupButton: {
    backgroundColor: theme.colors.primary,
    padding: width * 0.04,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: height * 0.01,
  },
  signupButtonText: {
    color: theme.colors.white,
    fontSize: width * 0.045,
    ...theme.font.fontMedium,
  },
  orText: {
    textAlign: "center",
    marginBottom: height * 0.01,
    color: theme.colors.grey,
    ...theme.font.fontRegular,
    fontSize: width * 0.035,
    paddingVertical: height * 0.01,
  },
  googleButton: {
    backgroundColor: theme.colors.grey,
    padding: width * 0.04,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: height * 0.02,
    flexDirection: "row",
    justifyContent: "center",
  },
  googleImage: {
    height: height * 0.035,
    width: height * 0.035,
    objectFit: "contain",
  },
  googleButtonText: {
    color: theme.colors.basicGrey,
    fontSize: width * 0.04,
    marginLeft: width * 0.02,
    ...theme.font.fontMedium,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.02,
  },
  signInText: {
    ...theme.font.fontRegular,
    fontSize: width * 0.04,
    color: theme.colors.black,
  },
  signInButtonText: {
    color: theme.colors.primary,
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
  },
});

export default CreateAccountScreen;
