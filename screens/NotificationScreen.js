import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadNotifications } from "../slices/notificationSlice";
import { colors } from "./GlobalStyle";
import HeaderMain from "./Components/HeaderMain";
import ScreenTitle from "./Components/ScreenTitle";
import { Filigree2 } from "./Decorations/Filigree";

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const { groupedNotifications, isLoading, error } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(loadNotifications());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Đang tải thông báo.....</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Lỗi tải thông báo: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderMain />
      <ScrollView
        bounces={false}
        overScrollMode="never"
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 80 }}
      >
        <ScreenTitle title={"THÔNG BÁO"} icon={"notifications"} />

        <View style={styles.notificationSection}>
          {groupedNotifications.map((group) => (
            <View key={group.title} style={{ marginBottom: 12 }}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{group.title}</Text>
                <View style={styles.line} />
              </View>

              {group.items.map((item, idx) => (
                <TouchableOpacity
                  style={styles.notificationItem}
                  key={idx}
                  activeOpacity={0.8}
                >
                  <View style={styles.bullet} />
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationText} numberOfLines={1}>
                      {item.text}
                    </Text>
                    <Text style={styles.notificationTime}>{item.time}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <Filigree2 customPosition={-40} />
      </ScrollView>
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
  notificationSection: {
    width: "90%",
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 8,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.white,
    marginTop: 1,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginVertical: 6,
  },
  bullet: {
    width: 7,
    height: 18,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
    flexShrink: 1,
    flex: 1,
    maxWidth: "80%",
    marginRight: 8,
  },
  notificationTime: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "400",
  },
});

export default NotificationScreen;
