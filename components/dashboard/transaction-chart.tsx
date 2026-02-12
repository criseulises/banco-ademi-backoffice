"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { colors } from "@/lib/colors"
import { transactionChartData } from "@/lib/mock-data/dashboard-data"

export function TransactionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendencia de Transacciones - Últimos 7 Días</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactionChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke={colors.grey600}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12 }}
              stroke={colors.grey600}
              label={{ value: "Cantidad", angle: -90, position: "insideLeft", fontSize: 12 }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              stroke={colors.grey600}
              label={{ value: "Monto (RD$)", angle: 90, position: "insideRight", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: `1px solid ${colors.grey300}`,
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number, name: string) => {
                if (name === "transactions") {
                  return [value.toLocaleString(), "Transacciones"]
                }
                return [`RD$ ${value.toLocaleString("es-DO", { minimumFractionDigits: 2 })}`, "Monto"]
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              formatter={(value) => {
                return value === "transactions" ? "Transacciones" : "Monto (RD$)"
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="transactions"
              stroke={colors.primary}
              strokeWidth={2}
              dot={{ fill: colors.primary, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="amount"
              stroke={colors.secondary}
              strokeWidth={2}
              dot={{ fill: colors.secondary, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
