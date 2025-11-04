"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A horizontal bar chart"

// 1. Define the data type this component expects
type BarChartProps = {
  data: {
    division: string // FIXED: Changed from 'department'
    total: number
  }[]
}

// 2. Define the chart config for the new dataKey "total"
const chartConfig = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarHorizontal({ data }: BarChartProps) {
  return (
    <Card className="flex flex-col w-full max-w-sm h-[350px]">
      <CardHeader>
        {/* FIXED: Title updated */}
        <CardTitle>Division Leave Requests</CardTitle> 
        {/* FIXED: Description updated */}
        <CardDescription>Total requests by division</CardDescription> 
      </CardHeader>
      <CardContent>
        {/* 3. Use the "total" key in the config */}
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data} // 4. Use the data prop here
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            {/* 5. Use "total" as the dataKey */}
            <XAxis type="number" dataKey="total" hide />
            <YAxis
              dataKey="division" // 6. FIXED: Use "division" as the dataKey
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // e.g., "Eng"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* 7. Use "total" as the dataKey and fill */}
            <Bar dataKey="total" fill="var(--color-total)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
