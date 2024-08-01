import { useDocumentTitle } from "@refinedev/react-router-v6";
import { Row, Col, Card } from 'antd';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Pie, Line } from 'react-chartjs-2';
import { chartOptions, chartData } from './parts/data';

Chart.register(CategoryScale);

export default function Page(){
  useDocumentTitle("Dashboard • " + import.meta.env.VITE_APP_NAME);

  return (
    <>
      <h1 className="text-xl">Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col lg={6} md={4} xs={24}>
          <Card 
            size="small" 
            className="h-full"
            title="Users Gained between 2020-2024"
          >
            <Pie data={chartData} />
          </Card>
        </Col>

        <Col lg={9} md={7} xs={24}>
          <Card 
            size="small" 
            className="flex flex-col h-full"
            classNames={{
              body: "flex items-center h-full"
            }}
            title="Sales Gained between 2020-2024"
          >
            <Bar
              data={chartData}
              options={chartOptions}
            />
          </Card>
        </Col>

        <Col lg={9} md={7} xs={24}>
          <Card 
            size="small" 
            className="flex flex-col h-full"
            classNames={{
              body: "flex items-center h-full"
            }}
            title="Products Gained between 2020-2024"
          >
            <Line
              data={chartData}
              options={chartOptions}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
