import styles from "@/app/v3/page.module.css";

export const POPOVER_V3_CODE = `
  
<Popover
trigger={<button onClick={handleOnClick}>Click me</button>}
offsetY={6}
content={
  <>
    <button className={styles.itemButton}>
      [ikon] Opprett produkt
    </button>
    <button className={styles.itemButton}>
      [ikon] Tilpass noe unikt{" "}
    </button>
  </>
}
/>
  
`;
