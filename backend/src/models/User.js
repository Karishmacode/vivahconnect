import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    plan: {
      type: String,
      enum: ["Free", "Silver", "Gold", "Platinum"],
      default: "Free",
    },

    membership: {
      type: String,
      enum: ["Free", "Silver", "Gold", "Platinum"],
      default: "Free",
    },

    membershipPlan: {
      type: String,
      enum: ["Free", "Silver", "Gold", "Platinum"],
      default: "Free",
    },

    membershipStatus: {
      type: String,
      enum: ["Active", "Inactive", "Expired"],
      default: "Active",
    },

    membershipStartDate: {
      type: Date,
      default: Date.now,
    },

    membershipEndDate: {
      type: Date,
      default: null,
    },

    premiumBadge: {
      type: Boolean,
      default: false,
    },

    interestLimit: {
      type: Number,
      default: 3,
    },

    interestsSentThisMonth: {
      type: Number,
      default: 0,
    },

    interestMonth: {
      type: Number,
      default: new Date().getMonth() + 1,
    },

    interestYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;