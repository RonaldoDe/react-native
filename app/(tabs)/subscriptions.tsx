import SubscriptionCard from "@/components/SubscriptionCard";
import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import { styled } from "nativewind";
import { useRef, useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const listRef = useRef<FlatList<any>>(null);

  const filteredSubscriptions = HOME_SUBSCRIPTIONS.filter(
    (subscription) =>
      subscription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.plan?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <FlatList
        ref={listRef}
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <View className="px-5 pt-5">
            <Text className="text-3xl font-bold text-dark mb-5">
              Subscriptions
            </Text>
            <TextInput
              className="bg-card rounded-xl px-4 py-3 text-dark mb-4"
              placeholder="Search subscriptions"
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        }

        renderItem={({ item, index }) => (
          <SubscriptionCard
            {...item}
            expanded={item.id === expandedId}
            onPress={() => {
              LayoutAnimation.configureNext({
                duration: 250,
                update: {
                  type: LayoutAnimation.Types.easeInEaseOut,
                },
                create: {
                  type: LayoutAnimation.Types.easeInEaseOut,
                  property: LayoutAnimation.Properties.opacity,
                },
                delete: {
                  type: LayoutAnimation.Types.easeInEaseOut,
                  property: LayoutAnimation.Properties.opacity,
                },
              });

              const newId = item.id === expandedId ? null : item.id;
              setExpandedId(newId);

              // 🔥 AUTO SCROLL CUANDO EXPANDE
              if (newId) {
                setTimeout(() => {
                  listRef.current?.scrollToIndex({
                    index,
                    animated: true,
                    viewPosition: 0.8,
                  });
                }, 150);
              }
            }}
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 16,

              // ANDROID (más fuerte)
              elevation: 8,

              // iOS
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
            }}
          />
        )}

        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 150,
          paddingTop: 10,
        }}

        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

export default Subscriptions;