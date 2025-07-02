import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import Sociallogin from './Sociallogin';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
               <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center min-h-screen bg-base-100">
            <fieldset className="">
                <legend className="fieldset-legend text-lg font-semibold">Login</legend>

                {/* Email */}
                <label className="label mt-2">Email</label>
                <input
                    type="email"
                    {...register('email', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="Email"
                />
                {errors.email?.type === 'required' && (
                    <p role="alert" className="text-red-500 text-sm mt-1">
                        Email is required
                    </p>
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
                    <p role="alert" className="text-red-500 text-sm mt-1">
                        Password is required
                    </p>
                )}
                {errors.password?.type === 'minLength' && (
                    <p role="alert" className="text-red-500 text-sm mt-1">
                        Password must be at least 6 characters
                    </p>
                )}

                {/* Submit Button */}
                <button className="btn btn-neutral w-full mt-6">Login</button>
                <div className='text-center'>
                     <p ><small>New to this website? <Link className='btn btn-link' to='/register'> Register
                </Link></small></p>
                <Sociallogin></Sociallogin>
                </div>
            </fieldset>
            
        </form>

        
        </div>
    );
};

export default Login;