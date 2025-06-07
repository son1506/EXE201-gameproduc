import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Popconfirm,
  Tag,
  Row,
  Col,
  Statistic,
  message,
  Avatar,
  Upload,
  Image,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarOutlined,
  TrophyOutlined,
  RiseOutlined,
  UploadOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps, TableProps } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

// Define ColumnsType locally
type ColumnsType<T> = TableProps<T>['columns'];

// Interfaces
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  status: 'active' | 'inactive';
  stock: number;
  image: string;
  createdAt: string;
}

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  category: string;
  status: 'active' | 'inactive';
  stock: number;
  image?: string;
}

interface CustomUploadRequestOptions {
  file: RcFile;
  onSuccess: (response: string) => void;
  onError: (error: Error) => void;
}

// Mock data for products
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Sweeties Character Plushie",
    description: "Cute plushie of the main character from Sweeties Dogma game",
    price: 299000,
    category: "Merchandise",
    status: "active",
    stock: 50,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=150&fit=crop",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Game Soundtrack CD",
    description: "Official soundtrack of Sweeties Dogma with 20 amazing tracks",
    price: 150000,
    category: "Music",
    status: "active",
    stock: 30,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Limited Edition Poster",
    description: "Collectible poster with exclusive artwork signed by artist",
    price: 80000,
    category: "Collectibles",
    status: "inactive",
    stock: 5,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba4441b?w=150&h=150&fit=crop",
    createdAt: "2024-01-05",
  },
  {
    id: 4,
    name: "Gaming Mouse Pad",
    description: "Premium gaming mouse pad with Sweeties Dogma design",
    price: 120000,
    category: "Gaming",
    status: "active",
    stock: 25,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop",
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    name: "Character Keychain Set",
    description: "Set of 5 keychains featuring all main characters",
    price: 50000,
    category: "Merchandise",
    status: "active",
    stock: 100,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=150&fit=crop",
    createdAt: "2024-01-08",
  },
];

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm<ProductFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  // Statistics calculations
  const totalProducts: number = products.length;
  const activeProducts: number = products.filter(p => p.status === 'active').length;
  const totalRevenue: number = products.reduce((sum, p) => sum + (p.price * Math.max(0, 100 - p.stock)), 0);
  const lowStockProducts: number = products.filter(p => p.stock < 10).length;

  // Convert file to base64
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // Handle preview image
  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // Handle upload change
  const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Custom upload request
  const customRequest = ({ file, onSuccess }: CustomUploadRequestOptions): void => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  // Handle Submit Form
  const handleSubmit = async (values: ProductFormValues): Promise<void> => {
    setLoading(true);
    try {
      // Xử lý hình ảnh
      let imageUrl: string = values.image || '';
      
      if (fileList.length > 0 && fileList[0].originFileObj) {
        // Convert uploaded file to base64
        imageUrl = await getBase64(fileList[0].originFileObj as RcFile);
      }

      setTimeout(() => {
        if (editingProduct) {
          setProducts(products.map(p => 
            p.id === editingProduct.id 
              ? { ...p, ...values, image: imageUrl, id: editingProduct.id }
              : p
          ));
          message.success("Cập nhật sản phẩm thành công!");
        } else {
          const newProduct: Product = {
            ...values,
            image: imageUrl,
            id: Math.max(...products.map(p => p.id)) + 1,
            createdAt: new Date().toISOString().split('T')[0],
          };
          setProducts([...products, newProduct]);
          message.success("Tạo sản phẩm mới thành công!");
        }
        setIsModalVisible(false);
        setEditingProduct(null);
        form.resetFields();
        setFileList([]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error("Có lỗi xảy ra!");
      setLoading(false);
    }
  };

  // Handle Delete Product
  const handleDelete = (id: number): void => {
    setProducts(products.filter(p => p.id !== id));
    message.success("Xóa sản phẩm thành công!");
  };

  // Handle Edit Product
  const handleEdit = (product: Product): void => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    
    // Set existing image to fileList if it's a URL
    if (product.image) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: product.image,
        },
      ]);
    }
    
    setIsModalVisible(true);
  };

  // Handle View Product
  const handleView = (product: Product): void => {
    setViewingProduct(product);
    setIsViewModalVisible(true);
  };

  // Handle Create New Product
  const handleCreate = (): void => {
    setEditingProduct(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  // Upload props
  const uploadProps: UploadProps = {
    // customRequest,
    onChange: handleUploadChange,
    onPreview: handlePreview,
    fileList,
    listType: "picture-card",
    maxCount: 1,
    accept: "image/*",
    beforeUpload: (file: RcFile): boolean => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
      if (!isJpgOrPng) {
        message.error('Chỉ có thể upload file JPG/PNG/WEBP!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Hình ảnh phải nhỏ hơn 2MB!');
        return false;
      }
      return true;
    },
  };

  // Category colors mapping
  const categoryColors: Record<string, string> = {
    Merchandise: "blue",
    Music: "purple",
    Collectibles: "gold",
    Gaming: "green"
  };

  // Table columns - SỬA DÒNG NÀY
  const columns: ColumnsType<Product> = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (image: string, record: Product) => (
        <Avatar
          src={image}
          size={60}
          shape="square"
          alt={record.name}
          style={{ borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (name: string, record: Product) => (
        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">
            {record.description}
          </div>
        </div>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (category: string) => (
        <Tag color={categoryColors[category] || "default"}>{category}</Tag>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 130,
      render: (price: number) => (
        <span className="font-semibold text-green-600">
          {price?.toLocaleString()} VND
        </span>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      width: 100,
      render: (stock: number) => (
        <Tag color={stock < 10 ? "red" : stock < 30 ? "orange" : "green"}>
          {stock} sản phẩm
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: 'active' | 'inactive') => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Hoạt động" : "Tạm dừng"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 180,
      render: (_, record: Product) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleView(record)}
            className="bg-blue-500 hover:bg-blue-600"
          />
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
            className="text-orange-500 border-orange-500 hover:bg-orange-50"
          />
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
            okButtonProps={{ danger: true }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Phần JSX giữ nguyên như cũ...
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <DashboardOutlined className="mr-3 text-blue-500" />
            Dashboard Quản Trị
          </h1>
          <p className="text-gray-600 mt-1">Quản lý sản phẩm Sweeties Dogma</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          size="large"
          className="bg-gradient-to-r from-blue-500 to-purple-600 border-none hover:from-blue-600 hover:to-purple-700"
        >
          Thêm sản phẩm mới
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Tổng sản phẩm"
              value={totalProducts}
              prefix={<ShoppingOutlined className="text-blue-500" />}
              valueStyle={{ color: '#1890ff', fontSize: '2rem', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Sản phẩm hoạt động"
              value={activeProducts}
              prefix={<TrophyOutlined className="text-green-500" />}
              valueStyle={{ color: '#52c41a', fontSize: '2rem', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Doanh thu ước tính"
              value={totalRevenue}
              prefix={<RiseOutlined className="text-red-500" />}
              suffix="VND"
              valueStyle={{ color: '#f5222d', fontSize: '1.5rem', fontWeight: 'bold' }}
              formatter={(value) => `${Number(value).toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Sắp hết hàng"
              value={lowStockProducts}
              prefix={<UserOutlined className="text-orange-500" />}
              valueStyle={{ 
                color: lowStockProducts > 0 ? '#fa8c16' : '#52c41a', 
                fontSize: '2rem', 
                fontWeight: 'bold' 
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Products Table */}
      <Card 
        title={
          <div className="flex items-center">
            <ShoppingOutlined className="mr-2 text-blue-500" />
            <span className="text-lg font-semibold">Danh sách sản phẩm</span>
          </div>
        }
        className="shadow-sm"
        bodyStyle={{ padding: 0 }}
      >
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total: number, range: [number, number]) =>
              `Hiển thị ${range[0]}-${range[1]} trong tổng số ${total} sản phẩm`,
            pageSizeOptions: ['8', '16', '32'],
          }}
          scroll={{ x: 1200 }}
          className="custom-table"
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={
          <div className="text-xl font-semibold text-gray-800">
            {editingProduct ? "🔧 Cập nhật sản phẩm" : "✨ Thêm sản phẩm mới"}
          </div>
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingProduct(null);
          form.resetFields();
          setFileList([]);
        }}
        footer={null}
        width={700}
        className="top-8"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-6"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
              >
                <Input 
                  placeholder="Nhập tên sản phẩm" 
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
              >
                <Select 
                  placeholder="Chọn danh mục" 
                  size="large"
                  className="rounded-lg"
                >
                  <Option value="Merchandise">🧸 Merchandise</Option>
                  <Option value="Music">🎵 Music</Option>
                  <Option value="Collectibles">🏆 Collectibles</Option>
                  <Option value="Gaming">🎮 Gaming</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
              >
                <Select 
                  placeholder="Chọn trạng thái" 
                  size="large"
                  className="rounded-lg"
                >
                  <Option value="active">✅ Hoạt động</Option>
                  <Option value="inactive">❌ Tạm dừng</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá (VND)"
                rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Nhập giá sản phẩm"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="stock"
                label="Số lượng tồn kho"
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Nhập số lượng"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Mô tả sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <TextArea
              rows={4}
              placeholder="Nhập mô tả chi tiết về sản phẩm..."
              className="rounded-lg"
            />
          </Form.Item>

          {/* Upload Image Section */}
          <Form.Item
            label="Hình ảnh sản phẩm"
            required
          >
            <Upload {...uploadProps}>
              {fileList.length >= 1 ? null : (
                <div className="text-center p-4">
                  {/* <InboxOutlined className="text-4xl text-gray-400 mb-2" /> */}
                  <p className="text-gray-600">Nhấp hoặc kéo thả để tải lên</p>
                  {/* <p className="text-gray-400 text-sm">Hỗ trợ JPG, PNG, WEBP (tối đa 2MB)</p> */}
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* Optional URL Input */}
          <Form.Item
            name="image"
            label="Hoặc nhập URL hình ảnh"
          >
            <Input 
              placeholder="https://example.com/image.jpg (tùy chọn)" 
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item className="mb-0 text-right pt-4 border-t">
            <Space size="middle">
              <Button
                size="large"
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingProduct(null);
                  form.resetFields();
                  setFileList([]);
                }}
                className="min-w-[100px]"
              >
                Hủy bỏ
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                size="large"
                className="min-w-[120px] bg-gradient-to-r from-blue-500 to-purple-600 border-none"
              >
                {editingProduct ? "Cập nhật" : "Tạo mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Product Modal */}
      <Modal
        title={
          <div className="text-xl font-semibold text-gray-800">
            👁️ Chi tiết sản phẩm
          </div>
        }
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button 
            key="close" 
            size="large"
            onClick={() => setIsViewModalVisible(false)}
          >
            Đóng
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            size="large"
            onClick={() => {
              setIsViewModalVisible(false);
              if (viewingProduct) {
                handleEdit(viewingProduct);
              }
            }}
            className="bg-gradient-to-r from-orange-500 to-red-500 border-none"
          >
            Chỉnh sửa
          </Button>,
        ]}
        width={600}
        className="top-8"
      >
        {viewingProduct && (
          <div className="space-y-6 mt-6">
            <div className="text-center bg-gray-50 p-6 rounded-xl">
              <Avatar
                src={viewingProduct.image}
                size={120}
                shape="square"
                alt={viewingProduct.name}
                className="rounded-xl shadow-lg"
              />
              <h3 className="text-xl font-bold mt-4 text-gray-800">
                {viewingProduct.name}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="font-semibold text-blue-700 text-sm">Danh mục</label>
                <div className="mt-1">
                  <Tag color="blue" className="text-sm">{viewingProduct.category}</Tag>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <label className="font-semibold text-green-700 text-sm">Giá bán</label>
                <p className="text-green-800 font-bold text-lg mt-1">
                  {viewingProduct.price?.toLocaleString()} VND
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <label className="font-semibold text-orange-700 text-sm">Tồn kho</label>
                <div className="mt-1">
                  <Tag color={viewingProduct.stock < 10 ? "red" : "green"} className="text-sm">
                    {viewingProduct.stock} sản phẩm
                  </Tag>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <label className="font-semibold text-purple-700 text-sm">Trạng thái</label>
                <div className="mt-1">
                  <Tag color={viewingProduct.status === "active" ? "green" : "red"} className="text-sm">
                    {viewingProduct.status === "active" ? "Hoạt động" : "Tạm dừng"}
                  </Tag>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="font-semibold text-gray-700 text-sm">Mô tả sản phẩm</label>
              <p className="text-gray-800 mt-2 leading-relaxed">
                {viewingProduct.description}
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <label className="font-semibold text-indigo-700 text-sm">Ngày tạo</label>
              <p className="text-indigo-800 mt-1">
                {new Date(viewingProduct.createdAt).toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Preview Image Modal */}
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible: boolean) => setPreviewOpen(visible),
            afterOpenChange: (visible: boolean) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default Dashboard;
