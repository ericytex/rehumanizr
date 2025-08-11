"use client";
import { useState } from "react";
import { Sparkles, Check, Crown, Zap, Shield, Brain, ArrowLeft, Star, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started",
      features: [
        "5 humanizations per day",
        "Basic AI pipelines",
        "Standard support",
        "Community access"
      ],
      popular: false,
      icon: Shield
    },
    {
      id: "basic",
      name: "Basic",
      price: { monthly: 19, yearly: 190 },
      description: "Great for individual users",
      features: [
        "50 humanizations per day",
        "All AI pipelines",
        "Priority support",
        "Advanced settings",
        "Usage analytics"
      ],
      popular: false,
      icon: Zap
    },
    {
      id: "premium",
      name: "Premium",
      price: { monthly: 49, yearly: 490 },
      description: "Perfect for professionals",
      features: [
        "200 humanizations per day",
        "All AI pipelines",
        "Priority support",
        "Advanced settings",
        "Usage analytics",
        "Custom education levels",
        "API access",
        "Bulk processing"
      ],
      popular: true,
      icon: Crown
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { monthly: 199, yearly: 1990 },
      description: "For teams and businesses",
      features: [
        "1000 humanizations per day",
        "All AI pipelines",
        "24/7 priority support",
        "Advanced settings",
        "Usage analytics",
        "Custom education levels",
        "API access",
        "Bulk processing",
        "Team management",
        "Custom integrations",
        "Dedicated account manager"
      ],
      popular: false,
      icon: Brain
    }
  ];

  const currentPlan = "basic"; // This would come from user context
  const isYearly = billingCycle === "yearly";

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleUpgrade = async () => {
    // Simulate upgrade process
    console.log(`Upgrading to ${selectedPlan} plan with ${billingCycle} billing`);
    // In real app, this would make an API call
  };

  const getCurrentPlan = () => plans.find(plan => plan.id === currentPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navigation currentPage="subscription" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Select the perfect plan for your AI text humanization needs. 
            All plans include our advanced AI detection evasion technology.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-1 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  billingCycle === "monthly"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  billingCycle === "yearly"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isCurrentPlan = plan.id === currentPlan;
            const isSelected = plan.id === selectedPlan;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-blue-500 shadow-xl transform scale-105"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                } ${isCurrentPlan ? "ring-2 ring-blue-200 dark:ring-blue-800" : ""}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Current
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.id === "free" ? "bg-slate-100 dark:bg-slate-700" :
                      plan.id === "basic" ? "bg-blue-100 dark:bg-blue-900" :
                      plan.id === "premium" ? "bg-purple-100 dark:bg-purple-900" :
                      "bg-indigo-100 dark:bg-indigo-900"
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        plan.id === "free" ? "text-slate-600 dark:text-slate-400" :
                        plan.id === "basic" ? "text-blue-600 dark:text-blue-400" :
                        plan.id === "premium" ? "text-purple-600 dark:text-purple-400" :
                        "text-indigo-600 dark:text-indigo-400"
                      }`} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    {plan.price.monthly === 0 ? (
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">Free</span>
                    ) : (
                      <div>
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">
                          ${isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">
                          /{isYearly ? "year" : "month"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    isCurrentPlan
                      ? "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? "Current Plan" : "Select Plan"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Plan Summary */}
        {selectedPlan !== "free" && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Ready to upgrade to {plans.find(p => p.id === selectedPlan)?.name}?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                You&apos;ll get access to all the features listed above, with {billingCycle} billing at 
                ${isYearly ? plans.find(p => p.id === selectedPlan)?.price.yearly : plans.find(p => p.id === selectedPlan)?.price.monthly} per {isYearly ? "year" : "month"}.
              </p>
              <button
                onClick={handleUpgrade}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Can I change my plan anytime?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                What happens if I exceed my daily limit?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                You&apos;ll receive a notification and can either wait until the next day or upgrade your plan for higher limits.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Is there a free trial?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Yes! Start with our free plan to experience the quality of our AI humanization technology.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Can I cancel anytime?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Absolutely. Cancel your subscription at any time with no questions asked or hidden fees.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 