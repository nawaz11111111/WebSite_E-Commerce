import React, { useEffect, useState } from "react";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Menu,
  Typography,
  Badge,
  Drawer,
  Table,
  InputNumber,
  Button,
  Form,
  Input,
  Checkbox,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { getCard } from "../api/AppApi";

function AppHeader() {
  const navigate = useNavigate();
  const onMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <div className="appHeader">
      <Menu
        mode="horizontal"
        onClick={onMenuClick}
        className="appMenu"
        inlineIndent={10}
      >
        <Menu.Item key="">
          <HomeFilled />
        </Menu.Item>
        <Menu.SubMenu key="men" title="Men">
          <Menu.Item key="mens-shirts">Men's Shirts</Menu.Item>
          <Menu.Item key="mens-shoes">Men's Shoes</Menu.Item>
          <Menu.Item key="mens-watches">Men's Watches</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="woman" title="Woman">
          <Menu.Item key="womens-dresses">Women's Dresses</Menu.Item>
          <Menu.Item key="womens-shoes">Women's Shoes</Menu.Item>
          <Menu.Item key="womens-watches">Women's Watches</Menu.Item>
          <Menu.Item key="womens-bags">Women's Bags</Menu.Item>
          <Menu.Item key="womens-jewellery">Women's Jewellery</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="fragrances">Fragrances</Menu.Item>
      </Menu>

      <Typography.Title className="storeName">Mian's Store</Typography.Title>
      <AppCard />
    </div>
  );
}

function AppCard() {
  const [cardDrawOpen, setCardDrawOpen] = useState(false);
  const [cardItems, setCardItems] = useState([]);
  const [checkOutDrawOpen, setCheckOutDrawOpen] = useState(false);

  useEffect(() => {
    getCard().then((res) => {
      setCardItems(res.products);
    });
  }, []);

  const onConfirmOder = (values) => {
    console.log({ values });
    setCardDrawOpen(false);
    setCheckOutDrawOpen(false);
    message.success("Your order hass been placed succe");
  };

  return (
    <div>
      <Badge
        count={7}
        onClick={() => setCardDrawOpen(true)}
        className="shoppingCardIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cardDrawOpen}
        onClose={() => setCardDrawOpen(false)}
        title="Your Cart "
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (_, record) => (
                <InputNumber
                  min={0}
                  defaultValue={record.quantity}
                  onChange={(value) => handleQuantityChange(record.id, value)}
                />
              ),
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => <span>${value}</span>,
            },
          ]}
          dataSource={cardItems}
          summary={(data) => {
            const total = data.reduce(
              (prev, current) => prev + current.total,
              0
            );
            return <span>Total: ${total}</span>;
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            setCheckOutDrawOpen(true);
          }}
        >
          Checkout Your Cart
        </Button>
        <Drawer
          open={checkOutDrawOpen}
          onClose={() => setCheckOutDrawOpen(false)}
          title="Confirm Order"
        >
          <Form onFinish={onConfirmOder}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your full name",
                },
              ]}
              label="Full Name"
              name="full_name"
            >
              <Input placeholder="Enter your full name..." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter your email",
                },
              ]}
              label="Email"
              name="your_email"
            >
              <Input placeholder="Enter your email..." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your full address",
                },
              ]}
              label="Address"
              name="your_address"
            >
              <Input placeholder="Enter your address" />
            </Form.Item>
            <Form.Item>
              <Checkbox defaultChecked disabled>
                Cash on Delivery
              </Checkbox>
            </Form.Item>
            <Typography.Paragraph type="secondary">
              More methods coming soon
            </Typography.Paragraph>
            {"  "}
            <Button type="primary" htmlType="submit">
              Confirm Oder
            </Button>
          </Form>
        </Drawer>
      </Drawer>
    </div>
  );

  function handleQuantityChange(id, value) {
    setCardItems((prevItems) =>
      prevItems.map((cart) => {
        if (cart.id === id) {
          return { ...cart, quantity: value, total: cart.price * value };
        }
        return cart;
      })
    );
  }
}

export default AppHeader;
