"use client";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders arrive within 3–5 business days, depending on your location. You'll get a confirmation call before dispatch so you know exactly when to expect it.",
  },
  {
    question: "What's your return policy?",
    answer:
      "If a book arrives damaged or isn't what you ordered, you can request a return within 7 days of delivery. Books must be unused and in their original condition.",
  },
  {
    question: "Do you only support Cash on Delivery? Why?",
    answer:
      "Yes, for now — Cash on Delivery is our only payment method while we build out a secure online payment system. It lets you check your order before paying, with zero risk on your end.",
  },
  {
    question: "How can I get offers from you?",
    answer:
      "Follow us on Instagram or check the Best Sellers page regularly — we drop seasonal discounts, early access to new arrivals, and bundle offers there first.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-white/10">
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 py-5 text-left"
    >
      <span className="font-[var(--font-display)] text-base font-medium text-[var(--color-text)] sm:text-lg">
        {question}
      </span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 text-[var(--color-text)]/70"
      >
        <CaretDown size={20} />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pb-5 pr-8 text-sm leading-relaxed text-[var(--color-text)]/70 sm:text-base">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative w-full bg-[var(--color-bg)] py-16">
      <h2 className="mb-10 text-center font-[var(--font-display)] text-2xl font-semibold uppercase tracking-wide text-[var(--color-text)] sm:text-3xl">
        Frequently Asked Questions
      </h2>

      <div className="mx-auto max-w-2xl px-4">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;