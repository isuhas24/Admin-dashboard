import styles from '@/styles/modal.module.css'
import { useState } from 'react'

export default function ArticleModal({ title, onClose, onSave }) {
  const [form, setForm] = useState({ title: '', description: '', image: null })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = () => {
    if (!form.title || !form.description) return
    onSave(form)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className={styles.input_container}>
            <label htmlFor="imageUpload" className={styles.uploadLabel}>
                <div className={styles.uploadIcon}>📷</div>
                <div className={styles.uploadText}>Upload Image</div>
            </label>
            <input
                type="file"
                name="image"
                id="imageUpload"
                accept="image/*"
                onChange={handleChange}
            />
            <input
                type="text"
                name="title"
                placeholder="Enter Article title"
                value={form.title}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Enter article description"
                rows={5}
                value={form.description}
                onChange={handleChange}
            ></textarea>
        </div>
        <div className={styles.footer}>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}
