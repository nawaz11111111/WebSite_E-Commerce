import React, { useEffect, useState } from "react";
import { getProductByCategory } from "../api/AppApi";
import { getAllProducts } from "../api/AppApi";
import {
  Card,
  List,
  Image,
  Typography,
  Tag,
  Rate,
  Button,
  message,
  Spin,
} from "antd";
import { addToCard } from "../api/AppApi";
import { useParams } from "react-router-dom";

function AppProducts() {
  const [loading, setLoading] = useState(false);

  const param = useParams();
  const [item, setItem] = useState([]);

  const AddToCardButton = ({ item }) => {
    const [loading, setLoading] = useState(false);
    const addProductToCard = () => {
      setLoading(true);
      addToCard(item.id).then((res) => {
        message.success(`${item.title} has been added to cart`);
        setLoading(false);
      });
    };

    return (
      <Button
        type="link"
        onClick={() => {
          addProductToCard();
        }}
        loading={loading}
      >
        Add to cart
      </Button>
    );
  };
  useEffect(() => {
    setLoading(true);
    (param?.categoryId
      ? getProductByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItem(res.products);
      setLoading(false);
    });
  }, [param]);

  if (loading) {
    return <Spin spinning />;
  }
  return (
    <div style={{ padding: "20px" }}>
      <List
        grid={{ column: 3, gutter: 20 }}
        dataSource={item}
        renderItem={(product, index) => (
          <List.Item>
            <Card
              title={product.title}
              key={index}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              bodyStyle={{ padding: "0" }}
              hoverable
              actions={[
                <Rate allowHalf value={product.rating} />,
                <AddToCardButton item={product} />,
              ]}
            >
              <div style={{ position: "relative" }}>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
                {product.discountPercentage > 0 && (
                  <Tag
                    color="red"
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                  >
                    {product.discountPercentage}% OFF
                  </Tag>
                )}
              </div>
              <div style={{ padding: "16px" }}>
                <Typography.Paragraph style={{ margin: 0 }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      marginRight: "8px",
                      fontSize: "16px",
                    }}
                  >
                    Price:
                  </span>
                  <span style={{ fontSize: "16px", color: "#1890ff" }}>
                    ${product.price}
                  </span>{" "}
                  <Typography.Text
                    delete
                    type="danger"
                    style={{ fontSize: "14px", color: "#999" }}
                  >
                    {(
                      product.price -
                      (product.price * product.discountPercentage) / 100
                    ).toFixed(2)}
                  </Typography.Text>
                </Typography.Paragraph>
                <Typography.Paragraph
                  style={{
                    margin: 0,
                    marginTop: "10px",
                    fontSize: "14px",
                    color: "#666",
                  }}
                  ellipsis={{ Row: 2, expandable: true, symbol: "more" }}
                >
                  {product.description}
                </Typography.Paragraph>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default AppProducts;
