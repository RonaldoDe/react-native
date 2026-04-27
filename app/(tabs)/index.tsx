import CreateSubscriptionModal from "@/components/CreateSubscriptionModal";
import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import UpcommingSubscriptionCard from "@/components/UpcommingSubscriptionCard";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import "@/global.css";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);


export default function App() {
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-background p-5">

      <FlatList 
        data={HOME_SUBSCRIPTIONS} 
        keyExtractor={(item) => item.id}
        style={{ overflow: "visible" }}
        ListHeaderComponent={() => (
          <View className="gap-5">

            {/* HEADER */}
            <View className="home-header">
              <View className="home-user">
                <Image source={images.avatar} className="home-avatar" />
                <Text className="home-user-name">
                  {HOME_USER.name}
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(true)}>
                <Image source={icons.add} className="home-add-icon" />
              </Pressable>
            </View>

            {/* BALANCE */}
            <View className="home-balance-card">
              <Text className="home-balance-label">Balance</Text>

              <View className="home-balance-row">
                <Text className="home-balance-amount">
                  {formatCurrency(HOME_BALANCE.amount)}
                </Text>

                <Text className="home-balance-date">
                  {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                </Text>
              </View>
            </View>

            {/* UPCOMING */}
            <View>
              <ListHeading title="Upcoming" />

              <FlatList
                data={UPCOMING_SUBSCRIPTIONS}
                renderItem={({ item }) => (
                  <UpcommingSubscriptionCard {...item} />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                
                ListEmptyComponent={
                  <Text className="home-empty-state">
                    No Upcoming renewals yet
                  </Text>
                }
              />
            </View>

            {/* TITLE */}
            <ListHeading title="All Subscriptions" />

          </View>
        )}

        renderItem={({ item }) => (
          <SubscriptionCard 
            {...item}
            expanded={expandedSubscriptionId === item.id}
            onPress={() =>
              setExpandedSubscriptionId((currentId) =>
                currentId === item.id ? null : item.id
              )
            }
          />
        )}

        ItemSeparatorComponent={() => <View className="h-4" />}

        showsVerticalScrollIndicator={false}

        ListEmptyComponent={
          <Text className="home-empty-state">
            No Subscriptions yet
          </Text>
        }
      />
    <CreateSubscriptionModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      onSubmit={(newSub) => {
        console.log(newSub); // luego aquí lo agregas al estado
      }}
    />
    </SafeAreaView>
  );
}