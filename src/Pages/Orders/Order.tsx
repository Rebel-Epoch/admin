import URLS from "@/constants/urls";
import request from "@/services/api/request";
import useRequest from "@/Utils/useRequest";
import { Button, Image, message, Modal, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { FaClipboardList, FaCreditCard, FaTruck } from "react-icons/fa";
import UpdateOrderStatus from "./UpdateOrderStatus";

const getBadgeClassName = (status: string) => {
  switch (status) {
    case "Pending":
      return "blue";
    case "Ordered":
      return "volcano";
    case "Cancelled":
      return "red";
    case "Delevired":
      return "green";
    default:
      return "";
  }
};

const ViewOrderDetails = ({ orderId }: { orderId: string }) => {
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

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (_, record) => (
        <Image
          width={30}
          height={30}
          src="https://themesdesign.in/tailwick/html-dark/assets/images/product/img-03.png"
        />
      ),
    },
    { title: "Quantity", dataIndex: "qty", key: "qty" },
    { title: "Size", dataIndex: ["variation", "size", "value"], key: "size" },
    {
      title: "Color",
      dataIndex: ["variation", "color", "key"],
      key: "color",
      render: (color, record) => (
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full border border-gray-500"
            style={{ backgroundColor: record.variation.color.value }}
          ></span>
          {color}
        </div>
      ),
    },
    // {
    //   title: "Original Price",
    //   dataIndex: ["variation", "price", "originalPrice"],
    //   key: "originalPrice",
    //   render: (price) => `₹${price}`,
    // },
    // {
    //   title: "Discounted Price",
    //   dataIndex: ["variation", "price", "discountedPrice"],
    //   key: "discountedPrice",
    //   render: (price) => `₹${price}`,
    // },
    {
      title: "Expected Delivery",
      dataIndex: "expectedDelivery",
      key: "expectedDelivery",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => <Tag color="blue">{status}</Tag>,
    },
  ];

  return (
    <div className="text-white  rounded-lg">
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-[#141414] p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <FaTruck className="text-purple-500" />
            <h3 className="font-semibold">Shipping Details</h3>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            {orderData?.order.shippingDetails.shippingAddress.addressLine}{" "}
            <br />
            Phone:{orderData?.order.shippingDetails.shippingAddress.phone}
          </p>
        </div>

        <div className="bg-[#141414] p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <FaClipboardList className="text-orange-500" />
            <h3 className="font-semibold">Billing Details</h3>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            <strong>
              {orderData?.order.shippingDetails.billingAddress.name}
            </strong>
            <br />
            {orderData?.order.shippingDetails.billingAddress.addressLine}
          </p>
        </div>
        <div className="bg-[#141414] p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <FaCreditCard className="text-blue-500" />
            <h3 className="font-semibold">Payment Details</h3>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Payment Method: {orderData?.order.paymentDetails.paymentMethod}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center bg-[#141414] p-4 rounded-lg mt-4">
        <div>
          <h3 className="text-gray-400 text-xs">ORDER ID</h3>
          <p className="font-semibold">#{orderId}</p>
        </div>
        <div>
          <h3 className="text-gray-400 text-xs">ORDER DATE</h3>
          <p className="font-semibold">
            {new Date(orderData?.order.orderDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h3 className="text-gray-400 text-xs">ORDER AMOUNT</h3>
          <p className="font-semibold">
            ₹{orderData?.order.paymentDetails.breakdown.grandtotal}
          </p>
        </div>
      </div>

      <div className="w-full overflow-scroll">
        <h3 className="mt-6 mb-5 font-semibold">Total Items</h3>
        <Table
          columns={columns}
          dataSource={orderData?.order.orderItems}
          rowKey="_id"
          loading={!orderData?.order.orderItems}
          pagination={false}
        />
      </div>

      <h3 className="mt-6 mb-5 font-semibold">Order Summary</h3>
      <div className="bg-[#141414] p-4 rounded-lg">
        {orderData?.order.orderItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-2 border-b border-gray-600"
          >
            <span>Product Name {index}</span>
            <span>₹{item.variation.price.discountedPrice}</span>
          </div>
        ))}
        <div className="flex justify-between py-2 border-gray-600">
          <span>Base Price</span>
          <span>₹{orderData?.order.paymentDetails.breakdown.baseprice}</span>
        </div>
        <div className="flex justify-between py-2 border-gray-600">
          <span>gst</span>
          <span>₹{orderData?.order.paymentDetails.breakdown.gst}</span>
        </div>
        <div className="flex justify-between py-2 border-gray-600">
          <span>SOTM</span>
          <span>₹{orderData?.order.paymentDetails.breakdown.sotm}</span>
        </div>
        <div className="flex justify-between py-2 border-gray-600">
          <span>Shipping Charges</span>
          <span>₹{orderData?.order.paymentDetails.breakdown.shipping}</span>
        </div>
        <div className="flex justify-between mt-2 font-semibold">
          <span>Total Amount</span>
          <span>₹{orderData?.order.paymentDetails.breakdown.grandtotal}</span>
        </div>
      </div>

      {/* <div className="flex justify-end gap-3 mt-6">
        <button
          // onClick={onClose}
          className="px-4 py-2 text-white border border-gray-500 rounded-lg"
        >
          Close
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Download Invoice
        </button>
      </div> */}
    </div>
  );
};

export default function Orders() {
  const [orderId, setOrderId] = useState<string>("");
  const [showViewOrder, setShowViewOrder] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setIsDeleteModal] = useState<boolean>(false);

  const { getResponse, data: ordersData } = useRequest<any>({
    requestParams: {
      url: URLS.auth.orders.viewAll,
      method: "GET",
      showError: false,
    },
    initialState: null,
  });

  useEffect(() => {
    getResponse();
  }, []);

  const showEditModal = (orderId: string) => {
    setEditModal(true);
    setOrderId(orderId);
  };

  const handleDelete = async () => {
    try {
      const { status, HttpStatusCode } = await request({
        method: "DELETE",
        url: `${URLS.auth.orders.delete}/${orderId}`,
      });
      if (status == HttpStatusCode.OK) {
        message.success("Order Deleted");
        setIsDeleteModal(false);
        setOrderId("");
        getResponse();
      }
    } catch (error) {
      console.error(error);
      message.error("There was an error while deleting order!");
      setOrderId("");
    }
  };

  const columns = [
    {
      title: "Order Id",
      key: "orderId",
      dataIndex: "orderId",
      render: (orderId: string) => <span>#{orderId}</span>,
    },
    {
      title: "Order Date",
      key: "orderDate",
      dataIndex: "orderDate",
      render: (orderDate: string) => new Date(orderDate).toLocaleDateString(),
    },
    {
      title: "Customer Name	",
      key: "name",
      render: (_, record) => (
        <span>{record.shippingDetails.billingAddress.name}</span>
      ),
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record) => (
        <span>₹{record.paymentDetails.breakdown.grandtotal}</span>
      ),
    },
    {
      title: "Delivery Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus: string) => (
        <Tag color={getBadgeClassName(orderStatus)}>{orderStatus}</Tag>
      ),
    },
    {
      title: "Payment Method",
      key: "paymentMethod",
      render: (_, record) => <span>{record.paymentDetails.paymentMethod}</span>,
    },
    {
      title: "Track Order",
      key: "trackingUrl",
      render: (_, record) => (
        <a href={record.shippingDetails.trackingUrl}>Track</a>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setShowViewOrder(true);
              setOrderId(record.orderId);
            }}
          >
            View
          </Button>
          <Button
            onClick={() => {
              showEditModal(record.orderId);
            }}
          >
            Update
          </Button>
          <Button
            danger
            onClick={() => {
              setOrderId(record.orderId);
              setIsDeleteModal(true);
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
      <Table
        columns={columns}
        loading={!ordersData}
        pagination={{ pageSize: 12 }}
        dataSource={ordersData?.orders}
        rowKey="_id"
      />

      <Modal
        title={`Order Details - #${orderId}`}
        open={showViewOrder}
        onCancel={() => {
          setShowViewOrder(false);
          setOrderId("");
        }}
        footer={null}
        width={800}
        centered
        destroyOnClose
      >
        <ViewOrderDetails orderId={orderId} />
      </Modal>

      <Modal
        open={editModal}
        title={`Update Order - ${orderId}`}
        onCancel={() => {
          setEditModal(false);
          setOrderId("");
        }}
        footer={null}
        centered
        destroyOnClose
      >
        <UpdateOrderStatus
          orderId={orderId}
          setEditModal={setEditModal}
          setOrderId={setOrderId}
          getOrders={getResponse}
        />
      </Modal>

      <Modal
        open={deleteModal}
        title="Are You Sure You Want to Delete This Order?"
        onOk={handleDelete}
        onCancel={() => {
          setIsDeleteModal(false);
          setOrderId("");
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
    </div>
  );
}
