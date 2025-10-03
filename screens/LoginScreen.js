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
import { Filigree5_Bottom } from "./Decorations/Filigree";
import {
  SidedButton_Left,
  SidedButton_Right,
  DecoButton,
} from "./Decorations/DecoButton";
import ScreenTitle from "./Components/ScreenTitle";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigation = useNavigation();

  const handleAuth = async () => {
    if (isLogin) {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (!storedUser) {
          Alert.alert("Thông báo", "Chưa có tài khoản, vui lòng đăng ký!");
          return;
        }
        const user = JSON.parse(storedUser);
        if (
          (user.email === email || user.username === email) &&
          user.password === password
        ) {
          Alert.alert("Thành công", "Đăng nhập thành công!");
          navigation.replace("MainScreen");
        } else {
          Alert.alert("Lỗi", "Sai email/tên người dùng hoặc mật khẩu!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
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
        Alert.alert("Thành công", "Đăng ký thành công, hãy đăng nhập!");
        setIsLogin(true);
        setPassword("");
        setRepeatPassword("");
      } catch (error) {
        console.log(error);
      }
    }
  };

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

          {/* Nút chọn Đăng nhập / Đăng ký */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              right: -15,
            }}
          >
            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <SidedButton_Left ButtonText={"Đăng Nhập"} Active={isLogin} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <SidedButton_Right ButtonText={"Đăng Ký"} Active={!isLogin} />
            </TouchableOpacity>
          </View>

          {/* --- KHỐI GOOGLE LOGIN --- */}
          <View style={styles.ornateTextbox_white}>
            <View>
              <View style={styles.cardBox}>
                <View style={styles.inputContainer}>
                  <TouchableOpacity style={styles.googleButton}>
                    <Text style={styles.googleText}>
                      Đăng nhập bằng Google
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                    <Text style={styles.separatorText}>hoặc</Text>
                    <View style={styles.line} />
                  </View>
                </View>
              </View>
            </View>
            <LinearGradient
              colors={["rgba(0,0,0,0.2)", "transparent"]}
              style={[globalStyles.shadow, globalStyles.topShadow]}
            />
          </View>

          {/* --- FORM LOGIN / REGISTER --- */}
          {isLogin ? (
            <View style={styles.loginContainer}>
              <View style={styles.cardBox2}>
                {/* FORM ĐĂNG NHẬP */}
                <TextInput
                  style={[styles.input2, { color: colors.white }]}
                  placeholder="Email hoặc tên người dùng"
                  placeholderTextColor={colors.lightgray}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
                <TextInput
                  style={[styles.input2, { color: colors.white }]}
                  placeholder="Mật khẩu"
                  placeholderTextColor={colors.lightgray}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity>
                  <Text style={styles.forgotPassword2}>Quên mật khẩu?</Text>
                </TouchableOpacity>
              </View>
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
            </View>
          ) : (
            <View style={styles.registerContainer}>
              <View style={styles.cardBox3}>
                {/* FORM ĐĂNG KÝ */}
                <TextInput
                  style={[styles.input3, { color: colors.white }]}
                  placeholder="Email"
                  placeholderTextColor={colors.lightgray}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
                <TextInput
                  style={[styles.input3, { color: colors.white }]}
                  placeholder="Tên người dùng"
                  placeholderTextColor={colors.lightgray}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
                <Text
                  style={{
                    color: colors.lightgray,
                    fontSize: 14,
                    marginBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  Ngày sinh
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <TextInput
                    style={[styles.input4, { flex: 1, marginRight: 5, color: colors.black }]}
                    placeholder="ngày"
                    placeholderTextColor={colors.trueBlack}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <TextInput
                    style={[styles.input4, { flex: 1, marginHorizontal: 5, color: colors.black }]}
                    placeholder="tháng"
                    placeholderTextColor={colors.trueBlack}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <TextInput
                    style={[styles.input4, { flex: 1, marginLeft: 5, color: colors.black }]}
                    placeholder="năm"
                    placeholderTextColor={colors.trueBlack}
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
                <TextInput
                  style={[styles.input3, { color: colors.white }]}
                  placeholder="Mật khẩu"
                  placeholderTextColor={colors.lightgray}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TextInput
                  style={[styles.input3, { color: colors.white }]}
                  placeholder="Lặp lại mật khẩu"
                  placeholderTextColor={colors.lightgray}
                  secureTextEntry
                  value={repeatPassword}
                  onChangeText={setRepeatPassword}
                />
              </View>
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
            </View>
          )}

          {/* Nút Đăng nhập / Đăng ký */}
          <TouchableOpacity
            style={{ }}
            onPress={handleAuth}
          >
            <DecoButton
              ButtonText={isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
              ButtonIcon={""}
            />
          </TouchableOpacity>
        </ScrollView>
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
  ornateTextbox_white: {
    width: "100%",
    height: 100,
    borderColor: colors.white,
    borderTopWidth: 3,
    borderBottomWidth: 2,
    backgroundColor: colors.white,
  },
  loginContainer: {
    width: "100%",
    minHeight: "30%", // đổi height -> minHeight
    borderColor: colors.white,
    borderTopWidth: 3,
    borderBottomWidth: 4,
    backgroundColor: colors.gray,
    justifyContent: "center",
  },
  registerContainer: {
    width: "100%",
    minHeight: 460, // đổi height -> minHeight
    marginVertical: 10,
    borderColor: colors.white,
    borderTopWidth: 3,
    borderBottomWidth: 2,
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
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightgray,
  },
  separatorText: {
    marginHorizontal: 5,
    color: colors.lightgray,
    fontSize: 16,
  },
  cardBox2: {
    width: "80%",
    height: "75%",
    alignSelf: "center",

  },
  input2: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: "bold",
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
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 15
  },
});

export default LoginScreen;
