import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getFromLocalStorage as gLS, saveToLocalStorage as sLS } from "./_lib";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Viqs.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.headerbox}>
          <div>
            <Image
              src="/character.png"
              height="97.8px"
              width="81.6px"
              className={styles.goblin}
            />
          </div>
          <div className={styles.goblintext}>
            <div className={styles.gtextbox}>
              <p className={styles.gtext}>У тебя хорошо получается!</p>
              <p className={styles.gtext}>Продолжай в том же духе!</p>
            </div>
          </div>
        </div>
        <div className={styles.taskbox}>
          <div className={styles.firsttaskbox}>
            <p className={styles.maintasktext}>
              Добро пожаловать,{" "}
              {process.browser > null && gLS("name") ? (
                <>{gLS("name")}</>
              ) : (
                <p>
                  redirecting you to first time setup{" "}
                  {process.browser ? (window.location.href = "/login") : null}
                </p>
              )}
              !
            </p>
            {process.browser > null &&
            gLS("tasks") > null &&
            JSON.parse(gLS("tasks")).length > 0 ? (
              <>
                <div className={styles.taskline}>
                  <div className={styles.tasklinefilled} />
                </div>
                <p className={styles.tasktext}>
                  У тебя 18 задач на сегодня, из них 5 завершены.
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.secondtaskbox}>
            {process.browser > null &&
            gLS("tasks") > null &&
            JSON.parse(gLS("tasks")).length > 0 ? (
              <>{/*TODO*/}</>
            ) : (
              <p style={{ textAlign: "center", marginTop: "40%" }}>
                Ты ещё не создал ни одного задания!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
