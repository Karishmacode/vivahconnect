import FormInput from "../common/FormInput";
import SelectInput from "../common/SelectInput";

const ProfileForm = ({ form, setForm, onSubmit }) => {
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
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Aarohi Sharma"
        />

        <FormInput
          label="Age"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="26"
        />

        <FormInput
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Delhi"
        />

        <FormInput
          label="Profession"
          name="profession"
          value={form.profession}
          onChange={handleChange}
          placeholder="Product Manager"
        />

        <FormInput
          label="Education"
          name="education"
          value={form.education || ""}
          onChange={handleChange}
          placeholder="MBA"
        />

        <SelectInput
          label="Profile Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["Verified", "Pending", "Rejected"]}
        />

        <SelectInput
          label="Membership"
          name="plan"
          value={form.plan || "Free"}
          onChange={handleChange}
          options={["Free", "Premium"]}
        />

        <SelectInput
          label="Gender"
          name="gender"
          value={form.gender || "Female"}
          onChange={handleChange}
          options={["Female", "Male"]}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          About Profile
        </label>

        <textarea
          name="about"
          value={form.about || ""}
          onChange={handleChange}
          rows={4}
          placeholder="Write short profile description..."
          className="
            w-full rounded-2xl border border-[#D4AF37]/20
            bg-[#132238]/85 px-4 py-3 text-white outline-none
            placeholder:text-white/35 transition-all duration-300
            hover:border-[#D4AF37]/40
            focus:border-[#D4AF37] focus:bg-[#162B45]
            focus:shadow-[0_0_20px_rgba(212,175,55,0.15)]
          "
        />
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/60 p-4">
        <input
          type="checkbox"
          checked={form.featured || false}
          onChange={(e) =>
            setForm({
              ...form,
              featured: e.target.checked,
            })
          }
          className="h-5 w-5 accent-[#D4AF37]"
        />

        <label className="text-white/80">Mark as Featured Profile</label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="
            rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F]
            px-8 py-3.5 font-bold text-[#0B1220]
            transition-all duration-300
            hover:scale-105
            hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]
            active:scale-95
          "
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;