    import styles from '@/styles/modal.module.css'
    import { useState } from 'react'

    export default function BlogModal({ title, onClose, onSave }) {
    const [form, setForm] = useState({ title: '', description: ''})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
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
