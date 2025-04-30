import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '@/styles/register.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/registration', formData)

      if (res.status === 201 || res.status === 200) {
        toast.success('Registration successful! Redirecting to login...', {
          autoClose: 3000,
          onClose: () => router.push('/login'),
        })
      } else {
        toast.error('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      const errorMessage = error.response?.data?.message || 'Something went wrong'
      toast.error(errorMessage)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleRegister}>
        <h2>Create an Account</h2>
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
        <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
        <input type="number" name="phone" placeholder="Phone" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Register</button>
      </form>

      <ToastContainer position="top-center" />
    </div>
  )
}
