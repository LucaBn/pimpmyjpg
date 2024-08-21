import React, { ChangeEvent, useState } from "react";

// Components
import { Alert } from "react-bootstrap";

// Locales
import { useTranslation } from "react-i18next";

interface IImageFromUrl {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageFromUrl: React.FC<IImageFromUrl> = ({ handleImageChange }) => {
  const [message, setMessage] = useState<string>("");
  const [base64, setBase64] = useState<string>("");

  const { t } = useTranslation("common");

  const convertToBase64 = async (input: string) => {
    setMessage("");
    setBase64("");

    if (!input) {
      setMessage(t("image-from-url.errors.invalid-url"));
      return;
    }

    // Build worker URL
    const workerProtocol = "https";
    const workerThirdLevel = "lucabn";
    const workerFourthLevel = "pmj";
    const trimmedImageUrl = input.trim();
    const encodedURL = encodeURIComponent(trimmedImageUrl);

    const workerUrl = `${workerProtocol}://${workerFourthLevel}.${workerThirdLevel}.workers.dev?url=${encodedURL}`;

    try {
      const options: RequestInit = {
        method: "GET",
        mode: "cors",
      };
      const response = await fetch(workerUrl, options);
      if (!response.ok) {
        throw new Error("Error: failed to fetch image");
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.startsWith("image/")) {
        throw new Error("Error: not an image!");
      }
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result as string);
        handleBase64String(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      const jsError = (error as Error).message;
      setMessage(t("image-from-url.errors.js-error", { jsError }));
    }
  };

  const handleBase64String = (base64String: string) => {
    const byteString = atob(base64String.split(",")[1]);
    const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], "image.jpeg", { type: mimeString });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const event = new InputEvent("change", {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(event, "target", {
      writable: true,
      value: { files: dataTransfer.files },
    });

    handleImageChange(event as unknown as ChangeEvent<HTMLInputElement>);
  };

  const handleImageUrlChangeViaPrompt = () => {
    const input = window.prompt(`${t("image-from-url.insert-url")}:`);
    if (input !== null) {
      convertToBase64(input);
    }
  };

  return (
    <div className="d-flex flex-column gap-1 w-100">
      <div className="">
        <p
          className="text-center text-decoration-underline cursor-pointer"
          onClick={handleImageUrlChangeViaPrompt}
        >
          {t("image-from-url.import-from-url")}
        </p>
      </div>
      {message && (
        <Alert variant="danger" className="mb-0">
          {message}
        </Alert>
      )}
      <input value={base64} onChange={handleImageChange} className="d-none" />
    </div>
  );
};

export default ImageFromUrl;
