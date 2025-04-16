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
  message,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import { CouponsResponseType } from "../../types/common";
import useRequest from "@/Utils/useRequest";
import URLS from "@/constants/urls";
import request from "@/services/api/request";
const { RangePicker } = DatePicker;
import moment from "moment";

const CreateSotm = ({
  setCreateModal,
  getResponse,
}: {
  setCreateModal: (value: boolean) => void;
  getResponse: () => void;
}) => {
  const [form] = Form.useForm();

  const { getResponse: getUsersData, data: usersData } = useRequest<any>({
    requestParams: {
      url: URLS.auth.user.get,
      method: "GET",
      showError: false,
    },
    initialState: null,
  });

  useEffect(() => {
    getResponse();
    getUsersData();
  }, []);

  const userOptions = usersData?.users.map(
    (user: { email: string; name: string }) => ({
      value: user.email,
      label: user.name,
    }),
  );

  const handleSubmit = async (values: {
    email: string;
    startDate: any;
    endDate: any;
  }) => {
    const finalData = {
      email: values.email,
      startDate: moment(values.validDateRange[0])
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss[Z]"),
      endDate: moment(values.validDateRange[1])
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss[Z]"),
    };

    const {
      status,
      HttpStatusCode,
      data: responseData,
    } = await request<any>({
      method: "POST",
      url: URLS.auth.sotm.create,
      data: finalData,
    });

    if (status == HttpStatusCode.OK && responseData) {
      message.success("Sotm Added successfully!");
      setCreateModal(false);
      getResponse();
    }
  };

  return (
    <Form
      className="max-h-[80vh] overflow-auto "
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item name="email" label="User" rules={[{ required: true }]}>
        <Select placeholder="Select user.." options={userOptions}></Select>
      </Form.Item>

      <Form.Item
        name="validDateRange"
        label="Start Date - End Date"
        rules={[{ required: true }]}
      >
        <RangePicker className="w-full" />
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
  );
};

export default function Sotm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [sotmid, setSotmId] = useState<string>("");
  const [form] = Form.useForm();

  const { getResponse, data: sotmData } = useRequest<any>({
    requestParams: {
      url: URLS.auth.sotm.viewAll,
      method: "GET",
      showError: false,
    },
    initialState: null,
  });

  useEffect(() => {
    getResponse();
  }, []);

  const showEditModal = (coupon: CouponsResponseType) => {
    console.log("Editing Coupon Data:", coupon);
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

  const handleDelete = async () => {
    try {
      const { status, HttpStatusCode } = await request({
        method: "DELETE",
        url: `${URLS.auth.sotm.delete}/${sotmid}`,
      });
      if (status == HttpStatusCode.OK) {
        message.success("Sotm Deleted");
        setDeleteModal(false);
        setSotmId("");
        getResponse();
      }
    } catch (error) {
      console.error(error);
      message.error("There was an error while deleting sotm!");
      setSotmId("");
    }
  };

  const columns = [
    {
      title: "user",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: string) => new Date(startDate).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: string) => new Date(endDate).toLocaleDateString(),
    },
    {
      title: "Active Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showEditModal(record)} disabled>
            Edit
          </Button>
          <Button
            danger
            onClick={() => {
              setSotmId(record._id);
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
    <>
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
            Create Sotm
          </Button>
        </Space>
        <Table
          columns={columns}
          loading={!sotmData}
          pagination={{ pageSize: 12 }}
          dataSource={sotmData?.sotm}
          rowKey="_id"
        />
      </div>
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

      <Modal
        open={deleteModal}
        title="Are You Sure You Want to Delete This Sotm?"
        onOk={handleDelete}
        onCancel={() => {
          setDeleteModal(false);
          setSotmId("");
        }}
        okText="Yes"
        cancelText="No"
        centered
        maskClosable={false}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      ></Modal>

      <Modal
        title="Create Sotm"
        open={createModal}
        onCancel={() => {
          setCreateModal(false);
        }}
        footer={null}
        className="!bg-[#0E1525] !text-white"
        centered
        destroyOnClose
      >
        <CreateSotm setCreateModal={setCreateModal} getResponse={getResponse} />
      </Modal>
    </>
  );
}
