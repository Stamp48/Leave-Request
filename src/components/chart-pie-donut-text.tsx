"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

// 1. Define the props interface
interface ChartPieDonutTextProps {
  data: any[]
  config: ChartConfig
  dataKey: string
  nameKey: string
  // totalLabel: string // This prop is no longer needed
}

export function ChartPieDonutText({
  data,
  config,
  dataKey,
  nameKey,
}: ChartPieDonutTextProps) {

  // 2. Calculate the total dynamically from the data and dataKey
  const total = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr[dataKey], 0)
  }, [data, dataKey])

  return (
    <Card className="flex flex-col w-full max-w-sm h-[350px]">
      <CardHeader className="items-center pb-0">
        {/* 3. FIXED: Update titles */}
        <CardTitle>Employees by Division</CardTitle>
        <CardDescription>Total company headcount by division</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config} // 4. Use config prop
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data} // 5. Use data prop
              dataKey={dataKey} // 6. Use dataKey prop
              nameKey={nameKey} // 7. Use nameKey prop (will be 'division')
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {/* 8. Use dynamic total */}
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {/* 9. FIXED: Hardcoded label */}
                          Employees
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
