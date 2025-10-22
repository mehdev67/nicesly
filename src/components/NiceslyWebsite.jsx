import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Zap, Shield, Clock, Check } from 'lucide-react'

function NiceslyWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Nicesly
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">
                Features
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">
                Pricing
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition">
                About
              </a>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-700 hover:text-blue-600">
                Features
              </a>
              <a href="#pricing" className="block text-gray-700 hover:text-blue-600">
                Pricing
              </a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600">
                About
              </a>
              <Link
                to="/dashboard"
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Nicesly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The fastest, most secure way to manage your workflow. Built with speed, security, and trust at its core.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Get Started Free
            </button>
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Nicesly?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="text-blue-600" size={32} />}
              title="Lightning Fast"
              description="Optimized for speed with cutting-edge technology and best practices."
            />
            <FeatureCard
              icon={<Shield className="text-blue-600" size={32} />}
              title="Secure by Default"
              description="Enterprise-grade security with GDPR compliance built in from day one."
            />
            <FeatureCard
              icon={<Clock className="text-blue-600" size={32} />}
              title="Always Available"
              description="99.9% uptime guarantee with redundant infrastructure and monitoring."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Starter"
              price="Free"
              features={[
                "Up to 3 projects",
                "Basic features",
                "Community support",
                "1GB storage"
              ]}
            />
            <PricingCard
              name="Pro"
              price="$29/mo"
              features={[
                "Unlimited projects",
                "Advanced features",
                "Priority support",
                "50GB storage",
                "Custom domain"
              ]}
              highlighted={true}
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              features={[
                "Everything in Pro",
                "Dedicated support",
                "Custom integrations",
                "Unlimited storage",
                "SLA guarantee"
              ]}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            About Nicesly
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Nicesly is built with modern technology and best practices to ensure speed, security, and reliability.
          </p>
          <p className="text-lg text-gray-600">
            Our mission is to provide the most trustworthy platform for managing your workflow,
            with transparency and user privacy as our core values.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Nicesly</h3>
              <p className="text-gray-400">
                Speed. Security. Trust.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Nicesly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

// Pricing Card Component
function PricingCard({ name, price, features, highlighted = false }) {
  return (
    <div className={`p-8 rounded-xl ${
      highlighted
        ? 'bg-blue-600 text-white shadow-xl scale-105'
        : 'bg-white border-2 border-gray-200'
    }`}>
      <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>
        {name}
      </h3>
      <div className="mb-6">
        <span className={`text-4xl font-bold ${highlighted ? 'text-white' : 'text-gray-900'}`}>
          {price}
        </span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className={`mr-2 flex-shrink-0 ${highlighted ? 'text-white' : 'text-blue-600'}`} size={20} />
            <span className={highlighted ? 'text-white' : 'text-gray-600'}>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-semibold transition ${
        highlighted
          ? 'bg-white text-blue-600 hover:bg-gray-100'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}>
        Get Started
      </button>
    </div>
  )
}

export default NiceslyWebsite
