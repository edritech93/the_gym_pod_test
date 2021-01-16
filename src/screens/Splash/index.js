import React, {useEffect} from 'react';
import {View as DefaultView} from 'react-native';
import {View, Loader, Title} from '../../components';
import {moderateScale} from '../../libs/scaling';
import {Helper} from '../../libs/Helper';
import NavigationService from './../../libs/NavigationService';

export default function Splash(props) {
  useEffect(() => {
    setTimeout(() => {
      _loadToken();
    }, 3000);
  }, []);

  async function _loadToken() {
    const token = await Helper.getToken();
    if (token) {
      NavigationService.resetRoot('Dashboard');
    } else {
      NavigationService.resetRoot('Login');
    }
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Title>Logo Here</Title>

      <DefaultView
        style={{
          position: 'absolute',
          bottom: moderateScale(32),
        }}>
        <Loader visible={true} />
      </DefaultView>
    </View>
  );
}
