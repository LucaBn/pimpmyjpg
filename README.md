# Pimp My Jpg

Pimp my Jpg is a cutting-edge single-page application (SPA) designed to enhance and transform your digital images. Built with the modern and fast Vite, along with React and TypeScript, this project offers a seamless and intuitive user experience for photo editing online. Accessible at [www.pimpmyjpg.com](https://www.pimpmyjpg.com), Pimp my Jpg leverages the latest web technologies to provide users with powerful editing tools and features, all within the convenience of their web browser.

## Features

- **Effortless Image Editing:** Compress files, add filters, apply watermarks; our tools make it simple to bring out the best in your photos.
- **High Performance:** Powered by Vite, React, and TypeScript, our SPA ensures a smooth and responsive experience, minimizing load times and maximizing efficiency.
- **Accessible Anywhere:** Being a web-based platform, Pimp my Jpg can be accessed from any device, anywhere, without the need for downloads or installations.

## Dependencies

The "Pimp my Jpg" project relies on the following main dependencies:

- **bootstrap**: ^5.3.2
- **i18next**: ^23.7.16
- **i18next-browser-languagedetector**: ^7.2.0
- **react**: ^18.2.0
- **react-bootstrap**: ^2.9.2
- **react-dom**: ^18.2.0
- **react-i18next**: ^14.0.0
- **react-router-bootstrap**: ^0.26.2
- **react-router-dom**: ^6.21.1

These libraries provide the core functionality for UI components, internationalization, and routing within our single-page application.

## Development Dependencies

For development, this project includes a set of tools and libraries to assist with coding, building, and testing:

- **@types/node**: ^20.10.6
- **@types/react**: ^18.2.43
- **@types/react-dom**: ^18.2.17
- **@types/react-router-bootstrap**: ^0.26.6
- **@typescript-eslint/eslint-plugin**: ^6.14.0
- **@typescript-eslint/parser**: ^6.14.0
- **@vitejs/plugin-react**: ^4.2.1
- **eslint**: ^8.55.0
- **eslint-plugin-react-hooks**: ^4.6.0
- **eslint-plugin-react-refresh**: ^0.4.5
- **sass**: ^1.69.7
- **typescript**: ^5.2.2
- **vite**: ^5.0.8

These dependencies are crucial for ensuring code quality, facilitating the development process, and enabling efficient builds and deployments.

## Multilingual Management

### Introduction

This section of the README provides a guide on managing multilingual support in this project. It includes instructions on adding new languages and configuring routes in the `sitemap.xml` file.

### Adding a New Language

To add a new language to this project, you need to modify the `LanguageList` variable in the `src/typings/i18next.ts` file. Here's how you can add French (`fr`):

```typescript
export enum LanguageList {
  En = "en",
  It = "it",
  Ja = "ja",
  Fr = "fr", // Add this line for French
}
```

After adding the new language, it's important to update the sitemap.xml file to include routes associated with that language. Here's how you can add the French language to your sitemap.xml:

```xml
<url>
  <loc>https://www.pimpmyjpg.com/en</loc>
  <xhtml:link rel="alternate" hreflang="it" href="https://www.pimpmyjpg.com/it"/>
  <xhtml:link rel="alternate" hreflang="ja" href="https://www.pimpmyjpg.com/ja"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.pimpmyjpg.com/en"/>
  <xhtml:link rel="alternate" hreflang="fr" href="https://www.pimpmyjpg.com/fr"/> <!-- Add this line for French -->
</url>
```

After these steps remember to add a `<Icon... />` component to include in the `<LanguageHandler />` component so that the new language will be selectable for all users.

## Theme Management

### Adding a New Theme

To add a new theme to this project, you need to modify the `ThemeList` variable in the `src\constants\themes.ts` file. Here's how you can add a `Pink theme`:

```typescript
export enum ThemeList {
  Dark = "dark",
  Light = "light",
  Pink = "pink", // Add this line Pink theme
}
```

Then remember to add a `<Icon... />` component to include in the `<ThemeHandler />` component so that the new theme will be selectable for all users.
