import { useEffect, useState } from "react";
import { Table, Space, Button, Modal, Form, Input, Select } from "antd";
import useRequest from "../../Utils/useRequest";
import URLS from "../../constants/Urls";

export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [form] = Form.useForm();

  const { getResponse, data: usersData } = useRequest<any>({
    requestParams: {
      url: URLS.auth.user.get,
      method: "GET",
      showError: false,
    },
    initialState: [],
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

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button onClick={() => showModal("edit", record)}>Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* <Button type="primary" onClick={() => showModal("add")}>
        Add User
      </Button> */}

      <Table
        columns={columns}
        dataSource={usersData?.users || []}
        rowKey="_id"
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
    </div>
  );
}
