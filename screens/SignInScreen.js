import React from 'react';
import { View , Form , Label } from 'react-native';
import AuthConsumer from '../components/AuthProvider';
import {InputItem , Button} from '@ant-design/react-native'

export const SignInScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <Form>
        <Label>Username</Label>
           <InputItem placeholder="Username"
                      value={username}
                      onChangeText={setUsername}/>       
         <Label>Password</Label>
            <InputItem       
                      placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry/>
              
      </Form>
      <AuthConsumer>
        {ctx => <Button title="Sign in" onPress={() => ctx.signIn({ username, password })} />}
      </AuthConsumer>
    </View>
  );
};
