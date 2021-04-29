

import React, { useContext } from 'react';
import { 
    Alert,
    StyleSheet,
    Text,
    TextInput, 
    TouchableOpacity, 
    View,
} from 'react-native';

import AuthContext from '../context/context';
import { colors } from '../base';


const SignInScreen = (props) => {

    const [memberId, setMemberId] = React.useState('111111');
    const [password, setPassword] = React.useState('reactNative2021');

    const { signIn } = useContext(AuthContext);

    const logIn = () => {
        if ( memberId.length > 0 && password.length > 0 ) {
            signIn({ memberId, password });
        } else {
            Alert.alert('bad credentials')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>BOOKS</Text>
            <View style={styles.inputView}>
                <TextInput
                    placeholder="Member ID"
                    placeholderTextColor="white"
                    value={memberId}
                    onChangeText={setMemberId}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="white"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={logIn}>
            <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'center',
    },
    logo:{
        color:colors.logo,
        fontSize:50,
        fontWeight:"bold",
        marginBottom:40,
    },
    loginBtn: {
        alignItems:"center",
        backgroundColor:colors.logo,
        borderRadius:25,
        height:50,
        justifyContent:"center",
        marginBottom:10,
        marginTop:40,
        width:"80%",
    },
    inputView:{
        backgroundColor:colors.input,
        borderRadius:25,
        height:50,
        justifyContent:"center",
        marginBottom:20,
        padding:20,
        width:"80%",
      }
  });

export default SignInScreen;