import { seedDb } from "../db/queries/seed"

export default async function Seed() {
  try {
    await seedDb()
    return <div>Seeded successful</div>
  } catch (err) {
    return <div>Seeding failed</div>
  }
}
