import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { colors } from './GlobalStyle';
import HeaderMain from './Components/HeaderMain';
import ScreenTitle from './Components/ScreenTitle';
import { Filigree2 } from './Decorations/Filigree';

const NotificationScreen = () => {
  const groups = [
    {
      title: 'Hôm nay',
      items: [
        { text: 'Hệ Thống Giao Diện Mới', time: '12:30' },
      ],
    },
    {
      title: '9/29',
      items: [
        { text: 'Truyện A Clash Of Kings Cập Nhật Chương Mới', time: '21:12' },
        { text: 'Truyện A Storm Of Storms Cập Nhật Chương Mới', time: '11:45' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderMain />
      <ScrollView
        bounces={false}
        overScrollMode="never"
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 80 }}
      >
        <ScreenTitle title={"THÔNG BÁO"} icon={"notifications"} />

        <View style={styles.notificationSection}>
          {groups.map(group => (
            <View key={group.title} style={{ marginBottom: 12 }}>
              {/* Header nhóm (Hôm nay / 9/29) */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{group.title}</Text>
                <View style={styles.line} />
              </View>

              {/* Items */}
              {group.items.map((item, idx) => (
                <TouchableOpacity style={styles.notificationItem} key={idx} activeOpacity={0.8}>
                  <View style={styles.bullet} />
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationText} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
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
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  notificationSection: {
    width: '90%',
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline', 
    marginVertical: 8,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.white,
    marginTop: 1, // tinh chỉnh line ngang chân chữ
  },

  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
  color: colors.white,
  fontSize: 14,
  fontWeight: '700',
  flexShrink: 1,
  flex: 1,
  maxWidth: '80%',  // ✅ đảm bảo Text chỉ chiếm 80% chiều ngang item
  marginRight: 8,
},
  notificationTime: {
    color: colors.white, // cùng màu với tiêu đề
    fontSize: 13,
    fontWeight: '400',
  },
});

export default NotificationScreen;
