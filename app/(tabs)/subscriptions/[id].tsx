import { Link, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const SubscritionDetails = () => {
    const {id} = useLocalSearchParams<{id: string}>();
  return (
    <View>
      <Text>Subscrition Details: {id}</Text>
      <Link href="/" className="mt-4 rounded bg-primary text-white p-4">Go back</Link>
    </View>
  )
}

export default SubscritionDetails