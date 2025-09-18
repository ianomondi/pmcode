"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Archive,
  MapPin,
  Users,
  Hash,
  Search,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface WorkItem {
  id: string
  location: string
  category: string
  team: string
  date: string
  refId: string
  status?: string
}

const PMWorkPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchAllWork, setSearchAllWork] = useState("")
  const [searchTabWork, setSearchTabWork] = useState("")

  // Sample data for each tab
  const workData = {
    upcoming: [
      {
        id: "1",
        location: "Java House Kimathi",
        category: "HVAC Maintenance",
        team: "Team Alpha",
        date: "2025-01-15",
        refId: "WO-2025-001",
      },
      {
        id: "2",
        location: "Artcaffe Junction",
        category: "Kitchen Equipment",
        team: "Team Beta",
        date: "2025-01-16",
        refId: "WO-2025-002",
      },
      {
        id: "3",
        location: "KFC Westgate",
        category: "Fire Safety",
        team: "Team Gamma",
        date: "2025-01-17",
        refId: "WO-2025-003",
      },
      {
        id: "4",
        location: "Pizza Inn Sarit",
        category: "Electrical",
        team: "Team Alpha",
        date: "2025-01-18",
        refId: "WO-2025-004",
      },
      {
        id: "5",
        location: "Subway Garden City",
        category: "Plumbing",
        team: "Team Delta",
        date: "2025-01-19",
        refId: "WO-2025-005",
      },
      {
        id: "6",
        location: "Dormans Coffee",
        category: "HVAC Maintenance",
        team: "Team Beta",
        date: "2025-01-20",
        refId: "WO-2025-006",
      },
      {
        id: "7",
        location: "Chicken Inn Mall",
        category: "Kitchen Equipment",
        team: "Team Gamma",
        date: "2025-01-21",
        refId: "WO-2025-007",
      },
      {
        id: "8",
        location: "Steers Prestige",
        category: "Fire Safety",
        team: "Team Alpha",
        date: "2025-01-22",
        refId: "WO-2025-008",
      },
    ],
    new: [
      {
        id: "9",
        location: "Galitos Chicken",
        category: "Kitchen Equipment",
        team: "Team Beta",
        date: "2025-01-10",
        refId: "WO-2025-009",
      },
      {
        id: "10",
        location: "Naivas Supermarket",
        category: "Refrigeration",
        team: "Team Delta",
        date: "2025-01-11",
        refId: "WO-2025-010",
      },
      {
        id: "11",
        location: "Carrefour Hub",
        category: "Electrical",
        team: "Team Gamma",
        date: "2025-01-12",
        refId: "WO-2025-011",
      },
      {
        id: "12",
        location: "Tuskys Branch",
        category: "HVAC Maintenance",
        team: "Team Alpha",
        date: "2025-01-13",
        refId: "WO-2025-012",
      },
      {
        id: "13",
        location: "Quickmart Store",
        category: "Plumbing",
        team: "Team Beta",
        date: "2025-01-14",
        refId: "WO-2025-013",
      },
      {
        id: "14",
        location: "Chandarana Mall",
        category: "Fire Safety",
        team: "Team Delta",
        date: "2025-01-15",
        refId: "WO-2025-014",
      },
      {
        id: "15",
        location: "Nakumatt Junction",
        category: "Kitchen Equipment",
        team: "Team Gamma",
        date: "2025-01-16",
        refId: "WO-2025-015",
      },
      {
        id: "16",
        location: "Uchumi Hyper",
        category: "Electrical",
        team: "Team Alpha",
        date: "2025-01-17",
        refId: "WO-2025-016",
      },
    ],
    ongoing: [
      {
        id: "17",
        location: "Burger King Mall",
        category: "Kitchen Equipment",
        team: "Team Beta",
        date: "2025-01-08",
        refId: "WO-2025-017",
      },
      {
        id: "18",
        location: "Dominos Pizza",
        category: "HVAC Maintenance",
        team: "Team Alpha",
        date: "2025-01-09",
        refId: "WO-2025-018",
      },
      {
        id: "19",
        location: "Cold Stone Mall",
        category: "Refrigeration",
        team: "Team Gamma",
        date: "2025-01-10",
        refId: "WO-2025-019",
      },
      {
        id: "20",
        location: "Creamy Inn",
        category: "Electrical",
        team: "Team Delta",
        date: "2025-01-11",
        refId: "WO-2025-020",
      },
      {
        id: "21",
        location: "Chicken Republic",
        category: "Fire Safety",
        team: "Team Beta",
        date: "2025-01-12",
        refId: "WO-2025-021",
      },
      {
        id: "22",
        location: "Mama Rocks",
        category: "Plumbing",
        team: "Team Alpha",
        date: "2025-01-13",
        refId: "WO-2025-022",
      },
      {
        id: "23",
        location: "Urban Burger",
        category: "Kitchen Equipment",
        team: "Team Gamma",
        date: "2025-01-14",
        refId: "WO-2025-023",
      },
      {
        id: "24",
        location: "Cafe Deli",
        category: "HVAC Maintenance",
        team: "Team Delta",
        date: "2025-01-15",
        refId: "WO-2025-024",
      },
    ],
    pendingClosure: [
      {
        id: "25",
        location: "Spur Steak Ranch",
        category: "Fire Safety",
        team: "Team Alpha",
        date: "2025-01-05",
        refId: "WO-2025-025",
      },
      {
        id: "26",
        location: "Ocean Basket",
        category: "Kitchen Equipment",
        team: "Team Beta",
        date: "2025-01-06",
        refId: "WO-2025-026",
      },
      {
        id: "27",
        location: "Debonairs Pizza",
        category: "HVAC Maintenance",
        team: "Team Gamma",
        date: "2025-01-07",
        refId: "WO-2025-027",
      },
      {
        id: "28",
        location: "Mugg & Bean",
        category: "Electrical",
        team: "Team Delta",
        date: "2025-01-08",
        refId: "WO-2025-028",
      },
      {
        id: "29",
        location: "Wimpy Restaurant",
        category: "Plumbing",
        team: "Team Alpha",
        date: "2025-01-09",
        refId: "WO-2025-029",
      },
      {
        id: "30",
        location: "Nandos Chicken",
        category: "Refrigeration",
        team: "Team Beta",
        date: "2025-01-10",
        refId: "WO-2025-030",
      },
      {
        id: "31",
        location: "Fuddruckers",
        category: "Fire Safety",
        team: "Team Gamma",
        date: "2025-01-11",
        refId: "WO-2025-031",
      },
      {
        id: "32",
        location: "Hardees Burger",
        category: "Kitchen Equipment",
        team: "Team Delta",
        date: "2025-01-12",
        refId: "WO-2025-032",
      },
    ],
    overdue: [
      {
        id: "33",
        location: "Chicken Inn CBD",
        category: "HVAC Maintenance",
        team: "Team Alpha",
        date: "2024-12-28",
        refId: "WO-2024-033",
      },
      {
        id: "34",
        location: "KFC Mombasa Rd",
        category: "Kitchen Equipment",
        team: "Team Beta",
        date: "2024-12-29",
        refId: "WO-2024-034",
      },
      {
        id: "35",
        location: "Pizza Hut Mall",
        category: "Fire Safety",
        team: "Team Gamma",
        date: "2024-12-30",
        refId: "WO-2024-035",
      },
      {
        id: "36",
        location: "Subway Westlands",
        category: "Electrical",
        team: "Team Delta",
        date: "2024-12-31",
        refId: "WO-2024-036",
      },
      {
        id: "37",
        location: "Dominos Thika Rd",
        category: "Plumbing",
        team: "Team Alpha",
        date: "2025-01-01",
        refId: "WO-2025-037",
      },
      {
        id: "38",
        location: "Burger King CBD",
        category: "Refrigeration",
        team: "Team Beta",
        date: "2025-01-02",
        refId: "WO-2025-038",
      },
      {
        id: "39",
        location: "Steers Junction",
        category: "HVAC Maintenance",
        team: "Team Gamma",
        date: "2025-01-03",
        refId: "WO-2025-039",
      },
      {
        id: "40",
        location: "Galitos Mall",
        category: "Kitchen Equipment",
        team: "Team Delta",
        date: "2025-01-04",
        refId: "WO-2025-040",
      },
    ],
    closed: [
      {
        id: "41",
        location: "Java House Mall",
        category: "Fire Safety",
        team: "Team Alpha",
        date: "2024-12-20",
        refId: "WO-2024-041",
        status: "On-Time",
      },
      {
        id: "42",
        location: "Artcaffe CBD",
        category: "Kitchen Equipment",
        team: "Team Beta",
        date: "2024-12-21",
        refId: "WO-2024-042",
        status: "Late",
      },
      {
        id: "43",
        location: "Dormans Westlands",
        category: "HVAC Maintenance",
        team: "Team Gamma",
        date: "2024-12-22",
        refId: "WO-2024-043",
        status: "On-Time",
      },
      {
        id: "44",
        location: "Cold Stone CBD",
        category: "Electrical",
        team: "Team Delta",
        date: "2024-12-23",
        refId: "WO-2024-044",
        status: "On-Time",
      },
      {
        id: "45",
        location: "Creamy Inn Mall",
        category: "Plumbing",
        team: "Team Alpha",
        date: "2024-12-24",
        refId: "WO-2024-045",
        status: "Late",
      },
      {
        id: "46",
        location: "Urban Burger CBD",
        category: "Refrigeration",
        team: "Team Beta",
        date: "2024-12-25",
        refId: "WO-2024-046",
        status: "On-Time",
      },
      {
        id: "47",
        location: "Mama Rocks Mall",
        category: "Fire Safety",
        team: "Team Gamma",
        date: "2024-12-26",
        refId: "WO-2024-047",
        status: "On-Time",
      },
      {
        id: "48",
        location: "Cafe Deli CBD",
        category: "Kitchen Equipment",
        team: "Team Delta",
        date: "2024-12-27",
        refId: "WO-2024-048",
        status: "Late",
      },
    ],
  }

  const tabs = [
    { id: "upcoming", label: "Upcoming", icon: Calendar, count: 1200, color: "bg-[#F5B44E]" },
    { id: "new", label: "New", icon: Clock, count: workData.new.length, color: "bg-[#F5B44E]" },
    { id: "ongoing", label: "On-going", icon: AlertTriangle, count: workData.ongoing.length, color: "bg-[#D57D2A]" },
    {
      id: "pendingClosure",
      label: "Pending Closure",
      icon: CheckCircle,
      count: workData.pendingClosure.length,
      color: "bg-[#D57D2A]",
    },
    { id: "overdue", label: "Overdue", icon: XCircle, count: workData.overdue.length, color: "bg-red-500" },
    { id: "closed", label: "Closed", icon: Archive, count: workData.closed.length, color: "bg-[#6C5B51]" },
  ]

  const handleWorkItemClick = (workItem: WorkItem) => {
    // Navigate to the existing work order page
    router.push("/")
  }

  const getTabSearchPlaceholder = () => {
    switch (activeTab) {
      case "upcoming":
        return "Search upcoming work"
      case "new":
        return "Search New Work"
      case "ongoing":
        return "Search On-going Work"
      case "pendingClosure":
        return "Search Pending Closure"
      case "overdue":
        return "Search Overdue Work"
      case "closed":
        return "Search Closed Work"
      default:
        return "Search work"
    }
  }

  const renderWorkItem = (item: WorkItem) => (
    <div
      key={item.id}
      onClick={() => handleWorkItemClick(item)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 active:bg-gray-50 transition-colors"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="font-medium text-gray-900">{item.location}</span>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <Hash className="w-3 h-3 mr-1" />
          <span>{item.refId}</span>
        </div>
      </div>

      <div className="space-y-2">
        {activeTab === "closed" ? (
          <>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">{item.category}</div>
              <span className="text-gray-600 text-sm">Closed: {item.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600 text-sm">
                <Users className="w-4 h-4 mr-1" />
                <span>{item.team}</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === "On-Time" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {item.status}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="text-sm text-gray-700">{item.category}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600 text-sm">
                <Users className="w-4 h-4 mr-1" />
                <span>{item.team}</span>
              </div>
              <div className="text-sm">
                <span className={`font-medium ${activeTab === "overdue" ? "text-red-600" : "text-gray-900"}`}>
                  {activeTab === "upcoming" ? `Exp. Start: ${item.date}` : `Due: ${item.date}`}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  return (
    <div className="bg-gray-200 flex justify-center min-h-screen">
      <div className="w-full max-w-sm bg-gray-100 shadow-lg relative">
        <div className="min-h-screen">
          {/* Header */}
          <header className="bg-[#513f34] shadow-lg sticky top-0 z-20">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <button onClick={() => router.push("/")} className="text-white">
                <ArrowLeft />
              </button>
              <h1 className="text-xl font-medium text-white">PM Work</h1>
              <div className="w-6"></div>
            </div>
          </header>

          <div className="bg-white border-b border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search All Work"
                value={searchAllWork}
                onChange={(e) => setSearchAllWork(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d57d2a] focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabs Grid */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="grid grid-cols-3 gap-3">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                const getBorderColor = () => {
                  if (activeTab !== tab.id) return "border-gray-200"

                  switch (tab.id) {
                    case "upcoming":
                    case "new":
                      return "border-[#F5B44E]"
                    case "ongoing":
                    case "pendingClosure":
                      return "border-[#D57D2A]"
                    case "overdue":
                      return "border-red-500"
                    case "closed":
                      return "border-[#6C5B51]"
                    default:
                      return "border-gray-200"
                  }
                }

                const getBackgroundColor = () => {
                  if (activeTab !== tab.id) return "bg-white"

                  switch (tab.id) {
                    case "upcoming":
                    case "new":
                      return "bg-[#F5B44E]/10"
                    case "ongoing":
                    case "pendingClosure":
                      return "bg-[#D57D2A]/10"
                    case "overdue":
                      return "bg-red-500/10"
                    case "closed":
                      return "bg-[#6C5B51]/10"
                    default:
                      return "bg-white"
                  }
                }

                const getTextColor = () => {
                  if (activeTab !== tab.id) return "text-gray-600"

                  switch (tab.id) {
                    case "upcoming":
                    case "new":
                      return "text-[#F5B44E]"
                    case "ongoing":
                    case "pendingClosure":
                      return "text-[#D57D2A]"
                    case "overdue":
                      return "text-red-500"
                    case "closed":
                      return "text-[#6C5B51]"
                    default:
                      return "text-gray-600"
                  }
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-3 rounded-lg border-2 transition-all ${
                      activeTab === tab.id ? `${getBorderColor()} ${getBackgroundColor()}` : "border-gray-200 bg-white"
                    }`}
                  >
                    <span
                      className={`absolute -top-1 -right-1 ${tab.color} text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-medium px-1`}
                    >
                      {tab.count > 999 ? `${Math.floor(tab.count / 1000)}k+` : tab.count}
                    </span>
                    <div className="flex flex-col items-center space-y-1">
                      <IconComponent className={`w-5 h-5 ${getTextColor()}`} />
                      <span className={`text-xs font-medium ${getTextColor()}`}>{tab.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Work Items List */}
          <div className="p-4 pb-20">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {activeTab === "pendingClosure" ? "Pending Closure" : activeTab} Work
              </h2>
              <p className="text-sm text-gray-600">
                {activeTab === "upcoming" ? "1,200" : workData[activeTab as keyof typeof workData].length} items
              </p>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={getTabSearchPlaceholder()}
                  value={searchTabWork}
                  onChange={(e) => setSearchTabWork(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d57d2a] focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-0">{workData[activeTab as keyof typeof workData].map(renderWorkItem)}</div>
          </div>
        </div>

        {/* Fixed Create PM button at the bottom */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 p-4">
          <button className="w-full bg-[#d57d2a] text-white rounded-lg py-3 px-4 text-sm font-medium hover:bg-[#c06d24] transition-colors">
            Create PM
          </button>
        </div>
      </div>
    </div>
  )
}

export default PMWorkPage
