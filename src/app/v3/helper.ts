import styles from "@/app/v3/page.module.css";

export const POPOVER_V3_CODE = `
  
<Popover
trigger={<button>Flere valg</button>}
offsetY={6}
content={
  <>
    <button tabIndex={0} className={styles.itemButton}>
      [ikon] Opprett produkt
    </button>
    <button tabIndex={0} className={styles.itemButton}>
      [ikon] Tilpass noe unikt{" "}
    </button>
  </>
}
/>
  
`;
