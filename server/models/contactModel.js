const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    contacts: [
      {
        name: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: Number,
          required: true,
        },
        email: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
