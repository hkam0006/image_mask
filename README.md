# 🏞️ Image Masking Tool (Frontend)

_The Image Masking Tool is a simple and efficient utility that allows users to generate pixel-accurate masks over specific regions of an image. It's designed to help with tasks like object segmentation, background removal, and custom overlays for both development and creative workflows. With support for custom colors, opacity levels, and format compatibility, this tool makes it easy to highlight or isolate objects in images with minimal effort.._

---

## 📦 Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- **npm (Node Package Manager)**: Required to run frontend.
- **Git**: For cloning the repository and version control.


## 🚀 Setup Instructions

Follow these steps to get the project up and running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/hkam0006/image_mask.git
cd ./image_mask
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

If experiencing version conflicts of packages, try running `npm install` with the `--legacy-peer-deps` flag.

### 3. Configure Environment Variables

To run the project locally, you need to set up environment variables.

1. Duplicate the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update the values in .env with your local configuration.

    The .env.example file includes all required variables to run this project locally.
    | Variable          | Description                                                                        |
    | ----------------- | ---------------------------------------------------------------------------------- |
    | `NEXT_PUBLIC_URL` | The URL where your frontend will be hosted (e.g., `http://localhost:3000`). |
    | `BACKEND_URL`     | The base URL of your backend API (e.g., `http://localhost:8000`).              |
    | `AUTH_TOKEN`      | A secret token used for authentication between the frontend and backend. You can set this to any value, but make sure it matches the token configured in your backend .env file as well.             |

## 🛠️ Tools and Technologies

This project leverages the following tools and technologies to deliver its functionality:

- **React**: A JavaScript library for building user interfaces, used for creating the frontend of the application.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Next.js**: A React framework that provides server-side rendering and static site generation for improved performance and SEO.
- **Tailwind CSS**: A utility-first CSS framework for styling the application with ease and consistency.

These tools collectively ensure a seamless development experience and robust application performance.

## 🧪 Testing


Test images from the `/test_images` directory have been utilized to validate the functionality of the system. These images serve as sample inputs to ensure the tool performs as expected under various scenarios. 

To test the application locally:

1. Place your test images in the `/test_images` directory.
2. Run the application using the setup instructions provided above.
3. Use the tool to create masks on the test images and verify the output.

## ⚠️ Limitations 

The Image Masking Tool relies on Google Gen AI for processing, which has limitations when handling large image files. As a result, the tool may not perform optimally or could fail to generate accurate masks for images with high resolutions or large file sizes. For best results, consider resizing or compressing large images before using the tool.
  
## 🌐 Live Production Site

The Image Masking Tool is deployed and accessible online for immediate use. Visit the live production site to explore its features and functionality:

[**Image Masking Tool Live Site**](https://image-mask.vercel.app)

Feel free to test the tool, provide feedback, or use it for your projects. The live site is regularly updated with the latest features and improvements.
