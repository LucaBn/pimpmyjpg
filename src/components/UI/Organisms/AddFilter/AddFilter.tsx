import React, { useState, useEffect, useRef } from "react";

// Components
import { Row, Col } from "react-bootstrap";
import DropFileInput from "@/components/UI/Molecules/DropFileInput/DropFileInput";

// Locales
import { useTranslation } from "react-i18next";

const AddFilter: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
  );
  const filtersRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation("common");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);
      image.onload = () => setUploadedImage(image);
    }
  };

  useEffect(() => {
    // Scroll to Filter section
    if (filtersRef.current) {
      filtersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [uploadedImage]);

  return (
    <Row className="mt-4">
      <Col xs={12}>
        <div className="d-flex flex-column align-items-center gap-3 text-start">
          <DropFileInput
            label={t("add-watermark.file-input")}
            handleImageChange={handleImageChange}
          />
          <div ref={filtersRef}></div>
        </div>
      </Col>
    </Row>
  );
};

export default AddFilter;
