const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, UPI, and digital wallets. For business customers, we also offer invoice-based payment options.",
  },
  {
    question: "What's your return policy?",
    answer:
      "We offer a 7-day return policy for most products. Items must be unused, in original packaging, and accompanied by the purchase receipt. Some products may have different return terms.",
  },
  {
    question: "Do you offer warranty on products?",
    answer:
      "Yes, all our products come with manufacturer warranty. Additionally, we offer extended warranty options for most products. Warranty terms vary by product category.",
  },
  {
    question: "Do you provide technical support?",
    answer:
      "Yes, we offer free technical support for all products purchased from our store. Our support team is available via phone, email, and chat during business hours.",
  },
  {
    question: "Can I check product availability before visiting?",
    answer:
      "Yes, our website shows real-time inventory status. You can also call our store directly to check product availability and reserve items.",
  },
  {
    question: "Do you offer installation services?",
    answer:
      "Yes, we provide professional installation services for various products like security systems, networking equipment, and smart home devices. Installation charges vary by product.",
  },
];

export default function Faq() {
  return (
    <section className="py-12 px-6 text-center">
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <p className="text-gray-500">
        Find answers to common questions about our products and services
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-4 bg-white text-left"
          >
            <h3 className="font-semibold text-lg">❓ {faq.question}</h3>
            <p className="text-gray-500 text-sm mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold">Still have questions?</h3>
        <p className="text-gray-500">
          Our technical support team is here to help
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full">
            📞 Contact Support
          </button>
          <button className="px-6 py-2 bg-gray-300 text-black rounded-full">
            📧 Email Us
          </button>
        </div>
      </div>
    </section>
  );
}
