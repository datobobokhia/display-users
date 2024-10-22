"use client";

import styles from "./page.module.css";
import UserList from "./components/UserList/UserList";

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>User List</h1>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search user"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <UserList searchTerm={searchTerm} />
      </main>
    </div>
  );
}
