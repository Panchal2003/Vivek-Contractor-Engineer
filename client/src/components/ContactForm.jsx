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
      className={`rounded-3xl border border-white/15 bg-slate-900/80 p-6 backdrop-blur-md sm:p-8 ${className}`}
    >
      <h3 className="text-2xl font-extrabold text-white">Send Project Inquiry</h3>
      <p className="mt-2 text-sm text-slate-300">
        Fill in the details and our engineering team will contact you with the next steps.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none ring-cyan-300/40 transition focus:ring"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none ring-cyan-300/40 transition focus:ring"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">
            Work Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none ring-cyan-300/40 transition focus:ring"
          />
        </div>

        <div>
          <label htmlFor="serviceType" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">
            Service Type
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none ring-cyan-300/40 transition focus:ring"
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
          <label htmlFor="location" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">
            Project Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none ring-cyan-300/40 transition focus:ring"
          />
        </div>

        <div>
          <label htmlFor="budget" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">
            Estimated Budget
          </label>
          <input
            id="budget"
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. 25L - 40L"
            className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none ring-cyan-300/40 transition focus:ring"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100">
          Project Brief
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none ring-cyan-300/40 transition focus:ring"
          placeholder="Share project scope, timeline, and special requirements."
        />
      </div>

      {status === "success" && (
        <p className="mt-4 rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          Inquiry submitted successfully. Our team will contact you shortly.
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
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
