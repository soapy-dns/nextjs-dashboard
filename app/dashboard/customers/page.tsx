import { fetchCustomers } from "@/app/db/queries"

export default async function Page() {
  const customers = await fetchCustomers()
  console.log("customers", customers)

  return (
    <div>
      <h1>Customers...</h1>
      <pre>{JSON.stringify(customers, null, 4)}</pre>
    </div>
  )
}
