// // import React, { useEffect, useState } from "react";
// // import { Table, Space, Button, Modal, Form, Input, Tag } from "antd";
// // import axios from "axios";

// // export default function ProductAttributes() {
// //   const [attributes, setAttributes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [form] = Form.useForm();
// //   const [editingItem, setEditingItem] = useState(null);

// //   useEffect(() => {
// //     axios
// //       .get("/api/product-attributes")
// //       .then((response) => {
// //         setAttributes(response.data.attributes);
// //         setLoading(false);
// //       })
// //       .catch((error) => console.error("Error fetching attributes:", error));
// //   }, []);

// //   const showModal = (item = null) => {
// //     setEditingItem(item);
// //     setIsModalOpen(true);
// //     form.setFieldsValue(item || { name: "", type: "" });
// //   };

// //   const handleOk = () => {
// //     form.validateFields().then((values) => {
// //       if (editingItem) {
// //         console.log("Updating", values);
// //       } else {
// //         console.log("Adding", values);
// //       }
// //       setIsModalOpen(false);
// //     });
// //   };

// //   const handleDelete = (id: string) => {
// //     console.log("Deleting", id);
// //   };

// //   const columns = [
// //     {
// //       title: "Name",
// //       dataIndex: "name",
// //       key: "name",
// //     },
// //     {
// //       title: "Type",
// //       dataIndex: "type",
// //       key: "type",
// //       render: (type: string) => (
// //         <Tag color={type === "size" ? "blue" : "green"}>
// //           {type.toUpperCase()}
// //         </Tag>
// //       ),
// //     },
// //     {
// //       title: "Actions",
// //       key: "actions",
// //       render: (_, record) => (
// //         <Space size="middle">
// //           <a onClick={() => showModal(record)}>Edit</a>
// //           <a onClick={() => handleDelete(record.key)}>Delete</a>
// //         </Space>
// //       ),
// //     },
// //   ];

// //   return (
// //     <div>
// //       <Button type="primary" onClick={() => showModal()}>
// //         Add Attribute
// //       </Button>
// //       <Table
// //         columns={columns}
// //         dataSource={attributes.map((item) => ({ ...item, key: item._id }))}
// //         loading={loading}
// //         pagination={{ pageSize: 5 }}
// //       />

// //       <Modal
// //         title={editingItem ? "Edit Attribute" : "Add Attribute"}
// //         open={isModalOpen}
// //         onOk={handleOk}
// //         onCancel={() => setIsModalOpen(false)}
// //       >
// //         <Form form={form} layout="vertical">
// //           <Form.Item
// //             name="name"
// //             label="Name"
// //             rules={[{ required: true, message: "Please enter a name" }]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             name="type"
// //             label="Type"
// //             rules={[{ required: true, message: "Please enter a type" }]}
// //           >
// //             <Input />
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { Table, Space, Button, Modal, Form, Input, Tag } from "antd";

// const AdminPanel: React.FC = () => {
//   const [categories, setCategories] = useState([
//     { _id: "1", name: "Electronics" },
//     { _id: "2", name: "Clothing" },
//   ]);
//   const [products, setProducts] = useState([
//     { _id: "1", name: "Laptop", category: "Electronics" },
//     { _id: "2", name: "T-Shirt", category: "Clothing" },
//   ]);
//   const [variations, setVariations] = useState([
//     { _id: "1", name: "16GB RAM", product: "Laptop" },
//     { _id: "2", name: "Blue Color", product: "T-Shirt" },
//   ]);
//   const [attributes, setAttributes] = useState([
//     { _id: "1", name: "Small", type: "size" },
//     { _id: "2", name: "Medium", type: "size" },
//     { _id: "3", name: "Large", type: "size" },
//     { _id: "4", name: "Red", type: "color" },
//     { _id: "5", name: "Blue", type: "color" },
//   ]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form] = Form.useForm();
//   const [editingItem, setEditingItem] = useState(null);

//   const showModal = (item = null) => {
//     setEditingItem(item);
//     setIsModalOpen(true);
//     form.setFieldsValue(item || { name: "" });
//   };

//   const handleOk = () => {
//     form.validateFields().then((values) => {
//       if (editingItem) {
//         console.log("Updating", values);
//       } else {
//         console.log("Adding", values);
//       }
//       setIsModalOpen(false);
//     });
//   };

//   const handleDelete = (id: string) => {
//     console.log("Deleting", id);
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Space size="middle">
//           <a onClick={() => showModal(record)}>Edit</a>
//           <a onClick={() => handleDelete(record._id)}>Delete</a>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h2>Categories</h2>
//       <Button type="primary" onClick={() => showModal()}>
//         Add Category
//       </Button>
//       <Table
//         columns={columns}
//         dataSource={categories.map((item) => ({ ...item, key: item._id }))}
//         pagination={{ pageSize: 5 }}
//       />

//       <h2>Products</h2>
//       <Button type="primary" onClick={() => showModal()}>
//         Add Product
//       </Button>
//       <Table
//         columns={columns}
//         dataSource={products.map((item) => ({ ...item, key: item._id }))}
//         pagination={{ pageSize: 5 }}
//       />

//       <h2>Variations</h2>
//       <Button type="primary" onClick={() => showModal()}>
//         Add Variation
//       </Button>
//       <Table
//         columns={columns}
//         dataSource={variations.map((item) => ({ ...item, key: item._id }))}
//         pagination={{ pageSize: 5 }}
//       />

//       <h2>Sizes & Colors</h2>
//       <Button type="primary" onClick={() => showModal()}>
//         Add Attribute
//       </Button>
//       <Table
//         columns={[
//           ...columns,
//           {
//             title: "Type",
//             dataIndex: "type",
//             key: "type",
//             render: (type: string) => (
//               <Tag color={type === "size" ? "blue" : "green"}>
//                 {type.toUpperCase()}
//               </Tag>
//             ),
//           },
//         ]}
//         dataSource={attributes.map((item) => ({ ...item, key: item._id }))}
//         pagination={{ pageSize: 5 }}
//       />

//       <Modal
//         title={editingItem ? "Edit Item" : "Add Item"}
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={() => setIsModalOpen(false)}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: "Please enter a name" }]}
//           >
//             {" "}
//             <Input />{" "}
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default AdminPanel;
