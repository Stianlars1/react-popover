"use client";
import styles from "./page.module.css";
import { Popover } from "@/app/v1/components/popover/popover";
import { PopoverTrigger } from "@/app/v1/components/popover/components/popoverTrigger/popoverTrigger";
import { PopoverContent } from "@/app/v1/components/popover/components/popoverContent/popoverContent";
import { useEffect, useState } from "react";
import { PopoverDismiss } from "@/app/v1/components/popover/components/popoverDismiss/popoverDismiss";

export default function Page() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;
  return (
    <div className={styles.page}>
      <h1>Version 1</h1>
      <main className={styles.main}>
        <section>
          <h2>position= "bottom"</h2>
          <Popover className={styles.popover}>
            <PopoverTrigger
              position={"bottom"}
              className={styles.popoverTrigger}
            >
              <button>Click to open</button>
            </PopoverTrigger>
            <PopoverContent className={styles.popoverContent}>
              <h3>popover opened</h3>
              <PopoverDismiss>Dismiss popover</PopoverDismiss>
            </PopoverContent>
          </Popover>
        </section>

        <section>
          <h2>position= "left"</h2>
          <Popover className={styles.popover}>
            <PopoverTrigger position={"left"} className={styles.popoverTrigger}>
              <button>Click to open</button>
            </PopoverTrigger>
            <PopoverContent className={styles.popoverContent}>
              <h3>
                Wow, a <strong>Popover</strong>!
              </h3>
              <i>Just like magic 🪄🌟</i>
              <p>
                This package utilized the new and modern Popover API for
                semantic HTML.
              </p>
              <p>The package has built-in accessibility features.</p>
              <p>If you click outside, it will auto-dismiss</p>
              <PopoverDismiss>Dismiss popover</PopoverDismiss>
            </PopoverContent>
          </Popover>
        </section>
        <section>
          <h2>position= "top"</h2>
          <Popover className={styles.popover}>
            <PopoverTrigger position={"top"} className={styles.popoverTrigger}>
              <button>Click to open</button>
            </PopoverTrigger>
            <PopoverContent className={styles.popoverContent}>
              <h3>
                Wow, a <strong>Popover</strong>!
              </h3>
              <i>Just like magic 🪄🌟</i>
              <p>
                This package utilized the new and modern Popover API for
                semantic HTML.
              </p>
              <p>The package has built-in accessibility features.</p>
              <p>If you click outside, it will auto-dismiss</p>
              <PopoverDismiss>Dismiss popover</PopoverDismiss>
            </PopoverContent>
          </Popover>
        </section>

        <section>
          <h2>position= "right"</h2>
          <Popover className={styles.popover}>
            <PopoverTrigger
              position={"right"}
              className={styles.popoverTrigger}
            >
              <button>Click to open</button>
            </PopoverTrigger>
            <PopoverContent className={styles.popoverContent}>
              <h3>
                Wow, a <strong>Popover</strong>!
              </h3>
              <i>Just like magic 🪄🌟</i>
              <p>
                This package utilized the new and modern Popover API for
                semantic HTML.
              </p>
              <p>The package has built-in accessibility features.</p>
              <p>If you click outside, it will auto-dismiss</p>
              <PopoverDismiss>Dismiss popover</PopoverDismiss>
            </PopoverContent>
          </Popover>
        </section>

        <section>
          <h2>position= "center"</h2>
          <Popover className={styles.popover}>
            <PopoverTrigger
              position={"center"}
              className={styles.popoverTrigger}
            >
              <button>Click to open</button>
            </PopoverTrigger>
            <PopoverContent className={styles.popoverContent}>
              <h3>
                Wow, a <strong>Popover</strong>!
              </h3>
              <i>Just like magic 🪄🌟</i>
              <p>
                This package utilized the new and modern Popover API for
                semantic HTML.
              </p>
              <p>The package has built-in accessibility features.</p>
              <p>If you click outside, it will auto-dismiss</p>
              <PopoverDismiss>Dismiss popover</PopoverDismiss>
            </PopoverContent>
          </Popover>
        </section>
      </main>
    </div>
  );
}
