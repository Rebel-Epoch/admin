import { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import useRequest from "../../Utils/useRequest";
import URLS from "../../constants/urls";
import TextArea from "antd/es/input/TextArea";
import request from "@/services/api/request";

const CreateUser = ({
  setCreateModal,
  getResponse,
}: {
  setCreateModal: (value: boolean) => void;
  getResponse: () => void;
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const {
      status,
      HttpStatusCode,
      data: responseData,
    } = await request<any>({
      method: "POST",
      url: URLS.auth.user.create,
      data: { ...values, cart: [] },
    });

    if (status == HttpStatusCode.OK && responseData) {
      message.success("User Created Successfully!");
      setCreateModal(false);
      getResponse();
    }
  };

  return (
    <>
      <Form
        className="max-h-[80vh] overflow-auto "
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone number"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <TextArea placeholder="Enter address" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { getResponse, data: usersData } = useRequest<any>({
    requestParams: {
      url: URLS.auth.user.get,
      method: "GET",
      showError: false,
    },
    initialState: null,
  });

  useEffect(() => {
    getResponse();
  }, []);

  // const showModal = (type: string, user?: any) => {
  //   setModalType(type);
  //   setSelectedUser(user || null);
  //   setIsModalOpen(true);
  //   form.setFieldsValue(user || {});
  // };

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

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Total Orders",
      render: (_: any, record: any) => {
        return record.orderConfig.totalOrders;
      },
      key: "totalOrders",
    },
    {
      title: "Total Order Amount",
      render: (_: any, record: any) => {
        return `₹${parseInt(record.orderConfig.totalAmount).toFixed(2)}`;
      },
      key: "totalAmount",
    },
    {
      title: "Joined On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
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
          <Button disabled>Edit</Button>
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
          onClick={() => setCreateModal(true)}
        >
          Add User
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={usersData?.users}
        rowKey="_id"
        loading={!usersData}
        pagination={{ pageSize: 12 }}
      />
      {/*
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
        </Form> */}
      {/* </Modal> */}

      <Modal
        title="Add User"
        open={createModal}
        onCancel={() => {
          setCreateModal(false);
        }}
        footer={null}
        className="!bg-[#0E1525] !text-white"
        centered
        destroyOnClose
      >
        <CreateUser setCreateModal={setCreateModal} getResponse={getResponse} />
      </Modal>
    </div>
  );
}
