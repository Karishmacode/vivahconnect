import FormInput from "../common/FormInput";
import SelectInput from "../common/SelectInput";

const UserForm = ({ form, setForm, onSubmit }) => {
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
          placeholder="Rohan Mehta"
        />

        <FormInput
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="rohan@gmail.com"
        />

        <FormInput
          label="Mobile Number"
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          placeholder="+91 9876543210"
        />

        <FormInput
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Mumbai"
        />

        <FormInput
          label="Age"
          name="age"
          value={form.age || ""}
          onChange={handleChange}
          placeholder="29"
        />

        <SelectInput
          label="Gender"
          name="gender"
          value={form.gender || "Male"}
          onChange={handleChange}
          options={["Male", "Female"]}
        />

        <SelectInput
          label="Membership Plan"
          name="plan"
          value={form.plan}
          onChange={handleChange}
          options={["Free", "Silver", "Gold", "Platinum"]}
        />

        <SelectInput
          label="Account Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["Active", "Pending", "Blocked", "Rejected"]}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/80">
          Notes
        </label>

        <textarea
          name="notes"
          value={form.notes || ""}
          onChange={handleChange}
          rows={4}
          placeholder="Admin notes about this user..."
          className="
            w-full
            rounded-2xl
            border
            border-[#D4AF37]/20
            bg-[#132238]/85
            px-4
            py-3
            text-white
            outline-none
            placeholder:text-white/35

            transition-all
            duration-300

            hover:border-[#D4AF37]/40
            focus:border-[#D4AF37]
            focus:bg-[#162B45]
            focus:shadow-[0_0_20px_rgba(212,175,55,0.15)]
          "
        />
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/60 p-4">
        <input
          type="checkbox"
          checked={form.verified || false}
          onChange={(e) =>
            setForm({
              ...form,
              verified: e.target.checked,
            })
          }
          className="h-5 w-5 accent-[#D4AF37]"
        />

        <label className="text-white/80">Verified User</label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="
            rounded-2xl
            bg-gradient-to-r
            from-[#D4AF37]
            to-[#F4D06F]
            px-8
            py-3.5
            font-bold
            text-[#0B1220]

            transition-all
            duration-300

            hover:scale-105
            hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]

            active:scale-95
          "
        >
          Save User
        </button>
      </div>
    </form>
  );
};

export default UserForm;