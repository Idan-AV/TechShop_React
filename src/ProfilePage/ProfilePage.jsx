import React, { useState } from 'react'
import ProfilePageEdit from './ProfilePageEdit'
import ProfilePageView from './ProfilePageView'

const ProfilePage = () => {
    const [isEdit , setIsEdit] = useState(false)
  return (
    <>
    {isEdit ?
    <ProfilePageEdit setIsEdit={setIsEdit}/>
    :
    <ProfilePageView setIsEdit={setIsEdit}/>


    }

    </>
  )
}

export default ProfilePage