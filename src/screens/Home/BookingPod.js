import React, { useState, useLayoutEffect } from 'react';
import { } from 'react-native';
import {
    View, Title, ModalCalendar, DateRangePicker, PrimaryButton,
    Loader,
} from '../../components';
import { moderateScale } from '../../libs/scaling';
import { Helper } from '../../libs/Helper';
import strings from '../../constants/localize';

let modalCalendarRange;

export default function BookingPod(props) {

    const {
        item,
        onPassProps,
    } = props.route.params;

    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(Helper.nowDate());
    const [endDate, setEndDate] = useState(Helper.nowDate());

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: item.title
        })
    }, [props.navigation])

    function _onPressBook() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            props.showAlert({
                message: 'Booking Success'
            })
            if (onPassProps) onPassProps();
            props.navigation.goBack();
        }, 3000);
    }

    function _renderModalCalendarRange() {
        return (
            <ModalCalendar
                title={'Booking Date'}
                modalRef={(modal) => modalCalendarRange = modal}
                initialRange={[startDate, endDate]}
                onSubmit={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                }}
            />
        )
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
                    marginBottom: moderateScale(32)
                }}
            />

            <PrimaryButton
                title={strings.BOOK}
                onPress={() => _onPressBook()}
            />

            <Loader visible={loading} />

            {_renderModalCalendarRange()}

        </View>
    );
}
