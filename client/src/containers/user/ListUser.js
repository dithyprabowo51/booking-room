import React, { useEffect } from 'react'

// Redux
import { fetchAllUsers } from '../../redux/actions/user/fetchAllUsers.js'
import { updateRole } from '../../redux/actions/user/updateRole.js'
import { useDispatch, useSelector } from 'react-redux'

const ListUser = () => {
  const dispatch = useDispatch()

  const users = useSelector(state => state.user.users)

  const handleChangeRole = (event, id) => {
    dispatch(updateRole({
      id,
      user_role: event.target.value
    }))
  }

  useEffect(() => {
    dispatch(fetchAllUsers())
    // eslint-disable-next-line
  }, [])

  return (
    <div className="row justify-content-center">
      <h2 className="text-center mt-5 mb-4">List Users</h2>
      <div className="col-5">
        <table className="table text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select onChange={event => handleChangeRole(event, user.id)} value={user.user_role}>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListUser