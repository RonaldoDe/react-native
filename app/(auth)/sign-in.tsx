import { Link } from "expo-router"
import { Text, View } from "react-native"

const SignIn = () => {
    return (
        <View>
            <Text>Sign In</Text>
            <Link href="/(auth)/sign-up">Login here</Link>
            <Link href="/" className="mt-4 rounded bg-primary text-white p-4">Go to Home</Link>
        </View>
    )
}

export default SignIn