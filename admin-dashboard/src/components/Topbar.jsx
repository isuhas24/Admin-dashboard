// components/Layout.js
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import styles from '@/styles/layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Topbar />
        <div className={styles.pageContent}>
          {children}
        </div>
      </main>
    </div>
  )
}
