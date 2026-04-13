import { Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  serviceType: "",
  location: "",
  budget: "",
  message: "",
};

const FALLBACK_OPTIONS = [
  "Sewer Line Maintenance",
  "Fire Line Installation",
  "Heavy Drilling",
  "Water Treatment",
  "Government Tender",
];

export default function ContactForm({ onSubmit, className = "", serviceOptions = [] }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const options = useMemo(() => {
    if (serviceOptions.length > 0) {
      return serviceOptions;
    }
    return FALLBACK_OPTIONS;
  }, [serviceOptions]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));
      }
      setStatus("success");
      setFormData(INITIAL_FORM);
    } catch (error) {
      setStatus("error");
      const apiMessage = error?.response?.data?.message;
      setErrorMsg(apiMessage || error?.message || "Unable to submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-slate-200/50 bg-white p-5 shadow-lg sm:p-6 ${className}`}
    >
      <h3 className="text-lg font-bold text-slate-900">Send Project Inquiry</h3>
      <p className="mt-1 text-sm text-slate-500">
        Fill in the details and our engineering team will contact you with the next steps.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200/50 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200/50 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
            Work Email *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200/50 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div>
          <label htmlFor="serviceType" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
            Service Type *
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200/50 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          >
            <option value="">Select service</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
            Project Location *
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200/50 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div>
          <label htmlFor="budget" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
            Estimated Budget
          </label>
          <input
            id="budget"
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. 25L - 40L"
            className="w-full rounded-lg border border-slate-200/50 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
          Project Brief *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="3"
          className="w-full rounded-lg border border-slate-200/50 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          placeholder="Share project scope, timeline, and special requirements."
        />
      </div>

      {status === "success" && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-sm font-medium text-green-700">Inquiry submitted successfully. Our team will contact you shortly.</p>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-bold text-white transition hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit Inquiry
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}