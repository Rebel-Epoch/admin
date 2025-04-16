import { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Image,
  message,
} from "antd";
import useRequest from "../../Utils/useRequest";
import URLS from "../../constants/urls";
import request from "@/services/api/request";
import AddProduct from "./Createproduct";

export default function AllProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [productModal, setProductModal] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { getResponse, data: productsData } = useRequest<any>({
    requestParams: {
      url: URLS.auth.products.viewAll,
      method: "POST",
      showError: false,
      data: {
        category: "all",
        search: "",
        filters: {
          size: [],
          color: [],
          category: [],
          rating: [],
          price: [],
          gender: [],
        },
      },
    },
    initialState: null,
  });

  useEffect(() => {
    getResponse();
  }, []);

  const showModal = (type: string, user?: any) => {
    setModalType(type);
    setSelectedUser(user || null);
    setIsModalOpen(true);
    form.setFieldsValue(user || {});
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (modalType === "edit" && selectedUser) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === selectedUser._id ? { ...u, ...values } : u,
          ),
        );
      } else {
        setUsers((prev) => [
          ...prev,
          { _id: Date.now().toString(), ...values },
        ]);
      }
      setIsModalOpen(false);
    });
  };

  const handleDelete = async () => {
    try {
      const { status, HttpStatusCode } = await request({
        method: "DELETE",
        url: `${URLS.auth.products.delete}/${productId}`,
      });
      if (status == HttpStatusCode.OK) {
        message.success("Product Deleted");
        setDeleteModal(false);
        setProductId("");
        getResponse();
      }
    } catch (error) {
      console.error(error);
      message.error("There was an error while deleting product!");
      setProductId("");
    }
  };

  const columns = [
    {
      key: "image",
      dataIndex: "image",
      render: (_, record) => (
        <Image width={40} height={40} src={record.variations[0].images[0]} />
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "category", dataIndex: "category", key: "category" },
    {
      title: "averageRating",
      dataIndex: "averageRating",
      key: "averageRating",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <span>
          {record.price.lowestPrice}-{record.price.highestPrice}
        </span>
      ),
    },
    {
      title: "Reviews",
      dataIndex: "numReviews",
      key: "totalOrders",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      redner: (text: string) => <span>{text}</span>,
      key: "gender",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button onClick={() => showModal("edit", record)} disabled>
            Edit
          </Button>
          <Button
            danger
            onClick={() => {
              setProductId(record._id);
              setDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-[#18181b] " style={{ borderRadius: "8px" }}>
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          type="primary"
          size="large"
          onClick={() => setProductModal(true)}
          // disabled
        >
          Add Product
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={productsData?.data}
        rowKey="_id"
        loading={!productsData}
        pagination={{ pageSize: 12 }}
      />

      <Modal
        title={modalType === "edit" ? "Edit User" : "Add User"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        centered
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter an email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "admin", label: "Admin" },
                { value: "customer", label: "Customer" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={productModal}
        footer={null}
        onCancel={() => setProductModal(false)}
        centered
        destroyOnClose
        width={"95vw"}
      >
        <AddProduct />
      </Modal>

      <Modal
        title="Are You Sure You Want to Delete This Product?"
        open={deleteModal}
        onOk={handleDelete}
        onCancel={() => {
          setDeleteModal(false);
          setProductId("");
        }}
        okText="Yes"
        cancelText="No"
        centered
        maskClosable={false}
        destroyOnClose
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      />
    </div>
  );
}
