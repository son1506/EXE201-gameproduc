import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Rate,
  message,
  Spin,
  Button,
  Input,
  Select,
  DatePicker,
  Space,
  Tag,
  Avatar,
  Modal,
  Tooltip
} from "antd";
import {
  MessageCircle,
  User,
  Calendar,
  Search,
  Filter,
  Eye,
  Trash2,
  RefreshCw
} from "lucide-react";
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Search: AntSearch } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

// API function to get all feedback
const getAllFeedbacks = async () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Get token from localStorage
  const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');

  if (!token) {
    throw new Error("You need to login to view feedback list.");
  }

  try {
    const url = `${API_BASE_URL}/api/Feedback/GetAllFeedbacks`;

    console.log("Fetching all feedbacks from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization": `Bearer ${token}`
      }
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }
      if (response.status === 403) {
        throw new Error("You don't have permission to access this feature.");
      }
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("All feedbacks data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching all feedbacks:", error);
    throw error;
  }
};

// API function to get product information by ID
const getProductById = async (productId: string) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Get token from localStorage
  const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');

  try {
    const url = `${API_BASE_URL}/api/Product/GetProductById/${encodeURIComponent(productId)}`;

    console.log("Fetching product info from:", url);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "*/*"
    };

    // Add Authorization header if token exists
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log("Product not found:", productId);
        return null;
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Product data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

interface Feedback {
  feedbackId: string;
  accountId: string;
  productId: string;
  comment: string;
  rating: number;
  createdAt: string;
  // Optional fields that may come from other APIs
  userName?: string;
  userEmail?: string;
  productName?: string;
  status?: string;
}

export default function FeedbackAdmin() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch all feedback when component mounts
  useEffect(() => {
    fetchAllFeedbacks();
  }, []);

  // Enrich feedbacks with product information
  useEffect(() => {
    const enrichFeedbacksWithProductInfo = async () => {
      if (feedbacks.length === 0) return;

      const enrichedFeedbacks = await Promise.all(
        feedbacks.map(async (feedback) => {
          try {
            const productInfo = await getProductById(feedback.productId);
            return {
              ...feedback,
              productName: productInfo?.productName || 'Unknown Product'
            };
          } catch (error) {
            console.error("Error fetching product info for:", feedback.productId);
            return {
              ...feedback,
              productName: 'Unknown Product'
            };
          }
        })
      );

      setFeedbacks(enrichedFeedbacks);
    };

    // Only enrich if feedbacks don't already have productName
    if (feedbacks.length > 0 && !feedbacks[0].productName) {
      enrichFeedbacksWithProductInfo();
    }
  }, [feedbacks]);

  // Filter feedbacks when there are changes
  useEffect(() => {
    filterFeedbacks();
  }, [feedbacks, searchText, ratingFilter, dateRange]);

  const fetchAllFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await getAllFeedbacks();

      // Set feedback data first, then enrich with product info
      setFeedbacks(data || []);
    } catch (error) {
      const errorMessage = (error as Error).message;
      message.error(errorMessage);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  const filterFeedbacks = () => {
    let filtered = [...feedbacks];

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(feedback =>
        feedback.comment?.toLowerCase().includes(searchText.toLowerCase()) ||
        feedback.userName?.toLowerCase().includes(searchText.toLowerCase()) ||
        feedback.productName?.toLowerCase().includes(searchText.toLowerCase()) ||
        feedback.productId?.toLowerCase().includes(searchText.toLowerCase()) ||
        feedback.accountId?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by rating
    if (ratingFilter !== null) {
      filtered = filtered.filter(feedback => feedback.rating === ratingFilter);
    }

    // Filter by date range
    if (dateRange) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter(feedback => {
        const feedbackDate = dayjs(feedback.createdAt);
        return feedbackDate.isAfter(startDate.startOf('day')) &&
          feedbackDate.isBefore(endDate.endOf('day'));
      });
    }

    setFilteredFeedbacks(filtered);
  };

  const handleRefresh = () => {
    fetchAllFeedbacks();
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleRatingFilter = (value: number | null) => {
    setRatingFilter(value);
  };

  const handleDateRangeChange = (dates: [dayjs.Dayjs, dayjs.Dayjs] | null) => {
    setDateRange(dates);
  };

  const clearFilters = () => {
    setSearchText("");
    setRatingFilter(null);
    setDateRange(null);
  };

  const showFeedbackDetail = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedFeedback(null);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'green';
    if (rating >= 3) return 'orange';
    return 'red';
  };

  const columns: ColumnsType<Feedback> = [
    {
      title: 'User',
      dataIndex: 'accountId',
      key: 'accountId',
      width: 150,
      render: (accountId: string, record: Feedback) => (
        <div className="flex items-center gap-2">
          <Avatar icon={<User />} size="small" className="bg-blue-100 text-blue-600" />
          <div>
            <div className="font-medium">{record.userName || 'Customer'}</div>
            <div className="text-xs text-gray-500">ID: {accountId}</div>
            {record.userEmail && (
              <div className="text-xs text-gray-500">{record.userEmail}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Product',
      dataIndex: 'productId',
      key: 'productId',
      width: 200,
      render: (productId: string, record: Feedback) => (
        <div>
          <div className="font-medium">{record.productName || 'Unknown Product'}</div>
          <div className="text-xs text-gray-500">ID: {productId}</div>
        </div>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 120,
      render: (rating: number) => (
        <div className="flex items-center gap-2">
          <Rate disabled value={rating} className="text-sm" />
          <Tag color={getRatingColor(rating)}>{rating}/5</Tag>
        </div>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: true,
      render: (comment: string) => (
        <Tooltip title={comment}>
          <div className="max-w-xs truncate">{comment}</div>
        </Tooltip>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: string) => (
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{formatDate(date)}</span>
        </div>
      ),
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record: Feedback) => (
        <Space>
          <Button
            type="text"
            icon={<Eye className="w-4 h-4" />}
            onClick={() => showFeedbackDetail(record)}
            className="text-blue-600 hover:bg-blue-50"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Feedback Management</h1>
                <p className="text-gray-500">View and manage all customer reviews</p>
              </div>
            </div>
            <Button
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={handleRefresh}
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white border-none"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Search
              </label>
              <AntSearch
                placeholder="Search by name, email, product..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
                allowClear
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Filter by rating
              </label>
              <Select
                placeholder="Choose rating"
                value={ratingFilter}
                onChange={handleRatingFilter}
                allowClear
                className="w-full"
              >
                <Option value={5}>⭐⭐⭐⭐⭐ (5 stars)</Option>
                <Option value={4}>⭐⭐⭐⭐ (4 stars)</Option>
                <Option value={3}>⭐⭐⭐ (3 stars)</Option>
                <Option value={2}>⭐⭐ (2 stars)</Option>
                <Option value={1}>⭐ (1 star)</Option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Filter by date
              </label>
              <RangePicker
                value={dateRange}
                onChange={handleDateRangeChange}
                format="DD/MM/YYYY"
                className="w-full"
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={clearFilters}
                className="w-full"
              >
                Clear filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{filteredFeedbacks.length}</div>
            <div className="text-sm text-gray-500">Total feedback</div>
          </Card>
          <Card className="text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">
              {filteredFeedbacks.filter(f => f.rating >= 4).length}
            </div>
            <div className="text-sm text-gray-500">Good reviews (4-5⭐)</div>
          </Card>
          <Card className="text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-orange-600">
              {filteredFeedbacks.filter(f => f.rating === 3).length}
            </div>
            <div className="text-sm text-gray-500">Average reviews (3⭐)</div>
          </Card>
          <Card className="text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-red-600">
              {filteredFeedbacks.filter(f => f.rating <= 2).length}
            </div>
            <div className="text-sm text-gray-500">Poor reviews (1-2⭐)</div>
          </Card>
        </div>

        {/* Table */}
        <Card className="shadow-sm border border-gray-100">
          <Table
            columns={columns}
            dataSource={filteredFeedbacks}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} feedback`,
            }}
            scroll={{ x: 1000 }}
            className="custom-table"
          />
        </Card>

        {/* Feedback Detail Modal */}
        <Modal
          title="Feedback Detail"
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>
          ]}
          width={600}
        >
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">User</label>
                  <p className="mt-1">{selectedFeedback.userName || 'Customer'}</p>
                  <p className="text-sm text-gray-500">Account ID: {selectedFeedback.accountId}</p>
                  {selectedFeedback.userEmail && (
                    <p className="text-sm text-gray-500">{selectedFeedback.userEmail}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Product</label>
                  <p className="mt-1">{selectedFeedback.productName || 'Unknown Product'}</p>
                  <p className="text-sm text-gray-500">Product ID: {selectedFeedback.productId}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Rating</label>
                <div className="mt-1 flex items-center gap-2">
                  <Rate disabled value={selectedFeedback.rating} />
                  <span>{selectedFeedback.rating}/5</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Comment</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p>{selectedFeedback.comment}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Created Date</label>
                <p className="mt-1">{formatDate(selectedFeedback.createdAt)}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}