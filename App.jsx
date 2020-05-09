
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthConsumer, { AuthProvider } from './components/AuthProvider';
import { SignInScreen } from './screens/SignInScreen';

const Stack = createStackNavigator();

function buildNavigationBasedInAuth(ctx) {
  const userLogged = ctx.isUserLoggedIn();

  console.log(userLogged);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={userLogged ? "BottomTabNavigator" : "SignIn"}
        component={userLogged ? BottomTabNavigator : SignInScreen} 
      />
    </Stack.Navigator>
  );
}

export default function App() {  
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthConsumer>
          {buildNavigationBasedInAuth}
        </AuthConsumer>
      </NavigationContainer>
    </AuthProvider>
  );
}
