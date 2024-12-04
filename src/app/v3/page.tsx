"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { Popover } from "@/app/v3/components/popover/popover";
import { POPOVER_V3_CODE } from "@/app/v3/helper";
import { CodePreviewWrapper } from "@/app/v3/components/codePreviewWrapper";

export default function V2() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;
  return (
    <div className={styles.page}>
      <h1>Version 3</h1>
      <div className={styles.main}>
        <section className={styles.section}>
          <CodePreviewWrapper
            code={POPOVER_V3_CODE}
            component={() => (
              <Popover
                triggerTitle={"Flere valg"}
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
            )}
          />
        </section>
      </div>
    </div>
  );
}