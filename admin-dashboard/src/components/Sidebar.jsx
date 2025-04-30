// components/Sidebar.js
import styles from '@/styles/sidebar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar() {
  const router = useRouter()

  const menuItems = [
    { name: 'Article', path: '/ArticlePage' },
    { name: 'Blog', path: '/BlogPage' }
  ]

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={
                  router.pathname === item.path
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
