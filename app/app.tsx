import { Badge } from "../components/badge"
import { Card } from "../components/card"
import styles from "./app.module.css"

/** The placeholder screen: the shell every later screen replaces. */
export function App() {
  return (
    <main className={styles.screen}>
      <h1 className={styles.title}>weather-star</h1>
      <Card>
        <Badge tone="accent">Off air</Badge>
        <p className={styles.note}>The forecast screens are not built yet.</p>
      </Card>
    </main>
  )
}
