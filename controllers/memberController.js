import Member from "../models/MemberModel.js";
import { customAlphabet } from "nanoid";
import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import day from "dayjs";
import mongoose from "mongoose";

const randomMatriculation = customAlphabet("1234567890", 6);

export const getAllMembers = async (req, res) => {
  const members = await Member.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ members });
};

export const createMember = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  req.body.createdBy = req.user.userId;
  req.body.associationName = user.associationName;
  req.body.associationCode = user.associationCode;

  req.body.memberMatriculation = `AS${user.associationCode.toLocaleUpperCase()}${randomMatriculation()}`;
  const member = await Member.create(req.body);
  res.status(StatusCodes.CREATED).json({ member });
};

export const getMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.status(StatusCodes.OK).json({ member });
};

export const updateMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  const updatedMember = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    { $set: (req.body.associationName = member.associationName) },
    { $set: (req.body.associationCode = member.associationCode) },
    { $set: (req.body.firstName = member.firstName) },
    { $set: (req.body.lastAndMiddleNames = member.lastAndMiddleNames) },
    { $set: (req.body.dateOfBirth = member.dateOfBirth) },
    { $set: (req.body.countryOfBirth = member.countryOfBirth) },
    { $set: (req.body.memberStatus = member.memberStatus) },
    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: "member modified", member: updatedMember });
};

export const showStats = async (req, res) => {
  let stats = await Member.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$memberStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);

  const defaultStats = {
    pending: stats.pending || 0,
    vested: stats.vested || 0,
  };

  let monthlyApplications = await Member.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  // let monthlyApplications = [
  //   {
  //     date: "May 23",
  //     count: 12,
  //   },
  //   {
  //     date: "Jun 13",
  //     count: 15,
  //   },
  //   {
  //     date: "Jul 23",
  //     count: 24,
  //   },
  // ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
