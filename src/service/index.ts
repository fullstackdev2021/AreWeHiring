import { login, signUp, forgetPassword } from './authentication';
import {
  jobSearchById,
  allJobsSearch,
  findJob,
  jobsInDraft,
  jobsInApprove,
  approveJob,
  archiveJob,
  jobsInArchive,
  deleteJob,
  jobsInDelete,
  advanceSearch,
} from './jobSearch';
import { allCompaniesSearch } from './companySearch';
import { addCandidate, applyJob, getNotifications } from './candidate';
import {
  addJob,
  popularCategories,
  recentJobsSearch,
  jobSpotlight,
  renewJob,
  editJob,
  updateJob,
} from './jobs';
import { addCompany } from './companies';
import { allUsersSearch, addStaff, searchUserByCompany } from './users';
import {
  activeListings,
  totalJobViews,
  totalApplication,
  timeBookmarked,
  recentActivities,
} from './dashboard';
import {
  applicationsInDraft,
  approvedApplications,
  doApplicationApprove,
  archivedApplications,
  sendApplicationToArchive,
  deletedApplications,
  doApplicationDelete,
  rejectedApplications,
  doApplicationReject,
  applicationsPostedByUser,
  applicationsSearchByJobId,
  applicationsSearchByEmail,
} from './applications';
export const Authentication = {
  login,
  signUp,
  forgetPassword,
};

export const JobSearch = {
  jobSearchById,
  allJobsSearch,
  findJob,
  jobsInDraft,
  jobsInApprove,
  approveJob,
  archiveJob,
  jobsInArchive,
  deleteJob,
  jobsInDelete,
  advanceSearch,
};

export const ApplicationSearch = {
  applicationsInDraft,
  approvedApplications,
  doApplicationApprove,
  archivedApplications,
  sendApplicationToArchive,
  deletedApplications,
  doApplicationDelete,
  rejectedApplications,
  doApplicationReject,
  applicationsPostedByUser,
  applicationsSearchByJobId,
  applicationsSearchByEmail,
};

export const Candidate = {
  addCandidate,
  applyJob,
  getNotifications,
};
export const Job = {
  addJob,
  popularCategories,
  recentJobsSearch,
  jobSpotlight,
  renewJob,
  editJob,
  updateJob,
};

export const CompanySearch = {
  allCompaniesSearch,
};

export const Company = {
  addCompany,
};

export const Users = {
  allUsersSearch,
  addStaff,
  searchUserByCompany,
};
export const Dashboard = {
  activeListings,
  totalJobViews,
  totalApplication,
  timeBookmarked,
  recentActivities,
};
