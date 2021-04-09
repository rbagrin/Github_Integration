import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Debug () {
  const [users, setUsers] = useState([])
  const [credentials, setCredentials] = useState([])
  const [octocat, setOctocat] = useState(null)

  useEffect(() => {
    async function fetchData () {
      const [usersResponse, credentialsResponse, octocat] = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/credentials'),
        axios.get('/api/github/test-request')
      ])

      setUsers(usersResponse.data.users)
      setCredentials(credentialsResponse.data.credentials)
      setOctocat(octocat)
    }

    fetchData()
  }, [])

  return (
    <div className='bg-gray-700 h-screen overflow-auto'>
      <h1 className='text-2xl font-bold mb-8 mt-4 text-white'>Debug</h1>
      <div className='w-3/5 m-auto border p-4 mb-8 bg-white'>
        <h2 className='text-xl text-left font-bold p-4'>Users</h2>
        <ul className='divide-y divide-gray-200 ml-8'>
          <li key='header' className='p-4 flex bg-gray-100 font-bold'>
            <div className='flex w-1/12'>id</div>
            <div className='flex w-4/12'>Username</div>
            <div className='flex w-4/12'>Password</div>
            <div className='flex w-2/12'>Role</div>
          </li>
          {users.map((user) => {
            return (
              <li className='p-4 flex' key={user.id}>
                <div className='flex w-1/12'>{user.id}</div>
                <div className='flex w-4/12'>{user.username}</div>
                <div className='flex w-4/12'>{user.password}</div>
                <div className='flex w-2/12'>{user.role}</div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='w-3/5 m-auto border p-4 mb-8 bg-white'>
        <h2 className='text-xl text-left font-bold p-4'>Credentials</h2>
        <ul className='divide-y divide-gray-200 ml-8'>
          <li key='header' className='p-4 flex bg-gray-100 font-bold'>
            <div className='flex w-1/12'>id</div>
            <div className='flex w-3/12'>App Name</div>
            <div className='flex w-4/12'>Access Token</div>
            <div className='flex w-4/12'>Refresh Token</div>
          </li>
          {credentials.map((credential) => {
            return (
              <li className='p-4 flex' key={credential.id}>
                <div className='flex w-1/12'>{credential.id}</div>
                <div className='flex w-3/12'>{credential.appName}</div>
                <div className='flex w-4/12'>{credential.accessToken}</div>
                <div className='flex w-4/12'>{credential.refreshToken}</div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='w-3/5 m-auto border p-4 mb-8 bg-white'>
        <h2 className='text-xl text-left font-bold p-4'>Octocat</h2>
        <div className='text-left'>
          <pre>
            {JSON.stringify(octocat, null, '\t')}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Debug
