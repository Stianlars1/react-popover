"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { Popover } from "@/app/v2/components/popover/popover";
import { PopoverTrigger } from "@/app/v2/components/popoverTrigger/popoverTrigger";
import { PopoverContent } from "@/app/v2/components/popoverContent/popoverContent";

export default function V2() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;
  return (
    <div className={styles.page}>
      <h1>Version 2</h1>
      <div className={styles.main}>
        <section className={styles.section}>
          <Popover>
            <PopoverTrigger className={styles.trigger}>
              More options
            </PopoverTrigger>
            <PopoverContent className={styles.list}>
              <button tabIndex={0} className={styles.itemButton}>
                [ikon] Opprett produkt
              </button>
              <button tabIndex={0} className={styles.itemButton}>
                [ikon] Tilpass noe unikt{" "}
              </button>
            </PopoverContent>
          </Popover>
        </section>
      </div>
    </div>
  );
}
