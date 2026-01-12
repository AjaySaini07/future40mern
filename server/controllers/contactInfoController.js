const contactInfoModel = require("../models/contactInfoModel");

// 🟢 PUBLIC – Get Contact Info
exports.getContactInfo = async (req, res) => {
  try {
    let info = await contactInfoModel.findOne();

    if (!info) {
      info = await contactInfoModel.create({});
    }

    return res.status(200).json({
      success: true,
      message: "Contact information fetched successfully",
      info,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact information",
      error: err.message,
    });
  }
};

// 🔒 ADMIN – Add Email
exports.addEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const info = await contactInfoModel.findOne();

    // 🔒 Max limit check
    if (info.emails.length >= 2) {
      return res.status(400).json({
        success: false,
        message: "Maximum 2 email addresses allowed",
      });
    }

    // 🔒 Duplicate check
    if (info.emails.includes(email)) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    info.emails.push(email);
    await info.save();

    return res.status(200).json({
      success: true,
      message: "Email added successfully",
      info,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add email",
      error: err.message,
    });
  }
};

// 🔒 ADMIN – Delete Email
// exports.deleteEmail = async (req, res) => {
//   try {
//     const { email } = req.params;

//     const info = await contactInfoModel.findOne();

//     info.emails = info.emails.filter((e) => e !== email);
//     await info.save();

//     return res.status(200).json({
//       success: true,
//       message: "Email deleted successfully",
//       info,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete email",
//       error: err.message,
//     });
//   }
// };

// 🔒 ADMIN – Add Phone
exports.addPhone = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const info = await contactInfoModel.findOne();

    // 🔒 Max limit check
    if (info.phones.length >= 2) {
      return res.status(400).json({
        success: false,
        message: "Maximum 2 phone numbers allowed",
      });
    }

    // 🔒 Duplicate check
    if (info.phones.includes(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists",
      });
    }

    info.phones.push(phone);
    await info.save();

    return res.status(200).json({
      success: true,
      message: "Phone number added successfully",
      info,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add phone number",
      error: err.message,
    });
  }
};

// 🔒 ADMIN – Delete Phone
// exports.deletePhone = async (req, res) => {
//   try {
//     const { phone } = req.params;

//     const info = await contactInfoModel.findOne();

//     info.phones = info.phones.filter((p) => p !== phone);
//     await info.save();

//     return res.status(200).json({
//       success: true,
//       message: "Phone number deleted successfully",
//       info,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete phone number",
//       error: err.message,
//     });
//   }
// };

// 🔒 ADMIN – Delete Contact Info
exports.deleteContactValue = async (req, res) => {
  try {
    const { email, phone } = req.query;

    const info = await contactInfoModel.findOne();

    if (email) {
      info.emails = info.emails.filter((e) => e !== email);
      await info.save();

      return res.json({
        success: true,
        message: "Email deleted successfully",
        info,
      });
    }

    if (phone) {
      info.phones = info.phones.filter((p) => p !== phone);
      await info.save();

      return res.json({
        success: true,
        message: "Phone deleted successfully",
        info,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Email or phone is required",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete contact value",
      error: err.message,
    });
  }
};

// 🔒 ADMIN – Set / Replace Address
exports.setAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    const info = await contactInfoModel.findOne();
    info.address = address;
    await info.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      info,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update address",
      error: err.message,
    });
  }
};
