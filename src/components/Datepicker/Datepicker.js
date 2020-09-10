import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDatepicker, START_DATE } from '@datepicker-react/hooks'
import { noop } from '../../utilities/other'
import DatepickerContext from './Datepicker.Context'
import { CalendarContainerUI } from './Datepicker.css'
import PeriodCalendar from './Datepicker.PeriodCalendar'
import DailyCalendar from './Datepicker.DailyCalendar'

function Datepicker({
  allowFutureDatePick,
  endDate,
  firstDayOfWeek,
  minBookingDays,
  numberOfMonths,
  onDateChange,
  startDate,
}) {
  const [dates, setDates] = useState({
    startDate,
    endDate: endDate || startDate,
    focusedInput: START_DATE,
  })
  const [deepNavVisible, setDeepNavVisibility] = useState(false)

  const {
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToDate,
    goToPreviousMonthsByOneMonth,
    goToNextMonthsByOneMonth,
    goToPreviousYear,
    goToNextYear,
  } = useDatepicker({
    startDate: dates.startDate,
    endDate: dates.endDate,
    focusedInput: dates.focusedInput,
    onDatesChange: handleDateChange,
    numberOfMonths,
    exactMinBookingDays: minBookingDays === 1,
    maxBookingDate: !allowFutureDatePick ? new Date() : undefined,
  })

  function handleDateChange(data) {
    if (!data.focusedInput) {
      setDates({ ...data, focusedInput: START_DATE })
    } else {
      setDates(data)
    }

    onDateChange(data)
  }

  return (
    <DatepickerContext.Provider
      value={{
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateSelect,
        onDateFocus,
        onDateHover,
      }}
    >
      <div>
        <strong>Date: </strong>
        <span>{dates.startDate && dates.startDate.toLocaleString()}</span>
        <br />
        <br />
      </div>
      <CalendarContainerUI
        className="c-Calendar"
        numberOfMonths={numberOfMonths}
      >
        {!deepNavVisible ? (
          <>
            <DailyCalendar
              activeMonths={activeMonths}
              allowFutureDatePick={allowFutureDatePick}
              firstDayOfWeek={firstDayOfWeek}
              goToPreviousMonth={goToPreviousMonthsByOneMonth}
              goToNextMonth={goToNextMonthsByOneMonth}
              numberOfMonths={numberOfMonths}
              onDeepNavigationClick={() => {
                setDeepNavVisibility(!deepNavVisible)
              }}
            />
          </>
        ) : (
          <PeriodCalendar
            activeMonths={activeMonths}
            allowFutureDatePick={allowFutureDatePick}
            goToDate={(newDate, switchCalendar) => {
              goToDate(newDate)
              switchCalendar && setDeepNavVisibility(false)
            }}
            goToNextYear={goToNextYear}
            goToPreviousYear={goToPreviousYear}
            startDate={dates.startDate}
          />
        )}
      </CalendarContainerUI>
    </DatepickerContext.Provider>
  )
}

Datepicker.defaultProps = {
  allowFutureDatePick: true,
  endDate: null,
  firstDayOfWeek: 1,
  minBookingDays: 1,
  numberOfMonths: 1,
  startDate: null,
  onDateChange: noop,
}

Datepicker.propTypes = {
  /** Whether is possible to pick a date in the future */
  allowFutureDatePick: PropTypes.bool,
  /** Pass an ending date to the calendar to select range. Note: Range not supported yet */
  endDate: PropTypes.instanceOf(Date),
  /** Which day of the week is first in the calendar (0 -> sunday, 1 -> monday, etc) */
  firstDayOfWeek: PropTypes.number,
  /** How many days can be selected in a range (minimum). Note: Currently supported 1 */
  minBookingDays: PropTypes.number,
  /** How many months to display at the same time. Note: Currently supported 1 */
  numberOfMonths: PropTypes.number,
  /** Pass a starting date to the calendar to be selected */
  startDate: PropTypes.instanceOf(Date),
  /** Callback when the date is changed */
  onDateChange: PropTypes.func,
}

export default Datepicker
