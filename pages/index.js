import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getFromLocalStorage as gLS, saveToLocalStorage as sLS } from "./_lib";
import { useState, useEffect } from "react";
export default function Home() {
  let doneTasks = 0;
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(process.browser ? JSON.parse(gLS("tasks")) : null);
  }, []);

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
            {process.browser > null && tasks !== null && tasks.length > 0 ? (
              <>
                <div className={styles.taskline}>
                  <div className={styles.tasklinefilled} />
                </div>
                <p className={styles.tasktext}>
                  У тебя {tasks.length} задач(и) на сегодня, из них{" "}
                  {typeof tasks.map === "function"
                    ? tasks.map((e) => {
                        if (e.done === true) doneTasks = doneTasks + 1;
                      })
                    : null}
                  {doneTasks} завершены.
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.secondtaskbox}>
            {process.browser > null && tasks !== null && tasks.length > 0 ? (
              typeof tasks.map === "function" ? (
                tasks.map((e) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          if (!e.done) {
                            const newTasks = tasks;
                            let index = tasks.indexOf(e);
                            newTasks[index].done = true;
                            sLS("tasks", JSON.stringify(newTasks));
                            setTasks(JSON.parse(gLS("tasks")));
                          } else {
                            const newTasks = tasks;
                            let index = tasks.indexOf(e);
                            newTasks[index].done = false;
                            sLS("tasks", JSON.stringify(newTasks));
                            setTasks(JSON.parse(gLS("tasks")));
                          }
                        }}
                        className={
                          e.done ? styles.flextaskboxdone : styles.flextaskbox
                        }
                      >
                        <p className={styles.task}>{e.value}</p>
                        <div
                          className={
                            e.done ? styles.circledone : styles.circlepending
                          }
                        ></div>
                      </div>
                    </>
                  );
                })
              ) : null
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
