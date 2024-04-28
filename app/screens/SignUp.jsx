import React, { useState } from 'react';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false); // Declare loading state variable

    const handleSignUp = async () => {
        setLoading(true); // Set loading to true at the start of sign up
        try {
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            await setDoc(doc(FIREBASE_DB, 'users', response.user.uid), { fullName, points: 0 });
        } catch (e) {
            console.log(e);
        }
        setLoading(false); // Set loading to false at the end of sign up
    };
    return (
        <SafeAreaView 
			style = {{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView  
				style = {{
					flex: 1,
					backgroundColor: "#032851",
					paddingTop: 279,
					paddingBottom: 306,
				}}>
				<Text 
					style = {{
						color: "#FFFFFF",
						fontSize: 24,
						marginBottom: 10,
						marginHorizontal: 157,
					}}>
					{"Sign Up"}
				</Text>
                <Text 
					style = {{
						color: "#FFFFFF",
						fontSize: 15,
						marginBottom: 5,
						marginHorizontal: 79,
					}}>
					{"Full Name"}
				</Text>
				<TextInput 
          value={fullName} 
          style ={{
            backgroundColor: "#EBEBEB",
            borderRadius: 15,
            paddingVertical: 12,
            paddingHorizontal: 14,
            marginBottom: 22,
            marginHorizontal: 77,
            fontSize: 12,
            color: "#A6AAAE",
          }} 
          placeholder ="Full Name" 
          onChangeText={(text) => setFullName(text)}
        />
				<Text 
					style = {{
						color: "#FFFFFF",
						fontSize: 15,
						marginBottom: 5,
						marginHorizontal: 79,
					}}>
					{"Email"}
				</Text>
				<TextInput 
          value={email} 
          style ={{
            backgroundColor: "#EBEBEB",
            borderRadius: 15,
            paddingVertical: 12,
            paddingHorizontal: 14,
            marginBottom: 22,
            marginHorizontal: 77,
            fontSize: 12,
            color: "#A6AAAE",
          }} 
          placeholder ="Email" 
          onChangeText={(text) => setEmail(text)}
        />
				<Text 
					style = {{
						color: "#FFFFFF",
						fontSize: 15,
						marginBottom: 8,
						marginHorizontal: 79,
					}}>
					{"Password"}
				</Text>
				<TextInput 
          secureTextEntry={true} 
          value={password} 
          style ={{
            backgroundColor: "#EBEBEB",
            borderRadius: 15,
            paddingVertical: 12,
            paddingHorizontal: 14,
            marginBottom: 18,
            marginHorizontal: 77,
            fontSize: 12,
            color: "#A6AAAE",
          }} 
          placeholder ="Password" 
          onChangeText={(text) => setPassword(text)}
        />
				<View 
					style = {{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 14,
						marginHorizontal: 78,
					}}>
					<View 
						style = {{
							width: 10,
							height: 10,
							backgroundColor: "#D9D9D9",
							borderRadius: 3,
							marginRight: 5,
						}}>
					</View>
					<Text 
						style = {{
							color: "#FFFFFF",
							fontSize: 12,
						}}>
						{"Remember me"}
					</Text>
					<View 
						style = {{
							flex: 1,
							alignSelf: "stretch",
						}}>
					</View>
					<Text 
						style = {{
							color: "#399FFD",
							fontSize: 12,
						}}>
						{"Forgot Password?"}
					</Text>
				</View>
                {loading ? 
      <ActivityIndicator size="large" color="#0000ff" /> 
      : 
      <>
        <TouchableOpacity 
    onPress={handleSignUp}
    style ={{
        alignItems: "center",
        backgroundColor: "#4EAAFF",
        borderRadius: 15,
        paddingVertical: 12,
        marginBottom: 21,
        marginHorizontal: 77,
        shadowColor: "#4EAAFF",
        shadowOpacity: 1.0,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 13,
        elevation: 13,
    }}
>
    <Text style={{color: "#FFFFFF", fontSize: 12}}>Create account</Text>
</TouchableOpacity>
      </>
}
				<Text 
					style = {{
						fontSize: 12,
						marginHorizontal: 81,
					}}>
					{"Not registered yet? Create an account"}
				</Text>
			</ScrollView>
		</SafeAreaView>
		
    )
};

export default SignUp;