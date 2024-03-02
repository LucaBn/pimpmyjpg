import React from "react";

// Components
import IconRounded from "@/components/UI/Atoms/IconRounded/IconRounded";
import IconSquared from "@/components/UI/Atoms/IconSquared/IconSquared";
import { Col, Form } from "react-bootstrap";

// Providers
import { useBorders } from "@/components/providers/BordersProvider";

// Typings
import { IImage } from "@/typings/icons";

// Locales
import { useTranslation } from "react-i18next";

// Constants
import { BorderList } from "@/constants/borders";
import { CLASS_APP_NAME } from "@/constants/html-classes";

interface IBordersHandler extends IImage {}

const BORDERS_OPTIONS = Object.values(BorderList);

const BordersHandler: React.FC<IBordersHandler> = ({ forceColor }) => {
  const { borders, changeBorders } = useBorders();

  const { t } = useTranslation("common");

  const handleBorders = (newBorders: BorderList) => {
    changeBorders(newBorders);
  };

  const getBordersIcon = (borders: BorderList): JSX.Element => {
    return borders === BorderList.Rounded ? (
      <IconRounded forceColor={forceColor} />
    ) : borders === BorderList.Squared ? (
      <IconSquared forceColor={forceColor} />
    ) : (
      <></>
    );
  };

  const getLabel = (option: BorderList) => {
    return <div className="mx-1">{getBordersIcon(option)}</div>;
  };

  return (
    <Form>
      <Form.Group as={Col} className="d-flex flex-wrap gap-3">
        {BORDERS_OPTIONS.map((option) => (
          <Form.Check
            key={option}
            type="radio"
            name="borders"
            id={`${CLASS_APP_NAME}-radio__${option}`}
            className={`${CLASS_APP_NAME}-radio__borders`}
            label={getLabel(option)}
            value={option}
            checked={borders === option}
            onChange={() => handleBorders(option)}
            title={t(`navbar.borders.${option}`)}
          />
        ))}
      </Form.Group>
    </Form>
  );
};

export default BordersHandler;
