import React, { useContext } from 'react'
import '../Profile/Profile.css'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../Hooks/UseAuthHook'
import { Button } from '../Button/Button'
import ChangePassword from '../ChangePassword/ChangePassword'
import Input from '../Input/Input'
import Title from '../Title/Title'

const Profile = () => {
    const {
        handleSubmit,
        register,
        formState:{errors}
    }=useForm()
    const {user,updateProfile}=useContext(AuthContext)
    const submit=()=>{
        updateProfile(user)
    }
  return (
    <div className='container'>
      <div className='details'>
        <Title title="Update Profile" />
        <form onSubmit={handleSubmit(submit)}>
          <Input
            defaultValue={user.name}
            type="text"
            label="Name"
            {...register('name', {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />
          <Input
            defaultValue={user.address}
            type="text"
            label="Address"
            {...register('address', {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
          />

          <Button type="submit" text="Update" backgroundColor="#009e84" />
        </form>

        <ChangePassword />
      </div>
    </div>
  );
}

export default Profile