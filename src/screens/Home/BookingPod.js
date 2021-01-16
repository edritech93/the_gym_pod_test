import React, {useState, useLayoutEffect, useEffect} from 'react';
import {} from 'react-native';
import {
  View,
  ModalCalendar,
  DateRangePicker,
  PrimaryButton,
  Loader,
} from '../../components';
import {moderateScale} from '../../libs/scaling';
import {Helper} from '../../libs/Helper';
import strings from '../../constants/localize';
import {Colors} from '../../themes';

let modalCalendarRange;

export default function BookingPod(props) {
  const {item, onPassProps} = props.route.params;

  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(Helper.nowDate());
  const [endDate, setEndDate] = useState(Helper.nowDate());
  const [bookedDate, setBookedDate] = useState([]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: item.title,
    });
  }, [props.navigation]);

  useEffect(() => {
    _loadBookingDate();
  }, []);

  function _loadBookingDate() {
    let objMarked = {};
    for (let i = 0; i < 300; i++) {
      const date = randomDate(new Date(), new Date(2025, 12, 1));
      objMarked[Helper.dateFormat(date)] = {
        disabled: true,
        color: Colors.red,
        textColor: Colors.white,
        startingDay: true,
        endingDay: true,
      };
    }
    console.log('------------------------------------');
    console.log('objMarked => ', objMarked);
    console.log('------------------------------------');
    setBookedDate(objMarked);
  }

  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    ).toISOString();
  }

  function _onPressBook() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.showAlert({
        message: 'Booking Success',
      });
      if (onPassProps) {
        onPassProps();
      }
      props.navigation.goBack();
    }, 3000);
  }

  function _renderModalCalendarRange() {
    return (
      <ModalCalendar
        title={'Booking Date'}
        modalRef={(modal) => (modalCalendarRange = modal)}
        booked={bookedDate}
        isSingle={true}
        initialRange={[startDate, endDate]}
        onSubmit={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />
    );
  }

  return (
    <View>
      <DateRangePicker
        title={'Booking Date'}
        selectedRange={[startDate, endDate]}
        onPress={() => {
          if (modalCalendarRange) {
            modalCalendarRange.open();
          }
        }}
        containerStyle={{
          marginBottom: moderateScale(32),
        }}
      />

      <PrimaryButton title={strings.BOOK} onPress={() => _onPressBook()} />

      <Loader visible={loading} />

      {_renderModalCalendarRange()}
    </View>
  );
}
