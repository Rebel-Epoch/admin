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
import useRequest from "@/Utils/useRequest";
import URLS from "@/constants/urls";
import request from "@/services/api/request";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const CreateCoupon = ({
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

  const userOptions = usersData?.users.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  const handleSubmit = async (values: any) => {
    const finalData = {
      code: values.code,
      discountType: values.discountType,
      maxDiscount: values.maxDiscount,
      minOrder: values.minOrder,
      active: values.active,
      description: values.description,
      maxAllowed: values.maxAllowed,
      forUser: values.forUser,
      eliminateCharges: values.eliminateCharges,
      validFrom: values.validDateRange[0].format("YYYY-MM-DDTHH:mm:ss[Z]"),
      validTo: values.validDateRange[1].format("YYYY-MM-DDTHH:mm:ss[Z]"),
    };

    const {
      status,
      HttpStatusCode,
      data: responseData,
    } = await request<any>({
      method: "POST",
      url: URLS.auth.coupons.create,
      data: finalData,
    });

    if (status == HttpStatusCode.OK && responseData) {
      message.success("Coupon Added successfully!");
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
      <Form.Item
        name="code"
        label="Coupon Code"
        rules={[{ required: true, message: "Enter a coupon code" }]}
      >
        <Input placeholder="Enter code" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input placeholder="Enter description" />
      </Form.Item>

      <Form.Item
        name="discountType"
        label="Discount Type"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="percentage">Percentage</Select.Option>
          <Select.Option value="flat">Flat Amount</Select.Option>
        </Select>
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="maxDiscount"
          label="Max Discount"
          rules={[{ required: true }]}
        >
          <InputNumber
            className="w-full"
            min={0}
            max={100}
            placeholder="Max discount"
          />
        </Form.Item>
        <Form.Item name="minOrder" label="Min Order Amount">
          <InputNumber
            className="w-full"
            min={0}
            placeholder="Min order amount"
          />
        </Form.Item>
      </div>

      <Form.Item
        name="validDateRange"
        label="Valid Date Range"
        rules={[{ required: true }]}
      >
        <RangePicker className="w-full" />
      </Form.Item>

      <Form.Item name="maxAllowed" label="Max Allowed Uses">
        <InputNumber className="w-full" min={1} placeholder="Max allowed" />
      </Form.Item>

      <Form.Item name="eliminateCharges" label="Eliminate Charges">
        <Select mode="multiple" placeholder="Select charges to eliminate">
          <Select.Option value="shipping">Shipping</Select.Option>
          <Select.Option value="service">Service Charge</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="forUser" label="User Type" initialValue="all">
        <Select mode="multiple" options={userOptions}></Select>
      </Form.Item>

      <Form.Item name="active" label="Active" valuePropName="checked">
        <Switch />
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

const UpdateCoupen = ({
  getResponse,
  couponData,
  setUpdateModal,
}: {
  getResponse: () => void;
  couponData: any;
  setUpdateModal: (value: boolean) => void;
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

    console.log(couponData);
  }, []);

  const formatedCouponData = {
    ...couponData,
    validDateRange:
      couponData.validFrom && couponData.validTo
        ? [dayjs(couponData.validFrom), dayjs(couponData.validTo)]
        : undefined,
  };

  const userOptions = usersData?.users.map((user: any) => ({
    value: user._id,
    label: user.name,
  }));

  const handleSubmit = async (values: any) => {
    const finalData = {
      code: values.code,
      discountType: values.discountType,
      maxDiscount: values.maxDiscount,
      minOrder: values.minOrder,
      active: values.active,
      description: values.description,
      maxAllowed: values.maxAllowed,
      forUser: values.forUser,
      eliminateCharges: values.eliminateCharges,
      validFrom: values.validDateRange[0].format("YYYY-MM-DDTHH:mm:ss[Z]"),
      validTo: values.validDateRange[1].format("YYYY-MM-DDTHH:mm:ss[Z]"),
    };

    const {
      status,
      HttpStatusCode,
      data: responseData,
    } = await request<any>({
      method: "PATCH",
      url: `${URLS.auth.coupons.update}/${couponData._id}`,
      data: finalData,
    });

    if (status == HttpStatusCode.OK && responseData) {
      message.success("Coupon Updated successfully!");
      setUpdateModal(false);
      getResponse();
    }
  };

  return (
    <div className="max-h-[80vh] overflow-auto">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={formatedCouponData}
      >
        <Form.Item
          name="code"
          label="Coupon Code"
          rules={[{ required: true, message: "Enter a coupon code" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>

        <Form.Item
          name="discountType"
          label="Discount Type"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="flat">Flat Amount</Select.Option>
          </Select>
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="maxDiscount"
            label="Max Discount"
            rules={[{ required: true }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              max={100}
              placeholder="Max discount"
            />
          </Form.Item>
          <Form.Item name="minOrder" label="Min Order Amount">
            <InputNumber
              className="w-full"
              min={0}
              placeholder="Min order amount"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="validDateRange"
          label="Valid Date Range"
          rules={[{ required: true }]}
        >
          <RangePicker className="w-full" />
        </Form.Item>

        <Form.Item name="maxAllowed" label="Max Allowed Uses">
          <InputNumber className="w-full" min={1} placeholder="Max allowed" />
        </Form.Item>

        <Form.Item name="eliminateCharges" label="Eliminate Charges">
          <Select mode="multiple" placeholder="Select charges to eliminate">
            <Select.Option value="shipping">Shipping</Select.Option>
            <Select.Option value="service">Service Charge</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="forUser" label="User Type" initialValue="all">
          <Select mode="multiple" options={userOptions}></Select>
        </Form.Item>

        <Form.Item name="active" label="Active" valuePropName="checked">
          <Switch />
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
    </div>
  );
};

export default function Coupons() {
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [couponData, setCouponData] = useState<any>();
  const [couponId, setCouponId] = useState<string>("");

  const { getResponse, data: couponsData } = useRequest<any>({
    requestParams: {
      url: URLS.auth.coupons.viewAll,
      method: "GET",
      showError: false,
    },
    initialState: null,
  });

  useEffect(() => {
    getResponse();
  }, []);

  const handleDelete = async () => {
    try {
      const { status, HttpStatusCode } = await request({
        method: "DELETE",
        url: `${URLS.auth.coupons.delete}/${couponId}`,
      });
      if (status == HttpStatusCode.OK) {
        message.success("Coupon Deleted");
        setDeleteModal(false);
        setCouponId("");
        getResponse();
      }
    } catch (error) {
      console.error(error);
      message.error("There was an error while deleting coupon!");
      setCouponId("");
    }
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
          <Button
            onClick={() => {
              setUpdateModal(true);
              setCouponData(record);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => {
              setCouponId(record._id);
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
            Create Coupon
          </Button>
        </Space>
        <Table
          columns={columns}
          loading={!couponsData}
          pagination={{ pageSize: 12 }}
          dataSource={couponsData?.coupons}
          rowKey="_id"
        />
      </div>
      <Modal
        title="Edit Coupon"
        open={updateModal}
        footer={null}
        centered
        destroyOnClose
        onCancel={() => setUpdateModal(false)}
      >
        <UpdateCoupen
          getResponse={getResponse}
          couponData={couponData}
          setUpdateModal={setUpdateModal}
        />
      </Modal>

      <Modal
        open={deleteModal}
        title="Are You Sure You Want to Delete This Coupon?"
        onOk={handleDelete}
        onCancel={() => {
          setDeleteModal(false);
          setCouponId("");
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
        title="Create a Coupon"
        open={createModal}
        onCancel={() => {
          setCreateModal(false);
        }}
        footer={null}
        className="!bg-[#0E1525] !text-white"
        centered
        destroyOnClose
      >
        <CreateCoupon
          setCreateModal={setCreateModal}
          getResponse={getResponse}
        />
      </Modal>
    </>
  );
}
