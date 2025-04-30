import styles from '@/styles/blog.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BlogModal from '@/components/BlogModal'

export default function Blog() {
  const [data, setData] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: ''})
  const [editingId, setEditingId] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const API_BASE = 'https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/BlogCategory'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/allBlogCategory`);
      console.log(res.data.data);
      setData(res.data.data)
    } catch (error) {
      toast.error('Failed to load Blogs.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/updateBlogCategory/${editingId}`, form)
        toast.success('Article updated!')
      } else {
        await axios.post(`${API_BASE}/addBlogCategory`, form)
        toast.success('Article added!')
      }
      setForm({ title: '', description: '' })
      setEditingId(null)
      setShowForm(false)
      fetchData()
    } catch (err) {
      toast.error('Operation failed.')
    }
  }

  const handleModalSave = async (formData) => {
    try {
      await axios.post(`${API_BASE}/addBlogCategory`, formData);
  
      toast.success('Article added!')
      fetchData()
      setShowAddModal(false)
    } catch (err) {
      toast.error('Failed to add article')
    }
  }
  

  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description})
    setEditingId(item._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return
    try {
      await axios.delete(`${API_BASE}/deleteBlogCategory/${id}`)
      toast.success('Article deleted!')
      fetchData()
    } catch (err) {
      toast.error('Delete failed.')
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <h2>Blog</h2>
        <button
          onClick={() => {
            setShowAddModal(true)
          }}
          className={styles.addBtn}
          style={{backgroundColor: '#17a2b8'}}
        >
          + Add new blog
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.btn}>
            {editingId ? 'Update' : 'Add'} Blog
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <button className={styles.edit} onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className={styles.delete} onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <BlogModal
          title="Add New Blog"
          onClose={() => setShowAddModal(false)}
          onSave={handleModalSave}
        />
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  )
}
