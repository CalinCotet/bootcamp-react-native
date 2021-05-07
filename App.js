import 'react-native-gesture-handler';
import React from 'react';
import { Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { logInUser } from './src/components/helpers/data-helpers';
import AuthContext from './src/components/context/context';
import BadgeScreen from './src/components/screens/BadgeScreen';
import BookHistoryScreen from './src/components/screens/BookHistoryScreen';
import LibrariesScreen from './src/components/screens/LibrariesScreen';
import SignInScreen from './src/components/screens/SignInScreen';
import Loading from './src/components/common/Loading';
import { BAD_CREDENTIALS } from './src/components/common/constants';

const Drawer = createDrawerNavigator();

export default function App() {


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
            userId: action.userId,
            isLoading: false,
          };
        case 'IS_LOADING': 
          return {
            ...prevState,
            isLoading: action.isLoading,
          }
      }
    },
    {
      isLoading: false,
      isSignout: false,
      token: null,
    }
  );

  const signIn = async (data) => {
    dispatch({type: 'IS_LOADING', isLoading: true})
    logInUser(data)
    .then(res => {
      dispatch({ type: 'SIGN_IN', token: res.token, userId: res.userId });
    })
    .catch(error => {
      dispatch({type: 'IS_LOADING', isLoading: false})
      console.log('error', error);
      Alert.alert(BAD_CREDENTIALS);
    })
  }

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <Loading/>;
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      token: state.token,
      userId: state.userId,
    }}>
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="BadgeScreen"
          backBehavior='order'
          drawerType='front'
          minSwipeDistance='100'
        >
          {state.token === null ? 
          (
            <Drawer.Screen name="SignInScreen" component={SignInScreen} options={{title: 'SignIn'}}/>
          ) : (
            <>
              <Drawer.Screen name="BadgeScreen" component={BadgeScreen} options={{title: 'My Badge ID'}}/>
              <Drawer.Screen name="BookHistoryScreen" component={BookHistoryScreen} options={{title: 'Book History'}}/>
              <Drawer.Screen name="LibrariesScreen" component={LibrariesScreen} options={{title: 'Look for libraries'}}/>
            </>
          )
        }
        
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
