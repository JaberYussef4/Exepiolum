"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the router

export default function Home() {
  const router = useRouter(); // Initialize the router

  const handleLoginRedirect = () => {
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}></div>
        <div className={styles.header}>
          <h1>Welcome to the Home Page</h1>
          {/* Add your login button */}
          <button 
            onClick={handleLoginRedirect}
            className={styles.loginButton} // Add your styles
          >
            Login
          </button>
        </div>
      </main>
    </div>
  );
}