"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  ArrowLeft,
  MoreVertical,
  Clock,
  Eye,
  Trash2,
  Plus,
  Upload,
  X,
  AlertTriangle,
  MessageCircle,
  Camera,
  ChevronLeft,
  Edit,
  Download,
} from "lucide-react"

interface CarouselProps {
  images: string[]
  title: string
  description: string
}

function ImageCarousel({ images, title, description }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden relative h-64">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              alt={`${title} Image ${index + 1}`}
              className="w-full h-full object-contain flex-shrink-0"
              src={src || "/placeholder.svg"}
            />
          ))}
        </div>
      </div>
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-1.5 hover:bg-opacity-60 transition-all"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-1.5 hover:bg-opacity-60 transition-all"
      >
        <ChevronRight />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-2 h-2 bg-white rounded-full ${index === currentIndex ? "opacity-100" : "opacity-50"}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function WorkOrderApp() {
  const [activeTab, setActiveTab] = useState("summary")
  const [openJSA, setOpenJSA] = useState<string[]>(["jsa-1"])
  const [openChecklists, setOpenChecklists] = useState<string[]>([])
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [commentToggle, setCommentToggle] = useState<string[]>(["comment-toggle-1"])
  const [timeRemaining, setTimeRemaining] = useState("20:45:35")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activePartsTab, setActivePartsTab] = useState<"Used" | "Returned" | "Projected">("Used")
  const [selectedChecklistResponses, setSelectedChecklistResponses] = useState<string | null>(null)

  const [workFiles, setWorkFiles] = useState<
    Array<{
      file: File
      dataUrl: string
      asset: string
      category: string
      isStatutory: boolean
    }>
  >([])

  const [addUsedPartData, setAddUsedPartData] = useState({
    asset: "",
    partCategory: "",
    part: "",
    quantity: "",
    reason: "",
    images: [] as string[],
  })

  const [addReturnedPartData, setAddReturnedPartData] = useState({
    asset: "",
    partCategory: "",
    part: "",
    quantity: "",
    reason: "",
    images: [] as string[],
  })
  const [addProjectedPartData, setAddProjectedPartData] = useState({
    asset: "",
    partCategory: "",
    part: "",
    quantity: "",
    reason: "",
    images: [] as string[],
  })

  const [newPartCategory, setNewPartCategory] = useState("")
  const [newPart, setNewPart] = useState("")
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddPart, setShowAddPart] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newPartName, setNewPartName] = useState("")
  const [activeAddPopup, setActiveAddPopup] = useState<"used" | "returned" | "projected">("used")

  const [assetSearchTerm, setAssetSearchTerm] = useState("")
  const [categorySearchTerm, setCategorySearchTerm] = useState("")
  const [partSearchTerm, setPartSearchTerm] = useState("")
  const [showAssetDropdown, setShowAssetDropdown] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showPartDropdown, setShowPartDropdown] = useState(false)
  const [showReturnedAssetDropdown, setReturnedAssetDropdown] = useState(false)
  const [showReturnedCategoryDropdown, setReturnedCategoryDropdown] = useState(false)
  const [showReturnedPartDropdown, setReturnedPartDropdown] = useState(false)
  const [showProjectedAssetDropdown, setProjectedAssetDropdown] = useState(false)
  const [showProjectedCategoryDropdown, setProjectedCategoryDropdown] = useState(false)
  const [showProjectedPartDropdown, setProjectedPartDropdown] = useState(false)

  const [returnedAssetSearchTerm, setReturnedAssetSearchTerm] = useState("")
  const [returnedCategorySearchTerm, setReturnedCategorySearchTerm] = useState("")
  const [returnedPartSearchTerm, setReturnedPartSearchTerm] = useState("")

  const [projectedAssetSearchTerm, setProjectedAssetSearchTerm] = useState("")
  const [projectedCategorySearchTerm, setProjectedCategorySearchTerm] = useState("")
  const [projectedPartSearchTerm, setProjectedPartSearchTerm] = useState("")

  // Sample data for dropdowns
  const assets = ["Hood-A", "Hood-B", "Cooking Equipment", "Gas Supply", "Cheese Melter", "Salamander"]
  const partCategories = ["Electrical", "Mechanical", "Safety", "Filters", "Controls"]
  const parts = ["Circuit Breaker", "Change Over Switch", "Gas Valve", "Temperature Sensor", "Safety Switch"]

  // Sample data
  const partImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCE1Ut21MASdEh4DBBwRMMMo62ZEUIuWjBpT05DOlQ17oH4VYK6mVO2BegURDnxQ72Sd_HNOZF1jIv9-ptVICLj515b58kx1xwh59sNDWG4cAT9WyXIgbfBeU3_bMBrVnucWec99eQF-lUax4LPSNkYEa5mND2koZFNJ-YJ54CBSTAaTwsR96S0AIrBQle1bDAZhpxWqMOoYnK2ALYPF-1hy0ENKu1k_o6fG4QqBRB9OIMebVsuRnFPhpSWxKnswJXEsmbCzTHWDUM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD8Un9E0OZ55tXwaFPWd2e75322lagAsmdKhZoClcDFOgYYUVYm_BdJIHqJ0uhiIekKiyDVTqaG3wN4X4DuXPkE800dEAeeseBW_rI-kZ-XZ_hzWxtn0ThX2636DS7R2FxW3ZVPeaLFth3ptxmOQuRuWyNQp2jfari8WK9OTMPGGK4cRQ9emhBK1Dvuvo8yYtajECwP2bqj5890sH0E0QECjuAXZJkRzTCC4jV5ItTqu1qqyfuECJD4XuTEEBUDJAJXPv82slWVxjk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoaswLDX_8ybp_y8aIih41ArrLgFABdz6TNC0HbUgjrhd8S-ybBGj15-vNMoccITtRhprEDGVNFYHkfraMWSVxOcdm5WMPV100EuwtrdLhcdrLZy7B6uQG9ZDpilOp5eZ_M1oVVLLHXrSh7y0_eH0wbtl5XUHJn8aPKgAB2Deom3clcaIqQPdeL1gCpVajHfKh-Al23IDJ659_p4VcjO18I5Ir7sfW6AbKqtOqFgltEwyzGiaw2EJnJuwNbhPhSN7B4aZknCrrc8I",
  ]

  const toggleJSA = (id: string) => {
    setOpenJSA((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleChecklist = (id: string) => {
    setOpenChecklists((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleComment = (id: string) => {
    setCommentToggle((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const openModal = (modalName: string) => {
    setActiveModal(modalName)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedChecklistResponses(null)
  }

  const [activeContextMenu, setActiveContextMenu] = useState<string | null>(null)

  const handleContextMenuClick = (menuId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setActiveContextMenu(activeContextMenu === menuId ? null : menuId)
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveContextMenu(null)
    }

    if (activeContextMenu) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [activeContextMenu])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".dropdown-container")) {
        setShowAssetDropdown(false)
        setShowCategoryDropdown(false)
        setShowPartDropdown(false)
        setReturnedAssetDropdown(false)
        setReturnedCategoryDropdown(false)
        setReturnedPartDropdown(false)
        setProjectedAssetDropdown(false)
        setProjectedCategoryDropdown(false)
        setProjectedPartDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const [partCategoriesList, setPartCategories] = useState(partCategories)
  const [partsList, setParts] = useState(parts)

  const showChecklistResponses = (checklistId: string) => {
    setSelectedChecklistResponses(checklistId)
    setActiveModal("checklist-responses-popup")
  }

  return (
    <div className="bg-gray-200 flex justify-center min-h-screen">
      <div className="w-full max-w-sm bg-gray-100 shadow-lg relative">
        <div className="min-h-screen">
          {/* Header */}
          <header className="bg-[#513f34] shadow-lg sticky top-0 z-20">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <button onClick={() => (window.location.href = "/pm-work")} className="text-white">
                <ArrowLeft />
              </button>
              <h1 className="text-xl font-medium text-white">Work Order</h1>
              <button className="text-white">
                <MoreVertical />
              </button>
            </div>
          </header>

          <main className="p-2">
            {/* Work Order Summary Card */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-3 border border-[#E5E5E5]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">WORK ORDER</p>
                  <h2 className="text-2xl font-bold text-[#513f34] mt-1">Java House Kimathi</h2>
                  <p className="text-base text-gray-700 mt-1">PM-23-07-00005</p>
                </div>
                <div className="text-right">
                  <button className="text-sm text-[#d57d2a] font-medium">VIEW REQUEST</button>
                </div>
              </div>
              {/* Updated time remaining section to show work start date, due date, and live countdown timer */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  {/* Work Start Date and Due Date stacked on left */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Work Start Date</p>
                      <p className="text-sm font-medium text-[#513f34]">9/11/2024 00:00</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p className="text-sm font-medium text-[#513f34]">9/11/2024 23:59</p>
                    </div>
                  </div>

                  {/* Countdown Timer on right */}
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Due in</p>
                    <p className="text-xl font-bold text-red-600">{timeRemaining}</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md border border-[#E5E5E5]">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`flex-1 text-center py-3 font-medium text-sm uppercase ${
                    activeTab === "summary" ? "text-[#d57d2a] border-b-2 border-[#d57d2a]" : "text-gray-600"
                  }`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setActiveTab("costings")}
                  className={`flex-1 text-center py-3 font-medium text-sm uppercase ${
                    activeTab === "costings" ? "text-[#d57d2a] border-b-2 border-[#d57d2a]" : "text-gray-600"
                  }`}
                >
                  Costings
                </button>
                <button
                  onClick={() => setActiveTab("jobcards")}
                  className={`flex-1 text-center py-3 font-medium text-sm uppercase ${
                    activeTab === "jobcards" ? "text-[#d57d2a] border-b-2 border-[#d57d2a]" : "text-gray-600"
                  }`}
                >
                  Job Cards
                </button>
              </div>

              {activeTab === "summary" && (
                <div className="p-4">
                  {/* Work Overview */}
                  <div className="mb-4">
                    <h3 className="font-bold text-[#513f34] text-base mb-2">WORK OVERVIEW</h3>
                    <div className="text-sm text-[#513f34] bg-gray-50 p-3 rounded-lg space-y-4 border border-[#E5E5E5]">
                      <div>
                        <p className="text-xs text-gray-500">Work Description</p>
                        <p className="font-medium text-gray-900 mt-1">
                          Monthly PPM -Lorem ipsum dolor sit amet, const, sed do eiusmod tempor incididunt ut labore et
                          dolore.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Technician/ User</p>
                          <p className="font-medium text-[#513f34] mt-1">Evans Ramon</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Expected Start Date</p>
                          <p className="font-medium text-[#513f34] mt-1">15/08/2025</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Due On</p>
                          <p className="font-medium text-[#513f34] mt-1">15/08/2025</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Priority</p>
                          <p className="font-medium text-[#513f34] mt-1">High</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-4 pt-4">
                        <div>
                          <p className="text-xs text-gray-500">Work Category</p>
                          <p className="font-medium text-[#513f34]">Kitchen Equipment</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Asset/ Equipment Category</p>
                          <p className="font-medium text-[#513f34]">Gas and Hoods</p>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-500">Asset</p>
                            <button
                              onClick={() => openModal("asset-inconsistencies-popup")}
                              className="text-[#d57d2a] text-xs underline flex items-center gap-1"
                            >
                              Resolve Inconsistencies
                              <AlertTriangle className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-medium text-[#513f34]">
                            Cooking Equipment, Gas and Hoods, Cheese Melter,Salamander{" "}
                            <button
                              onClick={() => openModal("asset-popup")}
                              className="text-[#d57d2a] font-bold underline"
                            >
                              +10 more
                            </button>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Engineer In-Charge</p>
                          <p className="font-medium text-[#513f34]">Andrew Kinyanjui</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Contractor/ Team</p>
                          <p className="font-medium text-[#513f34]">Java Internal Team</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Technician/ User</p>
                          <p className="font-medium text-[#513f34]">James Muli</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Expected Start Date</p>
                          <p className="font-medium text-[#513f34]">9/11/2024 00:00</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Estimated Work Duration</p>
                          <p className="font-medium text-[#513f34]">5 Hours</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Due On</p>
                          <p className="font-medium text-[#513f34]">10/11/2024 10:34</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Safety Analysis */}
                  <div className="mb-4">
                    <h3 className="font-bold text-[#513f34] text-base mb-2">JOB SAFETY ANALYSIS</h3>
                    <div className="bg-white rounded-xl shadow-md border border-[#E5E5E5]">
                      <div className="divide-y divide-gray-200">
                        <div>
                          <button
                            onClick={() => toggleJSA("jsa-1")}
                            className="w-full p-4 flex justify-between items-center cursor-pointer text-left"
                          >
                            <div className="flex-1 min-w-0">
                              <p
                                className={`font-medium truncate ${
                                  openJSA.includes("jsa-1") ? "text-[#d57d2a]" : "text-[#513f34]"
                                }`}
                              >
                                Working with live electrical components
                              </p>
                            </div>
                            <div className="flex items-center pl-2">
                              <ChevronRight
                                className={`text-gray-600 transform transition-transform ${
                                  openJSA.includes("jsa-1") ? "rotate-90 text-[#d57d2a]" : ""
                                }`}
                              />
                            </div>
                          </button>
                          {openJSA.includes("jsa-1") && (
                            <div className="p-4 pt-0 bg-gray-50">
                              <div className="space-y-3">
                                <div className="mb-3">
                                  <p className="text-xs text-gray-500">Hazard</p>
                                  <p className="text-sm font-medium text-[#513f34]">
                                    Working with live electrical components that could potentially cause harm if not
                                    handled properly.
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Risks</p>
                                  <p className="text-sm font-medium text-[#513f34]">Electric shock, burns, fire.</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Mitigations</p>
                                  <p className="text-sm font-medium text-[#513f34]">
                                    De-energize and lock out/tag out equipment. Use insulated tools.
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Tools Required</p>
                                  <p className="text-sm font-medium text-[#513f34]">
                                    Insulated gloves, voltage tester, lock and tag.
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Photos</p>
                                  <div className="flex items-center space-x-2">
                                    <div className="relative group">
                                      <img
                                        alt="Tool photo 1"
                                        className="h-16 w-16 rounded-md object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHeNQopblAlxZXn-4_K0iEXiy4VdqJH7QnweiwXcm-btHguzvMvQvx_ndSoTwsBVc9p_uuid0EutaXjmSn-RujXUGK5GXTTM-q-UkC3fXoQaA563DzBMV1v2372nPGe3QBEOg87Hk2WdvCiDBh7LfSuKsVkq-BfKsJotIXXBwM4vdwQGIGwzzB6iD9FlDuGSpUOffeQfkVL5TBmRXaVpNa7zJP2wMMkwN5cQmS1x4lk755pKLTVRdGoF_HT-Yuq5Hxydsbfl1Ximc"
                                      />
                                      <div className="absolute inset-0 bg-black bg-opacity-60 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity space-x-1.5">
                                        <button
                                          onClick={() => openModal("image-viewer-popup")}
                                          className="text-white p-0.5"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => openModal("delete-confirm-popup")}
                                          className="text-white p-0.5"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="relative group">
                                      <img
                                        alt="Tool photo 2"
                                        className="h-16 w-16 rounded-md object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhq1hNAG40mHprPong5H4TVUii9Q0HsiDHV8TEoCctkH6Pav4natCicJH5JBYvNHSw1heQW_ouKNK4pnqpGM4of3-6BOVWBOLq0QJIEHlGS4UEt-1bpc5wrTSCMGsi_dU9TD0iOsk6k-NNShmAZLXTXDaOvYEZBILhLynFsqZdxRFaiwLzACgEHNCTp17VEoYylN2A1mU1DTl2MxWzYYjRl39SgnlBtodpxnoRhRBnb99Cliebcl5krr1_a6toQp7wVOnER14EsWQ"
                                      />
                                      <div className="absolute inset-0 bg-black bg-opacity-60 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity space-x-1.5">
                                        <button
                                          onClick={() => openModal("image-viewer-popup")}
                                          className="text-white p-0.5"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => openModal("delete-confirm-popup")}
                                          className="text-white p-0.5"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => openModal("photo-popup")}
                                      className="h-16 w-16 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                                    >
                                      <Camera className="text-3xl" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <button
                            onClick={() => toggleJSA("jsa-2")}
                            className="w-full p-4 flex justify-between items-center cursor-pointer text-left"
                          >
                            <div className="flex-1 min-w-0">
                              <p
                                className={`font-medium truncate ${
                                  openJSA.includes("jsa-2") ? "text-[#d57d2a]" : "text-[#513f34]"
                                }`}
                              >
                                Manual handling of heavy equipment.
                              </p>
                            </div>
                            <div className="flex items-center pl-2">
                              <ChevronRight
                                className={`text-gray-600 transform transition-transform ${
                                  openJSA.includes("jsa-2") ? "rotate-90 text-[#d57d2a]" : ""
                                }`}
                              />
                            </div>
                          </button>
                          {openJSA.includes("jsa-2") && (
                            <div className="p-4 pt-0 bg-gray-50">
                              <p className="text-sm text-gray-600">JSA Item 2 details go here.</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => openModal("jsa-popup")}
                        className="w-full text-center py-2.5 border-t-2 border-dashed border-gray-300 text-[#d57d2a] font-medium text-sm flex items-center justify-center hover:bg-gray-50 transition-colors rounded-b-lg"
                      >
                        <Plus className="text-lg mr-2" />
                        ADD JOB SAFETY ANALYSIS
                      </button>
                    </div>
                  </div>

                  {/* Checklists */}
                  <div className="mb-4">
                    <h3 className="font-bold text-[#513f34] text-base mb-2">CHECKLISTS</h3>
                    <div className="bg-white rounded-xl shadow-md divide-y divide-gray-200 border border-[#E5E5E5]">
                      <div>
                        <button
                          onClick={() => toggleChecklist("checklist-1")}
                          className={`w-full p-4 flex justify-between items-center cursor-pointer text-left ${
                            openChecklists.includes("checklist-1") ? "border-b-2 border-[#e5e5e5]" : ""
                          }`}
                        >
                          <div>
                            <p
                              className={`font-medium text-base ${
                                openChecklists.includes("checklist-1") ? "text-[#d57d2a]" : "text-[#513f34]"
                              }`}
                            >
                              Hood & Gas PPM
                              <button
                                onClick={() => openModal("asset-inconsistencies-popup")}
                                className="text-[#d57d2a] text-xs underline ml-2 inline-flex items-center gap-1"
                              >
                                Resolve Inconsistencies
                                <AlertTriangle className="w-3 h-3" />
                              </button>
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                              <span className="flex items-center">
                                <Clock className="text-sm mr-1" />
                                30 min
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-medium">
                                Complete
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => showChecklistResponses("checklist-1")}
                              className="text-[#d57d2a] text-sm font-bold underline"
                            >
                              Responses
                            </button>
                            <ChevronRight
                              className={`text-gray-600 transform transition-transform ${
                                openChecklists.includes("checklist-1") ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </button>
                        {openChecklists.includes("checklist-1") && (
                          <div className="bg-gray-50 flex flex-col" style={{ maxHeight: "50vh" }}>
                            <div className="overflow-y-auto p-4 flex-1">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-sm text-[#513f34]">Section 1: Safety Checks</h4>
                                  <p className="text-xs text-gray-500">
                                    Ensure all safety protocols are followed before starting.
                                  </p>
                                  <div className="mt-3 space-y-4">
                                    <div className="space-y-2">
                                      <p className="text-sm font-medium text-gray-800">Is gas supply turned off?</p>
                                      <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                          <label className="text-sm text-gray-600">Asset 1: Hood-A</label>
                                          <div className="flex items-center">
                                            <input
                                              className="h-5 w-5 rounded focus:ring-[#d57d2a]/50 accent-[#d57d2a]"
                                              type="checkbox"
                                            />
                                            <button
                                              onClick={() => openModal("comment-popup")}
                                              className="ml-2 text-gray-500"
                                            >
                                              <MessageCircle className="text-lg" />
                                            </button>
                                          </div>
                                        </div>
                                        <div className="relative">
                                          <div className="flex items-center justify-between">
                                            <label className="text-sm text-gray-600">Asset 2: Hood-B</label>
                                            <div className="flex items-center">
                                              <input
                                                defaultChecked
                                                className="h-5 w-5 rounded focus:ring-[#d57d2a]/50 accent-[#d57d2a]"
                                                type="checkbox"
                                              />
                                              <button
                                                onClick={() => toggleComment("comment-toggle-1")}
                                                className="ml-2 text-[#d57d2a] cursor-pointer"
                                              >
                                                <MessageCircle className="text-lg" />
                                              </button>
                                            </div>
                                          </div>
                                          {commentToggle.includes("comment-toggle-1") && (
                                            <div className="mt-2 ml-6 pl-2 border-l-2 border-[#d57d2a]">
                                              <div className="bg-orange-50 p-3 rounded-r-lg rounded-bl-lg">
                                                <p className="text-sm text-gray-600">
                                                  "Slight gas smell noted upon arrival. Double-checked the valve to
                                                  ensure it's fully closed now. Proceeding with caution."
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <label className="text-sm text-gray-600">Asset 3: Gas Line</label>
                                          <div className="flex items-center">
                                            <input
                                              className="w-20 py-1 px-2 text-sm border border-gray-400 rounded-md shadow-sm focus:border-[#d57d2a] focus:ring-[#d57d2a]/50"
                                              placeholder="e.g. 2.0"
                                              type="text"
                                            />
                                            <button
                                              onClick={() => openModal("comment-popup")}
                                              className="ml-2 text-gray-500"
                                            >
                                              <MessageCircle className="text-lg" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-sm font-medium text-gray-800">Is the area well-ventilated?</p>
                                      <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                          <label className="text-sm text-gray-600">Asset 1: Hood-A</label>
                                          <div className="flex items-center">
                                            <label className="flex items-center cursor-pointer">
                                              <div className="relative">
                                                <input className="sr-only peer" type="checkbox" />
                                                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#d57d2a] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                              </div>
                                            </label>
                                            <button
                                              onClick={() => openModal("comment-popup")}
                                              className="ml-2 text-gray-500"
                                            >
                                              <MessageCircle className="text-lg" />
                                            </button>
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <label className="text-sm text-gray-600">Asset 2: Hood-B</label>
                                          <div className="flex items-center">
                                            <label className="flex items-center cursor-pointer">
                                              <div className="relative">
                                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                                <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#d57d2a] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                              </div>
                                            </label>
                                            <button
                                              onClick={() => openModal("comment-popup")}
                                              className="ml-2 text-gray-500"
                                            >
                                              <MessageCircle className="text-lg" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="pt-4 border-t border-gray-200 mt-4">
                                  <h4 className="font-semibold text-sm text-[#513f34]">
                                    Section 2: Component Inspection
                                  </h4>
                                  <p className="text-xs text-gray-500">Visually inspect and test all components.</p>
                                  <div className="mt-3 space-y-4">
                                    <div className="space-y-2">
                                      <p className="text-sm font-medium text-gray-800">
                                        Check grease filters condition.
                                      </p>
                                      <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                          <label className="text-sm text-gray-600">Asset 1: Hood-A</label>
                                          <div className="flex items-center space-x-2">
                                            <label className="flex items-center text-sm">
                                              <input
                                                className="form-radio h-4 w-4 text-[#d57d2a] focus:ring-[#d57d2a]/50"
                                                name="filter_a"
                                                type="radio"
                                              />
                                              Clean
                                            </label>
                                            <label className="flex items-center text-sm">
                                              <input
                                                defaultChecked
                                                className="form-radio h-4 w-4 text-[#d57d2a] focus:ring-[#d57d2a]/50"
                                                name="filter_a"
                                                type="radio"
                                              />
                                              Dirty
                                            </label>
                                            <button
                                              onClick={() => openModal("comment-popup")}
                                              className="ml-2 text-gray-500"
                                            >
                                              <MessageCircle className="text-lg" />
                                            </button>
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <label className="text-sm text-gray-600">Asset 2: Hood-B</label>
                                          <div className="flex items-center space-x-2">
                                            <label className="flex items-center text-sm">
                                              <input
                                                className="form-radio h-4 w-4 text-[#d57d2a] focus:ring-[#d57d2a]/50"
                                                name="filter_b"
                                                type="radio"
                                              />
                                              Clean
                                            </label>
                                            <label className="flex items-center text-sm">
                                              <input
                                                className="form-radio h-4 w-4 text-[#d57d2a] focus:ring-[#d57d2a]/50"
                                                name="filter_b"
                                                type="radio"
                                              />
                                              Dirty
                                            </label>
                                            <button
                                              onClick={() => openModal("comment-popup")}
                                              className="ml-2 text-gray-500"
                                            >
                                              <MessageCircle className="text-lg" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-gray-50">
                              <div className="flex space-x-2">
                                <button className="flex-1 bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-2 text-xs font-medium tracking-wider whitespace-nowrap">
                                  Save draft
                                </button>
                                <button className="flex-1 bg-[#d57d2a] text-white rounded-3xl py-2 px-2 text-xs font-medium tracking-wider whitespace-nowrap shadow-md">
                                  Save & complete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Additional Checklists */}
                      <div>
                        <button
                          onClick={() => toggleChecklist("checklist-2")}
                          className={`w-full p-4 flex justify-between items-center cursor-pointer text-left ${
                            openChecklists.includes("checklist-2") ? "border-b border-gray-200" : ""
                          }`}
                        >
                          <div>
                            <p
                              className={`font-medium ${
                                openChecklists.includes("checklist-2") ? "text-[#d57d2a]" : "text-[#513f34]"
                              }`}
                            >
                              Salamanders
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                              <span className="flex items-center">
                                <Clock className="text-sm mr-1" />
                                20 min
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                                Pending
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ChevronRight
                              className={`text-gray-600 transform transition-transform ${
                                openChecklists.includes("checklist-2") ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </button>
                        {openChecklists.includes("checklist-2") && (
                          <div className="p-4 bg-gray-50">
                            <p className="text-sm text-gray-600">Checklist content for Salamanders goes here.</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <button
                          onClick={() => toggleChecklist("checklist-3")}
                          className={`w-full p-4 flex justify-between items-center cursor-pointer text-left ${
                            openChecklists.includes("checklist-3") ? "border-b border-gray-200" : ""
                          }`}
                        >
                          <div>
                            <p
                              className={`font-medium ${
                                openChecklists.includes("checklist-3") ? "text-[#d57d2a]" : "text-[#513f34]"
                              }`}
                            >
                              Cooking Range
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                              <span className="flex items-center">
                                <Clock className="text-sm mr-1" />
                                45 min
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-medium">
                                Complete
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ChevronRight
                              className={`text-gray-600 transform transition-transform ${
                                openChecklists.includes("checklist-3") ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </button>
                        {openChecklists.includes("checklist-3") && (
                          <div className="p-4 bg-gray-50">
                            <p className="text-sm text-gray-600">Checklist content for Cooking Range goes here.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Parts Information */}
                  <div className="mb-4">
                    <h3 className="font-bold text-[#513f34] text-base mb-2">PARTS INFORMATION</h3>
                    <div className="bg-white rounded-xl shadow-md border border-[#E5E5E5]">
                      <div className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                        <button
                          onClick={() => setActivePartsTab("Used")}
                          className={`flex-1 py-2.5 ${activePartsTab === "Used" ? "text-[#d57d2a] border-b-2 border-[#d57d2a]" : "hover:text-gray-700"}`}
                        >
                          Used
                        </button>
                        <button
                          onClick={() => setActivePartsTab("Returned")}
                          className={`flex-1 py-2.5 ${activePartsTab === "Returned" ? "text-[#d57d2a] border-b-2 border-[#d57d2a]" : "hover:text-gray-700"}`}
                        >
                          Returned
                        </button>
                        <button
                          onClick={() => setActivePartsTab("Projected")}
                          className={`flex-1 py-2.5 ${activePartsTab === "Projected" ? "text-[#d57d2a] border-b-2 border-[#d57d2a]" : "hover:text-gray-700"}`}
                        >
                          Projected
                        </button>
                      </div>

                      {activePartsTab === "Used" && (
                        <div className="divide-y divide-gray-200">
                          <div className="p-4">
                            <div className="group relative" tabIndex={0}>
                              <div className="flex justify-between items-start">
                                <div className="flex items-start flex-1">
                                  <button
                                    onClick={() => openModal("part-image-viewer-popup")}
                                    className="flex-shrink-0 relative"
                                  >
                                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                                      <img
                                        alt="Circuit Breaker"
                                        className="w-10 h-10 object-contain"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE1Ut21MASdEh4DBBwRMMMo62ZEUIuWjBpT05DOlQ17oH4VYK6mVO2BegURDnxQ72Sd_HNOZF1jIv9-ptVICLj515b58kx1xwh59sNDWG4cAT9WyXIgbfBeU3_bMBrVnucWec99eQF-lUax4LPSNkYEa5mND2koZFNJ-YJ54CBSTAaTwsR96S0AIrBQle1bDAZhpxWqMOoYnK2ALYPF-1hy0ENKu1k_o6fG4QqBRB9OIMebVsuRnFPhpSWxKnswJXEsmbCzTHWDUM"
                                      />
                                    </div>
                                    <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d57d2a] text-white text-xs font-bold ring-2 ring-white">
                                      3
                                    </span>
                                  </button>
                                  <div className="flex-1 ml-3">
                                    <p className="font-medium text-gray-900">REK/SAFE/006</p>
                                    <p className="text-sm text-gray-600">Labour Charge for Breaker</p>
                                  </div>
                                </div>
                                <div className="flex items-center relative">
                                  <p className="text-lg font-bold text-gray-900 mr-2">10</p>
                                  <button
                                    className="p-2 text-gray-500 -m-2"
                                    onClick={(e) => handleContextMenuClick("part-1", e)}
                                  >
                                    <MoreVertical className="text-xl" />
                                  </button>
                                  {activeContextMenu === "part-1" && (
                                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View
                                      </button>
                                      <div className="border-t border-gray-200 my-1"></div>
                                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                      </button>
                                      <div className="border-t border-gray-200 my-1"></div>
                                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="group relative" tabIndex={0}>
                              <div className="flex justify-between items-start">
                                <div className="flex items-start flex-1">
                                  <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                                    <img
                                      alt="Change Over Switch"
                                      className="w-10 h-10 object-contain"
                                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaaT_BL1F2ocC25g8n0loDPS8sdruodFeuZPCW2dIkeENgPrgBZbg7ZHrV1kq_QBDsIJUc9EeiB0zt_XViM0mH6fhebUafKjFqB4q_d8_mEB4eck4Nc26BdvkHO_pZd7OVm5kST7DrNbm_tzfK6H3y-3Hce0XzRJgv0rdypKUs6qHFIeATBBkqyRT3x_6IKi0UNhGCIR7PFjk4Mgj8UyopzfSFSpUSc0vMC4HFYaCniRpK38JcEmdggRAehWzLCwAWCAH8F7OVg7o"
                                    />
                                  </div>
                                  <div className="flex-1 ml-3">
                                    <p className="font-medium text-gray-900">REK/SAFE/007</p>
                                    <p className="text-sm text-gray-600">Big change over switch</p>
                                  </div>
                                </div>
                                <div className="flex items-center relative">
                                  <p className="text-lg font-bold text-gray-900 mr-2">6</p>
                                  <button
                                    className="p-2 text-gray-500 -m-2"
                                    onClick={(e) => handleContextMenuClick("part-2", e)}
                                  >
                                    <MoreVertical className="text-xl" />
                                  </button>
                                  {activeContextMenu === "part-2" && (
                                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View
                                      </button>
                                      <div className="border-t border-gray-200 my-1"></div>
                                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                      </button>
                                      <div className="border-t border-gray-200 my-1"></div>
                                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePartsTab === "Returned" && (
                        <div className="divide-y divide-gray-200">
                          <div className="p-4 text-center text-gray-500">
                            <p>No returned parts yet</p>
                          </div>
                        </div>
                      )}

                      {activePartsTab === "Projected" && (
                        <div className="divide-y divide-gray-200">
                          <div className="p-4 text-center text-gray-500">
                            <p>No projected parts yet</p>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          if (activePartsTab === "Used") {
                            setActiveModal("add-used-part-popup")
                          } else if (activePartsTab === "Returned") {
                            setActiveModal("add-returned-part-popup")
                          } else if (activePartsTab === "Projected") {
                            setActiveModal("add-projected-part-popup")
                          }
                        }}
                        className="w-full text-center py-2.5 border-t-2 border-dashed border-gray-300 text-[#d57d2a] font-medium text-sm flex items-center justify-center hover:bg-gray-50 transition-colors rounded-b-lg"
                      >
                        <Plus className="text-lg mr-2" />
                        ADD {activePartsTab.toUpperCase()} PART
                      </button>
                    </div>

                    {/* Parts Comments */}
                    <div className="mt-4">
                      <h4 className="font-bold text-[#513f34] text-base mb-2">Parts Comments</h4>
                      <div className="bg-white rounded-xl shadow-md border border-[#E5E5E5]">
                        <div className="divide-y divide-gray-200">
                          <div className="p-4">
                            <div className="group relative" tabIndex={0}>
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="font-medium text-[#513f34]">
                                    Parts used. Relaying valve - 8pcs, T-junction - 1 pc, sockets etc. Total Duration:
                                    8pm-6am - 1 day.
                                  </p>
                                </div>
                                <div className="flex items-center relative">
                                  <button
                                    className="p-2 -m-2 text-gray-500"
                                    onClick={(e) => handleContextMenuClick("comment-1", e)}
                                  >
                                    <MoreVertical className="text-xl" />
                                  </button>
                                  {activeContextMenu === "comment-1" && (
                                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                      </button>
                                      <div className="border-t border-gray-200 my-1"></div>
                                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => openModal("comment-popup")}
                          className="w-full text-center py-2.5 border-t-2 border-dashed border-gray-300 text-[#d57d2a] font-medium text-sm flex items-center justify-center hover:bg-gray-50 transition-colors rounded-b-lg"
                        >
                          <Plus className="text-lg mr-2" />
                          ADD COMMENT
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Work Files */}
                  <div className="mb-4">
                    <h3 className="font-bold text-[#513f34] text-base mb-2">WORK FILES</h3>
                    <div className="bg-white rounded-xl shadow-md border border-[#E5E5E5]">
                      <div className="divide-y divide-gray-200">
                        <div className="p-4">
                          <div className="group relative" tabIndex={0}>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-[#513f34]">Cheese Melter Compliance Cert.pdf</p>
                                <p className="text-xs text-gray-500">
                                  Certificate <span className="mx-1">·</span>
                                  <span className="text-green-600">Regular File</span>
                                </p>
                              </div>
                              <div className="flex items-center relative">
                                <button
                                  className="p-2 -m-2 text-gray-500"
                                  onClick={(e) => handleContextMenuClick("file-1", e)}
                                >
                                  <MoreVertical className="text-xl" />
                                </button>
                                {activeContextMenu === "file-1" && (
                                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                                      <Download className="w-4 h-4 mr-2" />
                                      Download
                                    </button>
                                    <div className="border-t border-gray-200 my-1"></div>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center">
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="group relative" tabIndex={0}>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-[#513f34]">Salamander Assembly.pdf</p>
                                <p className="text-xs text-gray-500">
                                  Manual <span className="mx-1">·</span>
                                  <span className="text-green-600">Regular File</span>
                                </p>
                              </div>
                              <div className="flex items-center relative">
                                <button
                                  className="p-2 -m-2 text-gray-500"
                                  onClick={(e) => handleContextMenuClick("file-2", e)}
                                >
                                  <MoreVertical className="text-xl" />
                                </button>
                                {activeContextMenu === "file-2" && (
                                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                                      <Download className="w-4 h-4 mr-2" />
                                      Download
                                    </button>
                                    <div className="border-t border-gray-200 my-1"></div>
                                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center">
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveModal("work-files-popup")}
                        className="w-full text-center py-2.5 border-t-2 border-dashed border-gray-300 text-[#d57d2a] font-medium text-sm flex items-center justify-center hover:bg-gray-50 transition-colors rounded-b-lg"
                      >
                        <Plus className="text-lg mr-2" />
                        ADD FILES
                      </button>
                    </div>
                  </div>
                  <div className="pb-32"></div>
                </div>
              )}
            </div>
          </main>
        </div>

        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 p-4 space-y-3 z-30">
          {/* First row: Assign and Hold buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-gray-100 text-gray-700 rounded-lg py-3 px-4 text-sm font-medium hover:bg-gray-200 transition-colors">
              Assign
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 rounded-lg py-3 px-4 text-sm font-medium hover:bg-gray-200 transition-colors">
              Hold
            </button>
          </div>

          {/* Second row: Start button spanning full width */}
          <button className="w-full bg-[#d57d2a] text-white rounded-lg py-3 px-4 text-sm font-medium hover:bg-[#c06d24] transition-colors">
            Start
          </button>
        </div>

        {activeModal === "asset-inconsistencies-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-bold text-[#513f34]">Asset Inconsistencies</h3>
                  <p className="text-sm text-gray-500">Resolve detected asset inconsistencies</p>
                </div>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-grow">
                <h4 className="font-medium text-base text-[#513f34] mb-4">
                  Below Inconsistencies have been noted on the assets
                </h4>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="font-medium text-sm text-[#513f34] mb-1">
                      A. Some Assets have been removed from the location
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Assets Removed:</span> Cheese Melter 3, Cheese Melter 4
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-sm text-[#513f34] mb-1">
                      B. Some Assets have been added to the location
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Assets Added:</span> Cooking Range 1
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-sm text-[#513f34] mb-2">INSTRUCTIONS:</p>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    <li>
                      <span className="font-medium">Requirement:</span> You have to resolve the inconsistencies to be
                      able to fill the checklist
                    </li>
                    <li>
                      <span className="font-medium">Next Step:</span> Click on Ignore & Resolve button below to begin
                      the resolution process
                    </li>
                    <li>
                      <span className="font-medium">What to expect:</span> The assets list will be automatically updated
                      and the page will reload
                    </li>
                  </ol>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-4 font-medium tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-[#513f34] text-white rounded-3xl py-2 px-4 font-medium tracking-wider"
                  >
                    Ignore & Resolve
                  </button>
                </div>
                <button
                  onClick={closeModal}
                  className="w-full bg-[#d57d2a] text-white rounded-3xl py-2 px-4 font-medium tracking-wider"
                >
                  Accept & Resolve
                </button>
              </div>
            </div>
          </div>
        )}

        {activeModal === "asset-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#513f34]">All Assets (13)</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <ul className="space-y-3 text-sm text-[#513f34]">
                  {[
                    "Cooking Equipment",
                    "Gas and Hoods",
                    "Cheese Melter",
                    "Salamander",
                    "Asset Item 5",
                    "Asset Item 6",
                    "Asset Item 7",
                    "Asset Item 8",
                    "Asset Item 9",
                    "Asset Item 10",
                    "Asset Item 11",
                    "Asset Item 12",
                    "Asset Item 13",
                  ].map((asset, index) => (
                    <li key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      {asset}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-4 font-medium tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {activeModal === "part-image-viewer-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <ImageCarousel images={partImages} title="REK/SAFE/006" description="Labour Charge for Breaker" />
                <div className="p-4">
                  <p className="font-bold text-lg text-[#513f34]">REK/SAFE/006</p>
                  <p className="text-sm text-gray-600">Labour Charge for Breaker</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1.5"
              >
                <X />
              </button>
            </div>
          </div>
        )}

        {activeModal === "image-viewer-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-sm">
              <img
                alt="Full screen tool photo"
                className="w-full h-auto rounded-lg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHeNQopblAlxZXn-4_K0iEXiy4VdqJH7QnweiwXcm-btHguzvMvQvx_ndSoTwsBVc9p_uuid0EutaXjmSn-RujXUGK5GXTTM-q-UkC3fXoQaA563DzBMV1v2372nPGe3QBEOg87Hk2WdvCiDBh7LfSuKsVkq-BfKsJotIXXBwM4vdwQGIGwzzB6iD9FlDuGSpUOffeQfkVL5TBmRXaVpNa7zJP2wMMkwN5cQmS1x4lk755pKLTVRdGoF_HT-Yuq5Hxydsbfl1Ximc"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
              >
                <X />
              </button>
            </div>
          </div>
        )}

        {activeModal === "delete-confirm-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm">
              <div className="p-6 text-center">
                <AlertTriangle className="text-5xl text-red-500 mx-auto" />
                <h3 className="text-lg font-medium text-[#513f34]">Delete Photo?</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Are you sure you want to delete this photo? This action cannot be undone.
                </p>
              </div>
              <div className="p-4 bg-gray-50 flex justify-center space-x-3 rounded-b-xl">
                <button
                  onClick={closeModal}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-6 text-sm font-medium tracking-wider"
                >
                  Cancel
                </button>
                <button className="bg-red-600 text-white rounded-3xl py-2 px-6 text-sm font-medium tracking-wider shadow-md hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {activeModal === "comment-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#513f34]">Add Comment</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-grow">
                <label className="text-sm font-medium text-gray-700" htmlFor="parts-comment">
                  Add comments on used/ returned parts
                </label>
                <textarea
                  id="parts-comment"
                  className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                  placeholder="Enter comments"
                  rows={5}
                />
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end space-x-2 rounded-b-xl">
                <button
                  onClick={closeModal}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-4 font-medium tracking-wider"
                >
                  Cancel
                </button>
                <button className="bg-[#d57d2a] text-white rounded-3xl py-2 px-4 font-medium tracking-wider shadow-md">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {activeModal === "jsa-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#513f34]">Add Job Safety Analysis</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-grow space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="identify-hazard">
                    Identify Hazard
                  </label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm"
                    id="identify-hazard"
                    placeholder="Enter hazard identified"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="identify-risks">
                    Identify Risks associated with Hazard
                  </label>
                  <textarea
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm"
                    id="identify-risks"
                    placeholder="Enter risks identified"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="risk-mitigation">
                    Risk Mitigation Measure
                  </label>
                  <textarea
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm"
                    id="risk-mitigation"
                    placeholder="Enter ways to mitigate the risks"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="ppes-tools">
                    PPEs and Tools
                  </label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm"
                    id="ppes-tools"
                    placeholder="Enter PPEs and tool for risk mitigation"
                    type="text"
                  />
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-4 font-medium tracking-wider"
                >
                  Cancel
                </button>
                <button className="bg-[#d57d2a] text-white rounded-3xl py-2 px-4 font-medium tracking-wider shadow-md">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {activeModal === "photo-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#513f34]">Upload Photos</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-grow">
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <input accept="image/*" className="sr-only" id="file-upload" multiple type="file" />
                  <label className="cursor-pointer" htmlFor="file-upload">
                    <Upload className="text-5xl text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drag & drop files here or <span className="font-medium text-[#d57d2a]">browse</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Only image files are accepted</p>
                  </label>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Uploaded Files</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative group">
                      <img
                        alt="Lockout tag"
                        className="h-24 w-full rounded-md object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHeNQopblAlxZXn-4_K0iEXiy4VdqJH7QnweiwXcm-btHguzvMvQvx_ndSoTwsBVc9p_uuid0EutaXjmSn-RujXUGK5GXTTM-q-UkC3fXoQaA563DzBMV1v2372nPGe3QBEOg87Hk2WdvCiDBh7LfSuKsVkq-BfKsJotIXXBwM4vdwQGIGwzzB6iD9FlDuGSpUOffeQfkVL5TBmRXaVpNa7zJP2wMMkwN5cQmS1x4lk755pKLTVRdGoF_HT-Yuq5Hxydsbfl1Ximc"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-white">
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                    <div className="relative group">
                      <img
                        alt="Tool photo 2"
                        className="h-24 w-full rounded-md object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhq1hNAG40mHprPong5H4TVUii9Q0HsiDHV8TEoCctkH6Pav4natCicJH5JBYvNHSw1heQW_ouKNK4pnqpGM4of3-6BOVWBOLq0QJIEHlGS4UEt-1bpc5wrTSCMGsi_dU9TD0iOsk6k-NNShmAZLXTXDaOvYEZBILhLynFsqZdxRFaiwLzACgEHNCTp17VEoYylN2A1mU1DTl2MxWzYYjRl39SgnlBtodpxnoRhRBnb99Cliebcl5krr1_a6toQp7wVOnER14EsWQ"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-white">
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-4 font-medium tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Saving uploaded files:", workFiles)
                    // Reset uploaded files
                    setWorkFiles([])
                    closeModal()
                  }}
                  className="bg-[#d57d2a] text-white rounded-3xl py-2 px-4 font-medium tracking-wider"
                >
                  Upload Files
                </button>
              </div>
            </div>
          </div>
        )}
        {activeModal === "add-used-part-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#513f34]">Add Used Part</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-grow space-y-4">
                {/* Asset Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="select-asset">
                    Select Assets/ Equipment
                  </label>
                  <div className="relative dropdown-container">
                    <div
                      className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus-within:border-[#d57d2a] focus-within:ring-[#d57d2a] focus:ring-opacity-50 cursor-pointer flex items-center justify-between"
                      onClick={() => setShowAssetDropdown(!showAssetDropdown)}
                    >
                      <span className={addUsedPartData.asset ? "text-gray-900" : "text-gray-500"}>
                        {addUsedPartData.asset || "Select Assets/ Equipment"}
                      </span>
                      <ChevronRight
                        className={`text-gray-400 transition-transform ${showAssetDropdown ? "rotate-90" : ""}`}
                      />
                    </div>
                    {showAssetDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                            placeholder="Search assets..."
                            value={assetSearchTerm}
                            onChange={(e) => setAssetSearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="max-h-24 overflow-y-auto">
                          {[
                            "Hood-A",
                            "Hood-B",
                            "Hood-C",
                            "Conveyor Belt 1",
                            "Conveyor Belt 2",
                            "Motor Unit A",
                            "Motor Unit B",
                            "Control Panel 1",
                            "Control Panel 2",
                            "Sensor Array 1",
                          ]
                            .filter((asset) => asset.toLowerCase().includes(assetSearchTerm.toLowerCase()))
                            .map((asset) => (
                              <div
                                key={asset}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setAddUsedPartData({ ...addUsedPartData, asset })
                                  setAssetSearchTerm("")
                                  setShowAssetDropdown(false)
                                }}
                              >
                                {asset}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Part Category Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="select-category">
                    Select Part Category
                  </label>
                  <div className="relative dropdown-container">
                    <div
                      className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus-within:border-[#d57d2a] focus-within:ring-[#d57d2a] focus:ring-opacity-50 cursor-pointer flex items-center justify-between"
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    >
                      <span className={addUsedPartData.partCategory ? "text-gray-900" : "text-gray-500"}>
                        {addUsedPartData.partCategory || "Select Part Category"}
                      </span>
                      <ChevronRight
                        className={`text-gray-400 transition-transform ${showCategoryDropdown ? "rotate-90" : ""}`}
                      />
                    </div>
                    {showCategoryDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                            placeholder="Search categories..."
                            value={categorySearchTerm}
                            onChange={(e) => setCategorySearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="max-h-24 overflow-y-auto">
                          {[
                            "Electrical",
                            "Mechanical",
                            "Hydraulic",
                            "Pneumatic",
                            "Electronic",
                            "Structural",
                            "Safety",
                            "Consumables",
                            "Filters",
                            "Bearings",
                          ]
                            .filter((category) => category.toLowerCase().includes(categorySearchTerm.toLowerCase()))
                            .map((category) => (
                              <div
                                key={category}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setAddUsedPartData({ ...addUsedPartData, partCategory: category })
                                  setCategorySearchTerm("")
                                  setShowCategoryDropdown(false)
                                }}
                              >
                                {category}
                              </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200">
                          <div
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[#d57d2a] font-medium"
                            onClick={() => {
                              setShowAddCategory(true)
                              setShowCategoryDropdown(false)
                              setActiveAddPopup("used")
                            }}
                          >
                            + Add New Category
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Part Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="select-part">
                    Select Part
                  </label>
                  <div className="relative dropdown-container">
                    <div
                      className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus-within:border-[#d57d2a] focus-within:ring-[#d57d2a] focus:ring-opacity-50 cursor-pointer flex items-center justify-between"
                      onClick={() => setShowPartDropdown(!showPartDropdown)}
                    >
                      <span className={addUsedPartData.part ? "text-gray-900" : "text-gray-500"}>
                        {addUsedPartData.part || "Select Part"}
                      </span>
                      <ChevronRight
                        className={`text-gray-400 transition-transform ${showPartDropdown ? "rotate-90" : ""}`}
                      />
                    </div>
                    {showPartDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                            placeholder="Search parts..."
                            value={partSearchTerm}
                            onChange={(e) => setPartSearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="max-h-24 overflow-y-auto">
                          {[
                            "Motor Bearing",
                            "Drive Belt",
                            "Control Circuit",
                            "Pressure Sensor",
                            "Temperature Gauge",
                            "Safety Switch",
                            "Power Cable",
                            "Hydraulic Seal",
                            "Air Filter",
                            "Coupling",
                          ]
                            .filter((part) => part.toLowerCase().includes(partSearchTerm.toLowerCase()))
                            .map((part) => (
                              <div
                                key={part}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setAddUsedPartData({ ...addUsedPartData, part })
                                  setPartSearchTerm("")
                                  setShowPartDropdown(false)
                                }}
                              >
                                {part}
                              </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200">
                          <div
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[#d57d2a] font-medium"
                            onClick={() => {
                              setShowAddPart(true)
                              setShowPartDropdown(false)
                              setActiveAddPopup("used")
                            }}
                          >
                            + Add New Part
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="quantity-used">
                    Quantity Used
                  </label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                    id="quantity-used"
                    placeholder="Enter quantity"
                    type="number"
                    value={addUsedPartData.quantity}
                    onChange={(e) => setAddUsedPartData({ ...addUsedPartData, quantity: e.target.value })}
                  />
                </div>

                {/* Reason */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="reason-use">
                    Reason for use/ replacement
                  </label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                    id="reason-use"
                    placeholder="Enter comments"
                    type="text"
                    value={addUsedPartData.reason}
                    onChange={(e) => setAddUsedPartData({ ...addUsedPartData, reason: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Attach Images</label>
                  <div className="mt-2">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <input
                        accept="image/*"
                        className="sr-only"
                        id="part-file-upload"
                        multiple
                        type="file"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          files.forEach((file) => {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              const newImage = event.target?.result as string
                              setAddUsedPartData((prev) => ({
                                ...prev,
                                images: [...prev.images, newImage],
                              }))
                            }
                            reader.readAsDataURL(file)
                          })
                        }}
                      />
                      <label className="cursor-pointer" htmlFor="part-file-upload">
                        <Upload className="text-5xl text-gray-400 mx-auto mb-2" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag & drop files here or <span className="font-medium text-[#d57d2a]">browse</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Only image files are accepted</p>
                      </label>
                    </div>

                    {addUsedPartData.images.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Uploaded Files</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {addUsedPartData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                alt={`Part image ${index + 1}`}
                                className="h-24 w-full rounded-md object-cover"
                                src={image || "/placeholder.svg"}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    const newImages = addUsedPartData.images.filter((_, i) => i !== index)
                                    setAddUsedPartData({ ...addUsedPartData, images: newImages })
                                  }}
                                  className="text-white"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
                <button
                  onClick={closeModal}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-6 text-sm font-medium tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Saving used part:", addUsedPartData)
                    // Reset form data
                    setAddUsedPartData({
                      asset: "",
                      partCategory: "",
                      part: "",
                      quantity: "",
                      reason: "",
                      images: [],
                    })
                    closeModal()
                  }}
                  className="bg-[#d57d2a] text-white rounded-3xl py-2 px-4 font-medium tracking-wider shadow-md"
                >
                  Add Part
                </button>
              </div>
            </div>
          </div>
        )}

        {activeModal === "add-returned-part-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#513f34]">Add Returned Part</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-grow space-y-4">
                {/* Asset Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="select-returned-asset">
                    Select Assets/ Equipment
                  </label>
                  <div className="relative dropdown-container">
                    <div
                      className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus-within:border-[#d57d2a] focus-within:ring-[#d57d2a] focus:ring-opacity-50 cursor-pointer flex items-center justify-between"
                      onClick={() => setReturnedAssetDropdown(!showReturnedAssetDropdown)}
                    >
                      <span className={addReturnedPartData.asset ? "text-gray-900" : "text-gray-500"}>
                        {addReturnedPartData.asset || "Select Assets/ Equipment"}
                      </span>
                      <ChevronRight
                        className={`text-gray-400 transition-transform ${showReturnedAssetDropdown ? "rotate-90" : ""}`}
                      />
                    </div>
                    {showReturnedAssetDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                            placeholder="Search assets..."
                            value={returnedAssetSearchTerm}
                            onChange={(e) => setReturnedAssetSearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="max-h-24 overflow-y-auto">
                          {[
                            "Hood-A",
                            "Hood-B",
                            "Hood-C",
                            "Conveyor Belt 1",
                            "Conveyor Belt 2",
                            "Motor Unit A",
                            "Motor Unit B",
                            "Control Panel 1",
                            "Control Panel 2",
                            "Sensor Array 1",
                          ]
                            .filter((asset) => asset.toLowerCase().includes(returnedAssetSearchTerm.toLowerCase()))
                            .map((asset) => (
                              <div
                                key={asset}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setAddReturnedPartData({ ...addReturnedPartData, asset })
                                  setReturnedAssetSearchTerm("")
                                  setReturnedAssetDropdown(false)
                                }}
                              >
                                {asset}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Part Category Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="select-returned-category">
                    Select Part Category
                  </label>
                  <div className="relative dropdown-container">
                    <div
                      className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus-within:border-[#d57d2a] focus-within:ring-[#d57d2a] focus:ring-opacity-50 cursor-pointer flex items-center justify-between"
                      onClick={() => setReturnedCategoryDropdown(!showReturnedCategoryDropdown)}
                    >
                      <span className={addReturnedPartData.partCategory ? "text-gray-900" : "text-gray-500"}>
                        {addReturnedPartData.partCategory || "Select Part Category"}
                      </span>
                      <ChevronRight
                        className={`text-gray-400 transition-transform ${showReturnedCategoryDropdown ? "rotate-90" : ""}`}
                      />
                    </div>
                    {showReturnedCategoryDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                            placeholder="Search categories..."
                            value={returnedCategorySearchTerm}
                            onChange={(e) => setReturnedCategorySearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="max-h-24 overflow-y-auto">
                          {[
                            "Electrical",
                            "Mechanical",
                            "Hydraulic",
                            "Pneumatic",
                            "Electronic",
                            "Structural",
                            "Safety",
                            "Consumables",
                            "Filters",
                            "Bearings",
                          ]
                            .filter((category) =>
                              category.toLowerCase().includes(returnedCategorySearchTerm.toLowerCase()),
                            )
                            .map((category) => (
                              <div
                                key={category}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setAddReturnedPartData({ ...addReturnedPartData, partCategory: category })
                                  setReturnedCategorySearchTerm("")
                                  setReturnedCategoryDropdown(false)
                                }}
                              >
                                {category}
                              </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200">
                          <div
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[#d57d2a] font-medium"
                            onClick={() => {
                              setShowAddCategory(true)
                              setReturnedCategoryDropdown(false)
                              setActiveAddPopup("returned")
                            }}
                          >
                            + Add New Category
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Part Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="select-returned-part">
                    Select Part
                  </label>
                  <div className="relative dropdown-container">
                    <div
                      className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus-within:border-[#d57d2a] focus-within:ring-[#d57d2a] focus:ring-opacity-50 cursor-pointer flex items-center justify-between"
                      onClick={() => setReturnedPartDropdown(!showReturnedPartDropdown)}
                    >
                      <span className={addReturnedPartData.part ? "text-gray-900" : "text-gray-500"}>
                        {addReturnedPartData.part || "Select Part"}
                      </span>
                      <ChevronRight
                        className={`text-gray-400 transition-transform ${showReturnedPartDropdown ? "rotate-90" : ""}`}
                      />
                    </div>
                    {showReturnedPartDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                            placeholder="Search parts..."
                            value={returnedPartSearchTerm}
                            onChange={(e) => setReturnedPartSearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="max-h-24 overflow-y-auto">
                          {[
                            "Motor Bearing",
                            "Drive Belt",
                            "Control Circuit",
                            "Pressure Sensor",
                            "Temperature Gauge",
                            "Safety Switch",
                            "Power Cable",
                            "Hydraulic Seal",
                            "Air Filter",
                            "Coupling",
                          ]
                            .filter((part) => part.toLowerCase().includes(returnedPartSearchTerm.toLowerCase()))
                            .map((part) => (
                              <div
                                key={part}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setAddReturnedPartData({ ...addReturnedPartData, part })
                                  setReturnedPartSearchTerm("")
                                  setReturnedPartDropdown(false)
                                }}
                              >
                                {part}
                              </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200">
                          <div
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[#d57d2a] font-medium"
                            onClick={() => {
                              setShowAddPart(true)
                              setReturnedPartDropdown(false)
                              setActiveAddPopup("returned")
                            }}
                          >
                            + Add New Part
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="quantity-returned">
                    Quantity Returned
                  </label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                    id="quantity-returned"
                    placeholder="Enter quantity"
                    type="number"
                    value={addReturnedPartData.quantity}
                    onChange={(e) => setAddReturnedPartData({ ...addReturnedPartData, quantity: e.target.value })}
                  />
                </div>

                {/* Reason */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="reason-return">
                    Reason for return
                  </label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                    id="reason-return"
                    placeholder="Enter comments"
                    type="text"
                    value={addReturnedPartData.reason}
                    onChange={(e) => setAddReturnedPartData({ ...addReturnedPartData, reason: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Attach Images</label>
                  <div className="mt-2">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <input
                        accept="image/*"
                        className="sr-only"
                        id="returned-part-file-upload"
                        multiple
                        type="file"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          files.forEach((file) => {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              const newImage = event.target?.result as string
                              setAddReturnedPartData((prev) => ({
                                ...prev,
                                images: [...prev.images, newImage],
                              }))
                            }
                            reader.readAsDataURL(file)
                          })
                        }}
                      />
                      <label className="cursor-pointer" htmlFor="returned-part-file-upload">
                        <Upload className="text-5xl text-gray-400 mx-auto mb-2" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag & drop files here or <span className="font-medium text-[#d57d2a]">browse</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Only image files are accepted</p>
                      </label>
                    </div>

                    {addReturnedPartData.images.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Uploaded Files</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {addReturnedPartData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                alt={`Returned part image ${index + 1}`}
                                className="h-24 w-full rounded-md object-cover"
                                src={image || "/placeholder.svg"}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    const newImages = addReturnedPartData.images.filter((_, i) => i !== index)
                                    setAddReturnedPartData({ ...addReturnedPartData, images: newImages })
                                  }}
                                  className="text-white"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
                <button
                  onClick={closeModal}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-6 text-sm font-medium tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Saving returned part:", addReturnedPartData)
                    // Reset form data
                    setAddReturnedPartData({
                      asset: "",
                      partCategory: "",
                      part: "",
                      quantity: "",
                      reason: "",
                      images: [],
                    })
                    closeModal()
                  }}
                  className="bg-[#d57d2a] text-white rounded-3xl py-2 px-4 font-medium tracking-wider shadow-md"
                >
                  Add Part
                </button>
              </div>
            </div>
          </div>
        )}

        {activeModal === "add-projected-part-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#513f34]">Add Projected Part</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-grow space-y-4">
                {/* Asset Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="select-projected-asset">
                    Select Assets/ Equipment
                  </label>
                  <div className="relative dropdown-container">
                    <div
                      className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus-within:border-[#d57d2a] focus-within:ring-[#d57d2a] focus:ring-opacity-50 cursor-pointer flex items-center justify-between"
                      onClick={() => setProjectedAssetDropdown(!showProjectedAssetDropdown)}
                    >
                      <span className={addProjectedPartData.asset ? "text-gray-900" : "text-gray-500"}>
                        {addProjectedPartData.asset || "Select Assets/ Equipment"}
                      </span>
                      <ChevronRight
                        className={`text-gray-400 transition-transform ${showProjectedAssetDropdown ? "rotate-90" : ""}`}
                      />
                    </div>
                    {showProjectedAssetDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                            placeholder="Search assets..."
                            value={projectedAssetSearchTerm}
                            onChange={(e) => setProjectedAssetSearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="max-h-24 overflow-y-auto">
                          {[
                            "Hood-A",
                            "Hood-B",
                            "Hood-C",
                            "Conveyor Belt 1",
                            "Conveyor Belt 2",
                            "Motor Unit A",
                            "Motor Unit B",
                            "Control Panel 1",
                            "Control Panel 2",
                            "Sensor Array 1",
                          ]
                            .filter((asset) => asset.toLowerCase().includes(projectedAssetSearchTerm.toLowerCase()))
                            .map((asset) => (
                              <div
                                key={asset}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setAddProjectedPartData({ ...addProjectedPartData, asset })
                                  setProjectedAssetSearchTerm("")
                                  setProjectedAssetDropdown(false)
                                }}
                              >
                                {asset}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Part Category Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="select-projected-category">
                    Select Part Category
                  </label>
                  <div className="relative dropdown-container">
                    <div
                      className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus-within:border-[#d57d2a] focus-within:ring-[#d57d2a] focus:ring-opacity-50 cursor-pointer flex items-center justify-between"
                      onClick={() => setProjectedCategoryDropdown(!showProjectedCategoryDropdown)}
                    >
                      <span className={addProjectedPartData.partCategory ? "text-gray-900" : "text-gray-500"}>
                        {addProjectedPartData.partCategory || "Select Part Category"}
                      </span>
                      <ChevronRight
                        className={`text-gray-400 transition-transform ${showProjectedCategoryDropdown ? "rotate-90" : ""}`}
                      />
                    </div>
                    {showProjectedCategoryDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                            placeholder="Search categories..."
                            value={projectedCategorySearchTerm}
                            onChange={(e) => setProjectedCategorySearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="max-h-24 overflow-y-auto">
                          {[
                            "Electrical",
                            "Mechanical",
                            "Hydraulic",
                            "Pneumatic",
                            "Electronic",
                            "Structural",
                            "Safety",
                            "Consumables",
                            "Filters",
                            "Bearings",
                          ]
                            .filter((category) =>
                              category.toLowerCase().includes(projectedCategorySearchTerm.toLowerCase()),
                            )
                            .map((category) => (
                              <div
                                key={category}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setAddProjectedPartData({ ...addProjectedPartData, partCategory: category })
                                  setProjectedCategorySearchTerm("")
                                  setProjectedCategoryDropdown(false)
                                }}
                              >
                                {category}
                              </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200">
                          <div
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[#d57d2a] font-medium"
                            onClick={() => {
                              setShowAddCategory(true)
                              setProjectedCategoryDropdown(false)
                              setActiveAddPopup("projected")
                            }}
                          >
                            + Add New Category
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Part Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="select-projected-part">
                    Select Part
                  </label>
                  <div className="relative dropdown-container">
                    <div
                      className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus-within:border-[#d57d2a] focus-within:ring-[#d57d2a] focus:ring-opacity-50 cursor-pointer flex items-center justify-between"
                      onClick={() => setProjectedPartDropdown(!showProjectedPartDropdown)}
                    >
                      <span className={addProjectedPartData.part ? "text-gray-900" : "text-gray-500"}>
                        {addProjectedPartData.part || "Select Part"}
                      </span>
                      <ChevronRight
                        className={`text-gray-400 transition-transform ${showProjectedPartDropdown ? "rotate-90" : ""}`}
                      />
                    </div>
                    {showProjectedPartDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                            placeholder="Search parts..."
                            value={projectedPartSearchTerm}
                            onChange={(e) => setProjectedPartSearchTerm(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="max-h-24 overflow-y-auto">
                          {[
                            "Motor Bearing",
                            "Drive Belt",
                            "Control Circuit",
                            "Pressure Sensor",
                            "Temperature Gauge",
                            "Safety Switch",
                            "Power Cable",
                            "Hydraulic Seal",
                            "Air Filter",
                            "Coupling",
                          ]
                            .filter((part) => part.toLowerCase().includes(projectedPartSearchTerm.toLowerCase()))
                            .map((part) => (
                              <div
                                key={part}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setAddProjectedPartData({ ...addProjectedPartData, part })
                                  setProjectedPartSearchTerm("")
                                  setProjectedPartDropdown(false)
                                }}
                              >
                                {part}
                              </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200">
                          <div
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[#d57d2a] font-medium"
                            onClick={() => {
                              setShowAddPart(true)
                              setProjectedPartDropdown(false)
                              setActiveAddPopup("projected")
                            }}
                          >
                            + Add New Part
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="quantity-projected">
                    Quantity Projected
                  </label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                    id="quantity-projected"
                    placeholder="Enter quantity"
                    type="number"
                    value={addProjectedPartData.quantity}
                    onChange={(e) => setAddProjectedPartData({ ...addProjectedPartData, quantity: e.target.value })}
                  />
                </div>

                {/* Attach Images */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Attach Images</label>
                  <div className="mt-2">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <input
                        accept="image/*"
                        className="sr-only"
                        id="projected-part-file-upload"
                        multiple
                        type="file"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          files.forEach((file) => {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              const newImage = event.target?.result as string
                              setAddProjectedPartData((prev) => ({
                                ...prev,
                                images: [...prev.images, newImage],
                              }))
                            }
                            reader.readAsDataURL(file)
                          })
                        }}
                      />
                      <label className="cursor-pointer" htmlFor="projected-part-file-upload">
                        <Upload className="text-5xl text-gray-400 mx-auto mb-2" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag & drop files here or <span className="font-medium text-[#d57d2a]">browse</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Only image files are accepted</p>
                      </label>
                    </div>

                    {addProjectedPartData.images.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Uploaded Files</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {addProjectedPartData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                alt={`Projected part image ${index + 1}`}
                                className="h-24 w-full rounded-md object-cover"
                                src={image || "/placeholder.svg"}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    const newImages = addProjectedPartData.images.filter((_, i) => i !== index)
                                    setAddProjectedPartData({ ...addProjectedPartData, images: newImages })
                                  }}
                                  className="text-white"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
                <button
                  onClick={closeModal}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-6 text-sm font-medium tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Saving projected part:", addProjectedPartData)
                    // Reset form data
                    setAddProjectedPartData({
                      asset: "",
                      partCategory: "",
                      part: "",
                      quantity: "",
                      reason: "",
                      images: [],
                    })
                    closeModal()
                  }}
                  className="bg-[#d57d2a] text-white rounded-3xl py-2 px-4 font-medium tracking-wider shadow-md"
                >
                  Add Part
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#513f34]">Add New Category</h3>
                <button onClick={() => setShowAddCategory(false)} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4">
                <label className="text-sm font-medium text-gray-700">Category Name</label>
                <input
                  className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowAddCategory(false)
                    setNewCategoryName("")
                  }}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-4 font-medium tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newCategoryName.trim()) {
                      setPartCategories([...partCategoriesList, newCategoryName.trim()])
                      if (activeAddPopup === "used") {
                        setAddUsedPartData({ ...addUsedPartData, partCategory: newCategoryName.trim() })
                      } else if (activeAddPopup === "returned") {
                        setAddReturnedPartData({ ...addReturnedPartData, partCategory: newCategoryName.trim() })
                      } else if (activeAddPopup === "projected") {
                        setAddProjectedPartData({ ...addProjectedPartData, partCategory: newCategoryName.trim() })
                      }
                      setNewCategoryName("")
                      setShowAddCategory(false)
                    }
                  }}
                  className="bg-[#d57d2a] text-white rounded-3xl py-2 px-4 font-medium tracking-wider shadow-md"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddPart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#513f34]">Add New Part</h3>
                <button onClick={() => setShowAddPart(false)} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4">
                <label className="text-sm font-medium text-gray-700">Part Name</label>
                <input
                  className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:border-[#d57d2a] focus:ring-[#d57d2a] focus:ring-opacity-50"
                  placeholder="Enter part name"
                  value={newPartName}
                  onChange={(e) => setNewPartName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowAddPart(false)
                    setNewPartName("")
                  }}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-4 font-medium tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newPartName.trim()) {
                      setParts([...partsList, newPartName.trim()])
                      if (activeAddPopup === "used") {
                        setAddUsedPartData({ ...addUsedPartData, part: newPartName.trim() })
                      } else if (activeAddPopup === "returned") {
                        setAddReturnedPartData({ ...addReturnedPartData, part: newPartName.trim() })
                      } else if (activeAddPopup === "projected") {
                        setAddProjectedPartData({ ...addProjectedPartData, part: newPartName.trim() })
                      }
                      setNewPartName("")
                      setShowAddPart(false)
                    }
                  }}
                  className="bg-[#d57d2a] text-white rounded-3xl py-2 px-4 font-medium tracking-wider shadow-md"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
        {activeModal === "work-files-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#513f34]">Upload Work Files</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-grow">
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <input
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="sr-only"
                    id="work-file-upload"
                    multiple
                    type="file"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])
                      files.forEach((file) => {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          setWorkFiles((prev) => [
                            ...prev,
                            {
                              file,
                              dataUrl: event.target?.result as string,
                              asset: "",
                              category: "",
                              isStatutory: false,
                            },
                          ])
                        }
                        reader.readAsDataURL(file)
                      })
                    }}
                  />
                  <label className="cursor-pointer" htmlFor="work-file-upload">
                    <Upload className="text-5xl text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drag & drop files here or <span className="font-medium text-[#d57d2a]">browse</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, PNG, JPG, JPEG files accepted</p>
                  </label>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Uploaded Files</h4>
                  <div className="space-y-3">
                    {workFiles.map((fileData, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1 min-w-0">
                            <div className="w-8 h-8 bg-[#d57d2a] rounded flex items-center justify-center mr-3 flex-shrink-0">
                              <span className="text-white text-xs font-bold">
                                {fileData.file.name.toLowerCase().includes("pdf")
                                  ? "PDF"
                                  : fileData.file.name.toLowerCase().includes("doc")
                                    ? "DOC"
                                    : "IMG"}
                              </span>
                            </div>
                            <span className="text-sm text-gray-700 truncate" title={fileData.file.name}>
                              {fileData.file.name}
                            </span>
                          </div>
                          <button
                            onClick={() => setWorkFiles((prev) => prev.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-600 block mb-1">Asset/Equipment</label>
                          <select
                            value={fileData.asset}
                            onChange={(e) => {
                              const newFiles = [...workFiles]
                              newFiles[index].asset = e.target.value
                              setWorkFiles(newFiles)
                            }}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-[#d57d2a] focus:border-[#d57d2a]"
                          >
                            <option value="">Select Asset</option>
                            <option value="Hood-A">Hood-A</option>
                            <option value="Hood-B">Hood-B</option>
                            <option value="Pump-1">Pump-1</option>
                            <option value="Compressor-X">Compressor-X</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-gray-600 block mb-1">File Category</label>
                          <select
                            value={fileData.category}
                            onChange={(e) => {
                              const newFiles = [...workFiles]
                              newFiles[index].category = e.target.value
                              setWorkFiles(newFiles)
                            }}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-[#d57d2a] focus:border-[#d57d2a]"
                          >
                            <option value="">Select Category</option>
                            <option value="Manual">Manual</option>
                            <option value="User Guide">User Guide</option>
                            <option value="Certificate">Certificate</option>
                            <option value="Specification">Specification</option>
                            <option value="Drawing">Drawing</option>
                            <option value="Report">Report</option>
                          </select>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`statutory-${index}`}
                            checked={fileData.isStatutory}
                            onChange={(e) => {
                              const newFiles = [...workFiles]
                              newFiles[index].isStatutory = e.target.checked
                              setWorkFiles(newFiles)
                            }}
                            className="h-4 w-4 accent-[#d57d2a] rounded focus:ring-[#d57d2a]/50 mr-2"
                          />
                          <label htmlFor={`statutory-${index}`} className="text-xs text-gray-600">
                            Statutory File
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end space-x-2 rounded-b-xl">
                <button
                  onClick={closeModal}
                  className="bg-[#e0e0e0] text-[#000000de] rounded-3xl py-2 px-4 font-medium tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle file upload logic here
                    closeModal()
                  }}
                  className="bg-[#d57d2a] text-white rounded-3xl py-2 px-4 font-medium tracking-wider"
                >
                  Upload Files
                </button>
              </div>
            </div>
          </div>
        )}
        {activeModal === "checklist-responses-popup" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[80vh] flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#513f34]">
                  {selectedChecklistResponses === "checklist-1" && "Hood & Gas PPM - Responses"}
                  {selectedChecklistResponses === "checklist-2" && "Salamanders - Responses"}
                  {selectedChecklistResponses === "checklist-3" && "Cooking Range - Responses"}
                </h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <X />
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex-grow space-y-4">
                {selectedChecklistResponses === "checklist-1" && (
                  <div className="space-y-6">
                    {/* Checklist Info */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-medium text-xs">
                          Draft
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Duration:</span>
                        <span className="text-sm text-gray-600">30 min</span>
                      </div>
                    </div>

                    {/* Section 1 Responses */}
                    <div>
                      <h4 className="font-semibold text-sm text-[#513f34] mb-3">Section 1: Safety Checks</h4>

                      <div className="space-y-4">
                        <div className="border-l-4 border-[#d57d2a] pl-3">
                          <p className="text-sm font-medium text-gray-800 mb-2">Is gas supply turned off?</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Asset 1: Hood-A</span>
                              <span className="text-red-600 font-medium">✗ No</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Asset 2: Hood-B</span>
                              <span className="text-green-600 font-medium">✓ Yes</span>
                            </div>
                            <div className="bg-orange-50 p-2 rounded text-xs">
                              <strong>Comment:</strong> "Slight gas smell noted upon arrival. Double-checked the valve
                              to ensure it's fully closed now. Proceeding with caution."
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Asset 3: Gas Line</span>
                              <span className="text-gray-800 font-medium">2.0 PSI</span>
                            </div>
                          </div>
                        </div>

                        <div className="border-l-4 border-[#d57d2a] pl-3">
                          <p className="text-sm font-medium text-gray-800 mb-2">Is the area well-ventilated?</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Asset 1: Hood-A</span>
                              <span className="text-red-600 font-medium">✗ No</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Asset 2: Hood-B</span>
                              <span className="text-green-600 font-medium">✓ Yes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 2 Responses */}
                    <div>
                      <h4 className="font-semibold text-sm text-[#513f34] mb-3">Section 2: Component Inspection</h4>

                      <div className="space-y-4">
                        <div className="border-l-4 border-[#d57d2a] pl-3">
                          <p className="text-sm font-medium text-gray-800 mb-2">Check grease filters condition.</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Asset 1: Hood-A</span>
                              <span className="text-orange-600 font-medium">Dirty</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Asset 2: Hood-B</span>
                              <span className="text-gray-500 font-medium">Not Answered</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedChecklistResponses === "checklist-2" && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium text-xs">
                          Pending
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Duration:</span>
                        <span className="text-sm text-gray-600">20 min</span>
                      </div>
                    </div>
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">No responses available yet.</p>
                      <p className="text-gray-400 text-xs mt-1">Complete the checklist to view responses.</p>
                    </div>
                  </div>
                )}

                {selectedChecklistResponses === "checklist-3" && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-medium text-xs">
                          Complete
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Duration:</span>
                        <span className="text-sm text-gray-600">45 min</span>
                      </div>
                    </div>
                    <div className="text-center py-8">
                      <p className="text-gray-600 text-sm">All responses completed successfully.</p>
                      <p className="text-gray-400 text-xs mt-1">100% completion rate</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-[#d57d2a] text-white rounded-3xl py-2 px-6 text-sm font-medium tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
