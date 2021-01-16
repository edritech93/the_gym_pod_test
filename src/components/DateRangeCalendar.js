import React, { Component } from 'react';
import { CalendarList } from 'react-native-calendars';
import { moderateScale } from '../libs/scaling';
import { Fonts, Colors } from '../themes';
import { Helper } from '../libs/Helper';

const XDate = require('../../node_modules/xdate');

export default class DateRangeCalendar extends Component<Props> {

    state = { isFromDatePicked: false, isToDatePicked: false, markedDates: {} }

    componentDidMount() { this.setupInitialRange() }

    onDayPress = (day) => {
        const { isSingle } = this.props;
        if (isSingle) {
            this._onIsSingle(day);
        } else {
            if (!this.state.isFromDatePicked || (this.state.isFromDatePicked && this.state.isToDatePicked)) {
                this.setupStartMarker(day)
                this.props.onStartDateSelected(day.dateString);
            } else if (!this.state.isToDatePicked) {
                let markedDates = {}
                let [mMarkedDates, range] = this.setupMarkedDates(this.state.fromDate, day.dateString, markedDates)
                if (range >= 0) {
                    this.setState({ isFromDatePicked: true, isToDatePicked: true, markedDates: mMarkedDates })
                    this.props.onSuccess(this.state.fromDate, day.dateString);
                } else {
                    this.setupStartMarker(day)
                }
            }
        }
    }

    _onIsSingle(day) {
        this.setupStartMarker(day)
        this.props.onStartDateSelected(day.dateString);
        this.setupStartMarker(day)
    }

    setupStartMarker = (day) => {
        let markedDates = { [day.dateString]: { startingDay: true, endingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor } }
        this.setState({ isFromDatePicked: true, isToDatePicked: false, fromDate: day.dateString, markedDates: markedDates })
    }

    setupMarkedDates = (fromDate, toDate, markedDates) => {
        let mFromDate = new XDate(fromDate)
        let mToDate = new XDate(toDate)
        let range = mFromDate.diffDays(mToDate)
        if (range >= 0) {
            if (range == 0) {
                markedDates = { [toDate]: { color: this.props.theme.markColor, textColor: this.props.theme.markTextColor } }
            } else {
                var stringStartDate = mFromDate.toString('yyyy-MM-dd');
                markedDates[stringStartDate] = { startingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor }
                for (var i = 1; i <= range; i++) {
                    let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
                    if (i < range) {
                        markedDates[tempDate] = { color: this.props.theme.markColor, textColor: this.props.theme.markTextColor }
                    } else {
                        markedDates[tempDate] = { endingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor }
                    }
                }
            }
        }
        return [markedDates, range]
    }

    setupInitialRange = () => {
        if (!this.props.initialRange) return
        let [fromDate, toDate] = this.props.initialRange;
        let markedDates = { [fromDate]: { startingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor } }
        let [mMarkedDates, range] = this.setupMarkedDates(fromDate, toDate, markedDates)
        this.setState({ markedDates: mMarkedDates, fromDate: fromDate })
    }

    render() {
        return (
            <CalendarList {...this.props}
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
                current={Helper.nowDate}
                current={this.state.fromDate}
                markedDates={this.state.markedDates}
                onDayPress={(day) => { this.onDayPress(day) }} />
        )
    }
}

DateRangeCalendar.defaultProps = {
    theme: { markColor: '#00adf5', markTextColor: '#ffffff' }
};