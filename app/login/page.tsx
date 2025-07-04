"use client";
import { useState } from "react";

import styles from "./page.module.css";
import { useRouter } from "next/navigation"; 




export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: username,password: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // Handle successful login (e.g., redirect)
      router.push("/admin");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    }
    //setError(username + " " + password);

  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit">Log In</button>
            <div className={styles.signup}>
              <span>Don't have an account?</span>
              <a href="/signup">Sign Up</a>
            </div>
          </form>
        </div>
        <div className={styles.header}>
          <h1>Welcome to the LogIn Page</h1>
        </div>
      </main>
    </div>
  );
}
