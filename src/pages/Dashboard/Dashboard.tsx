import { Space, Title } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { data } from "./data";

export const Dashboard = () => (
  <div>
    <Title order={1}>Truck dashboard</Title>
    <Space h="xl" />
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      series={[
        { name: "TruckA", color: "violet.6" },
        { name: "TruckB", color: "blue.6" },
        { name: "TruckC", color: "teal.6" },
      ]}
      tickLine="y"
    />
  </div>
);
