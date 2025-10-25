import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, globalStyles } from "./GlobalStyle";
import HeaderMain from "./Components/HeaderMain";
import {
  Filigree5_Bottom,
  Filigree2,
  Filigree5_Top,
} from "./Decorations/Filigree";
import {
  SidedButton_Left,
  SidedButton_Right,
  DecoButton,
  OrnateButton,
} from "./Decorations/DecoButton";
import ScreenTitle from "./Components/ScreenTitle";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import FooterMain from "./Components/FooterMain";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../slices/accountSlice";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

    // ✅ Đặt hook Redux ở ngoài (bắt buộc)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);

  // ✅ Hàm xử lý đăng nhập
  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Gửi yêu cầu đăng nhập đến slice
    dispatch(loginUser({ email, password }));
  };

  // ✅ Theo dõi khi user thay đổi
  React.useEffect(() => {
    console.log('LoginScreen - user changed:', user);
    if (user) {
      console.log('LoginScreen - redirecting to AccountScreen');
      navigation.replace("AccountScreen");
    }
  }, [user]);

  return (
    <View>
      <View style={styles.ornateTextbox_white}>
        <LinearGradient
          colors={[colors.black, "transparent"]}
          style={[
            globalStyles.shadow,
            globalStyles.topShadow,
            { opacity: 0.2 },
          ]}
        />
        <View>
          <TouchableOpacity>
            <OrnateButton ButtonText={"Đăng Nhập Bằng Google"} />
          </TouchableOpacity>

          <View style={styles.separatorContainer}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>hoặc</Text>
            <View style={styles.line} />
          </View>
        </View>
      </View>
      <View style={styles.loginContainer}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[colors.black, "transparent"]}
          style={[globalStyles.shadow, globalStyles.leftShadow]}
        />
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["transparent", colors.black]}
          style={[globalStyles.shadow, globalStyles.rightShadow]}
        />
        <Filigree5_Bottom customColor={colors.lightgray} />
        <View style={styles.ot_container}>
          <View style={styles.ot_fieldContainer}>
            <Text
              style={[
                styles.ot_textInputLabel,
                email == "" && { color: colors.gray },
              ]}
            >
              Email hoặc tên đăng nhập
            </Text>
            <TextInput
              style={styles.ot_textInput}
              placeholder="Email hoặc tên đăng nhập"
              placeholderTextColor={colors.lightgray}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View style={styles.ot_fieldContainer}>
            <Text
              style={[
                styles.ot_textInputLabel,
                password == "" && { color: colors.gray },
              ]}
            >
              Mật khẩu
            </Text>
            <TextInput
              style={styles.ot_textInput}
              placeholder="Mật khẩu"
              placeholderTextColor={colors.lightgray}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword2}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", bottom: -20, zIndex: 999 }}
          onPress={() => handleAuth()}
          activeOpacity={1}
        >
          <DecoButton ButtonText={"ĐĂNG NHẬP"} ButtonIcon={""} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SignUpComponent = (setIsLogin) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigation = useNavigation();

  const handleAuth = async () => {
    if (!email || !username || !password || !repeatPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert("Lỗi", "Mật khẩu nhập lại không khớp!");
      return;
    }
    const newUser = { email, username, password };
    try {
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      Alert.alert("Đăng ký thành công!");
      setPassword("");
      setRepeatPassword("");
      navigation.navigate("AccountScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.registerContainer}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.black, "transparent"]}
        style={[globalStyles.shadow, globalStyles.leftShadow]}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["transparent", colors.black]}
        style={[globalStyles.shadow, globalStyles.rightShadow]}
      />
      <Filigree5_Bottom customColor={colors.lightgray} />
      {/* <Filigree5_Top customColor={colors.lightgray} /> */}

      <View style={styles.ot_container}>
        <View style={styles.ot_fieldContainer}>
          <Text
            style={[
              styles.ot_textInputLabel,
              email == "" && { color: colors.gray },
            ]}
          >
            Email hoặc tên đăng nhập
          </Text>
          <TextInput
            style={styles.ot_textInput}
            placeholder="Email"
            placeholderTextColor={colors.lightgray}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <View style={styles.ot_fieldContainer}>
          <Text
            style={[
              styles.ot_textInputLabel,
              username == "" && { color: colors.gray },
            ]}
          >
            Tên người dùng
          </Text>
          <TextInput
            style={styles.ot_textInput}
            placeholder="Tên người dùng"
            placeholderTextColor={colors.lightgray}
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>

        <View style={styles.ot_fieldContainer}>
          <Text style={{ color: colors.lightgray, margin: 5, fontSize: 18 }}>
            Ngày sinh
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              style={[styles.input4, { flex: 1, marginRight: 5 }]}
              placeholder="Ngày"
              placeholderTextColor={colors.gray}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.input4, { flex: 1 }]}
              placeholder="Tháng"
              placeholderTextColor={colors.gray}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.input4, { flex: 1, marginLeft: 5 }]}
              placeholder="Năm"
              placeholderTextColor={colors.gray}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        </View>

        <View style={styles.ot_fieldContainer}>
          <Text
            style={[
              styles.ot_textInputLabel,
              password == "" && { color: colors.gray },
            ]}
          >
            Mật khẩu
          </Text>
          <TextInput
            style={styles.ot_textInput}
            placeholder="Mật khẩu"
            placeholderTextColor={colors.lightgray}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>

        <View style={styles.ot_fieldContainer}>
          <Text
            style={[
              styles.ot_textInputLabel,
              repeatPassword == "" && { color: colors.gray },
            ]}
          >
            Nhập lại mật khẩu
          </Text>
          <TextInput
            style={styles.ot_textInput}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor={colors.lightgray}
            onChangeText={(text) => setRepeatPassword(text)}
            value={repeatPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={{ position: "absolute", bottom: -20, zIndex: 999 }}
          onPress={() => handleAuth()}
          activeOpacity={1}
        >
          <DecoButton ButtonText={"ĐĂNG KÝ"} ButtonIcon={""} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      <HeaderMain />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView
          bounces={false}
          overScrollMode="never"
          style={{ width: "100%" }}
          keyboardShouldPersistTaps="handled"
        >
          <ScreenTitle title={"TÀI KHOẢN"} icon={"person"} />

          <View style={styles.loginButtons}>
            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <SidedButton_Left ButtonText={"Đăng Nhập"} Active={isLogin} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <SidedButton_Right ButtonText={"Đăng Ký"} Active={!isLogin} />
            </TouchableOpacity>
          </View>

          {isLogin ? (
            <LoginComponent />
          ) : (
            <SignUpComponent setIsLogin={setIsLogin} />
          )}

          <Filigree2 customPosition={40} />
          <View style={globalStyles.bottomPadding} />
        </ScrollView>
        <FooterMain currentScreen={4} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.black,
  },

  loginButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  ornateTextbox_white: {
    width: "100%",
    height: "auto",
    paddingTop: 10,
    paddingBottom: 10,

    borderColor: colors.white,
    borderTopWidth: 3,
    borderBottomWidth: 2,
    backgroundColor: colors.white,
  },
  loginContainer: {
    justifyContent: "flex-start",
    alignItems: "center",

    width: "100%",
    height: 230,

    borderBottomColor: colors.lightgray,
    // borderTopWidth: 3,
    borderBottomWidth: 2,
    backgroundColor: colors.gray,
  },
  registerContainer: {
    justifyContent: "flex-start",
    alignItems: "center",

    width: "100%",
    height: 430,

    borderBottomColor: colors.lightgray,
    borderBottomWidth: 2,
    borderTopColor: colors.white,
    borderTopWidth: 3,
    backgroundColor: colors.gray,
  },
  cardBox: { width: "100%" },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.trueBlack,
    paddingVertical: 10,
    marginTop: 20,
    borderColor: colors.lightgray,
  },
  googleText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightgray,
    opacity: 0.7,
  },
  separatorText: {
    marginHorizontal: 5,
    color: colors.lightgray,
    fontStyle: "italic",
    fontSize: 16,
  },
  ot_container: {
    width: "80%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input2: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: "normal",
    marginBottom: 30,
  },
  forgotPassword2: {
    alignSelf: "flex-end",
    color: colors.lightgray,
    fontSize: 12,
    marginTop: 15,
  },
  cardBox3: {
    width: "80%",
    height: 300,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  input3: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input4: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
    paddingVertical: 6,
    fontSize: 12,
    backgroundColor: colors.lightgray,
    borderRadius: 4,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "bold",
  },

  ot_text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",

    marginLeft: 10,
    marginBottom: 10,
  },
  ot_fieldContainer: {
    width: "100%",

    marginTop: 20,
  },

  ot_textInputLabel: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: "bold",
  },

  ot_textInput: {
    width: "100%",

    padding: 5,
    paddingTop: 0,

    margin: 0,

    fontSize: 18,

    color: colors.white,
    borderBottomColor: colors.lightgray,
    borderBottomWidth: 1,
  },
});

export default LoginScreen;
