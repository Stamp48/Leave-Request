"use client"

import { Pie, PieChart } from "recharts"

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

export const description = "A pie chart with a label"

// 1. Define the props interface
interface ChartPieLabelProps {
  data: any[]
  config: ChartConfig
  dataKey: string
  nameKey: string
}

export function ChartPieLabel({ 
  data, 
  config, 
  dataKey, 
  nameKey 
}: ChartPieLabelProps) {
  return (
    <Card className="flex flex-col w-full max-w-sm h-[350px]">
      <CardHeader className="items-center pb-0">
        {/* 2. Update titles */}
        <CardTitle>Leave by Department</CardTitle>
        <CardDescription>Approved leave in selected period</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config} // 3. Use config prop
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {/* 4. Use dynamic props */}
            <Pie 
              data={data} 
              dataKey={dataKey} 
              label 
              nameKey={nameKey} 
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}