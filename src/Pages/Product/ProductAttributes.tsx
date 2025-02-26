import React, { useState } from "react";
import {
  Table,
  Space,
  Modal,
  Form,
  Input,
  Button,
  message,
  Popconfirm,
  Select,
} from "antd";

interface Product {
  _id: string;
  name: string;
}

interface Variation {
  id: string;
  productId: string;
  size: string;
  color: string;
}

const dummyProducts: Product[] = [
  {
    _id: "67b37406c123209ecea26a28",
    name: "New Product Test",
  },
  {
    _id: "67b37406c123209ecea26b99",
    name: "Another Product",
  },
];

export default function ProductVariations() {
  const [variations, setVariations] = useState<Variation[]>([
    {
      id: "1",
      productId: "67b37406c123209ecea26a28",
      size: "M",
      color: "Black",
    },
    {
      id: "2",
      productId: "67b37406c123209ecea26a28",
      size: "L",
      color: "Blue",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVariation, setEditingVariation] = useState<Variation | null>(
    null,
  );
  const [form] = Form.useForm();

  const showEditModal = (variation: Variation) => {
    setEditingVariation(variation);
    setIsModalOpen(true);
    form.setFieldsValue(variation);
  };

  const showAddModal = () => {
    setEditingVariation(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    setVariations(variations.filter((v) => v.id !== id));
    message.success("Variation deleted successfully");
  };

  const handleSubmit = (values: Omit<Variation, "id">) => {
    if (editingVariation) {
      setVariations((prev) =>
        prev.map((v) =>
          v.id === editingVariation.id ? { ...v, ...values } : v,
        ),
      );
      message.success("Variation updated successfully");
    } else {
      const newVariation: Variation = {
        id: Math.random().toString(36).substr(2, 9),
        ...values,
      };
      setVariations([...variations, newVariation]);
      message.success("Variation added successfully");
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "productId",
      key: "productId",
      render: (productId: string) =>
        dummyProducts.find((p) => p._id === productId)?.name || "Unknown",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Variation) => (
        <Space>
          <Button type="link" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this variation?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: 16 }}
      >
        Add Variation
      </Button>
      <Table columns={columns} dataSource={variations} rowKey="id" />

      <Modal
        title={editingVariation ? "Edit Variation" : "Add Variation"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="productId"
            label="Select Product"
            rules={[{ required: true, message: "Please select a product" }]}
          >
            <Select>
              {dummyProducts.map((product) => (
                <Select.Option key={product._id} value={product._id}>
                  {product.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="size"
            label="Size"
            rules={[{ required: true, message: "Please enter size" }]}
          >
            <Input placeholder="e.g. XS, M, L, XL" />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Please enter color" }]}
          >
            <Input placeholder="e.g. Red, Blue, Black" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
