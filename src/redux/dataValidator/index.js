import { storeItem } from "../../redux/Utils/AsyncUtils";

const validator = {
  profileDetailsHandler,
  getRecommendedCalories,
};
const storeData = (gender, age) => {
  if (gender && age) {
    storeItem("gender", gender);
    storeItem("age", age);

    return { gender: gender, age: age };
  }
  return { gender: null, age: null };
};
function profileDetailsHandler(data) {
  storeItem("DIET_DETAILS", data.diet || []);
  return {
    _id: data._id || null,
    email: data.email || null,
    password: data.password || null,
    age: storeData(data.gender, data.age).age || null,
    gender: storeData(data.gender, data.age).gender || null,
    height_feet: data.height_feet || null,
    height_inches: data.height_inches || null,
    weight: data.weight || null,
    set_goal_weight: data.set_goal_weight || null,
    set_goal_weeks: data.set_goal_weeks || null,
    profileImage: data.profileImage || null,
    addressProofImage: data.addressProofImage || null,
    socialId: data.socialId || null,
    platform: data.platform || null,
    deviceType: data.deviceType || null,
    socialLogin: data.socialLogin || false,
    createdAt: data.createdAt,
    goals: data.goals || [],
    diet: data.diet || [],
    firstname: data.firstname || "Not Available",
  };
}

function getRecommendedCalories(data) {
  console.log(data.recommededCalRes);
  let empty = {
    rec_breakfast_cal: null,
    rec_lunch_cal: 0,
    rec_snack_cal: 0,
    rec_dinner_cal: 0,
    rec_excersise_cal: 0,
    user_id: {
      id: null,
    },
  };
  if (data) {
    return data;
  }
  return empty;
}
export default validator;
