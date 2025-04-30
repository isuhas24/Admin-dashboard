import styles from '@/styles/article.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '@/components/ArticleModal'

export default function Article() {
  const [data, setData] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', image: '' })
  const [editingId, setEditingId] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const API_BASE = 'https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/Article'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/getArticle`)
      setData(res.data.data.docs)
    } catch (error) {
      toast.error('Failed to load articles.')
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
        await axios.put(`${API_BASE}/updateArticle/${editingId}`, form)
        console.log('success put')
        toast.success('Article updated!')
      } else {
        await axios.post(`${API_BASE}/createArticle`, form)
        toast.success('Article added!')
      }
      setForm({ title: '', description: '', image: '' })
      setEditingId(null)
      setShowForm(false)
      fetchData()
    } catch (err) {
      toast.error('Operation failed.')
    }
  }

  const handleModalSave = async (formData) => {
    try {
      const form = new FormData()
      form.append('title', formData.title)
      form.append('description', formData.description)
      if (formData.image) {
        form.append('image', formData.image)
      }
  
      await axios.post(`${API_BASE}/createArticle`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  
      toast.success('Article added!')
      fetchData()
      setShowAddModal(false)
    } catch (err) {
      toast.error('Failed to add article')
    }
  }
  

  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description, image: item.image })
    setEditingId(item._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return
    try {
      await axios.delete(`${API_BASE}/deleteArticle/${id}`)
      toast.success('Article deleted!')
      fetchData()
    } catch (err) {
      toast.error('Delete failed.')
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <h2>Article</h2>
        <button
          onClick={() => {
            setShowAddModal(true)
          }}
          style={{backgroundColor: '#17a2b8'}}
          className={styles.addBtn}
        >
          + Add new article
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
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />
          <button type="submit" className={styles.btn}>
            {editingId ? 'Update' : 'Add'} Article
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
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={item.image || '/default.jpg'}
                  alt="article"
                  className={styles.thumbnail}
                />
              </td>
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
        <Modal
          title="Add New Article"
          onClose={() => setShowAddModal(false)}
          onSave={handleModalSave}
        />
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  )
}
