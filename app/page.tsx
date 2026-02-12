import { redirect } from "next/navigation"

export default function Home() {
  // Redirigir a login - el AuthProvider se encargará de redirigir al dashboard si está autenticado
  redirect("/login")
}
