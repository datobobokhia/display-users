"use client";

import styles from "./UserList.module.css";
import useFetchData from "@/hooks/useFetchData";
import User from "../User/User";
import { UserData } from "@/types";
import useDebounce from "@/hooks/useDebounce";

const UserList = ({ searchTerm }: { searchTerm: string }) => {
  const { data, loading, error } = useFetchData<UserData[]>("/users");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredUsers = data?.filter((user) => {
    const searchkeywords = debouncedSearchTerm.toLowerCase().split(" ");

    return searchkeywords.every((term) =>
      user.name.toLowerCase().includes(term)
    );
  });

  if (loading)
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        Loading...
      </div>
    );

  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div
      className={`${styles.container} ${
        filteredUsers?.length ? styles.hasUsers : styles.noUsers
      }`}
    >
      <ul className={styles.userList}>
        {filteredUsers?.map((user) => (
          <User key={user.id} name={user.name} email={user.email} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
