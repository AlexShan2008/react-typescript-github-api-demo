import { Card, Col, Row } from "antd";
import { features } from "./features.const";
import { FeaturesWrapper } from "./features.styled";

const { Meta } = Card;

export default function Features() {
  return (
    <FeaturesWrapper>
      <Row gutter={[16, 16]}>
        {features.map(({ name, description }) => (
          <Col xs={24} md={12} lg={8} key={name}>
            <Card hoverable>
              <Meta title={name} description={description} />
            </Card>
          </Col>
        ))}
      </Row>
    </FeaturesWrapper>
  );
}
