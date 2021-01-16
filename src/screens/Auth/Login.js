import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {
  View,
  ScrollView,
  PrimaryButtonLoading,
  Title,
  Inputs,
} from '../../components';
import {PASSWORD_TEST, USER_TEST} from '../../constants/data';
import {moderateScale} from '../../libs/scaling';
import {Helper} from '../../libs/Helper';
import NavigationService from '../../libs/NavigationService';
import strings from '../../constants/localize';

export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function _onPressLogin() {
    if (username && password) {
      setLoading(true);

      //NOTE: for testing only
      setTimeout(() => {
        setLoading(false);
        if (username === USER_TEST && password === PASSWORD_TEST) {
          Helper.setToken('123qwe');
          NavigationService.resetRoot('Dashboard');
        } else {
          props.showAlert({
            message: 'Username/Password is wrong',
          });
        }
      }, 3000);
    } else {
      if (!username) {
        setUsernameError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
    }
  }

  return (
    <View>
      <ScrollView>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={'padding'}
          enabled={Platform.OS === 'ios' ? true : false}>
          <Title
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: moderateScale(80),
              marginBottom: moderateScale(50),
            }}>
            Logo Here
          </Title>

          <Inputs
            title={strings.USERNAME}
            value={username}
            isError={usernameError}
            keyboardType={'email-address'}
            onChange={(value) => {
              setUsername(value);
              setUsernameError(false);
            }}
            containerStyle={{
              marginBottom: moderateScale(16),
            }}
          />

          <Inputs
            title={strings.PASSWORD}
            value={password}
            isPassword={true}
            isError={passwordError}
            onChange={(value) => {
              setPassword(value);
              setPasswordError(false);
            }}
            containerStyle={{
              marginBottom: moderateScale(32),
            }}
          />

          <PrimaryButtonLoading
            style={{
              marginBottom: moderateScale(16),
            }}
            loading={loading}
            title={strings.LOGIN}
            onPress={() => _onPressLogin()}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
