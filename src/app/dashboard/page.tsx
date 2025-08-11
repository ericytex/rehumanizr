"use client";
import { useState } from "react";
import { Sparkles, BarChart3, Clock, FileText, Settings, LogOut, Plus, TrendingUp, Zap, Shield, Brain } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data - in real app, this would come from API
  const userStats = {
    name: "John Doe",
    email: "john@example.com",
    subscription: "Basic",
    dailyUsage: 12,
    monthlyUsage: 156,
    dailyLimit: 50,
    monthlyLimit: 1500,
    lastActivity: "2 hours ago"
  };
  
  const recentActivity = [
    { id: 1, action: "Text humanized", timestamp: "2 hours ago", status: "completed" },
    { id: 2, action: "Document processed", timestamp: "1 day ago", status: "completed" },
    { id: 3, action: "API key generated", timestamp: "3 days ago", status: "completed" },
    { id: 4, action: "Subscription renewed", timestamp: "1 week ago", status: "completed" }
  ];
  
  const quickActions = [
    { id: 1, title: "Humanize Text", description: "Process new content", icon: Brain, href: "/humanize", color: "blue" },
    { id: 2, title: "View Analytics", description: "Check usage stats", icon: BarChart3, href: "/analytics", color: "green" },
    { id: 3, title: "Manage API", description: "Configure API settings", icon: Settings, href: "/settings", color: "purple" },
    { id: 4, title: "Upgrade Plan", description: "Get more features", icon: TrendingUp, href: "/subscription", color: "orange" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <Navigation currentPage="dashboard" showUserMenu={true} userName={userStats.name} userEmail={userStats.email} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, {userStats.name}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Here&apos;s what&apos;s happening with your ReHumanizer account
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Daily Usage</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {userStats.dailyUsage}/{userStats.dailyLimit}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userStats.dailyUsage / userStats.dailyLimit) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Monthly Usage</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {userStats.monthlyUsage}/{userStats.monthlyLimit}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userStats.monthlyUsage / userStats.monthlyLimit) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Current Plan</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{userStats.subscription}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {userStats.dailyLimit} requests/day
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Last Activity</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {userStats.lastActivity}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Active user
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              const colorClasses = {
                blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600",
                green: "bg-green-100 dark:bg-green-900/20 text-green-600",
                purple: "bg-purple-100 dark:bg-purple-900/20 text-purple-600",
                orange: "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
              };
              
              return (
                <a
                  key={action.id}
                  href={action.href}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 hover:shadow-md"
                >
                  <div className={`w-10 h-10 ${colorClasses[action.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mb-3`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-1">{action.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{action.description}</p>
                </a>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{activity.timestamp}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade CTA */}
        {userStats.subscription !== 'Enterprise' && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Ready to unlock more power?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Upgrade your plan to get higher usage limits, advanced features, and priority support.
            </p>
            <a
              href="/subscription"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="h-5 w-5 mr-2" />
              Upgrade Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 