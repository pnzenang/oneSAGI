import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Member from "../models/MemberModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
export const getRegistrationStats = async (req, res) => {
  const users = await User.countDocuments();
  const vestedMembers = await Member.countDocuments({ memberStatus: "vested" });
  const pendingMembers = await Member.countDocuments({
    memberStatus: "pending",
  });
  res.status(StatusCodes.OK).json({ users, vestedMembers, pendingMembers });
};

export const adminGetAllMembers = async (req, res) => {
  const adminMembers = await Member.find({});
  res.status(StatusCodes.OK).json({ adminMembers });
};
export const adminUpdateMember = async (req, res) => {
  // const member = await Member.findById(req.params.id);
  const updatedMember = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,

    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: "member modified", member: updatedMember });
};

export const deleteMember = async (req, res) => {
  const removedMember = await Member.findByIdAndDelete(req.params.id);

  res
    .status(StatusCodes.OK)
    .json({ msg: "member deleted", member: removedMember });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
