import React, { useEffect, useState } from 'react'
import './ListRoom.css'

// Components
import AddRoom from '../../components/room/AddRoom.js'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRooms } from '../../redux/actions/room/fetchAllRooms.js'

const ListRoom = () => {
  const dispatch = useDispatch()

  const rooms = useSelector(state => state.room.rooms)

  const [isShowAddRoomForm, setIsShowAddRoomForm] = useState(false)

  useEffect(() => {
    dispatch(fetchAllRooms())
    // eslint-disable-next-line
  }, [])

  return (
    <div className="row mt-5 justify-content-center">
      <h2 className="text-center mb-4">List Rooms</h2>
      <div className="col-7">
        <div className="text-end mb-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsShowAddRoomForm(true)}
          >
            Add New Room
          </button>
        </div>
        <table className="table text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Room Name</th>
              <th>Min Capacity</th>
              <th>Max Capacity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              rooms.map((room, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.room_name}</td>
                  <td>{room.min_capacity}</td>
                  <td>{room.max_capacity}</td>
                  <td>
                    <button className="btn btn-sm btn-warning mx-1">Edit</button>
                    <button className="btn btn-sm btn-danger mx-1">Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        isShowAddRoomForm ?
          <AddRoom
            setIsShowAddRoomForm={setIsShowAddRoomForm}
          />
          :
          null
      }
    </div>
  )
}

export default ListRoom