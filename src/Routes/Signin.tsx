//@ts-nocheck
import React, { useState } from 'react'
import { AiFillLock, AiOutlineMail } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState("");
	const navigate = useNavigate();
	const { signIn } = UserAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      navigate('/')
    } catch (error: any) {
      setErrors(error.message)
    }
  }
  return (
    <>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input onChange={(e) => setEmail(e.target.value)} className='w-full p-3 focus:outline-none bg-primary border border-input rounded-2xl' type="email" placeholder='Enter email' />
              <AiOutlineMail className='absolute right-3 top-3 text-gray-500' />
            </div>
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input onChange={(e) => setPassword(e.target.value)} className='w-full p-3 focus:outline-none bg-primary border border-input rounded-2xl' type="password" placeholder='Enter password' />
              <AiFillLock className='absolute right-3 top-3 text-gray-500'/>
            </div>
          </div>
          <button className='w-full my-2 p-3 border border-gray-500 bg-button text-btnText rounded-2xl shadow-xl hover:bg-transparent hover:text-black duration-300'>Sign in</button>
        </form>
        <p>Don't have an account? <Link className='text-accent underline underline-offset-1' to='/signup'>Sign Up</Link></p>
      </div>
    </>
  )
}

export default Signin