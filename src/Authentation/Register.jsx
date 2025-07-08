import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import CustomHooks from '../Hooks/CustomHooks';
import { Link } from 'react-router'; // ✅ correct import
import Sociallogin from './Sociallogin';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser , updateUserProfile} = CustomHooks();

  const [profilePic, setProfilePic] =useState('');
  const navigate = useNavigate(); 

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(result => {
        console.log("✅ User created:", result.user);


        const userProfile ={
          displayName: data.name,
          photoURl: profilePic
        }


        updateUserProfile(userProfile)
        .then(()=>{
          console.log('profile name pic updated')
        })
        .catch(error=>{
          console.log(error)
        })

        Swal.fire({
          title: 'Registration Successful!',
          text: 'Welcome to ZapShift Parcel Service.',
          icon: 'success',
          confirmButtonText: 'Go to Home'
        }).then(() => {
          navigate('/'); // ✅ redirect to homepage
        });

      })
      .catch(error => {
        console.error("❌ Registration error:", error);
        Swal.fire("Error!", error.message, "error");
      });
  };


const handleImageupload= async (e)=>{
  const image = e.target.files [0]
  console.log(image)

 const formData = new FormData();
  formData.append('image', image);

  const imagUploadUrl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

  const res = await axios.post(imagUploadUrl, formData)

 setProfilePic(res.data.data.url)
}





  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Create an Account</h1>
        <fieldset>
          <legend className="text-lg font-semibold mb-2">Register with ZapShift</legend>
{/* name */}
          <label className="label mt-2">Your Name</label>
          <input
            type="text"
            {...register('email', { required: true })}
            className="input input-bordered w-full"
            placeholder="YourNme"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

            {/* Name */}
          <label className="label mt-2">Your Profile Picture</label>
          <input
            type="file"
            onChange={handleImageupload}
            
            className="input input-bordered w-full"
            placeholder="Your Profile picture"
          />
          {/* {errors.email && (
            <p className="text-red-500 text-sm">Name is required</p>
          )} */}


          {/* Email */}
          <label className="label mt-2">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          {/* Password */}
          <label className="label mt-4">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
          )}

          {/* Submit Button */}
          <button className="btn btn-primary w-full mt-6">Register</button>
        </fieldset>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?
            <Link className="btn btn-link" to="/login"> Login</Link>
          </p>
          <Sociallogin />
        </div>
      </form>
    </div>
  );
};

export default Register;
