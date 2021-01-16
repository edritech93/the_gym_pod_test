import React, { useState, useEffect } from 'react';
import { CalendarList } from 'react-native-calendars';
import { moderateScale } from '../libs/scaling';
import { Fonts, Colors } from '../themes';

const XDate = require('xdate');

export default function Calendar(props) {

    const {
        initialRange,
        isSingle = false,
        onSuccess,
        theme = { markColor: '#00adf5', markTextColor: '#ffffff' },
        onStartDateSelected,
        ...restProps
    } = props;

    const [isFromDatePicked, setIsFromDatePicked] = useState(false);
    const [isToDatePicked, setIsToDatePicked] = useState(false);
    const [markedDates, setMarkedDates] = useState({});
    const [fromDate, setFromDate] = useState(null);

    useEffect(() => {
        _setupInitialRange();
    }, []);

    function _setupInitialRange() {
        if (!initialRange) return
        const [fromDate, toDate] = initialRange;
        const initMark = {
            [fromDate]: {
                startingDay: true,
                color: theme.markColor,
                textColor: theme.markTextColor
            }
        }
        const [mark, range] = _setupMarkedDates(fromDate, toDate, initMark)
        setMarkedDates(mark);
        setFromDate(fromDate)
    }

    function _setupMarkedDates(from, to, mark) {
        const mFromDate = new XDate(from)
        const mToDate = new XDate(to)
        const range = mFromDate.diffDays(mToDate)
        if (range >= 0) {
            if (range == 0) {
                mark = {
                    [to]: {
                        color: theme.markColor,
                        textColor: theme.markTextColor
                    }
                }
            } else {
                const stringStartDate = mFromDate.toString('yyyy-MM-dd');
                mark[stringStartDate] = {
                    startingDay: true, color:
                        theme.markColor,
                    textColor: theme.markTextColor
                }
                for (let i = 1; i <= range; i++) {
                    let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
                    if (i < range) {
                        mark[tempDate] = {
                            color: theme.markColor,
                            textColor: theme.markTextColor
                        }
                    } else {
                        mark[tempDate] = {
                            endingDay: true,
                            color: theme.markColor,
                            textColor: theme.markTextColor
                        }
                    }
                }
            }
        }
        return [mark, range]
    }

    function _onPressDay(day) {
        if (isSingle) {
            _onIsSingle(day);
        } else {
            if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
                _setupStartMarker(day)
                onStartDateSelected(day.dateString);
            } else if (!isToDatePicked) {
                const [mMarkedDates, range] = _setupMarkedDates(fromDate, day.dateString, {})
                if (range >= 0) {
                    setIsFromDatePicked(true);
                    setIsToDatePicked(true);
                    setMarkedDates(mMarkedDates)
                    onSuccess(fromDate, day.dateString);
                } else {
                    _setupStartMarker(day)
                }
            }
        }
    }

    function _onIsSingle(day) {
        _setupStartMarker(day)
        onStartDateSelected(day.dateString);
    }

    function _setupStartMarker(day) {
        setIsFromDatePicked(true);
        setIsToDatePicked(false);
        setFromDate(day.dateString);
        setMarkedDates({
            [day.dateString]: {
                startingDay: true,
                endingDay: true,
                color: theme.markColor,
                textColor: theme.markTextColor
            }
        })
    }

    return (
        <CalendarList
            theme={{
                textMonthFontSize: moderateScale(16),
                textDayFontSize: moderateScale(14),
                textDayHeaderFontSize: moderateScale(12),
                textDayFontFamily: Fonts.type.regular,
                textMonthFontFamily: Fonts.type.regular,
                textDayHeaderFontFamily: Fonts.type.regular,
                monthTextColor: Colors.black,
            }}
            markingType={'period'}
            current={fromDate}
            markedDates={markedDates}
            onDayPress={(day) => _onPressDay(day)}
            {...restProps}
        />
    )
}