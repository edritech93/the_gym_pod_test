import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Fonts } from '../themes';

class Notification extends React.Component {

  onPressNotif() {
    this.props.onPress();
  }

  render() {
    const { alertType, message } = this.props
    var alertMessage = '';
    let backgroundColor;
    let borderColor;
    let textColor;

    switch (alertType) {
      case 'success':
        backgroundColor = "#DFF0D8";
        borderColor = '#D6E9C6';
        textColor = '#3C763D'
        break;

      case 'error':
        backgroundColor = "#F2DEDE";
        borderColor = '#EBCCD1';
        textColor = '#A71725'
        break;

      case 'warning':
        backgroundColor = "#FCF8E3";
        borderColor = '#FAEBCC';
        textColor = '#8A6D3B';
        break;

      case 'info':
        backgroundColor = "#D9EDF7";
        borderColor = '#BCE8F1';
        textColor = '#1684F1';
        break;

      default:
        backgroundColor = "#e74c3c"
        break;
    }

    if (typeof message === 'string') {
      alertMessage = message
    } else {
      alertMessage = message.message
    }

    return (

      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', paddingRight: 8, paddingLeft: 8 }}>
        <TouchableOpacity style={[styles.container, { backgroundColor: backgroundColor }]}
          onPress={this.onPressNotif.bind(this)}>
          <View style={styles.content}>
            <Text style={[styles.message, { color: textColor }]}>{alertMessage}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    backgroundColor: '#ff505c',
    marginTop: Dimensions.get('window').height * 0.04,
    borderRadius: 4,
    shadowColor: "rgba(0,0,0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 3,
    shadowRadius: 1,
    elevation: 1,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1
  },
  body: {
    flex: 1,
  },
  message: {
    fontFamily: Fonts.type.displayRegular,
    fontSize: 17,
    color: 'white',
  },
  icon: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  pannel: {
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default Notification;