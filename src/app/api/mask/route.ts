import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(request: NextRequest) {
  const red = request.nextUrl.searchParams.get("red")
  const blue = request.nextUrl.searchParams.get("blue")
  const green = request.nextUrl.searchParams.get("green")
  const alpha = request.nextUrl.searchParams.get("alpha")
  const object = request.nextUrl.searchParams.get("object")
  try {
    const formData = await request.formData();
    const {data} = await axios.post(`${process.env.BACKEND_URL}/detect_objects?object=${object}&red=${red}&green=${green}&blue=${blue}&alpha=${alpha}`, formData, {
      headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${process.env.AUTH_TOKEN}`,
      }
    })

    if (!data || !data.image || !data.mask) {
      return NextResponse.json({ error: "Failed to process image" }, { status: 502 });
    }
    
    return NextResponse.json({
      image: data.image,
      mask: data.mask,
    })

  } catch (error) { 
    console.error("Error processing image: ", error);
    console.error("request: ", request);
    return NextResponse.json({ error: "Failed to process image" }, { status: 501 });
  }
}