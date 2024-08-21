import React, { ChangeEvent, useState } from "react";

// Components
import Popup from "@/components/UI/Molecules/Popup/Popup";

// Locales
import { useTranslation } from "react-i18next";

// Utils
import { isValidUrl } from "@/utils/strings";

interface IImageFromUrlProps {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageFromUrl: React.FC<IImageFromUrlProps> = ({ handleImageChange }) => {
  const [message, setMessage] = useState<string>("");
  const [base64, setBase64] = useState<string>("");

  const { t } = useTranslation("common");

  const buildWorkerUrl = (input: string) => {
    const workerProtocol = "https";
    const workerThirdLevel = "lucabn";
    const workerFourthLevel = "pmj";
    const encodedURL = encodeURIComponent(input.trim());

    return `${workerProtocol}://${workerFourthLevel}.${workerThirdLevel}.workers.dev?url=${encodedURL}`;
  };

  const fetchImageAsBlob = async (url: string): Promise<Blob> => {
    const options: RequestInit = { method: "GET", mode: "cors" };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Error: failed to fetch image");
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      throw new Error("Error: not an image!");
    }

    return response.blob();
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () =>
        reject(new Error(t("image-from-url.errors.read-failed")));
      reader.readAsDataURL(blob);
    });
  };

  const handleBase64String = (base64String: string) => {
    const [mimeString, byteString] = base64String.split(",");
    const mimeType = mimeString.split(":")[1].split(";")[0];
    const binary = atob(byteString);
    const arrayBuffer = new ArrayBuffer(binary.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binary.length; i++) {
      uintArray[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: mimeType });
    const file = new File([blob], "image.jpeg", { type: mimeType });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    const event = new InputEvent("change", { bubbles: true, cancelable: true });
    Object.defineProperty(event, "target", {
      writable: true,
      value: { files: dataTransfer.files },
    });

    handleImageChange(event as unknown as ChangeEvent<HTMLInputElement>);
  };

  const convertToBase64 = async (input: string) => {
    setMessage("");
    setBase64("");

    if (!input || !isValidUrl(input)) {
      setMessage(t("image-from-url.errors.invalid-url"));
      return;
    }

    try {
      const workerUrl = buildWorkerUrl(input);
      const blob = await fetchImageAsBlob(workerUrl);
      const base64String = await convertBlobToBase64(blob);
      setBase64(base64String);
      handleBase64String(base64String);
    } catch (error) {
      setMessage(
        t("image-from-url.errors.js-error", {
          jsError: (error as Error).message,
        })
      );
    }
  };

  const handleImageUrlChangeViaPrompt = () => {
    const input = window.prompt(t("image-from-url.insert-url"));
    if (input !== null) {
      convertToBase64(input);
    }
  };

  return (
    <div className="d-flex flex-column gap-1 w-100">
      <div>
        <p
          className="text-center text-decoration-underline cursor-pointer"
          onClick={handleImageUrlChangeViaPrompt}
        >
          {t("image-from-url.import-from-url")}
        </p>
      </div>
      {
        <Popup
          show={!!message}
          message={message}
          onClose={() => setMessage("")}
          variant="danger"
        />
      }
      <input value={base64} onChange={handleImageChange} className="d-none" />
    </div>
  );
};

export default ImageFromUrl;
