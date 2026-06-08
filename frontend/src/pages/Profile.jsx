import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  MapPin,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Save,
  ImagePlus,
  Trash2,
  LogOut,
  Eye,
  Crown,
  Heart,
  Inbox,
  Send,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";
import InputField from "../components/forms/InputField";
import SelectField from "../components/forms/SelectField";

const API_URL = "http://localhost:5000/api/profiles/me";
const UPLOAD_URL = "http://localhost:5000/api/upload/profile-photo";

const Profile = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [profileExists, setProfileExists] = useState(false);
  const [profileId, setProfileId] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    gender: "Bride",
    religion: "Hindu",
    community: "",
    city: "",
    state: "",
    age: "",
    height: "",
    maritalStatus: "Never Married",
    education: "",
    profession: "",
    company: "",
    income: "",
    photo: "",
    bio: "",

    fatherOccupation: "",
    motherOccupation: "",
    familyType: "",
    familyValues: "",

    diet: "",
    smoking: "",
    drinking: "",
    languages: "",

    ageFrom: "",
    ageTo: "",
    preferredReligion: "",
    preferredCity: "",
    preferredEducation: "",
    preferredProfession: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const getProfile = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.profile) {
          setProfileExists(true);
          setProfileId(data.profile._id);
          localStorage.setItem("profileId", data.profile._id);

          const profilePhoto = data.profile.photos?.[0]?.url || "";

          setForm({
            fullName: data.profile.fullName || "",
            gender: data.profile.gender || "Bride",
            religion: data.profile.religion || "Hindu",
            community: data.profile.community || "",
            city: data.profile.city || "",
            state: data.profile.state || "",
            age: data.profile.age || "",
            height: data.profile.height || "",
            maritalStatus: data.profile.maritalStatus || "Never Married",
            education: data.profile.education || "",
            profession: data.profile.profession || "",
            company: data.profile.company || "",
            income: data.profile.income || "",
            photo: profilePhoto,
            bio: data.profile.bio || "",

            fatherOccupation:
              data.profile.familyDetails?.fatherOccupation || "",
            motherOccupation:
              data.profile.familyDetails?.motherOccupation || "",
            familyType: data.profile.familyDetails?.familyType || "",
            familyValues: data.profile.familyDetails?.familyValues || "",

            diet: data.profile.lifestyle?.diet || "",
            smoking: data.profile.lifestyle?.smoking || "",
            drinking: data.profile.lifestyle?.drinking || "",
            languages: data.profile.lifestyle?.languages || "",

            ageFrom: data.profile.partnerPreference?.ageFrom || "",
            ageTo: data.profile.partnerPreference?.ageTo || "",
            preferredReligion: data.profile.partnerPreference?.religion || "",
            preferredCity: data.profile.partnerPreference?.city || "",
            preferredEducation: data.profile.partnerPreference?.education || "",
            preferredProfession:
              data.profile.partnerPreference?.profession || "",
          });

          const oldUser = JSON.parse(localStorage.getItem("user")) || {};
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...oldUser,
              fullName: data.profile.fullName || oldUser.fullName,
              name: data.profile.fullName || oldUser.name,
              photo: profilePhoto || oldUser.photo,
              city: data.profile.city || oldUser.city,
              religion: data.profile.religion || oldUser.religion,
              gender: data.profile.gender || oldUser.gender,
            })
          );
        }
      } catch (error) {
        console.log("Get profile error:", error);
      } finally {
        setPageLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  const avatar =
    form.photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      form.fullName || "Vivah User"
    )}&background=132238&color=f4d06f`;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleImageFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const imageData = new FormData();
      imageData.append("photo", file);

      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: imageData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Image upload failed.");
        return;
      }

      setForm((prev) => ({ ...prev, photo: data.url }));
      setSuccess("Photo uploaded successfully.");
    } catch (error) {
      console.log("Upload photo error:", error);
      setError("Photo upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const goNext = () => {
    if (!form.fullName || !form.gender || !form.religion || !form.city) {
      setError("Please fill full name, profile for, religion and city.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("vivahUser");
    localStorage.removeItem("profileId");
    navigate("/login");
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fullName: form.fullName,
        gender: form.gender,
        religion: form.religion,
        community: form.community,
        city: form.city,
        state: form.state,
        age: form.age ? Number(form.age) : "",
        height: form.height,
        maritalStatus: form.maritalStatus,
        education: form.education,
        profession: form.profession,
        company: form.company,
        income: form.income,
        bio: form.bio,

        photos:
          form.photo && form.photo.startsWith("http")
            ? [{ url: form.photo }]
            : [],

        familyDetails: {
          fatherOccupation: form.fatherOccupation,
          motherOccupation: form.motherOccupation,
          familyType: form.familyType,
          familyValues: form.familyValues,
        },

        lifestyle: {
          diet: form.diet,
          smoking: form.smoking,
          drinking: form.drinking,
          languages: form.languages,
        },

        partnerPreference: {
          ageFrom: form.ageFrom ? Number(form.ageFrom) : "",
          ageTo: form.ageTo ? Number(form.ageTo) : "",
          religion: form.preferredReligion,
          city: form.preferredCity,
          education: form.preferredEducation,
          profession: form.preferredProfession,
        },
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Profile save failed.");
        return;
      }

      setProfileExists(true);

      if (data.profile?._id) {
        setProfileId(data.profile._id);
        localStorage.setItem("profileId", data.profile._id);
      }

      const oldUser = JSON.parse(localStorage.getItem("user")) || {};
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...oldUser,
          fullName: form.fullName,
          name: form.fullName,
          photo: form.photo,
          city: form.city,
          religion: form.religion,
          gender: form.gender,
        })
      );

      setSuccess(
        profileExists
          ? "Profile updated successfully."
          : "Profile created successfully."
      );

      setTimeout(() => {
        navigate(`/profile/${data.profile._id}`);
      }, 900);
    } catch (error) {
      console.log("Save profile error:", error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Profile delete failed.");
        return;
      }

      localStorage.removeItem("profileId");

      setProfileExists(false);
      setProfileId("");
      setSuccess("Profile deleted successfully.");

      setTimeout(() => {
        navigate("/");
      }, 900);
    } catch (error) {
      console.log("Delete profile error:", error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <PageLayout>
        <main className="mx-auto max-w-[1100px] px-6 py-12">
          <div className="rounded-[34px] border border-[#d4af37]/25 bg-[#0b1425]/90 p-10 text-center shadow-2xl shadow-black/30">
            <p className="text-lg font-black text-white">
              Loading your profile...
            </p>
          </div>
        </main>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1100px] px-6 py-12">
        <div className="mb-8 rounded-[34px] border border-[#d4af37]/25 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-6 shadow-2xl shadow-black/30">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <img
              src={avatar}
              alt={form.fullName || "User"}
              className="h-28 w-28 rounded-full border-4 border-[#d4af37]/40 object-cover shadow-xl shadow-black/30"
            />

            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-[3px] text-[#d4af37]">
                My Account
              </p>

              <h2 className="mt-2 font-serif text-4xl font-black text-white">
                {form.fullName || "Complete Your Profile"}
              </h2>

              <p className="mt-2 text-sm font-semibold text-white/60">
                {form.city || "City not added"} •{" "}
                {form.religion || "Religion not added"} •{" "}
                {form.gender || "Profile"}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-300">
                  {profileExists ? "Profile Active" : "Profile Not Created"}
                </span>

                <span className="flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-xs font-black text-[#f4d06f]">
                  <Crown size={14} />
                  Free Member
                </span>
              </div>
            </div>

            <div className="grid w-full gap-3 md:w-auto">
              {profileExists && profileId && (
                <button
                  type="button"
                  onClick={() => navigate(`/profile/${profileId}`)}
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#d4af37]/35 px-5 text-sm font-black text-[#f4d06f] transition hover:bg-[#d4af37]/10"
                >
                  <Eye size={17} />
                  View Profile
                </button>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-400/25 bg-red-500/10 px-5 text-sm font-black text-red-300 transition hover:bg-red-500/20"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <button
              type="button"
              onClick={() => navigate("/sent-interests")}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10"
            >
              <Send className="text-[#f4d06f]" size={22} />
              <p className="mt-3 text-sm font-black text-white">
                Sent Interests
              </p>
              <p className="mt-1 text-xs font-semibold text-white/45">
                View requests you sent
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate("/received-interests")}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10"
            >
              <Inbox className="text-[#f4d06f]" size={22} />
              <p className="mt-3 text-sm font-black text-white">
                Received Interests
              </p>
              <p className="mt-1 text-xs font-semibold text-white/45">
                Accept or reject requests
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate("/matches")}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10"
            >
              <Heart className="text-[#f4d06f]" size={22} />
              <p className="mt-3 text-sm font-black text-white">Find Matches</p>
              <p className="mt-1 text-xs font-semibold text-white/45">
                Browse verified profiles
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate("/membership")}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10"
            >
              <Crown className="text-[#f4d06f]" size={22} />
              <p className="mt-3 text-sm font-black text-white">Membership</p>
              <p className="mt-1 text-xs font-semibold text-white/45">
                Upgrade your account
              </p>
            </button>
          </div>
        </div>

        <section className="rounded-[34px] border border-[#d4af37]/25 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-8 shadow-2xl shadow-black/30">
          <div className="mb-8 text-center">
            <p className="text-xs font-black uppercase tracking-[3px] text-[#d4af37]">
              VivahConnect Profile
            </p>

            <h1 className="mt-2 font-serif text-5xl font-black text-white">
              {step === 1 ? "Basic Profile" : "More Details"}
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/55">
              {step === 1
                ? "Add your basic matrimony details and profile photo."
                : "Add family, lifestyle and partner preference details."}
            </p>

            <div className="mx-auto mt-6 flex max-w-md gap-3">
              <div
                className={`h-2 flex-1 rounded-full ${
                  step >= 1 ? "bg-[#d4af37]" : "bg-white/10"
                }`}
              />
              <div
                className={`h-2 flex-1 rounded-full ${
                  step >= 2 ? "bg-[#d4af37]" : "bg-white/10"
                }`}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            {step === 1 && (
              <>
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />

                <SelectField
                  label="Profile For"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  options={["Bride", "Groom"]}
                  required
                />

                <SelectField
                  label="Religion"
                  name="religion"
                  value={form.religion}
                  onChange={handleChange}
                  options={["Hindu", "Muslim", "Sikh", "Christian", "Jain"]}
                  required
                />

                <InputField
                  label="Community"
                  name="community"
                  value={form.community}
                  onChange={handleChange}
                  placeholder="Brahmin, Rajput, Yadav"
                />

                <InputField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />

                <InputField
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Karnataka"
                />

                <InputField
                  label="Age"
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                />

                <InputField
                  label="Height"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  placeholder="5'8"
                />

                <SelectField
                  label="Marital Status"
                  name="maritalStatus"
                  value={form.maritalStatus}
                  onChange={handleChange}
                  options={["Never Married", "Divorced", "Widowed"]}
                />

                <InputField
                  label="Education"
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  placeholder="MBA, B.Tech, BCA"
                />

                <InputField
                  label="Profession"
                  name="profession"
                  value={form.profession}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                />

                <InputField
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Google, TCS, Infosys"
                />

                <InputField
                  label="Income"
                  name="income"
                  value={form.income}
                  onChange={handleChange}
                  placeholder="8-10 LPA"
                />

                <div className="md:col-span-2">
                  <InputField
                    label="Profile Photo URL"
                    name="photo"
                    value={form.photo}
                    onChange={handleChange}
                    placeholder="Uploaded photo URL will appear here"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[1px] text-white/75">
                    <ImagePlus size={15} className="text-[#f4d06f]" />
                    Upload Photo From Computer
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    disabled={uploading}
                    className="w-full rounded-2xl border border-[#d4af37]/15 bg-[#0b1425] p-4 text-sm font-semibold text-white file:mr-4 file:rounded-xl file:border-0 file:bg-[#d4af37] file:px-4 file:py-2 file:font-black file:text-[#050914] disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  {uploading && (
                    <p className="mt-3 text-sm font-black text-[#f4d06f]">
                      Uploading photo...
                    </p>
                  )}

                  {form.photo && (
                    <div className="mt-5 overflow-hidden rounded-3xl border border-[#d4af37]/20 bg-white/[0.03] p-4">
                      <img
                        src={form.photo}
                        alt="Profile preview"
                        className="mx-auto h-72 w-full max-w-sm rounded-2xl object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[1px] text-white/75">
                    <User size={15} className="text-[#f4d06f]" />
                    About Me
                  </label>

                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Write something about yourself..."
                    rows={5}
                    className="w-full rounded-2xl border border-[#d4af37]/15 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-5 text-sm font-semibold text-white shadow-lg shadow-black/20 outline-none transition placeholder:text-white/30 focus:border-[#f4d06f] focus:ring-2 focus:ring-[#d4af37]/20"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <InputField
                  label="Father Occupation"
                  name="fatherOccupation"
                  value={form.fatherOccupation}
                  onChange={handleChange}
                  placeholder="Business / Service Professional"
                />

                <InputField
                  label="Mother Occupation"
                  name="motherOccupation"
                  value={form.motherOccupation}
                  onChange={handleChange}
                  placeholder="Homemaker"
                />

                <InputField
                  label="Family Type"
                  name="familyType"
                  value={form.familyType}
                  onChange={handleChange}
                  placeholder="Nuclear Family"
                />

                <InputField
                  label="Family Values"
                  name="familyValues"
                  value={form.familyValues}
                  onChange={handleChange}
                  placeholder="Traditional with Modern Outlook"
                />

                <SelectField
                  label="Diet"
                  name="diet"
                  value={form.diet}
                  onChange={handleChange}
                  options={["", "Vegetarian", "Non-Vegetarian", "Eggetarian"]}
                />

                <SelectField
                  label="Smoking"
                  name="smoking"
                  value={form.smoking}
                  onChange={handleChange}
                  options={["", "No", "Occasionally", "Yes"]}
                />

                <SelectField
                  label="Drinking"
                  name="drinking"
                  value={form.drinking}
                  onChange={handleChange}
                  options={["", "No", "Occasionally", "Yes"]}
                />

                <InputField
                  label="Languages"
                  name="languages"
                  value={form.languages}
                  onChange={handleChange}
                  placeholder="Hindi, English"
                />

                <InputField
                  label="Preferred Age From"
                  type="number"
                  name="ageFrom"
                  value={form.ageFrom}
                  onChange={handleChange}
                  placeholder="23"
                />

                <InputField
                  label="Preferred Age To"
                  type="number"
                  name="ageTo"
                  value={form.ageTo}
                  onChange={handleChange}
                  placeholder="32"
                />

                <SelectField
                  label="Preferred Religion"
                  name="preferredReligion"
                  value={form.preferredReligion}
                  onChange={handleChange}
                  options={["", "Hindu", "Muslim", "Sikh", "Christian", "Jain"]}
                />

                <InputField
                  label="Preferred City"
                  name="preferredCity"
                  value={form.preferredCity}
                  onChange={handleChange}
                  placeholder="Anywhere in India"
                />

                <InputField
                  label="Preferred Education"
                  name="preferredEducation"
                  value={form.preferredEducation}
                  onChange={handleChange}
                  placeholder="Graduate or Above"
                />

                <InputField
                  label="Preferred Profession"
                  name="preferredProfession"
                  value={form.preferredProfession}
                  onChange={handleChange}
                  placeholder="Engineer, Manager, Business"
                />
              </>
            )}

            {error && (
              <p className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm font-black text-red-300 md:col-span-2">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm font-black text-emerald-300 md:col-span-2">
                {success}
              </p>
            )}

            <div className="flex gap-4 md:col-span-2">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-14 flex-1 rounded-2xl border border-[#d4af37]/30 text-sm font-black text-[#f4d06f]"
                >
                  Back
                </button>
              )}

              {step === 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={uploading}
                  className="h-14 flex-1 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#f4d06f] font-black text-[#050914] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Continue
                </button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading || uploading}
                  className="flex-1"
                >
                  <Save size={18} />
                  {loading
                    ? "Saving Profile..."
                    : profileExists
                    ? "Update Profile"
                    : "Create Profile"}
                </Button>
              )}
            </div>

            {profileExists && (
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-red-400/25 bg-red-500/10 text-sm font-black text-red-300 transition hover:bg-red-500/20"
                >
                  <Trash2 size={18} />
                  Delete My Profile
                </button>
              </div>
            )}

            <div className="grid gap-4 md:col-span-2 md:grid-cols-4">
              {[
                { icon: ShieldCheck, title: "Private" },
                { icon: MapPin, title: "Location" },
                { icon: GraduationCap, title: "Education" },
                { icon: Briefcase, title: "Career" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center"
                >
                  <item.icon className="mx-auto text-[#f4d06f]" size={22} />
                  <p className="mt-2 text-xs font-black uppercase tracking-[1px] text-white/60">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </form>
        </section>
      </main>
    </PageLayout>
  );
};

export default Profile;