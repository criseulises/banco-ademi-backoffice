"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { transactionTypeData } from "@/lib/mock-data/dashboard-data"
import { colors } from "@/lib/colors"

const COLORS = [colors.primary, colors.secondary, "#4CAF50", "#FF9800"]

export function DistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución por Tipo de Transacción</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={transactionTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {transactionTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: `1px solid ${colors.grey300}`,
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number, name: string, props: any) => {
                const amount = props.payload.amount
                return [
                  `${value}% (RD$ ${amount.toLocaleString("es-DO", { minimumFractionDigits: 2 })})`,
                  name,
                ]
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              formatter={(value) => value}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
