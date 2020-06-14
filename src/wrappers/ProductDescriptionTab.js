import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { DEFAULT_IMG_URL } from "../common/configs/index";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import {
  Row,
  Col,
  Form,
  Rate,
  Typography,
  Button,
  Comment,
  Tooltip,
  List,
  Space,
  Avatar,
  Pagination,
  Upload,
  message,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useForm } from "antd/lib/form/util";
import { useSelector } from "react-redux";

const { Text, Title } = Typography;

const ProductDescriptionTab = ({
  spaceBottomClass,
  product,
  handleCreateProductRates,
  productRates,
  onChangePaging,
  pagination,
}) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  useEffect(() => {
    moment.locale("vi");
  }, []);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const isImage = file.type.indexOf("image");
      if (isImage < 0) {
        message.error("Vui lòng chọn file định dạng JPG");
        resolve();
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const user = useSelector((state) => (state.user ? state.user.user : null));

  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState({});

  const handlePreviewImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreview({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleCancelPreview = () => setPreview({ previewVisible: false });

  const handleChangeImage = ({ fileList }) => setFileList(fileList);

  const [form] = useForm();

  const handleSubmitComment = (values) => {
    if(values && values.comment) {
        
      handleCreateProductRates && handleCreateProductRates(values);
      form.resetFields();
      setFileList([])
    } else {
      message.warning('Hãy để lại đánh giá của bạn về sản phẩm')
    }
  };

  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              {/* <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Mô tả</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">{`Đánh giá(${
                  productRates.length || 0
                })`}</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Trọng lượng</span> 400 g / Quả
                    </li>
                    <li>
                      <span>Xuất xứ</span>
                      {product.origin || ""}{" "}
                    </li>
                    <li>
                      <span>Materials</span> 60% cotton, 40% polyester
                    </li>
                    <li>
                      <span>Other Info</span> American heirloom jean shorts pug
                      seitan letterpress
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {product.description || ""}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <Row gutter={40}>
                  <Col lg={user && user.id ? 14 : 24} md={24}>
                    <List
                      className="comment-list"
                      itemLayout="horizontal"
                      dataSource={productRates}
                      renderItem={(item) => (
                        <List.Item>
                          <Comment
                            // actions={item.actions}
                            author={
                              <Space>
                                <Text style={{ fontSize: 14 }} strong>
                                  {item.customer
                                    ? item.customer.name
                                    : "Người bí ẩn"}
                                </Text>
                                <Rate
                                  disabled
                                  style={{ fontSize: 14 }}
                                  value={item.starNum}
                                />
                              </Space>
                            }
                            avatar={
                              <Avatar
                                style={{
                                  verticalAlign: "middle",
                                }}
                                size="large"
                              >
                                {
                                  (item.customer
                                    ? item.customer.name
                                    : "Người bí ẩn"
                                  ).split("")[0]
                                }
                              </Avatar>
                            }
                            content={
                              <>
                                <Upload
                                  disabled
                                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                  listType="picture-card"
                                  // fileList={fileList}
                                  // WHEN COMMENT HAVE IMAGE
                                  fileList={
                                    item.ratingImages
                                      ? item.ratingImages.map((image) => ({
                                          uid: image.id,
                                          name: image.imgName,
                                          status: "done",
                                          url:
                                            DEFAULT_IMG_URL +
                                            image.imgLocation.replace(
                                              "\\",
                                              "/"
                                            ),
                                        }))
                                      : []
                                  }
                                  onPreview={handlePreviewImage}
                                  onChange={handleChangeImage}
                                />
                                {item.comment}
                              </>
                            }
                            datetime={
                              <Tooltip
                                title={moment(moment.utc(item.createdAt))
                                  .local()
                                  .format("YYYY-MM-DD HH:mm:ss")}
                              >
                                <span>
                                  {moment(moment.utc(item.createdAt))
                                    .local()
                                    .fromNow()
                                    .toLocaleUpperCase("vn")}
                                </span>
                              </Tooltip>
                            }
                          />
                        </List.Item>
                      )}
                    />
                    {productRates && productRates.length > 0 ? (
                      <Pagination {...pagination} onChange={onChangePaging} />
                    ) : null}
                  </Col>
                  {user && user.id ? (
                    <Col lg={10} md={24}>
                      <Title level={3} style={{ marginBottom: 20 }}>
                        Nhận xét của bạn
                      </Title>
                      <Form
                        form={form}
                        onFinish={handleSubmitComment}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        initialValues={{
                          starNum: 4,
                        }}
                      >
                        <Form.Item
                          label={<Text strong>Đánh giá</Text>}
                          name="starNum"
                        >
                          <Rate />
                        </Form.Item>
                        <Form.Item
                          label={<Text strong>Hình ảnh</Text>}
                          name="images"
                        >
                          <Upload
                            customRequest={dummyRequest}
                            listType="picture-card"
                            accept="image/x-png,image/gif,image/jpeg"
                            fileList={fileList}
                            onPreview={handlePreviewImage}
                            onChange={handleChangeImage}
                          >
                            {fileList.length >= 8 ? null : (
                              <div>
                                <PlusOutlined />
                                <div className="ant-upload-text">Đăng</div>
                              </div>
                            )}
                          </Upload>
                        </Form.Item>

                        <Form.Item
                          label={<Text strong>Nhận xét</Text>}
                          name="comment"
                        >
                          <TextArea
                            rows={6}
                            placeholder="Nhận xét của bạn..."
                          />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                          <Button type="primary" htmlType="submit">
                            Gửi
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                  ) : null}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
      <Modal
        visible={preview.previewVisible}
        title={preview.previewTitle}
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={preview.previewImage}
        />
      </Modal>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
