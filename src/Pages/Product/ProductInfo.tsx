import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  message,
} from "antd";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  categoryId: string;
}

interface Variation {
  id: string;
  productId: string;
  size: string;
  color: string;
}

// Dummy Data
const dummyCategories: Category[] = [
  { id: "1", name: "T-Shirts" },
  { id: "2", name: "Jeans" },
];

const dummyProducts: Product[] = [
  { id: "101", name: "Black T-Shirt", categoryId: "1" },
  { id: "102", name: "Blue Jeans", categoryId: "2" },
];

const dummyVariations: Variation[] = [
  { id: "201", productId: "101", size: "M", color: "Black" },
  { id: "202", productId: "101", size: "L", color: "White" },
];

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [variations, setVariations] = useState<Variation[]>(dummyVariations);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "category" | "product" | "variation"
  >("category");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form] = Form.useForm();

  const showModal = (
    type: "category" | "product" | "variation",
    item: any = null,
  ) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);
    form.setFieldsValue(item || {});
  };

  const handleDelete = (
    id: string,
    type: "category" | "product" | "variation",
  ) => {
    if (type === "category") {
      setCategories(categories.filter((c) => c.id !== id));
      setProducts(products.filter((p) => p.categoryId !== id));
      setVariations(
        variations.filter(
          (v) =>
            !products.find((p) => p.id === v.productId && p.categoryId === id),
        ),
      );
    } else if (type === "product") {
      setProducts(products.filter((p) => p.id !== id));
      setVariations(variations.filter((v) => v.productId !== id));
    } else {
      setVariations(variations.filter((v) => v.id !== id));
    }
    message.success(
      `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
    );
  };

  const handleSubmit = (values: any) => {
    if (modalType === "category") {
      if (editingItem) {
        setCategories(
          categories.map((c) =>
            c.id === editingItem.id ? { ...c, ...values } : c,
          ),
        );
      } else {
        setCategories([
          ...categories,
          { id: Date.now().toString(), ...values },
        ]);
      }
    } else if (modalType === "product") {
      if (editingItem) {
        setProducts(
          products.map((p) =>
            p.id === editingItem.id ? { ...p, ...values } : p,
          ),
        );
      } else {
        setProducts([...products, { id: Date.now().toString(), ...values }]);
      }
    } else {
      if (editingItem) {
        setVariations(
          variations.map((v) =>
            v.id === editingItem.id ? { ...v, ...values } : v,
          ),
        );
      } else {
        setVariations([
          ...variations,
          { id: Date.now().toString(), ...values },
        ]);
      }
    }
    setIsModalOpen(false);
    message.success(
      `${modalType.charAt(0).toUpperCase() + modalType.slice(1)} saved successfully`,
    );
    form.resetFields();
  };

  return (
    <div>
      <h2>Categories</h2>
      <Button
        type="primary"
        onClick={() => showModal("category")}
        style={{ marginBottom: 16 }}
      >
        Add Category
      </Button>
      <Table
        dataSource={categories}
        rowKey="id"
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button
                  type="link"
                  onClick={() => showModal("category", record)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Delete?"
                  onConfirm={() => handleDelete(record.id, "category")}
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <h2>Products</h2>
      <Button
        type="primary"
        onClick={() => showModal("product")}
        style={{ marginBottom: 16 }}
      >
        Add Product
      </Button>
      <Table
        dataSource={products}
        rowKey="id"
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          {
            title: "Category",
            dataIndex: "categoryId",
            render: (id) =>
              categories.find((c) => c.id === id)?.name || "Unknown",
          },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button
                  type="link"
                  onClick={() => showModal("product", record)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Delete?"
                  onConfirm={() => handleDelete(record.id, "product")}
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <h2>Variations</h2>
      <Button
        type="primary"
        onClick={() => showModal("variation")}
        style={{ marginBottom: 16 }}
      >
        Add Variation
      </Button>
      <Table
        dataSource={variations}
        rowKey="id"
        columns={[
          { title: "Size", dataIndex: "size", key: "size" },
          { title: "Color", dataIndex: "color", key: "color" },
          {
            title: "Product",
            dataIndex: "productId",
            render: (id) =>
              products.find((p) => p.id === id)?.name || "Unknown",
          },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button
                  type="link"
                  onClick={() => showModal("variation", record)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Delete?"
                  onConfirm={() => handleDelete(record.id, "variation")}
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      {/* Modal Form */}
      <Modal
        title={editingItem ? "Edit" : "Add"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {modalType === "product" && (
            <Form.Item
              name="categoryId"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select>
                {categories.map((c) => (
                  <Select.Option key={c.id} value={c.id}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {modalType === "variation" && (
            <>
              <Form.Item
                name="productId"
                label="Product"
                rules={[{ required: true }]}
              >
                <Select>
                  {products.map((p) => (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="size" label="Size" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="color"
                label="Color"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
}
