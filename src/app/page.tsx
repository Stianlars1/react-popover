import styles from "./page.module.css";
import { Pages } from "@/lib/pages";
import Link from "next/link";

export default function Root() {
  return (
    <div className={styles.page}>
      <h1>react-popover</h1>

      <ul className={styles.versionsList}>
        <Link className={styles.versionLink} href={Pages.VERSION_1}>
          Version 1
        </Link>

        <Link className={styles.versionLink} href={Pages.VERSION_2}>
          Version 2
        </Link>

        <Link className={styles.versionLink} href={Pages.VERSION_3}>
          Version 3
        </Link>
      </ul>
    </div>
  );
}
