import React, { useState } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const DatePick = ({ todo, setTodos }) => {
  const renderDue = (date) => 'Due ' + moment(date).fromNow()

  const isOverdue = (todo) => !todo.done && moment().diff(moment(todo.date)) > 0

  return (
    <div style={{marginLeft: 10}}>
      <div style={{ fontSize: 14, marginBottom: 5, fontFamily: 'sans-serif', color: isOverdue(todo) ? 'red' : 'black' }}>
        {todo.done ? "Done" : renderDue(todo.date)}
      </div>
      <DatePicker selected={new Date(todo.date)} onChange={(date) => setTodos(date)} />
    </div>
  )
}
