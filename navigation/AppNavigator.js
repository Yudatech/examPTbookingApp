import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer  } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';


const AppStack = createStackNavigator({Main: MainTabNavigator});
const AuthStack = createStackNavigator({ SignIn: SignInScreen});
const SignupStack = createStackNavigator({SignUp: SignUpScreen});

export default createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
    SignUp: SignupStack,
  }
);
