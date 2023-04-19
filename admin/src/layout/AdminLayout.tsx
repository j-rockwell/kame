import React, {useState} from 'react';
import styles from '../styles/AdminLayout.module.scss';
import {AiFillCloseSquare} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import {getNavigationItems} from "@/data/Navigation";
import Link from "next/link";

type AdminLayoutProps = {
  children: JSX.Element | JSX.Element[];
}

export default function AdminLayout({children}: AdminLayoutProps) {
  const [isNavExpanded, setNavExpanded] = useState(true);

  const toggleButton = (
    <button onClick={() => setNavExpanded(!isNavExpanded)}>
      Toggle State
    </button>
  );

  return (
    <div className={styles.adminLayout}>
      {isNavExpanded && (
        <div className={styles.navigationContainer}>
          <button className={styles.closeBtn} onClick={() => setNavExpanded(false)}>
            <AiFillCloseSquare />
          </button>

          <img src={'./logo-sideways-light.png'} alt={'kame logo'} className={styles.logo} />

          {getNavigationItems().map(navEntry => (
            <div key={navEntry.label} className={styles.navEntry}>
              <h5 className={styles.navEntryLabel}>{navEntry.label}</h5>

              <div className={styles.navEntryContainer}>
                {navEntry.items.map(navItem => (
                  <Link key={navItem.label} href={navItem.href} className={styles.navEntryItem}>
                    {navItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isNavExpanded && (
        <div className={styles.navigationMinimized}>
          <button className={styles.closeBtn} onClick={() => setNavExpanded(true)}>
            <GiHamburgerMenu />
          </button>
        </div>
      )}

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}