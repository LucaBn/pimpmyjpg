import React, { useState, useEffect, useRef } from "react";

// Components
import { Container, Row, Col, Button } from "react-bootstrap";
import DropFileInput from "@/components/UI/Molecules/DropFileInput/DropFileInput";

// Locales
import { useTranslation } from "react-i18next";

const AddFilter: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>();
  const filtersRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation("common");

  useEffect(() => {
    applyFilter();
  }, [uploadedImage, selectedFilter]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);
      image.onload = () => setUploadedImage(image);
    }
  };

  const applyFilter = () => {
    if (uploadedImage) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = uploadedImage.width;
        canvas.height = uploadedImage.height;
        if (selectedFilter) {
          ctx.filter = selectedFilter;
        }
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
        const url = canvas.toDataURL("image/jpeg");
        setPreviewUrl(url);
      }
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
            label={t("add-filter.file-input")}
            handleImageChange={handleImageChange}
          />
          {previewUrl && (
            <>
              <Container ref={filtersRef}>
                <Row className="g-3 justify-content-center">
                  <Col
                    xs={6}
                    md={3}
                    lg={2}
                    onClick={() =>
                      setSelectedFilter("grayscale(100%)")
                    } /* TODO: change this function and all the other setSelectedFilter to toggleFilter */
                  >
                    <Button
                      className="ratio ratio-16x9"
                      variant="outline-primary"
                    >
                      <div className="d-flex align-items-center justify-content-center fs-5">
                        {t("add-filter.filter-list.black-and-white")}
                      </div>
                    </Button>
                  </Col>
                  <Col
                    xs={6}
                    md={3}
                    lg={2}
                    onClick={() => setSelectedFilter("sepia(100%)")}
                  >
                    <Button
                      className="ratio ratio-16x9"
                      variant="outline-primary"
                    >
                      <div className="d-flex align-items-center justify-content-center fs-5">
                        {t("add-filter.filter-list.sepia")}
                      </div>
                    </Button>
                  </Col>
                  <Col
                    xs={6}
                    md={3}
                    lg={2}
                    onClick={() => setSelectedFilter("sunset")}
                  >
                    <Button
                      className="ratio ratio-16x9"
                      variant="outline-primary"
                    >
                      <div className="d-flex align-items-center justify-content-center fs-5">
                        {t("add-filter.filter-list.sunset")}
                      </div>
                    </Button>
                  </Col>
                  <Col
                    xs={6}
                    md={3}
                    lg={2}
                    onClick={() => setSelectedFilter("mexico")}
                  >
                    <Button
                      className="ratio ratio-16x9"
                      variant="outline-primary"
                    >
                      <div className="d-flex align-items-center justify-content-center fs-5">
                        {t("add-filter.filter-list.mexico")}
                      </div>
                    </Button>
                  </Col>
                  <Col
                    xs={6}
                    md={3}
                    lg={2}
                    onClick={() => setSelectedFilter("contrast(200%)")}
                  >
                    <Button
                      className="ratio ratio-16x9"
                      variant="outline-primary"
                    >
                      <div className="d-flex align-items-center justify-content-center fs-5">
                        {t("add-filter.filter-list.high-contrast")}
                      </div>
                    </Button>
                  </Col>
                </Row>
              </Container>
              <div>
                <img
                  src={previewUrl}
                  alt="Watermarked Preview" /* TODO: translate line */
                  className="add-filter__preview rounded mw-100"
                />
                <a
                  href={previewUrl}
                  download="filtered-image.jpg"
                  className="text-decoration-none"
                >
                  <Button className="d-block mt-3 mx-auto">
                    {t("add-filter.download")}
                  </Button>
                </a>
              </div>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default AddFilter;
