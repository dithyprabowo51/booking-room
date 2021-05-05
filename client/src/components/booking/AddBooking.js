import React, { useEffect, useState } from 'react'
import './AddBooking.css'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRooms } from '../../redux/actions/room/fetchAllRooms.js'
import { fetchAllUsers } from '../../redux/actions/user/fetchAllUsers.js'
import { addBooking } from '../../redux/actions/booking/admin/addBooking.js'
// user
import { addBookingUser } from '../../redux/actions/booking/user/addBookingUser.js'

const AddBooking = props => {
  const dispatch = useDispatch()

  const rooms = useSelector(state => state.room.rooms)
  const users = useSelector(state => state.user.users)

  const [roomId, setRoomId] = useState('')
  const [userId, setUserId] = useState('')
  const [participants, setParticipants] = useState(0)
  const [date_booking, setDate_booking] = useState(new Date())
  const [time_from_booking, setTime_from_booking] = useState('00:00')
  const [time_to_booking, setTime_to_booking] = useState('00:00')
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
      dispatch(addBooking({
        user_id: userId,
        room_id: roomId,
        participants,
        date_booking,
        time_from_booking,
        time_to_booking
      }))
    } else {
      dispatch(addBookingUser({
        room_id: roomId,
        participants,
        date_booking,
        time_from_booking,
        time_to_booking
      }))
    }
    props.setIsShowAddBookingForm(false)
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
          <h5 className="card-title text-center mb-4">New Booking Form</h5>
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
                  <label className="form-label">User: </label>
                  <select className="form-select" value={userId} onChange={event => setUserId(event.target.value)}>
                    <option value="">=== Choise User ===</option>
                    {
                      users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                      ))
                    }
                  </select>
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
                onClick={() => props.setIsShowAddBookingForm(false)}
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

export default AddBooking