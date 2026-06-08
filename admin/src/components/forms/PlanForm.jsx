import FormInput from "../common/FormInput";
import SelectInput from "../common/SelectInput";

const PlanForm = ({ form, setForm, onSubmit, saving = false }) => {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          label="Plan Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Gold"
          required
        />

        <FormInput
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="799"
          required
        />

        <FormInput
          label="Duration Days"
          name="duration"
          type="number"
          value={form.duration}
          onChange={handleChange}
          placeholder="90"
          required
        />

        <FormInput
          label="Members"
          name="users"
          type="number"
          value={form.users}
          onChange={handleChange}
          placeholder="0"
        />

        <SelectInput
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["Active", "Inactive"]}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          Plan Features
        </label>

        <textarea
          name="features"
          value={form.features || ""}
          onChange={handleChange}
          rows={5}
          required
          placeholder="25 Interests / month, WhatsApp access for 30 days, View full profiles, Basic support"
          className="w-full rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/85 px-4 py-3 text-white outline-none placeholder:text-white/35 transition-all duration-300 hover:border-[#D4AF37]/40 focus:border-[#D4AF37] focus:bg-[#162B45] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] px-8 py-3.5 font-bold text-[#0B1220] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Membership Plan"}
        </button>
      </div>
    </form>
  );
};

export default PlanForm;