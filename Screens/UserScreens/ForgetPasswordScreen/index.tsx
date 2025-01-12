import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup';
import theme from '../../../utils/theme';
import BackButtonComp from '../../ReUseComponents/BackButtonComp';

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPasswordScreen: React.FC = ({ navigation }: any) => {
  const handleResetPassword = (values: any) => {
    // Handle password reset logic here (e.g., API call)
    console.log('Reset Password values:', values);
    // Replace this with your actual password reset implementation
    alert(`Password reset requested for: ${values.email}`);
  };

  return (
    <View
      style={[styles.container, { paddingTop: useSafeAreaInsets().top + 40 }]}
    >
      <StatusBar barStyle="dark-content" />

      <BackButtonComp navigation={navigation} />

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email address to get the password reset link.
      </Text>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
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
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="hello@example.com"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleSubmit}
            >
              <Text style={styles.resetButtonText}>Password Reset</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => {
          // Handle create account logic (e.g., navigation)
          console.log('Create an account pressed');
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
    backgroundColor: '#fff',
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
    color: '#555',
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    fontSize: 15,
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 17,
    ...theme.font.fontMedium,
  },
  createAccountButton: {
    padding: 15,
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    ...theme.font.fontMedium,
  },
});

export default ForgotPasswordScreen;