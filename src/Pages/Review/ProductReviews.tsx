import { useState } from "react";
import {
  Table,
  Space,
  Modal,
  Form,
  Input,
  Rate,
  Button,
  message,
  Popconfirm,
  Select,
} from "antd";

interface Product {
  _id: string;
  name: string;
}

interface Review {
  id: string;
  productId: string;
  reviewer: string;
  rating: number;
  comment: string;
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

export default function ProductReviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      productId: "67b37406c123209ecea26a28",
      reviewer: "John Doe",
      rating: 4,
      comment: "Great product!",
    },
    {
      id: "2",
      productId: "67b37406c123209ecea26a28",
      reviewer: "Alice Smith",
      rating: 5,
      comment: "Excellent quality!",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [form] = Form.useForm();

  const showEditModal = (review: Review) => {
    setEditingReview(review);
    setIsModalOpen(true);
    form.setFieldsValue(review);
  };

  const showAddModal = () => {
    setEditingReview(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter((review) => review.id !== id));
    message.success("Review deleted successfully");
  };

  const handleSubmit = (values: Omit<Review, "id">) => {
    if (editingReview) {
      // Update existing review
      setReviews((prev) =>
        prev.map((r) => (r.id === editingReview.id ? { ...r, ...values } : r)),
      );
      message.success("Review updated successfully");
    } else {
      // Add new review
      const newReview: Review = {
        id: Math.random().toString(36).substr(2, 9),
        ...values,
      };
      setReviews([...reviews, newReview]);
      message.success("Review added successfully");
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
      title: "Reviewer",
      dataIndex: "reviewer",
      key: "reviewer",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Review) => (
        <Space>
          <Button onClick={() => showEditModal(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this review?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
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
        Add Review
      </Button>
      <Table columns={columns} dataSource={reviews} rowKey="id" />

      <Modal
        title={editingReview ? "Edit Review" : "Add Review"}
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
            name="reviewer"
            label="Reviewer Name"
            rules={[
              { required: true, message: "Please enter the reviewer's name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please select a rating" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item name="comment" label="Comment">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
