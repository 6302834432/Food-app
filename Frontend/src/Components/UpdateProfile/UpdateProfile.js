import React from 'react'
import Input from '../Input/Input'
import { Button } from '../Button/Button'
import { useForm } from 'react-hook-form'
import Title from '../Title/Title'
import { useContext } from 'react'
import { AuthContext } from '../../Hooks/UseAuthHook'
const UpdateProfile = () => {
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

      </div>
    </div>
    
)
}

export default UpdateProfile