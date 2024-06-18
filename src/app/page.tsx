import Image from "next/image";

import styles from "./page.module.css";
import { Card } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started testing barcode scanners
        </p>
        <div>
          <Image
            src="/logo.png"
            alt="Vercel Logo"
            className={styles.vercelLogo}
            width={100}
            height={24}
            priority
          />
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.grid}>
          <Card scanner="HTML5-QRCode" style={styles.card} />
          <Card scanner="Quagga" style={styles.card} />
          <Card scanner="Web-API-BD" style={styles.card} />
          <Card scanner="Zxing" style={styles.card} />
        </div>
      </div>

    </main>
  );
}
