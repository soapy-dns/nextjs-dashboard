// import { revalidatePath } from "next/cache"
// import { db } from "."
// import { InsertInvoice, InsertUser, invoicesTable, usersTable } from "./schema"
// import { redirect } from "next/navigation"
// import { z } from "zod"

// export async function createUser(data: InsertUser) {
//   await db.insert(usersTable).values(data)
// }

// const InvoiceSchema = z.object({
//   id: z.string(),
//   customerId: z.string(),
//   amount: z.coerce.number(),
//   status: z.enum(["pending", "paid"]),
//   date: z.string()
// })

// // zod-drizzle?
// const CreateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true }) // TODO: WHAT IS THIS DOING?

// export async function createInvoice(formData: FormData) {
//   //   customer is a string, and not an idText.  Is that relevant?
//   const invoiceFormData = CreateInvoiceSchema.parse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status")
//   })

//   const { amount: amountFormData } = invoiceFormData

//   const amountInCents = amountFormData * 100
//   const date = new Date().toISOString().split("T")[0]

//   const invoice: InsertInvoice = {
//     ...invoiceFormData,
//     amount: amountInCents,
//     date,
//     customer_id: invoiceFormData.customerId
//   }

//   try {
//     await db.insert(invoicesTable).values(invoice)
//   } catch (error) {
//     console.log("--error--", error)
//     throw new Error("Failed to create invoice")
//   }

//   revalidatePath("/dashboard/invoices")
//   redirect("/dashboard/invoices")
// }

// const EditInvoiceFormSchema = z.object({
//   //   id: z.string(),
//   customerId: z.string(),
//   amount: z.coerce.number(),
//   status: z.enum(["pending", "paid"])
//   //   date: z.string()
// })
// // Use Zod to update the expected types
// const UpdateInvoice = EditInvoiceFormSchema.omit({ id: true, date: true })

// export async function updateInvoice(id: string, formData: FormData) {
//   const { customerId, amount, status } = EditInvoiceFormSchema.parse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status")
//   })

//   const amountInCents = amount * 100

//   try {
//     await db
//       .update(invoicesTable)
//       .set({ customer_id: customerId, amount: amountInCents, status: status })
//       .where(eq(invoicesTable.id, id))
//   } catch (err) {
//     console.log("--Error updating invoices--", err)
//     throw new Error("error updating invoices")
//   }

//   revalidatePath("/dashboard/invoices")
//   redirect("/dashboard/invoices")
// }
