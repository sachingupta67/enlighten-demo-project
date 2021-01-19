import Strings from "../../redux/Constants/Strings";

let gender = [
  { id: null, value: "Select" },
  { id: "Male", value: "Male" },
  { id: "Female", value: "Female" },
];
let heightFit = [
  { value: 0 },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
];

let heightInch = [
  { value: 0 },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
];

let yourGoalData = [
  {
    value: Strings.BE_HEALTHIER,
    detail: Strings.BE_HEALTHIER_DETAIL,
    id: 1,
  },
  {
    value: Strings.LOSE_WEIGHT,
    detail: Strings.LOSE_WEIGHT_DETAIL,
    id: 2,
  },
  {
    value: Strings.GAIN_WEIGHT,
    detail: Strings.GAIN_WEIGHT_DETAIL,
    id: 3,
  },
];

let dietData = [
  {
    value: "Vegan",
    id: 1,
  },
  {
    value: "Vegetarian",
    id: 2,
  },
  {
    value: "Keto Diet",
    id: 3,
  },
  {
    value: "Low Crab",
    id: 4,
  },
  {
    value: "Adkins",
    id: 5,
  },
  {
    value: "Dash",
    id: 6,
  },
  {
    value: "Mediterraneam Diet",
    id: 7,
  },
  {
    value: "The Flexitarian Diet",
    id: 8,
  },
  {
    value: "Weight Watchers Diet",
    id: 9,
  },
  {
    value: "MIND Diet",
    id: 10,
  },
  {
    value: "TLC Diet",
    id: 11,
  },
  {
    value: "Volumetrics Diet",
    id: 12,
  },
  {
    value: "Mayo Clinic Diet",
    id: 13,
  },
  {
    value: "Ornish Diet",
    id: 14,
  },
  {
    value: "The Fertility Diet",
    id: 15,
  },
  {
    value: "Low Crab (General)",
    id: 16,
  },
  {
    value: "No Specific Diet",
    id: 17,
  },
];

const profileData = {
  gender,
  heightFit,
  heightInch,
  yourGoalData,
  dietData,
};

export default profileData;
