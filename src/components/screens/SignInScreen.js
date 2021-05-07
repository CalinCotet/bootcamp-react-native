

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
import { colors, padding, fonts, radius } from '../base';
import { FIELDS_EMPTY } from '../common/constants';


const SignInScreen = (props) => {

    const [memberId, setMemberId] = React.useState('111111');
    const [password, setPassword] = React.useState('reactNative2021');

    const { signIn } = useContext(AuthContext);

    const logIn = () => {
        if ( memberId.length > 0 && password.length > 0 ) {
            signIn({ memberId, password });
        } else {
            Alert.alert(FIELDS_EMPTY);
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
        fontSize:fonts.xl,
        fontWeight:"bold",
        marginBottom:padding.xl,
    },
    loginBtn: {
        alignItems:"center",
        backgroundColor:colors.logo,
        borderRadius:radius.md,
        height:50,
        justifyContent:"center",
        marginBottom:padding.sm,
        marginTop:padding.xl,
        width:"80%",
    },
    inputView:{
        backgroundColor:colors.input,
        borderRadius:radius.md,
        height:50,
        justifyContent:"center",
        marginBottom:padding.lg,
        padding:padding.lg,
        width:"80%",
      }
  });

export default SignInScreen;