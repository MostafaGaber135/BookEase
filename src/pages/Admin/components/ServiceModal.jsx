import React, { useEffect, useMemo, useState } from "react";
import api from "../../../api/axios";

const categories = ["Medical", "Dental", "Fitness", "Wellness", "Spa", "General"];

export default function ServiceModal({ open, onClose, initial, onSaved }) {
  const isEdit = !!initial?._id;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("General");
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");  

  useEffect(() => {
    if (!open) return;

    setError("");
    setBusy(false);

    setName(initial?.name || "");
    setCategory(initial?.category || "General");
    setDuration(Number(initial?.durationMinutes ?? initial?.duration ?? 30));
    setPrice(Number(initial?.price ?? 0));
    setDescription(initial?.description || "");
    setIsActive(initial?.isActive ?? true);
  }, [open, initial]);

  const canSave = useMemo(() => {
    if (!name.trim()) return false;
    if (!Number.isFinite(Number(duration)) || Number(duration) <= 0) return false;
    if (!Number.isFinite(Number(price)) || Number(price) < 0) return false;
    return true;
  }, [name, duration, price]);

  const save = async () => {
    if (!canSave) return;
    setBusy(true);
    setError("");  

    const payload = {
      name: name.trim(),
      category: category === "General" ? "General" : category,
      durationMinutes: Number(duration),
      price: Number(price),
      description: description.trim(),
      isActive: !!isActive,
    };

    try {
      if (isEdit) {
        await api.put(`/services/${initial._id}`, payload);
      } else {
        await api.post(`/services`, payload);
      }
      await onSaved();
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Failed to save service";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-gray-100 shadow-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {isEdit ? "Edit Service" : "Add Service"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isEdit ? "Update service details." : "Create a new service."}
            </p>
          </div>
          <button
            type="button"
            className="w-10 h-10 rounded-xl hover:bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
            {error}
          </div>
        ) : null}

        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Service name</label>
            <input
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#2ec2b3]/30"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. General Consultation"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#2ec2b3]/30 bg-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (min)</label>
              <input
                type="number"
                min={1}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#2ec2b3]/30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                min={0}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#2ec2b3]/30"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#2ec2b3]/30 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium text-gray-700">Active</div>
              <div className="text-gray-500">Hide inactive services from booking flow.</div>
            </div>

            <button
              type="button"
              onClick={() => setIsActive((v) => !v)}
              className={[
                "w-14 h-8 rounded-full border transition relative",
                isActive ? "bg-[#2ec2b3] border-[#2ec2b3]" : "bg-gray-100 border-gray-200",
              ].join(" ")}
              aria-label="Toggle active"
            >
              <span
                className={[
                  "absolute top-1 w-6 h-6 rounded-full bg-white shadow transition",
                  isActive ? "left-7" : "left-1",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl px-5 py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!canSave || busy}
            className="rounded-2xl px-5 py-3 bg-[#2ec2b3] text-white font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
