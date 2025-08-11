"use client";
import { useState } from "react";
import { Settings, User, Shield, Bell, Palette, Key, Trash2, Save, ArrowLeft, Eye, EyeOff, Upload } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    company: "Acme Corp",
    bio: "AI enthusiast and content creator"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    marketingEmails: false,
    usageAlerts: true,
    weeklyReports: false
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: "sk_test_1234567890abcdef",
    webhookUrl: "https://example.com/webhook",
    rateLimit: "1000/hour"
  });

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "preferences", name: "Preferences", icon: Bell },
    { id: "api", name: "API Settings", icon: Key },
    { id: "appearance", name: "Appearance", icon: Palette }
  ];

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log("Profile updated:", profileData);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log("Password changed");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handlePreferencesUpdate = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log("Preferences updated:", preferences);
  };

  const handleApiSettingsUpdate = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log("API settings updated:", apiSettings);
  };

  const regenerateApiKey = () => {
    const newKey = "sk_test_" + Math.random().toString(36).substr(2, 15);
    setApiSettings(prev => ({ ...prev, apiKey: newKey }));
  };

  const deleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deletion requested");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navigation currentPage="settings" showUserMenu={true} userName="John Doe" userEmail="john@example.com" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <a href="/dashboard" className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </a>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your account preferences and settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Profile Information</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <Save className="h-5 w-5" />
                    <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                  </button>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Security Settings</h2>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <Shield className="h-5 w-5" />
                    <span>{isLoading ? "Updating..." : "Update Password"}</span>
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Danger Zone</h3>
                  <button
                    onClick={deleteAccount}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">Email Notifications</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Receive important updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.emailNotifications}
                        onChange={(e) => setPreferences(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">Marketing Emails</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Receive promotional content and offers</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketingEmails}
                        onChange={(e) => setPreferences(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">Usage Alerts</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Get notified when approaching usage limits</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.usageAlerts}
                        onChange={(e) => setPreferences(prev => ({ ...prev, usageAlerts: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">Weekly Reports</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Receive weekly usage and performance summaries</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.weeklyReports}
                        onChange={(e) => setPreferences(prev => ({ ...prev, weeklyReports: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <button
                    onClick={handlePreferencesUpdate}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <Bell className="h-5 w-5" />
                    <span>{isLoading ? "Updating..." : "Update Preferences"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* API Settings Tab */}
            {activeTab === "api" && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">API Configuration</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      API Key
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={apiSettings.apiKey}
                        onChange={(e) => setApiSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={regenerateApiKey}
                        className="px-4 py-2 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        Regenerate
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Keep this key secure. It provides access to your account.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      value={apiSettings.webhookUrl}
                      onChange={(e) => setApiSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
                      placeholder="https://example.com/webhook"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Rate Limit
                    </label>
                    <select
                      value={apiSettings.rateLimit}
                      onChange={(e) => setApiSettings(prev => ({ ...prev, rateLimit: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="100/hour">100 requests per hour</option>
                      <option value="1000/hour">1000 requests per hour</option>
                      <option value="10000/hour">10000 requests per hour</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                  </div>

                  <button
                    onClick={handleApiSettingsUpdate}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <Key className="h-5 w-5" />
                    <span>{isLoading ? "Updating..." : "Update API Settings"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Appearance Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white mb-4">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button className="p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 transition-colors">
                        <div className="w-full h-8 bg-white border border-slate-200 rounded mb-2"></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Light</span>
                      </button>
                      <button className="p-4 border-2 border-blue-500 rounded-xl">
                        <div className="w-full h-8 bg-slate-900 border border-slate-700 rounded mb-2"></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Dark</span>
                      </button>
                      <button className="p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 transition-colors">
                        <div className="w-full h-8 bg-gradient-to-r from-white to-slate-900 border border-slate-200 rounded mb-2"></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Auto</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white mb-4">Accent Color</h3>
                    <div className="grid grid-cols-6 gap-3">
                      {["blue", "purple", "green", "red", "orange", "pink"].map((color) => (
                        <button
                          key={color}
                          className={`w-12 h-12 rounded-full border-2 ${
                            color === "blue" ? "border-blue-500" : "border-slate-200 dark:border-slate-700"
                          }`}
                          style={{
                            backgroundColor: color === "blue" ? "#3b82f6" : 
                                          color === "purple" ? "#8b5cf6" :
                                          color === "green" ? "#10b981" :
                                          color === "red" ? "#ef4444" :
                                          color === "orange" ? "#f97316" :
                                          "#ec4899"
                          }}
                        ></button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white mb-4">Font Size</h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Small</span>
                      <input
                        type="range"
                        min="12"
                        max="20"
                        defaultValue="16"
                        className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Large</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 