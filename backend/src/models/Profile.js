import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Bride", "Groom"],
      required: true,
    },

    religion: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    age: Number,
    height: String,
    education: String,
    profession: String,
    company: String,
    income: String,
    community: String,
    state: String,

    maritalStatus: {
      type: String,
      enum: ["Never Married", "Divorced", "Widowed"],
      default: "Never Married",
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    photos: [
      {
        url: String,
        publicId: String,
      },
    ],

    familyDetails: {
      fatherOccupation: String,
      motherOccupation: String,
      familyType: String,
      familyValues: String,
    },

    lifestyle: {
      diet: String,
      smoking: String,
      drinking: String,
      languages: String,
    },

    partnerPreference: {
      ageFrom: Number,
      ageTo: Number,
      religion: String,
      city: String,
      education: String,
      profession: String,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    views: {
      type: Number,
      default: 0,
    },

    interestsCount: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    profileStrength: {
      type: Number,
      default: 92,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;