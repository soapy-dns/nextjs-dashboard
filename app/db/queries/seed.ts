import bcrypt from "bcrypt"

import { db } from "../"
import { InsertUser, usersTable, customersTable, invoicesTable, revenueTable } from "../schema"
import { users, customers, invoices, revenues } from "../../lib/placeholderData"

const clearData = async () => {
  await db.delete(invoicesTable),
    await Promise.all([db.delete(usersTable), db.delete(customersTable), db.delete(revenueTable)])
}
const seedUsers = async () => {
  const promises = users.map(async (user: InsertUser) => {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = { ...user, password: hashedPassword }

    return db.insert(usersTable).values(newUser)
  })

  await Promise.all(promises)
}

const seedCustomers = async () => {
  try {
    console.log(`Seeding "customers" table`)

    const promises = customers.map(async (customer) => {
      return db.insert(customersTable).values(customer)
    })
    await Promise.all(promises)
  } catch (error) {
    console.error("Error seeding customers:", error)
    throw error
  }
}

const seedInvoices = async () => {
  try {
    console.log("seeding invoices")

    const promises = invoices.map(async (invoice) => {
      return db.insert(invoicesTable).values(invoice)
    })

    await Promise.all(promises)
  } catch (error) {
    console.error("error seeding invoices", error)
    throw error
  }
}

const seedRevenue = async () => {
  try {
    console.log("seeding invoices")

    const promises = revenues.map(async (revenue) => {
      console.log("--revenue--", revenue)
      return db.insert(revenueTable).values(revenue)
    })

    await Promise.all(promises)
  } catch (error) {
    console.error("error seeding revenues", error)
    throw error
  }
}

export const seedDb = async () => {
  await clearData()
  await Promise.all([seedUsers(), seedRevenue()])
  await seedCustomers()
  await seedInvoices()
}
