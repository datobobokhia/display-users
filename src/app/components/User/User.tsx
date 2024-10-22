import styles from "./User.module.css";

interface UserProps {
  name: string;
  email: string;
}

const User = ({ name, email }: UserProps) => {
  return (
    <li className={styles.list}>
      <h1 className={styles.name}>{name}</h1>
      <h3 className={styles.email}>{email}</h3>
    </li>
  );
};

export default User;
