// Components
import { Image, Button } from "react-bootstrap";
import SectionTitle from "@/components/UI/Organisms/Section/SectionTitle";
import SectionDescription from "@/components/UI/Organisms/Section/SectionDescription";
import SectionWrapper from "@/components/UI/Organisms/Section/SectionWrapper";

const Section = Object.assign(SectionWrapper, {
  Title: SectionTitle,
  Description: SectionDescription,
  Image: Image,
  Button: Button,
});

export default Section;
