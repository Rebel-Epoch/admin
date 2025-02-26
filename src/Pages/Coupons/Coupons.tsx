import {
  Space,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
  Button,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CouponsResponseType } from "../../types/common";
import moment from "moment";

export default function Coupons() {
  const [coupons, setCoupons] = useState<CouponsResponseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] =
    useState<CouponsResponseType | null>(null);
  const [form] = Form.useForm();

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

  const showEditModal = (coupon: CouponsResponseType) => {
    console.log("Editing Coupon Data:", coupon);

    setEditingCoupon(coupon);
    setIsModalOpen(true);

    form.setFieldsValue(coupon || {});

    console.log("Form Values After Setting:", form.getFieldsValue());
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("Updated Coupon", values);
      setIsModalOpen(false);
    });
  };

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
        <Space>
          <Button onClick={() => showEditModal(record)}>Edit</Button>
          <Button danger onClick={() => console.log(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 12 }}
        dataSource={coupons}
        rowKey="_id"
      />
      <Modal
        title="Edit Coupon"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="code" label="Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="discountType"
            label="Discount Type"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: "percentage", label: "Percentage" },
                { value: "fixed", label: "Fixed Amount" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="maxDiscount"
            label="Max Discount"
            rules={[{ required: true }]}
          >
            {" "}
            <Input type="number" />{" "}
          </Form.Item>
          <Form.Item
            name="minOrder"
            label="Min Order"
            rules={[{ required: true }]}
          >
            {" "}
            <Input type="number" />{" "}
          </Form.Item>
          <Form.Item
            name="validFrom"
            label="Valid From"
            rules={[{ required: true }]}
          >
            {" "}
            <DatePicker />{" "}
          </Form.Item>
          <Form.Item
            name="validTo"
            label="Valid To"
            rules={[{ required: true }]}
          >
            {" "}
            <DatePicker />{" "}
          </Form.Item>
          <Form.Item name="active" label="Active" valuePropName="checked">
            {" "}
            <Switch />{" "}
          </Form.Item>
          <Form.Item name="description" label="Description">
            {" "}
            <Input.TextArea />{" "}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
