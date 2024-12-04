"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { Popover } from "@/app/v3/components/popover/popover_v2";

export default function V2() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  const TriggerButton = () => (
    <button className={styles.triggerButton}>Flere valg</button>
  );

  if (!hasMounted) return null;

  const handleOnClick = () => {
    console.log("clicked");
  };

  return (
    <div className={styles.page}>
      <h1>Version 3</h1>
      <div className={styles.main}>
        <section className={styles.section}>
          <Popover
            trigger={<button onClick={handleOnClick}>Flere valg</button>}
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
        </section>
        {/*        <section className={styles.section}>
          <h2>Usage guide</h2>
          <CodePreviewWrapper
            code={POPOVER_V3_CODE}
            component={() => (
                <Popover
                    trigger={({ onClick, ...props }) => (
                        <button onClick={handleOnClick} {...props}></button>
                    )}
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
        </section>*/}
      </div>
    </div>
  );
}
