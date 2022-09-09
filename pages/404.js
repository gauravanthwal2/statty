import Link from "next/link";
import { custom404Head, custom404, link } from "../utils/constants/404";
import styles from "./404.module.css";
export default function Custom404() {
  return (
    <div className={styles.custom404}>
      <h1 className={styles.head}>{custom404Head}</h1>
      {custom404}
      <Link href="/login">
        <a className={styles.link}>{link}</a>
      </Link>
    </div>
  );
}
