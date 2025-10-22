import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import {
  Home,
  LayoutDashboard,
  Settings,
  User,
  Menu,
  X,
  LogOut,
  Bell,
  Search
} from 'lucide-react'

function MemberDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Left: Menu Button & Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/dashboard" className="text-xl font-bold text-blue-600">
              Nicesly
            </Link>
          </div>

          {/* Right: Search, Notifications, Profile */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 hidden md:block">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
              <span className="hidden md:block font-medium">User</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200
        transform transition-transform duration-200 ease-in-out z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <nav className="p-4 space-y-2">
          <SidebarLink to="/dashboard" icon={<Home size={20} />} label="Home" />
          <SidebarLink to="/dashboard/overview" icon={<LayoutDashboard size={20} />} label="Overview" />
          <SidebarLink to="/dashboard/profile" icon={<User size={20} />} label="Profile" />
          <SidebarLink to="/dashboard/settings" icon={<Settings size={20} />} label="Settings" />

          <div className="pt-4 mt-4 border-t border-gray-200">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              <Home size={20} />
              <span>Back to Website</span>
            </Link>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition mt-2">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`
        pt-16 transition-all duration-200
        ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}
      `}>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/overview" element={<DashboardOverview />} />
            <Route path="/profile" element={<DashboardProfile />} />
            <Route path="/settings" element={<DashboardSettings />} />
          </Routes>
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

// Sidebar Link Component
function SidebarLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

// Dashboard Home Page
function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Your Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Projects" value="12" change="+2 this week" />
        <StatsCard title="Active Tasks" value="28" change="+5 today" />
        <StatsCard title="Completed" value="156" change="+12 this week" />
        <StatsCard title="Team Members" value="8" change="No change" />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <ActivityItem
            title="New project created"
            description="Marketing Campaign 2025"
            time="2 hours ago"
          />
          <ActivityItem
            title="Task completed"
            description="Design mockups for homepage"
            time="5 hours ago"
          />
          <ActivityItem
            title="Team member added"
            description="Sarah Johnson joined your team"
            time="1 day ago"
          />
        </div>
      </div>
    </div>
  )
}

// Dashboard Overview Page
function DashboardOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Overview</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-gray-600">
          Your comprehensive overview dashboard will appear here. This includes analytics,
          charts, and key performance indicators.
        </p>
      </div>
    </div>
  )
}

// Dashboard Profile Page
function DashboardProfile() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue="Your bio goes here..."
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// Dashboard Settings Page
function DashboardSettings() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <SettingToggle
              title="Email Notifications"
              description="Receive email updates about your activity"
            />
            <SettingToggle
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
            />
            <SettingToggle
              title="Marketing Emails"
              description="Receive news and updates from Nicesly"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

// Stats Card Component
function StatsCard({ title, value, change }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-sm text-gray-500">{change}</p>
    </div>
  )
}

// Activity Item Component
function ActivityItem({ title, description, time }) {
  return (
    <div className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  )
}

// Setting Toggle Component
function SettingToggle({ title, description }) {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-12 h-6 rounded-full transition ${
          enabled ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            enabled ? 'transform translate-x-6' : ''
          }`}
        ></div>
      </button>
    </div>
  )
}

export default MemberDashboard
