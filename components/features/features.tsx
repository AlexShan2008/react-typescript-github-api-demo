import { Card, Col, Row } from "antd";
import Link from "next/link";
import { features } from "./features.const";
import { FeaturesWrapper } from "./features.styled";

const { Meta } = Card;

export default function Features() {
  return (
    <FeaturesWrapper>
      <Row gutter={[16, 16]}>
        {features.map(({ name, description }) => (
          <Col xs={24} md={12} lg={8} key={name}>
            <Link href={description} target="_blank">
              <Card hoverable>
                <Meta title={name} description={description} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </FeaturesWrapper>
  );
}
