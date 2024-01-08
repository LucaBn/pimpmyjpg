import React from "react";

// Components
import { Col, Container, Row } from "react-bootstrap";
import ImageCompressor from "@/components/UI/Organisms/ImageCompressor/ImageCompressor";

const ImageCompressorTemplate: React.FC = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col xs={12}>
          <h1>Image Compressor</h1>
        </Col>
        <Col xs={12}>
          <p>Select or drop an image, optimize its size and download it!</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
          <ImageCompressor />
        </Col>
      </Row>
    </Container>
  );
};

export default ImageCompressorTemplate;
