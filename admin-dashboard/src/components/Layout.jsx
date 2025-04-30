// components/Layout.js
import Sidebar from './Sidebar'
import styles from '@/styles/layout.module.css';
import Topbar from './Topbar';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  )
}
