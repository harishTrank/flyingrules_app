import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import ImageModule from "../../../ImageModule";
import ProfileHeadSection from "../BottomTabNavigation/ProfileScreen/Component/ProfileHeadSection";
import { useAtom } from "jotai";
import { loginGlobalFlag } from "../../../JotaiStore";
import theme from "../../../utils/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const AboutUsScreen = ({ navigation }: any) => {
  const [isLogin]: any = useAtom(loginGlobalFlag);
  return (
    <>
      <ProfileHeadSection isLogin={isLogin} navigation={navigation} />
      <ScrollView
        style={[
          styles.container,
          { paddingBottom: useSafeAreaInsets().bottom + 10 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.sectionText}>
            Grab On the Best Flight Deals and Embark On Your Journey with
            Flyingrules.com
          </Text>
          <Text style={styles.paragraph}>
            Flyingrules.com is your one-stop platform to explore competitive
            airfares and great discount deals on online flight booking across
            all major destinations in the USA, UK, and Canada. As a thriving
            booking platform, we endeavor to eliminate every challenge that
            comes your way while browsing flight schedules online.
          </Text>

          <Text style={styles.subtitle}>Why Flyingrules.com</Text>

          <View style={styles.mainBoxRap}>
            <View style={styles.featureContainer}>
              <Image
                source={ImageModule.promise}
                style={styles.featureIcon}
                resizeMode="contain"
              />
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Promising Deals</Text>
                <Text style={styles.featureText}>
                  We strive to find the best booking deals for you, comparing
                  prices from USA, UK, and Canada carriers.
                </Text>
              </View>
            </View>

            <View style={styles.featureContainer}>
              <Image
                source={ImageModule.redefine}
                style={styles.featureIcon}
                resizeMode="contain"
              />
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Redefined Experience</Text>
                <Text style={styles.featureText}>
                  Our team of foreign deal finders focuses on providing you with
                  the most memorable flight deals.
                </Text>
              </View>
            </View>

            <View style={styles.featureContainer}>
              <Image
                source={ImageModule.allember}
                style={styles.featureIcon}
                resizeMode="contain"
              />
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>All-Embracing Offerings</Text>
                <Text style={styles.featureText}>
                  Enjoy a wide range of options for a better booking experience
                  with the best flight deals.
                </Text>
              </View>
            </View>

            <View style={styles.featureContainer}>
              <Image
                source={ImageModule.whiteclock}
                style={styles.featureIcon}
                resizeMode="contain"
              />
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Ceaseless Support</Text>
                <Text style={styles.featureText}>
                  Our support team is available 24/7 to assist you in improving
                  your flight deal experience.
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.subtitle}>
            Fuss-Free Flight Booking to Have Something to Look Back On
          </Text>

          <Text style={styles.paragraph}>
            Be it an important business meeting, a family occasion, or a
            much-needed break from work; travel is an immovable aspect of our
            lives. As a well-established travel service provider, we are
            familiar with the recurring challenges people face while planning
            their trips.
          </Text>

          <Text style={styles.paragraph}>
            Providing great deals and discounts on flight tickets is our way to
            alleviate your online flight booking experience. We believe that
            cost-efficient travel planning is the first step to a trip you would
            want to reminisce about later in your life. Therefore we make sure
            that you get to find the best flights in your budget and your
            preferred timeline.
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: width * 0.05,
  },
  contentContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: width * 0.05,
  },
  title: {
    marginVertical: width * 0.02,
    color: theme.colors.primary,
    ...theme.font.fontSemiBold,
    fontSize: width * 0.05,
  },
  sectionText: {
    color: theme.colors.black,
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
  },
  subtitle: {
    color: theme.colors.black,
    ...theme.font.fontMedium,
    fontSize: width * 0.04,
    paddingTop: 8,
  },
  paragraph: {
    fontSize: width * 0.037,
    ...theme.font.fontMedium,
    color: theme.colors.basicGrey,
  },
  mainBoxRap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  featureContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "49%",
    backgroundColor: theme.colors.primary,
    marginBottom: 7,
    padding: 2,
    borderRadius: 3,
  },
  featureIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: 5,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    color: theme.colors.white,
    ...theme.font.fontMedium,
    fontSize: width * 0.027,
  },
  featureText: {
    color: theme.colors.white,
    ...theme.font.fontRegular,
    fontSize: width * 0.02,
  },
});

export default AboutUsScreen;
