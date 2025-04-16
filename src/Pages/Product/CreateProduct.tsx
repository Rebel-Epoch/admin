import { useState } from "react";
import { Form, Input, Select, Button, Upload, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import request from "@/services/api/request";
import URLS from "@/constants/Urls";

const { Option } = Select;

const AddProduct = () => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [varitaions, setVariations] = useState<
    {
      images: File[];
      data: {
        size: { key: string; value: string } | null;
        sku: string | null;
        color: { key: string; value: string } | null;
        price: {
          originalPrice: number;
          discountedPrice: number;
          discountReason: string;
        };
        countInStock: number;
      };
    }[]
  >([
    {
      images: [],
      data: {
        size: null,
        sku: null,
        color: null,
        price: {
          originalPrice: 0,
          discountedPrice: 0,
          discountReason: "",
        },
        countInStock: 0,
      },
    },
  ]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  console.log(varitaions);

  const handleFinish = async (values: any) => {
    const imageFiles = varitaions.images?.fileList || [];
    const sku = varitaions.sku;

    const formData = new FormData();

    Object.entries(varitaions).forEach(([key, value]) => {
      if (key == "images") return;
      formData.append(
        key,
        typeof value === "object" ? JSON.stringify(value) : value
      );
    });

    imageFiles.forEach((fileWrapper) => {
      const file = fileWrapper.originFileObj;
      if (file) {
        formData.append(`variation_${sku}_images`, file);
      }
    });

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          `${key}:`,
          value.name,
          "-",
          value.type,
          "-",
          value.size,
          "bytes"
        );
      } else {
        console.log(`${key}:`, value);
      }
    }

    // const {
    //   status,
    //   HttpStatusCode,
    //   data: responseData,
    // } = await request<any>({
    //   method: "POST",
    //   url: URLS.auth.products.create,
    //   data: {
    //     ...newProduct,
    //     variations: JSON.stringify(newProduct.variations),
    //   },
    // });
    // if (status === HttpStatusCode.OK) {
    //   console.log("Product created successfully");
    //   console.log(responseData);
    // } else {
    //   console.error("Failed to create product");
    // }
  };

  const onFinish = async (index: number, values) => {
    setVariations((prev) =>
      prev.map((variation, idx) => {
        return idx == index
          ? {
              images: [],
              data: values,
            }
          : variation;
      })
    );

    console.log(varitaions);
    // console.log("Products:", [...products, newProduct]);
    // form2.resetFields();
  };

  return (
    <div className="max-h-[90svh] overflow-y-scroll text-white">
      <div className="max-w-full gap-6">
        <div className="lg:col-span-2 bg-[#18181b] p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Create Product</h2>
          <Form layout="vertical" onFinish={handleFinish} form={form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="name"
                label="Product Title"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Product title" />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select size="large" placeholder="Select Category">
                  <Option value="fashion">Fashion</Option>
                  <Option value="electronics">Electronics</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Enter description" rows={4} />
            </Form.Item>

            <Form.Item
              name="additonal_description"
              label="Additonal Description"
            >
              <Input.TextArea
                placeholder="Enter Additonal description"
                rows={2}
              />
            </Form.Item>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
            {/* <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true }]}
              >
                <InputNumber
                  size="large"
                  className="w-full"
                  placeholder="Enter quantity"
                />
              </Form.Item> */}
            <Form.Item name="isAvailable" label="Is Available">
              <Select size="large" placeholder="Select Type">
                <Option value="TRUE">Is Available</Option>
                <Option value="FALSE">Not Available</Option>
              </Select>
            </Form.Item>
            {/* </div> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="lowestPrice" label="Original Price (₹)">
                <InputNumber
                  className="w-full"
                  value={price.originalPrice}
                  size="large"
                  onChange={(value) =>
                    setPrice((prev) => ({ ...prev, originalPrice: value || 0 }))
                  }
                />
              </Form.Item>
              <Form.Item name="highestPrice" label="Discounted Price (₹)">
                <InputNumber
                  className="w-full"
                  value={price.discountedPrice}
                  size="large"
                  onChange={(value) =>
                    setPrice((prev) => ({
                      ...prev,
                      discountedPrice: value || 0,
                    }))
                  }
                />
              </Form.Item>
            </div> */}
          </Form>

          {varitaions.map((variation, index) => (
            <div className="flex gap-4 items-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Select
                  placeholder="Size"
                  value={variation.data.size?.value}
                  onChange={(value) =>
                    setVariations((prev) =>
                      prev.map((instance, idx) =>
                        idx == index
                          ? {
                              ...instance,
                              data: {
                                ...instance.data,
                                size: {
                                  key: value.toLowerCase().replace(" ", "_"),
                                  value,
                                },
                              },
                            }
                          : instance
                      )
                    )
                  }
                >
                  <Option value="M">Medium</Option>
                  <Option value="L">Large</Option>
                  <Option value="S">Small</Option>
                </Select>

                <Input
                  placeholder="SKU ( Stock keeping unit )"
                  value={variation.data.sku ?? ""}
                  onChange={(value) =>
                    setVariations((prev) =>
                      prev.map((instance, idx) =>
                        idx == index
                          ? {
                              ...instance,
                              data: {
                                ...instance.data,
                                sku: value.target.value,
                              },
                            }
                          : instance
                      )
                    )
                  }
                />

                <Select
                  placeholder="Color"
                  value={variation.data.color?.value}
                  onChange={(value) =>
                    setVariations((prev) =>
                      prev.map((instance, idx) =>
                        idx == index
                          ? {
                              ...instance,
                              data: {
                                ...instance.data,
                                color: {
                                  key: value.toLowerCase().replace(" ", "_"),
                                  value,
                                },
                              },
                            }
                          : instance
                      )
                    )
                  }
                >
                  <Option value="Red">Red</Option>
                  <Option value="Blue">Blue</Option>
                  <Option value="Green">Green</Option>
                </Select>

                <InputNumber
                  placeholder="Count in stock"
                  className="w-full"
                  min={0}
                  value={variation.data.countInStock ?? 0}
                  onChange={(value) =>
                    setVariations((prev) =>
                      prev.map((instance, idx) =>
                        idx == index
                          ? {
                              ...instance,
                              data: {
                                ...instance.data,
                                skcountInStocku: value,
                              },
                            }
                          : instance
                      )
                    )
                  }
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <InputNumber
                  placeholder="Original Price"
                  className="w-full"
                  min={1}
                  value={variation.data.price?.originalPrice ?? 0}
                  onChange={(value) =>
                    setVariations((prev) =>
                      prev.map((instance, idx) =>
                        idx == index
                          ? {
                              ...instance,
                              data: {
                                ...instance.data,
                                price: {
                                  ...instance.data.price,
                                  originalPrice: value ?? 0,
                                },
                              },
                            }
                          : instance
                      )
                    )
                  }
                />
                <InputNumber
                  placeholder="Discounted Price"
                  className="w-full"
                  min={1}
                  value={variation.data.price?.discountedPrice ?? 0}
                  onChange={(value) =>
                    setVariations((prev) =>
                      prev.map((instance, idx) =>
                        idx == index
                          ? {
                              ...instance,
                              data: {
                                ...instance.data,
                                price: {
                                  ...instance.data.price,
                                  discountedPrice: value ?? 0,
                                },
                              },
                            }
                          : instance
                      )
                    )
                  }
                />
                <Input
                  placeholder="Discount Reason"
                  className="w-full"
                  value={variation.data.price?.discountReason ?? ""}
                  onChange={(event) =>
                    setVariations((prev) =>
                      prev.map((instance, idx) =>
                        idx == index
                          ? {
                              ...instance,
                              data: {
                                ...instance.data,
                                price: {
                                  ...instance.data.price,
                                  discountReason: event.target.value ?? "",
                                },
                              },
                            }
                          : instance
                      )
                    )
                  }
                />
              </div>

              <Upload
                listType="picture"
                beforeUpload={() => false}
                multiple
                onChange={(info) => {
                  const files = info.fileList
                    .map((file) => file.originFileObj)
                    .filter((file) => !!file)
                    .map((file) => file as File);
                  setVariations((prev) =>
                    prev.map((instance, idx) =>
                      idx == index
                        ? {
                            ...instance,
                            images: files,
                          }
                        : instance
                    )
                  );
                }}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
          ))}

          <div className="mt-10 flex gap-2">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                setVariations((prev) => [
                  ...prev,
                  {
                    images: [],
                    data: {
                      size: null,
                      sku: null,
                      color: null,
                      price: {
                        originalPrice: 0,
                        discountedPrice: 0,
                        discountReason: "",
                      },
                      countInStock: 0,
                    },
                  },
                ]);
              }}
            >
              Add Varient
            </Button>

            <Button
              onClick={() => form.submit()}
              type="primary"
              htmlType="submit"
              disabled={varitaions.length === 0}
            >
              Create Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
