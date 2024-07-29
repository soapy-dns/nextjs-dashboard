"use server"

import { string, z } from "zod"
import { createInsertSchema } from "drizzle-zod"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { db } from "./"
import { InsertUser, usersTable, customersTable, invoicesTable, revenueTable, InsertInvoice } from "./schema"

import { formatCurrency } from "../lib/utils"
import { count, eq, ilike, or, sum } from "drizzle-orm"

// const ITEMS_PER_PAGE = 6

// export async function fetchCustomers() {
//   try {
//     return await db
//       .select({ id: customersTable.id, name: customersTable.name })
//       .from(customersTable)
//       .orderBy(customersTable.name)
//   } catch (err) {
//     console.log("error fetching customers", err)
//     throw new Error("error fetching customers")
//   }
// }

// export async function fetchRevenue() {
//   return await db.select({ month: revenueTable.month, revenue: revenueTable.revenue }).from(revenueTable)
// }

// export async function fetchLatestInvoices() {
//   //   noStore()
//   try {
//     console.log("Fetching invoices data...")
//     await new Promise((resolve) => setTimeout(resolve, 2000))
//     const data = db
//       .select({
//         id: invoicesTable.id,
//         amount: invoicesTable.amount,
//         name: customersTable.name,
//         image_url: customersTable.image_url,
//         email: customersTable.email
//       })
//       .from(invoicesTable)
//       .leftJoin(customersTable, eq(invoicesTable.customer_id, customersTable.id))
//       .orderBy(invoicesTable.date)
//       .limit(5)

//     console.log("Data fetch of invoices complete after 2 seconds.")

//     // return null

//     // const latestInvoices = data.map((invoice) => ({
//     //   ...invoice,
//     //   amount: formatCurrency(invoice.amount)
//     // }))
//     return data
//   } catch (error) {
//     console.error("Failed to fetch latest invoices - error:", error)
//     throw new Error("Failed to fetch the latest invoices.")
//   }
// }

// export async function fetchCardData() {
//   //   noStore()
//   // sum returns a string as it could be a bigInt.  Can map it to a number (if you are sure it'll be ok) with 'mapWith'
//   try {
//     const invoiceCountPromise = db.select({ count: count() }).from(invoicesTable)
//     const customerCountPromise = db.select({ count: count() }).from(customersTable)
//     const invoiceStatusPromise = db
//       .select({ status: invoicesTable.status, sum: sum(invoicesTable.amount).mapWith(Number) })
//       .from(invoicesTable)
//       .groupBy(invoicesTable.status)

//     const data = await Promise.all([invoiceCountPromise, customerCountPromise, invoiceStatusPromise])

//     const numberOfInvoices = data[0][0]?.count ?? 0
//     const numberOfCustomers = data[1][0].count ?? 0
//     const totalPaidInvoices = formatCurrency(data[2]?.find((it) => it.status === "paid")?.sum ?? 0)
//     const totalPendingInvoices = formatCurrency(data[2]?.find((it) => it.status === "pending")?.sum ?? 0)

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices
//     }
//   } catch (error) {
//     console.error("Failed to read card data. Database Error:", error)
//     throw new Error("Failed to card data.")
//   }
// }

// export async function fetchInvoicesPages(query: string) {
//   try {
//     const invoices = await db
//       .select({ count: count() })
//       .from(invoicesTable)
//       .innerJoin(customersTable, eq(invoicesTable.customer_id, customersTable.id))
//       .where(
//         or(
//           ilike(customersTable.email, `${query}%`),
//           ilike(customersTable.name, `${query}%`),
//           ilike(invoicesTable.status, `${query}%`)
//         )
//       )
//     //   .where(
//     // or(
//     //   customersTable.name ? ilike(customersTable.name, query) : undefined
//     //   //   customersTable.email ? ilike(customersTable.email, query) : undefined,
//     //   //   invoicesTable.amount ? ilike(invoicesTable.amount, query) : undefined,
//     //   //   invoicesTable.date ? ilike(invoicesTable.date, query) : undefined,
//     //   //   invoicesTable.status ? ilike(invoicesTable.status, query) : undefined
//     // )
//     //   )
//     // const count = await sql`SELECT COUNT(*)
//     // FROM invoices
//     // JOIN customers ON invoices.customer_id = customers.id
//     // WHERE
//     //   customers.name ILIKE ${`%${query}%`} OR
//     //   customers.email ILIKE ${`%${query}%`} OR
//     //   invoices.amount::text ILIKE ${`%${query}%`} OR
//     //   invoices.date::text ILIKE ${`%${query}%`} OR
//     //   invoices.status ILIKE ${`%${query}%`}
//     //   `

//     const totalPages = Math.ceil(Number(invoices[0].count) / ITEMS_PER_PAGE)
//     return totalPages
//   } catch (error) {
//     console.error("Failed to fetch total number of invoices. Database Error:", error)
//     throw new Error("Failed to fetch total number of invoices.")
//   }
// }

// export async function fetchFilteredInvoices(query: string, currentPage: number) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE
//   const likeQuery = "'" + `${query}%` + "'"

//   try {
//     // TODO: have been unable to do an ilike on a number field
//     const invoices = await db
//       .select({
//         id: invoicesTable.id,
//         amount: invoicesTable.amount,
//         date: invoicesTable.date,
//         status: invoicesTable.status,
//         name: customersTable.name,
//         email: customersTable.email,
//         image_url: customersTable.image_url
//       })
//       .from(invoicesTable)
//       .innerJoin(customersTable, eq(invoicesTable.customer_id, customersTable.id))
//       .where(
//         or(
//           ilike(customersTable.email, `${query}%`),
//           ilike(customersTable.name, `${query}%`),
//           ilike(invoicesTable.status, `${query}%`)
//         )
//       )
//       .orderBy(invoicesTable.date)
//       .limit(ITEMS_PER_PAGE)
//       .offset(offset)

//     return invoices
//   } catch (error) {
//     console.error("Failed to fetch invoices. Database Error:", error)
//     throw new Error("Failed to fetch invoices.")
//   }
// }

// export async function fetchInvoiceById(id: string) {
//   console.log("--fetchInvoiceById--")
//   try {
//     const data = await db
//       .select({
//         id: invoicesTable.id,
//         amount: invoicesTable.amount,
//         date: invoicesTable.date,
//         status: invoicesTable.status,
//         customer_Id: invoicesTable.customer_id,
//         name: customersTable.name,
//         email: customersTable.email,
//         image_url: customersTable.image_url
//       })
//       .from(invoicesTable)
//       .innerJoin(customersTable, eq(invoicesTable.customer_id, customersTable.id))
//       .where(eq(invoicesTable.id, id))
//     // const data = await sql<InvoiceForm>`
//     //   SELECT
//     //     invoices.id,
//     //     invoices.customer_id,
//     //     invoices.amount,
//     //     invoices.status
//     //   FROM invoices
//     //   WHERE invoices.id = ${id};
//     // `

//     console.log("--data--", data)
//     const invoice = data.map((invoice) => ({
//       ...invoice,
//       // Convert amount from cents to dollars
//       amount: invoice.amount / 100
//     }))

//     return invoice[0]
//   } catch (error) {
//     // console.log("--id-->>>>>>>", id)
//     console.error(`Failed to fetcy invoice by id. ${id} Database Error:`, error)
//     throw new Error("Failed to fetch invoice by id")
//   }
// }

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data)
}

export type State = {
  errors?: {
    customerId?: string[]
    amount?: string[]
    status?: string[]
  }
  message?: string | null
}

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string()
})

// zod-drizzle?
const CreateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true }) // TODO: WHAT IS THIS DOING?

export async function createInvoice(prevState: State, formData: FormData) {
  // export async function createInvoice(formData: FormData) {
  //   customer is a string, and not an idText.  Is that relevant?
  // const validatedFields = CreateInvoice.safeParse({

  const validatedFields = CreateInvoiceSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status")
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice."
    }
  }

  const invoiceFormData = validatedFields.data

  const { amount: amountFormData } = invoiceFormData

  const amountInCents = amountFormData * 100
  const date = new Date().toISOString().split("T")[0]

  const invoice: InsertInvoice = {
    ...invoiceFormData,
    amount: amountInCents,
    date,
    customer_id: invoiceFormData.customerId
  }

  try {
    await db.insert(invoicesTable).values(invoice)
  } catch (error) {
    console.log("--error--", error)
    throw new Error("Failed to create invoice")
  }

  revalidatePath("/dashboard/invoices")
  redirect("/dashboard/invoices")
}

const EditInvoiceFormSchema = z.object({
  //   id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"])
  //   date: z.string()
})
// Use Zod to update the expected types
const UpdateInvoice = EditInvoiceFormSchema.omit({ id: true, date: true })

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = EditInvoiceFormSchema.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status")
  })

  const amountInCents = amount * 100

  try {
    await db
      .update(invoicesTable)
      .set({ customer_id: customerId, amount: amountInCents, status: status })
      .where(eq(invoicesTable.id, id))
  } catch (err) {
    console.log("--Error updating invoices--", err)
    throw new Error("error updating invoices")
  }

  revalidatePath("/dashboard/invoices")
  redirect("/dashboard/invoices")
}
