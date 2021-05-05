import React, { useEffect, useState } from 'react'
import './ListBooking.css'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBookings } from '../../redux/actions/booking/admin/fetchAllBookings.js'
import { deleteBooking } from '../../redux/actions/booking/admin/deleteBooking.js'
// user
import { fetchBookings } from '../../redux/actions/booking/user/fetchBookings.js'
import { deleteBookingUser } from '../../redux/actions/booking/user/deleteBookingUser.js'


// Components
import AddBooking from '../../components/booking/AddBooking.js'
import EditBooking from '../../components/booking/EditBooking.js'

// Helpers
import { convertDate } from '../../helpers/convertDate.js'

const ListBooking = () => {
  const dispatch = useDispatch()

  const bookings = useSelector(state => state.booking.bookings)

  const [isShowAddBookingForm, setIsShowAddBookingForm] = useState(false)
  const [isShowEditBookingForm, setIsShowEditBookingForm] = useState(false)
  const [bookingEdit, setBookingEdit] = useState({})

  const handleShowEditForm = booking => {
    setBookingEdit(booking)
    setIsShowEditBookingForm(true)
  }

  const handleDeleteBooking = id => {
    if (localStorage.getItem('user_role') === 'admin') {
      dispatch(deleteBooking({ id }))
    } else {
      dispatch(deleteBookingUser({ id }))
    }
  }

  useEffect(() => {
    if (localStorage.getItem('user_role') === 'admin') {
      dispatch(fetchAllBookings())
    } else {
      dispatch(fetchBookings())
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div className="row mt-5 justify-content-center">
      <h2 className="text-center mb-4">List Booking</h2>
      <div className="col-10">
        <div className="text-end mb-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsShowAddBookingForm(true)}
          >
            Add New Booking
            </button>
        </div>
        <table className="table text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Room Name</th>
              <th>Participants</th>
              <th>Date Booking</th>
              <th>Time from Booking</th>
              <th>Time to Booking</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.User.name}</td>
                  <td>{booking.Room.room_name}</td>
                  <td>{booking.participants}</td>
                  <td>{convertDate(booking.date_booking)}</td>
                  <td>{booking.time_from_booking}</td>
                  <td>{booking.time_to_booking}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning mx-1"
                      type="button"
                      onClick={() => handleShowEditForm(booking)}
                    >
                      Edit
                      </button>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      type="button"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      Delete
                      </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        isShowAddBookingForm ?
          <AddBooking
            setIsShowAddBookingForm={setIsShowAddBookingForm}
          />
          :
          null
      }
      {
        isShowEditBookingForm ?
          <EditBooking
            setIsShowEditBookingForm={setIsShowEditBookingForm}
            booking={bookingEdit}
          />
          :
          null
      }
    </div>
  )
}

export default ListBooking