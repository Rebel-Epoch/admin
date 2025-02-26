import React, { useState, useEffect } from "react";
import { dashboardStats, order } from "../Utils/types.ts";
import { secrets } from "../secrets.ts";
import { getCookie } from "../Utils/helper.ts";
import axios from "axios";
import { Table } from "antd";
import type { TableProps } from "antd";
import { Card, Statistic, Row, Col } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useRequest from "../Utils/useRequest.ts";

const Dashboard: React.FC = () => {
  const [dashBoardStats, setDashboardStats] = useState<dashboardStats>({
    customerCount: 0,
    orderCount: 0,
    productCount: 0,
    returncount: 0,
    replacementcount: 0,
    totalSales: 0,
    totalrevenue: 0,
  });

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 7000 },
    { month: "May", sales: 6000 },
  ];

  const [orders, setOrders] = useState<order[]>([]);

  const getStats = (): void => {
    const options = {
      method: "GET",
      url: secrets.backendUrl,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
  };

  const getRecentOrders = (): void => {
    const options = {
      method: "GET",
      url: `${secrets.backendUrl}/orders/recent`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios(options)
      .then((response) => {
        if (response.data.status == "success") {
          //
        }
      })
      .catch((error) => {
        console.error("Error fetching recent orders:", error);
      });
  };

  const columns: TableProps<order>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "coverImg",
      dataIndex: "coverImg",
      key: "coverImg",
      render: (coverImg: string) => (
        <img src={coverImg} alt="cover" className="w-10 h-10" />
      ),
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <p>₹ {amount}</p>,
    },
    {
      title: "qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "sold_on",
      dataIndex: "sold_on",
      key: "sold_on",
      render: (sold_on: number) => (
        <p>{new Date(sold_on).toLocaleDateString()}</p>
      ),
    },
    {
      title: "customer",
      dataIndex: "customer",
      key: "customer",
    },
  ];

  const { getResponse } = useRequest<{}>({
    // remove when user hit is ready
    requestParams: {
      url: `/api/v1/admin/users`,
      method: "GET",
      showError: false,
    },
    initialState: null,
  });

  useEffect(() => {
    getResponse();
  }, []);

  const data: order[] = [
    {
      id: "1",
      title: "Plain White Tshirt",
      amount: 599,
      sold_on: 1010011010,
      qty: 1,
      coverImg: "https://placehold.co/400x400",
      customer: "singhaditya@mail.com",
    },
    {
      id: "2",
      title: "Plain Black Tshirt",
      amount: 599,
      sold_on: 1010011010,
      qty: 12,
      coverImg: "https://placehold.co/400x400",
      customer: "singhnaman@mail.com",
    },
    {
      id: "3",
      title: "Plain Red Tshirt",
      amount: 599,
      sold_on: 1010011010,
      qty: 3,
      coverImg: "https://placehold.co/400x400",
      customer: "singhvarsha@mail.com",
    },
  ];

  useEffect(() => {
    getStats();
    getRecentOrders();
  }, []);

  return (
    <div className="h-full w-full bg-[#1d1d1d]">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Sales" value={12000} prefix="₹" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Orders" value={320} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Customers" value={150} />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: 20 }}>
        <h3>Sales Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard;
