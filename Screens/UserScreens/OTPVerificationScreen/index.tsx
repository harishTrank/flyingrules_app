import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../../utils/theme";
import BackButtonComp from "../../ReUseComponents/BackButtonComp";
import { useLoginUserApi, useVarifyOTPApi } from "../../../hooks/Auth/mutation";
import FullScreenLoader from "../../ReUseComponents/FullScreenLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginGlobalFlag } from "../../../JotaiStore";
import { useAtom } from "jotai";
import Toast from "react-native-toast-message";

const OTPVerificationScreen = ({ navigation, route }: any) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(23);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const varifyOTPAPiCaller: any = useVarifyOTPApi();
  const [, setGlobalFlagManager]: any = useAtom(loginGlobalFlag);
  const loginApiCaller: any = useLoginUserApi();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOTPChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOTP = otp.join("");
    varifyOTPAPiCaller
      ?.mutateAsync({
        body: {
          email: email,
          otp: enteredOTP,
        },
      })
      ?.then(async (res: any) => {
        await AsyncStorage.setItem("accessToken", res?.data?.token);
        setGlobalFlagManager(true);
        navigation.replace("BottomTabNavigation");
        Toast.show({
          type: "success",
          text1: "User Login successfully.",
        });
      })
      ?.catch((err: any) =>
        Toast.show({
          type: "error",
          text1: "Invalid OTP.",
        })
      );
  };

  const handleResendOTP = (values: any) => {
    loginApiCaller
      ?.mutateAsync({
        body: {
          email,
          password: route?.params?.password,
        },
      })
      .then((res: any) => {
        console.log("res", res);
        setCountdown(23);
        Toast.show({
          type: "success",
          text1: "OTP Resend successfully.",
        });
      })
      .catch(() =>
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
      <FullScreenLoader
        loading={varifyOTPAPiCaller?.isLoading || loginApiCaller?.isLoading}
      />
      <StatusBar barStyle="dark-content" />
      <BackButtonComp navigation={navigation} />
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the verification code we just sent on your E-mail.
      </Text>
      <Text style={styles.emailText}>{email}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={[
              styles.otpInput,
              focusedIndex === index && styles.otpInputFocused,
            ]}
            value={digit}
            onChangeText={(text) => handleOTPChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Resend OTP in {countdown}s</Text>
        {countdown === 0 && (
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.resendButtonText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
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
    marginBottom: 10,
    ...theme.font.fontSemiBold,
    fontSize: 30,
    color: theme.colors.black,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 5,
    ...theme.font.fontMedium,
  },
  emailText: {
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
    ...theme.font.fontMedium,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 20,
  },
  otpInput: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 24,
    ...theme.font.fontMedium,
    color: theme.colors.black,
  },
  otpInputFocused: {
    borderColor: theme.colors.primary, // Change border color when focused
  },
  verifyButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 17,
    ...theme.font.fontMedium,
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resendText: {
    ...theme.font.fontRegular,
    color: theme.colors.black,
    marginRight: 5,
  },
  resendButtonText: {
    color: theme.colors.primary,
    ...theme.font.fontMedium,
  },
});

export default OTPVerificationScreen;
