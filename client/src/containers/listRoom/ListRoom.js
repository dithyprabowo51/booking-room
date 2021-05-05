import React, { useEffect, useState } from 'react'
import './ListRoom.css'

// Components
import AddRoom from '../../components/room/AddRoom.js'
import EditRoom from '../../components/room/EditRoom.js'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRooms } from '../../redux/actions/room/fetchAllRooms.js'
import { deleteRoom } from '../../redux/actions/room/deleteRoom.js'

const ListRoom = () => {
  const dispatch = useDispatch()

  const rooms = useSelector(state => state.room.rooms)

  const [isShowAddRoomForm, setIsShowAddRoomForm] = useState(false)
  const [isShowEditRoomForm, setIsShowEditRoomForm] = useState(false)
  const [roomEdit, setRoomEdit] = useState({})

  const handleShowEdit = room => {
    setRoomEdit(room)
    setIsShowEditRoomForm(true)
  }

  const handleDeleteRoom = id => {
    dispatch(deleteRoom({ id }))
  }

  useEffect(() => {
    dispatch(fetchAllRooms())
    // eslint-disable-next-line
  }, [])

  return (
    <div className="row mt-5 justify-content-center">
      <h2 className="text-center mb-4">List Rooms</h2>
      <div className="col-7">
        {
          localStorage.getItem('user_role') === 'admin' ?
            <div className="text-end mb-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsShowAddRoomForm(true)}
              >
                Add New Room
            </button>
            </div>
            :
            null
        }
        <table className="table text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Room Name</th>
              <th>Min Capacity</th>
              <th>Max Capacity</th>
              {
                localStorage.getItem('user_role') === 'admin' ?
                  <th>Action</th>
                  :
                  null
              }
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
                  {
                    localStorage.getItem('user_role') === 'admin' ?
                      <td>
                        <button
                          className="btn btn-sm btn-warning mx-1"
                          type="button"
                          onClick={() => handleShowEdit(room)}
                        >
                          Edit
                      </button>
                        <button
                          className="btn btn-sm btn-danger mx-1"
                          type="button"
                          onClick={() => handleDeleteRoom(room.id)}
                        >
                          Delete
                      </button>
                      </td>
                      :
                      null
                  }
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
      {
        isShowEditRoomForm ?
          <EditRoom
            setIsShowEditRoomForm={setIsShowEditRoomForm}
            room={roomEdit}
          />
          :
          null
      }
    </div>
  )
}

export default ListRoom