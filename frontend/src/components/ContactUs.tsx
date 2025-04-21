const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100  p-4 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center p-5">
        <h1 className="text-black font-bold text-2xl ">Get in Touch</h1>
        <p className="text-gray-800 font-light text-md">
          Have questions about our products or need technical support? We're here to help
        </p>
      </div>
      <div className="max-w-6xl w-full flex items-center justify-center bg-white shadow-lg rounded-2xl ">
        {/* Left Section */}
        <div className="p-8 md:border-r border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="text-gray-600 mb-6">
            Visit our store or reach out to our technical support team for assistance.
          </p>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">Our Location</h3>
            <p className="text-gray-600">
              456 Tech Plaza, Cyber City, New Delhi, India - 110001
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">Phone Number</h3>
            <p className="text-gray-600">Sales: +91 98765 43210</p>
            <p className="text-gray-600">Support: +91 12345 67890</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">Email Address</h3>
            <p className="text-gray-600">sales@techstore.com</p>
            <p className="text-gray-600">support@techstore.com</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">Working Hours</h3>
            <p className="text-gray-600">Monday - Saturday: 10AM - 9PM</p>
            <p className="text-gray-600">Sunday: 11AM - 7PM</p>
            <p className="text-gray-600">Technical Support: 9AM - 8PM (Mon-Sat)</p>
          </div>

          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select a subject</option>
                <option value="product-inquiry">Product Inquiry</option>
                <option value="technical-support">Technical Support</option>
                <option value="warranty">Warranty Service</option>
                <option value="installation">Installation Service</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your inquiry or technical issue..."
                rows={4}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
