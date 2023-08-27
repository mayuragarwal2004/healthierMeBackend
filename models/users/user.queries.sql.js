const User = require("./user.model");
const con = require("../../connection.sql");
var mysql = require("mysql");

const readUser = async (uId) => {
  let userObj = await User.findOne({ uId: uId }).catch((err) => {
    console.log(err);
    return -1;
  });

  return userObj;
};

const checkMId = async (uId, mId) => {
  let { mIds } = await User.findOne({ uId: uId }).catch((err) => {
    console.log(err);
    return -1; //501
  });
  if (mIds.indexOf(mId) == -1) {
    return -2;
  }
  return True;
};

const existUser = async (uItem) => {
  if (!uItem.phone) {
    return 0;
  }

  try {
    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        "SELECT count(*) FROM user WHERE phone=" + uItem.phone,
        (err, result, fields) => {
          if (err) {
            reject(err);
            return;
          }
          
          const userExists = result[0]["count(*)"] > 0;
          resolve(userExists ? 1 : 2);
        }
      );
    });

    return queryResult;
  } catch (err) {
    console.log(err);
    return -2;
  }
};

// const existUser = async (uItem) => {
//   if (!uItem.phone) {
//     return 0;
//   }
//   let rValue;

//   try {
//     const q = await con.query(
//       "SELECT count(*) FROM user WHERE phone=" + uItem.phone,
//       async (err, result, fields) => {
//         if (err) throw err;
//         console.log(await result[0]["count(*)"] == 0);

//         if (await result[0]["count(*)"] == 0) {
//           console.log("returned 2");
//           rValue = 2; // user does not exist
//         } else {
//           rValue = 1; // user exist
//         }
//       }
//     );
//     console.log({q: q})
//     return rValue;
//   } catch (err) {
//     console.log(err);
//     return -2;
//   }
//   // return -2;
// };

const validateUser = async (uItem) => {
  if (
    !uItem.uId ||
    !uItem.name ||
    !uItem.phone ||
    !uItem.email ||
    !uItem.dob ||
    !uItem.address ||
    !uItem.address.city ||
    !uItem.address.state ||
    !uItem.address.area
  ) {
    return 0;
  }

  if (
    con.query(
      "SELECT * FROM user WHERE phone=992118237",
      function (err, result, fields) {
        if (err) throw err;

        if (result.length == 0) return -1;
      }
    )
  ) {
    return -2;
  }
  return 1;
};

const createUser = async (uItem) => {
  const createUser = await User.create(uItem).catch((err) => {
    console.log(err);
    return -1;
  });

  return createUser;
};

// module.exports = { createUser, getMId, validateUser, readUser };
module.exports = { createUser, validateUser, readUser, existUser };
