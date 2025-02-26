import { Space, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://rebel-epoch-backend.vercel.app/api/v1/admin/coupons?page=1&limit=2",
      )
      .then((response) => {
        setCoupons(response.data.coupons);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching coupons:", error));
  }, []);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
    },
    {
      title: "Max Discount",
      dataIndex: "maxDiscount",
      key: "maxDiscount",
    },
    {
      title: "Min Order",
      dataIndex: "minOrder",
      key: "minOrder",
    },
    {
      title: "Valid From",
      dataIndex: "validFrom",
      key: "validFrom",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Valid To",
      dataIndex: "validTo",
      key: "validTo",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={coupons.map((coupon) => ({ ...coupon, key: coupon._id }))}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}
