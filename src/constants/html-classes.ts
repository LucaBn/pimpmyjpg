import { stringToValidClassName } from "@/utils/html-classes";

import { APP_NAME } from "@/constants/app";

const CLASS_APP_NAME: string = stringToValidClassName(APP_NAME);
const CUSTOM_PREFIX: string = `${CLASS_APP_NAME}-prefix`;
const CUSTOM_SUFFIX: string = `${CLASS_APP_NAME}-suffix`;

export { CLASS_APP_NAME, CUSTOM_PREFIX, CUSTOM_SUFFIX };
