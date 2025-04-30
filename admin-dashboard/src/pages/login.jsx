import styles from '@/styles/login.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/login', formData)

      toast.success('Login successful! Redirecting...')
      
      setTimeout(() => {
        router.push('/ArticlePage');
      }, 2000);
      console.log('success');

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      toast.error(errorMessage)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleLogin}>
        <div className={styles.header_container}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <h3>Login to Account</h3>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
        <div className={styles.registerPrompt}>
          New here?{' '}
          <span className={styles.registerLink} onClick={() => router.push('/register')}>
            Create an account
          </span>
        </div>
      </form>

      <ToastContainer position="top-center" />


    </div>
  )
}
