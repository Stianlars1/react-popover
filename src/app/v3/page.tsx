"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { Popover } from "@/app/v3/components/popover/popover";
import { CodePreviewWrapper } from "@/app/v3/components/codePreviewWrapper";
import { POPOVER_V3_CODE } from "@/app/v3/helper";

export default function V2() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  const handleOnClick = () => {
    console.info("clicked");
  };

  return (
    <div className={styles.page}>
      <h1>Version 3</h1>
      <div className={styles.main}>
        <section className={styles.section}>
          <Popover
            trigger={
              <button className={styles.triggerButton} onClick={handleOnClick}>
                Click me
              </button>
            }
            offsetY={6}
            content={
              <div className={styles.popoverContent}>
                <button className={styles.itemButton}>
                  [ikon] Opprett produkt
                </button>
                <button className={styles.itemButton}>
                  [ikon] Tilpass noe unikt{" "}
                </button>
              </div>
            }
          />
        </section>

        <section className={styles.section}>
          <CodePreviewWrapper
            code={POPOVER_V3_CODE}
            component={() => (
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
            )}
          />
        </section>
      </div>
    </div>
  );
}
