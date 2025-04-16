import URLS from "@/constants/Urls";
import request from "@/services/api/request";
import useRequest from "@/Utils/useRequest";
import { Button, Form, Input, message, Select } from "antd";
import { useEffect } from "react";

const UpdateOrderStatus = ({
  orderId,
  setEditModal,
  setOrderId,
  getOrders,
}: {
  orderId: string;
  setEditModal: (value: boolean) => void;
  setOrderId: (value: string) => void;
  getOrders: () => void;
}) => {
  const [form] = Form.useForm();

  const { getResponse, data: orderData } = useRequest<any>({
    requestParams: {
      url: `${URLS.auth.orders.viewSingle}/${orderId}`,
      method: "GET",
      showError: false,
    },
    initialState: null,
  });

  useEffect(() => {
    getResponse();
  }, []);

  const onSubmit = async (values: any) => {
    const {
      status,
      HttpStatusCode,
      data: responseData,
    } = await request<any>({
      method: "PATCH",
      url: `${URLS.auth.orders.update}/${orderId}`,
      data: {
        trackingUrl: values.trackingUrl,
        shippingMethod: values.shippingMethod,
        orderStatus: values.orderStatus,
      },
    });
    if (status == HttpStatusCode.OK && responseData) {
      message.success("Order Status Updated");
      getOrders();
      setOrderId("");
      setEditModal(false);
    }
  };

  if (!orderData?.order) {
    return null;
  }

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          trackingUrl: orderData?.order?.shippingDetails?.trackingUrl,
          shippingMethod: orderData?.order?.shippingDetails?.shippingMethod,
          orderStatus: orderData?.order?.orderStatus,
        }}
      >
        <Form.Item name="trackingUrl" label="Tracking Url">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="shippingMethod" label="Shipping Method">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="orderStatus" label="Order Status">
          <Select
            size="large"
            options={[
              { value: "Shipped", label: "Shipped" },
              { value: "delivered", label: "Delivered" },
              { value: "Scheduled", label: "Scheduled" },
            ]}
          />
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

export default UpdateOrderStatus;
