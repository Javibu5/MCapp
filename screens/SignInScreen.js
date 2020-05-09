import React from 'react';
import { TextInput, View, Button } from 'react-native';
import AuthConsumer from '../components/AuthProvider';

export const SignInScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AuthConsumer>
        {ctx => <Button title="Sign in" onPress={() => ctx.signIn({ username, password })} />}
      </AuthConsumer>
    </View>
  );
};
