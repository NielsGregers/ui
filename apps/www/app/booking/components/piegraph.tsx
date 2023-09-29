import React, { PureComponent } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"

const data = [
  { name: "Available", value: 3 },
  { name: "Booked", value: 2 },
]
const COLORS = ["#00C49F", "#FF8042"]

export default class PieGraph extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o"

  render() {
    return (
      <PieChart width={80} height={40}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Pie
          data={data}
          cx={420}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    )
  }
}
