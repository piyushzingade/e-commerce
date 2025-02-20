const faqs = [
  {
    question: "What documents do I need to rent a car?",
    answer:
      "You'll need a valid driving license, government ID proof, and a credit card for security deposit. For international customers, an international driving permit is required.",
  },
  {
    question: "Is fuel included in the rental price?",
    answer:
      "Our rentals come with a full tank of fuel, and we expect the car to be returned with a full tank. Fuel costs during the trip are borne by the customer.",
  },
  {
    question: "What's included in the tour packages?",
    answer:
      "Our tour packages include car rental, accommodation, guided tours, meals as specified, and 24/7 customer support. Additional activities can be added at extra cost.",
  },
  {
    question: "What's the cancellation policy?",
    answer:
      "Free cancellation up to 24 hours before pickup. Cancellations within 24 hours may incur charges. Tour package cancellations follow specific terms provided at booking.",
  },
  {
    question: "Is insurance included?",
    answer:
      "Basic insurance is included in all rentals. Additional comprehensive coverage options are available at extra cost for complete peace of mind.",
  },
  {
    question: "Can I modify my booking?",
    answer:
      "Yes, bookings can be modified up to 48 hours before the start date, subject to availability. Additional charges may apply based on the changes.",
  },
];

export default function Faq() {
  return (
    <section className="py-12 px-6 text-center">
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <p className="text-gray-500">
        Find answers to common questions about our car rental and tour packages
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
          Our customer support team is here to help
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
