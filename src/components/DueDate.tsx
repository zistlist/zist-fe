import React, { useState } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const DueDate: React.FC = () =>{
  const d = new Date();
  const today = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  console.log('date: ', today);
  const [date, setDate] = useState<any| null>();
  const [focused, setFocused] = useState<boolean>(false);
  return (<>
    <SingleDatePicker
  date={date}
  onDateChange={date => setDate(date)}
  focused={focused}
  onFocusChange={({ focused }) => setFocused(!focused)}
  id="your_unique_id"
/>
    </>)
}

export default DueDate;
