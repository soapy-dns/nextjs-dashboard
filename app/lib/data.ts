// import { sql } from "@vercel/postgres"
// import postgres from "postgres"

// console.log("--process.env.DATABASE_URL--", process.env.DATABASE_URL)
// import { createClient } from "@supabase/supabase-js"
// import { Database } from "@/app/lib/database/types/supabase"

// const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
// const connectionString = process.env.DATABASE_URL!
// // const connectionString = "postgresql://postgres:postgres@127.0.0.1:54322/postgres"
// const sql = postgres(connectionString)

// import {
//   CustomerField,
//   CustomersTable,
//   InvoiceForm,
//   InvoicesTable,
//   // LatestInvoiceRaw,
//   User
//   // Revenue
// } from "./definitions"
// import {           id: string
//  } from "./utils"
// import { unstable_noStore as noStore } from "next/cache"
// import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient"

// export async function fetchRevenue() {
//   // Add noStore() here prevent the response from being cached.
//   // This is equivalent to in fetch(..., {cache: 'no-store'}).
//   noStore()

//   try {
//     // Artificially delay a reponse for demo purposes.
//     // Don't do this in real life :)

//     console.log("Fetching revenue data...")
//     await new Promise((resolve) => setTimeout(resolve, 3000))
//     // const data = await client.sql`SELECT * FROM revenue`
//     const { data, error } = await supabase.from("revenue").select("*")
//     if (error) {
//       throw new Error("error accessing revenus")
//     }

//     // const data = await sql<Revenue>`SELECT * FROM revenue`

//     console.log("Data fetch complete after 3 seconds.")

//     return data
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to fetch revenue data.")
//   }
// }

// export async function fetchLatestInvoices() {
//   noStore()
//   try {
//     console.log("Fetching invoices data...")
//     await new Promise((resolve) => setTimeout(resolve, 2000))
//     const { data, error } = await supabase
//       .from("invoices")
//       .select(
//         `
//       id,
//       amount,
//       customers (name, image_url, email)
//       `
//       )
//       .order("date", { ascending: false })
//       .limit(5)

//     // // const data = await sql<LatestInvoiceRaw>`
//     //   SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//     //   FROM invoices
//     //   JOIN customers ON invoices.customer_id = customers.id
//     //   ORDER BY invoices.date DESC
//     //   LIMIT 5`

//     console.log("Data fetch of invoices complete after 2 seconds.")

//     const latestInvoices = data?.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount)
//     }))
//     return latestInvoices
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to fetch the latest invoices.")
//   }
// }

// export async function fetchCardData() {
//   noStore()
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = supabase.from("invoices").select("*", { count: "exact", head: true })
//     // const { data, count } = supabase.from("invoices").select("*", { count: "exact", head: true })
//     const customerCountPromise = supabase.from("customers").select("*", { count: "exact", head: true })

//     const invoiceStatusPromise = supabase.from("invoices").select("status, amount.sum()")

//     // const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`
//     // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`
//     // const invoiceStatusPromise = sql`SELECT
//     //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//     //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//     //      FROM invoices`

//     const data = await Promise.all([invoiceCountPromise, customerCountPromise, invoiceStatusPromise])
//     // console.log("--data--", data)
//     console.log("--data[2]--", data[2])

//     // const data = await Promise.all([invoiceCountPromise, customerCountPromise, invoiceStatusPromise])

//     // const numberOfInvoices = Number(data[0].rows[0].count ?? "0")
//     // const numberOfCustomers = Number(data[1].rows[0].count ?? "0")
//     // const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0")
//     // const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0")
//     const numberOfInvoices = data[0].count ?? 0
//     const numberOfCustomers = data[1].count ?? 0
//     const totalPaidInvoices = 4 // data[2]?.data.find((it) => it.status === "pending")
//     const totalPendingInvoices = 6

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices
//     }
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to card data.")
//   }
// }

// export async function fetchCardData() {
//   return {}

//   noStore()
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`

//     const data = await Promise.all([invoiceCountPromise, customerCountPromise, invoiceStatusPromise])

//     const numberOfInvoices = Number(data[0].rows[0].count ?? "0")
//     const numberOfCustomers = Number(data[1].rows[0].count ?? "0")
//     const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0")
//     const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0")

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices
//     }
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to card data.")
//   }
// }

const ITEMS_PER_PAGE = 6
// export async function fetchFilteredInvoices(query: string, currentPage: number) {
//   return []
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE

//   try {
//     const invoices = await sql<InvoicesTable>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `

//     return invoices.rows
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to fetch invoices.")
//   }
// }

// export async function fetchInvoicesPages(query: string) {
//   return []
//   try {
//     const count = await sql`SELECT COUNT(*)
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE
//       customers.name ILIKE ${`%${query}%`} OR
//       customers.email ILIKE ${`%${query}%`} OR
//       invoices.amount::text ILIKE ${`%${query}%`} OR
//       invoices.date::text ILIKE ${`%${query}%`} OR
//       invoices.status ILIKE ${`%${query}%`}
//   `

//     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
//     return totalPages
//   } catch (error) {
//     console.error("Database Error:", error)
//     throw new Error("Failed to fetch total number of invoices.")
//   }
// }

// export async function fetchInvoiceById(id: string) {
//   return {}
//   noStore()
//   try {
//     const data = await sql<InvoiceForm>`
//       SELECT
//         invoices.id,
//         invoices.customer_id,
//         invoices.amount,
//         invoices.status
//       FROM invoices
//       WHERE invoices.id = ${id};
//     `

//     const invoice = data.rows.map((invoice) => ({
//       ...invoice,
//       // Convert amount from cents to dollars
//       amount: invoice.amount / 100
//     }))

//     return invoice[0]
//   } catch (error) {
//     console.error("Database Error:", error)
//   }
// }

// export async function fetchCustomers() {
//   return []
//   noStore()
//   try {
//     const data = await sql<CustomerField>`
//       SELECT
//         id,
//         name
//       FROM customers
//       ORDER BY name ASC
//     `

//     const customers = data.rows
//     return customers
//   } catch (err) {
//     console.error("Database Error:", err)
//     throw new Error("Failed to fetch all customers.")
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   return []
//   noStore()
//   try {
//     const data = await sql<CustomersTable>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `

//     const customers = data.rows.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid)
//     }))

//     return customers
//   } catch (err) {
//     console.error("Database Error:", err)
//     throw new Error("Failed to fetch customer table.")
//   }
// }

// export async function getUser(email: string) {
//   return {}
//   noStore()
//   try {
//     const user = await sql`SELECT * from USERS where email=${email}`
//     return user.rows[0] as User
//   } catch (error) {
//     console.error("Failed to fetch user:", error)
//     throw new Error("Failed to fetch user.")
//   }
// }
