import React, { useState } from 'react'
import './EditRoom.css'

// Redux
import { useDispatch } from 'react-redux'
import { editRoom } from '../../redux/actions/room/editRoom.js'

const EditRoom = props => {
  const dispatch = useDispatch()

  const [room_name, setRoom_name] = useState(props.room.room_name)
  const [min_capacity, setMin_capacity] = useState(props.room.min_capacity)
  const [max_capacity, setMax_capacity] = useState(props.room.max_capacity)
  const [errorValidation, setErrorValidation] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    if (!room_name) return setErrorValidation('Room name field cannot be empty')
    if (min_capacity < 1) return setErrorValidation('Min capacity is 1')
    if (min_capacity >= max_capacity) return setErrorValidation('Min capacity must less than max capacity')
    dispatch(editRoom({
      id: props.room.id,
      room_name,
      min_capacity,
      max_capacity
    }))
    props.setIsShowEditRoomForm(false)
  }

  return (
    <div className="edit-room">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Edit Room Form</h5>
          {
            errorValidation ?
              <p className="text-danger text-center">{errorValidation}</p>
              :
              null
          }
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="room_name" className="form-label">Room Name :</label>
              <input
                type="text"
                className="form-control"
                id="room_name"
                value={room_name}
                onChange={event => setRoom_name(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="min_capacity" className="form-label">Min Capacity :</label>
              <input
                type="number"
                className="form-control"
                id="min_capacity"
                value={min_capacity}
                onChange={event => setMin_capacity(event.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="max_capacity" className="form-label">Max Capacity :</label>
              <input
                type="number"
                className="form-control"
                id="max_capacity"
                value={max_capacity}
                onChange={event => setMax_capacity(event.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-danger mx-2"
                onClick={() => props.setIsShowEditRoomForm(false)}
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

export default EditRoom