# 🏞️ Image Masking Tool

_The Image Masking Tool is a simple and efficient utility that allows users to generate pixel-accurate masks over specific regions of an image. It's designed to help with tasks like object segmentation, background removal, and custom overlays for both development and creative workflows. With support for custom colors, opacity levels, and format compatibility, this tool makes it easy to highlight or isolate objects in images with minimal effort.._

---

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

### 3. Configure Environment Variables

To run the project locally, you need to set up environment variables.

1. Duplicate the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update the values in .env with your local configuration (e.g., API keys, database URLs).

    The .env.example file includes all required variables to run this project locally.
    | Variable          | Description                                                                        |
    | ----------------- | ---------------------------------------------------------------------------------- |
    | `NEXT_PUBLIC_URL` | The URL where your frontend will be hosted (e.g., `http://localhost:3000`). |
    | `BACKEND_URL`     | The base URL of your backend API (e.g., `http://localhost:8000`).              |
    | `AUTH_TOKEN`      | A secret token used for authentication between the frontend and backend. You can set this to any value, but make sure it matches the token configured in your backend .env file as well.             |
