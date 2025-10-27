import React from "react";
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,} from "react-native";
import { colors } from "./GlobalStyle";
import HeaderMain from "./Components/HeaderMain";
import ScreenTitle from "./Components/ScreenTitle";
import { Filigree2 } from "./Decorations/Filigree";

import notificationsData from "../assets/_notiDatabase.json";

// Hàm định dạng dữ liệu thông báo
function formatNotificationData(data) {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1;

  return data.map((item) => {
    const date = new Date(item.time);

    // Kiểm tra nếu thời gian không hợp lệ
    if (isNaN(date.getTime())) {
      console.warn("Lỗi định dạng thời gian:", item.time);
      return {
        text: item.text,
        title: "Không xác định",
        time: "--:--",
      };
    }

    // Chuyển sang giờ Việt Nam (UTC+7)
    const vnTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    const hours = vnTime.getHours().toString().padStart(2, "0");
    const minutes = vnTime.getMinutes().toString().padStart(2, "0");

    const displayTime = `${hours}:${minutes}`;

    const day = vnTime.getDate();
    const month = vnTime.getMonth() + 1;

    // So sánh ngày hiện tại với ngày thông báo
    const isToday = day === currentDay && month === currentMonth;
    const title = isToday ? "Hôm nay" : `${day}/${month}`;

    return {
      text: item.text,
      title: title,
      time: displayTime,
    };
  });
}

// Component chính
const NotificationScreen = () => {
  // Định dạng dữ liệu thô từ JSON
  const formattedData = formatNotificationData(notificationsData);

  // Gom nhóm thông báo theo tiêu đề (Hôm nay, 22/10, ...)
  const groups = formattedData.reduce((acc, item) => {
    const existingGroup = acc.find((g) => g.title === item.title);
    if (existingGroup) {
      existingGroup.items.push(item);
    } else {
      acc.push({ title: item.title, items: [item] });
    }
    return acc;
  }, []);

  console.log("Dữ liệu sau khi định dạng:", formattedData);

  // Giao diện
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
          {groups.map((group) => (
            <View key={group.title} style={{ marginBottom: 12 }}>
              {/* Header nhóm (Hôm nay ,....) */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{group.title}</Text>
                <View style={styles.line} />
              </View>

              {/* Items */}
              {group.items.map((item, idx) => (
                <TouchableOpacity
                  style={styles.notificationItem}
                  key={idx}
                  activeOpacity={0.8}
                >
                  <View style={styles.bullet} />
                  <View style={styles.notificationContent}>
                    <Text
                      style={styles.notificationText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
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
