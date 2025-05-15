"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Upload, Download, ImageIcon, Loader2, RefreshCw, Eraser, Paintbrush, Image } from "lucide-react"
import { cn } from "@/lib/utils"
import axios from "axios"

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return {r, g, b}
}

export function ImageMaskingTool() {
  const [sourceImage, setSourceImage] = useState<string | null>(null)
  const [maskedImage, setMaskedImage] = useState<string | null>(null)
  const [maskOnly, setMaskOnly] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [maskColor, setMaskColor] = useState("#FF0000")
  const [maskOpacity, setMaskOpacity] = useState([50])
  const [activeTab, setActiveTab] = useState("masked")
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setSourceImage(event.target?.result as string)
      setMaskedImage(null)
      setMaskOnly(null)
      setError(null)
    }
    reader.readAsDataURL(file)
  }

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaskColor(e.target.value)
  }

  const handleOpacityChange = (values: number[]) => {
    setMaskOpacity(values)
  }

  const handleProcessImage = async () => {
    if (!sourceImage || !prompt.trim()) {
      setError("Please upload an image and provide a prompt")
      return
    }

    setIsProcessing(true)
    setError(null)
    const {r, g, b} = hexToRgb(maskColor)
   
    try {
      // const data = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/mask`)
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/mask?object=${prompt}&red=${r}&green=${g}&blue=${b}&alpha=${maskOpacity[0]}`, {
        file: fileInputRef.current?.files?.[0],
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (!data || !data.image || !data.mask) {
        setError("Failed to process image")
        setIsProcessing(false)
        return
      }
  
      setMaskedImage(data.image)
      setMaskOnly(data.mask)
      setIsProcessing(false)
      setError(null)
    } catch (error) {
      console.error("Error processing image:", error)
      setError("Failed to process image")
      setIsProcessing(false)
      return
    }
  }

  const handleReset = () => {
    setSourceImage(null)
    setMaskedImage(null)
    setMaskOnly(null)
    setPrompt("")
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDownload = () => {
    const imageToDownload = activeTab === "masked" ? maskedImage : maskOnly
    if (!imageToDownload) return

    const link = document.createElement("a")
    link.href = imageToDownload
    link.download = activeTab === "masked" ? "masked-image.png" : "mask.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="overflow-hidden border-gray-800 bg-gray-900">
        <CardContent className="p-6 h-full">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="w-full">
                <Label htmlFor="image-upload" className="block mb-2 text-gray-200">
                  Upload Product Image
                </Label>
                <p className="text-sm text-gray-400 mb-3">
                  Start by uploading a product image (clothing, electronics, food items, etc.) that you want to mask.
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="grow border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200 cursor-pointer"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {sourceImage ? "Change Image" : "Upload Image"}
                  </Button>
                  {sourceImage && (
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      size="icon"
                      className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200 cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Input
                  ref={fileInputRef}
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {sourceImage && (
              <>
                <div>
                  <Label htmlFor="prompt" className="block mb-2 text-gray-200">
                    Specify Object to Mask
                  </Label>
                  <p className="text-sm text-gray-400 mb-3">
                    Enter a description of the object you want to mask in the image (e.g., "red shirt", "soda can",
                    "shoes")
                  </p>
                  <Input
                    id="prompt"
                    placeholder="e.g., red shirt, soda can, shoes"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
                  />
                </div>


                <div className="space-y-2">
                  <Label className="block text-gray-200">Mask Color</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      value={maskColor}
                      onChange={handleColorChange}
                      className="w-12 h-8 p-1 bg-gray-800 border-gray-700"
                    />
                    <div className="flex-1">
                      <Label className="block text-sm mb-1 text-gray-400">Opacity: {maskOpacity[0]}%</Label>
                      <Slider value={maskOpacity} onValueChange={handleOpacityChange} max={100} step={1} />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleProcessImage}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-auto"
                  disabled={isProcessing || !prompt.trim()}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Paintbrush className="mr-2 h-4 w-4" />
                      Mask {prompt.trim() ? `"${prompt}"` : "Object"}
                    </>
                  )}
                </Button>
              </>
            )}

            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-gray-800 bg-gray-900">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center relative">
              {!sourceImage ? (
                <div className="text-center p-8">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-600" />
                  <p className="mt-2 text-gray-500">Upload an image to get started</p>
                </div>
              ) : maskedImage && !isProcessing ? (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="flex justify-center mb-4">
                    <TabsList className="bg-gray-800">
                      <TabsTrigger
                        value="original"
                        className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                      >
                        <Image className="h-4 w-4" />
                        Original Image
                      </TabsTrigger>
                      <TabsTrigger
                        value="masked"
                        className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                      >
                        <Paintbrush className="h-4 w-4" />
                        Masked Image
                      </TabsTrigger>
                      <TabsTrigger
                        value="mask"
                        className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                      >
                        <Eraser className="h-4 w-4" />
                        Mask Only
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="original" className="m-0">
                    <img
                      src={sourceImage || "/placeholder.svg"}
                      alt="Original image"
                      className="w-full h-full object-contain"
                    />
                  </TabsContent>
                  <TabsContent value="masked" className="m-0">
                    <img
                      src={maskedImage || "/placeholder.svg"}
                      alt="Masked product"
                      className="w-full h-full object-contain"
                    />
                  </TabsContent>
                  <TabsContent value="mask" className="m-0">
                    <img
                      src={maskOnly || "/placeholder.svg"}
                      alt="Mask only"
                      className="w-full h-full object-contain"
                    />
                  </TabsContent>
                </Tabs>
              ) : sourceImage && !maskedImage ? (
                <>
                  <img
                    src={sourceImage || "/placeholder.svg"}
                    alt="Original product"
                    className={cn("w-full h-full object-contain", isProcessing && "opacity-50")}
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-3 text-gray-200">
                        <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                        <span>Generating mask...</span>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {maskedImage && !isProcessing && (
              <Button disabled={activeTab === 'original'} onClick={handleDownload} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                <Download className="mr-2 h-4 w-4" />
                Download {activeTab === "masked" ? "Masked Image" : "Colored Mask Only"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
