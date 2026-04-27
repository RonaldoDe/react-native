import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from '@/lib/utils'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Image, Pressable, Text, View } from 'react-native'

const SubscriptionCard = ({
  name,
  price,
  currency,
  icon,
  billing,
  color,
  category,
  plan,
  renewalDate,
  expanded,
  onPress,
  paymentMethod,
  startDate,
  status
}: SubscriptionCardProps) => {

  // 🔥 animación
  const heightAnim = useRef(new Animated.Value(0)).current
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [expanded])

  // 🔥 altura interpolada
    const height = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
    });

  return (
    <Pressable
      onPress={onPress}
      className={clsx('sub-card')}
      style={[
        {
          backgroundColor: expanded ? "#fff" : (color || "#fff"),
          borderRadius: 16,
          padding: 16,

          // sombra REAL
          elevation: 4,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
        }
      ]}
    >
      {/* HEADER */}
      <View className='sub-head'>
        <View className='sub-main'>
          <Image source={icon} className='sub-icon' />
          <View className='sub-copy'>
            <Text numberOfLines={1} className='sub-title'>
              {name}
            </Text>
            <Text numberOfLines={1} ellipsizeMode='tail' className='sub-meta'>
              {category?.trim() || plan?.trim() || (renewalDate ? formatSubscriptionDateTime(renewalDate) : '')}
            </Text>
          </View>
        </View>

        <View className='sub-price-box'>
          <Text className='sub-price'>{formatCurrency(price, currency)}</Text>
          <Text className='sub-billing'>{billing}</Text>
        </View>
      </View>

      {/* 🔥 CONTENIDO ANIMADO */}
      <Animated.View style={{ height, overflow: "hidden" }}>
        <View className="sub-details"
            style={{ paddingTop: 10 }}
            onLayout={(event) => {
            const h = event.nativeEvent.layout.height;
            setContentHeight(h);
            }}>

          <View className='sub-row'>
            <View className='sub-row-copy'>
              <Text className='sub-label'>Payment:</Text>
              <Text className='sub-value'>{paymentMethod?.trim() ?? 'Not provided'}</Text>
            </View>
          </View>

          <View className='sub-row'>
            <View className='sub-row-copy'>
              <Text className='sub-label'>Category:</Text>
              <Text className='sub-value'>{category?.trim() || plan?.trim()}</Text>
            </View>
          </View>

          <View className='sub-row'>
            <View className='sub-row-copy'>
              <Text className='sub-label'>Started:</Text>
              <Text className='sub-value'>
                {startDate ? formatSubscriptionDateTime(startDate) : ''}
              </Text>
            </View>
          </View>

          <View className='sub-row'>
            <View className='sub-row-copy'>
              <Text className='sub-label'>Renewal date:</Text>
              <Text className='sub-value'>
                {renewalDate ? formatSubscriptionDateTime(renewalDate) : ''}
              </Text>
            </View>
          </View>

          <View className='sub-row'>
            <View className='sub-row-copy'>
              <Text className='sub-label'>Status:</Text>
              <Text className='sub-value'>
                {status ? formatStatusLabel(status) : ''}
              </Text>
            </View>
          </View>

        </View>
      </Animated.View>
    </Pressable>
  )
}

export default SubscriptionCard