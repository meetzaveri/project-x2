import _ from "lodash";
import moment from "moment";

export function checkUser(arr, item) {
  const findId = _.findIndex(arr, { email: item.email });
  if (findId === -1) {
    return { error: "User not found" };
  } else {
    if (item.password === arr[findId].password) {
      console.log("passwords match");
      let data = arr[findId];
      return { success: true, data };
    } else {
      return { error: "Email/password is incorrect" };
    }
  }
}

export function sortByLatestDate(arr) {
  const sortedData = _.sortBy(arr, function(o) {
    return new moment(o.timestamp);
  }).reverse();
  console.log("sortedData", sortedData);
  return sortedData;
}
