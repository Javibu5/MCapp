import React from 'react';
import axios from "axios";

const { Provider, Consumer } = React.createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        },
      );

    const authContext = {
        signIn: async (data) => {
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token

          axios.post('https://127.0.0.1:8000/authentication_token', {
            username: data.username,
            password: data.password
          })
          .then(function (response) {
            console.log(response);
            dispatch({ type: 'SIGN_IN', token: response });
          })
          .catch(function (error) {
            console.log(error);
          });



        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async (data) => {
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token

  
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
        isUserLoggedIn: () => state.userToken !== null
    };

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
    
          try {
            userToken = await AsyncStorage.getItem('userToken');
          } catch (e) {
            // Restoring token failed
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          if(userToken) dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
    
        bootstrapAsync();
      }, []);

    return <Provider value={authContext}>{children}</Provider>;
};

export default Consumer;