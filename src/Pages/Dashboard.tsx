import React, { useState, useEffect } from "react";
import { dashboardStats, order } from "../Utils/types.ts";
import { secrets } from "../secrets.ts";
import { getCookie } from "../Utils/helper.ts";
import axios from "axios";
import { Table } from "antd";
import type { TableProps } from "antd";

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
      <div className="flex gap-5 items-center flex-wrap md:flex-nowrap">
        <div className="flex flex-col justify-start items-stretch w-full rounded-xl bg-white/95 py-10 px-5">
          <p className="text-xl font-bold mb-2">Total Orders</p>
          <p className="text-xl">100</p>
        </div>
        <div className="flex flex-col items-start justify-start w-full rounded-xl bg-white/95 py-10 px-5">
          <p className="text-xl font-bold mb-2">Total Products</p>
          <p className="text-xl">100</p>
        </div>
        <div className="flex flex-col items-start justify-start w-full rounded-xl bg-white/95 py-10 px-5">
          <p className="text-xl font-bold mb-2">Products Sold</p>
          <p className="text-xl">100</p>
        </div>
        <div className="flex flex-col items-start justify-start w-full rounded-xl bg-white/95 py-10 px-5">
          <p className="text-xl font-bold mb-2">Revenue Generated</p>
          <p className="text-xl">100</p>
        </div>
      </div>
      <div className="flex gap-5 items-center flex-wrap md:flex-nowrap mt-5">
        <div className="flex flex-col items-start justify-start w-full rounded-xl bg-white/95 py-10 px-5">
          <p className="text-xl font-bold mb-2">Customers</p>
          <p className="text-xl">100</p>
        </div>
        <div className="flex flex-col items-start justify-start w-full rounded-xl bg-white/95 py-10 px-5">
          <p className="text-xl font-bold mb-2">Returned Orders</p>
          <p className="text-xl">100</p>
        </div>
        <div className="flex flex-col items-start justify-start w-full rounded-xl bg-white/95 py-10 px-5">
          <p className="text-xl font-bold mb-2">Replacement Orders</p>
          <p className="text-xl">100</p>
        </div>
      </div>
      <div className="w-full h-auto flex gap-5 mt-5">
        <div className="h-auto w-1/2">
          <h2 className="text-white text-xl mb-4">Recent Orders</h2>
          <Table<order>
            columns={columns}
            dataSource={data}
            className="h-full"
          />
        </div>
        <div className="h-auto w-1/2">
          <h2 className="text-white text-xl">Orders Graph</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
