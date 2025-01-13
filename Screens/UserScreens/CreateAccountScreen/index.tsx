import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import theme from "../../../utils/theme";
import ImageModule from "../../../ImageModule";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const CreateAccountScreen: React.FC = ({ navigation }: any) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleCreateAccount = (values: any) => {
    // Handle create account logic here (e.g., API call)
    console.log("Create Account values:", values);
    // Replace this with your actual create account implementation
    alert(
      `Name: ${values.name}\nEmail: ${values.email}\nPassword: ${values.password}`
    );
  };

  return (
    <View
      style={[styles.container, { paddingTop: useSafeAreaInsets().top + 40 }]}
    >
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Create an Account</Text>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
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
                <Text
                  style={[
                    secureTextEntry && { textDecorationLine: "line-through" },
                  ]}
                >
                  👁️
                </Text>
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    marginBottom: 20,
    ...theme.font.fontSemiBold,
    fontSize: 30,
    color: theme.colors.black,
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
    padding: 12,
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
  termsText: {
    ...theme.font.fontRegular,
    fontSize: 14,
    color: theme.colors.black,
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  signupButtonText: {
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
    padding: 15,
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
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signInText: {
    ...theme.font.fontRegular,
    color: theme.colors.black,
  },
  signInButtonText: {
    color: theme.colors.primary,
    ...theme.font.fontMedium,
  },
});

export default CreateAccountScreen;
