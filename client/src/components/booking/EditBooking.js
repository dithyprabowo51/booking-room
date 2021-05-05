import React, { useEffect, useState } from 'react'
import './EditBooking.css'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRooms } from '../../redux/actions/room/fetchAllRooms.js'
import { fetchAllUsers } from '../../redux/actions/user/fetchAllUsers.js'
import { editBooking } from '../../redux/actions/booking/admin/editBooking.js'
// user
import { editBookingUser } from '../../redux/actions/booking/user/editBookingUser.js'


// Helpers
import { convertDate } from '../../helpers/convertDate.js'

const EditBooking = props => {
  const dispatch = useDispatch()

  const rooms = useSelector(state => state.room.rooms)

  const [roomId, setRoomId] = useState(props.booking.room_id)
  const [userId] = useState(props.booking.user_id)
  const [participants, setParticipants] = useState(props.booking.participants)
  const [date_booking, setDate_booking] = useState(convertDate(props.booking.date_booking))
  const [time_from_booking, setTime_from_booking] = useState(props.booking.time_from_booking)
  const [time_to_booking, setTime_to_booking] = useState(props.booking.time_to_booking)
  const [errorValidation, setErrorValidation] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    if (localStorage.getItem('user_role') === 'admin') {
      if (!userId) return setErrorValidation('User field cannot be empty')
    }
    if (participants < 1) return setErrorValidation('Min capacity is 1')
    if (roomId === '') return setErrorValidation('Room name field cannot be empty')
    // eslint-disable-next-line
    const findRoom = rooms.find(room => room.id == roomId)
    if (participants > findRoom.max_capacity) return setErrorValidation('Participants must be less than max capacity room')
    if (localStorage.getItem('user_role') === 'admin') {
      dispatch(editBooking({
        id: props.booking.id,
        room_id: roomId,
        participants,
        date_booking,
        time_from_booking,
        time_to_booking
      }))
    } else {
      dispatch(editBookingUser({
        id: props.booking.id,
        room_id: roomId,
        participants,
        date_booking,
        time_from_booking,
        time_to_booking
      }))
    }
    props.setIsShowEditBookingForm(false)
  }

  useEffect(() => {
    dispatch(fetchAllRooms())
    if (localStorage.getItem('user_role') === 'admin') {
      dispatch(fetchAllUsers())
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="add-booking">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Edit Booking Form</h5>
          {
            errorValidation ?
              <p className="text-danger text-center">{errorValidation}</p>
              :
              null
          }
          <form onSubmit={handleSubmit}>
            {
              localStorage.getItem('user_role') === 'admin' ?
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">User :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="user"
                    defaultValue={props.booking.User.name}
                    readOnly
                  />
                </div>
                :
                null
            }
            <div className="mb-3">
              <label className="form-label">Room Name: </label>
              <select className="form-select" value={roomId} onChange={event => setRoomId(event.target.value)}>
                <option value="">=== Choise Room ===</option>
                {
                  rooms.map(room => (
                    <option key={room.id} value={room.id}>{room.room_name}</option>
                  ))
                }
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="participants" className="form-label">Participants :</label>
              <input
                type="number"
                className="form-control"
                id="participants"
                value={participants}
                onChange={event => setParticipants(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date_booking" className="form-label">Booking Date :</label>
              <input
                type="date"
                className="form-control"
                id="date_booking"
                value={date_booking}
                onChange={event => setDate_booking(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time_from_booking" className="form-label">Time from Booking :</label>
              <input
                type="time"
                className="form-control"
                id="time_from_booking"
                value={time_from_booking}
                onChange={event => setTime_from_booking(event.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="time_to_booking" className="form-label">Time to Booking :</label>
              <input
                type="time"
                className="form-control"
                id="time_to_booking"
                value={time_to_booking}
                onChange={event => setTime_to_booking(event.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-danger mx-2"
                onClick={() => props.setIsShowEditBookingForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary mx-2">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditBooking