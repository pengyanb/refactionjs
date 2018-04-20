const Datastore = require("nedb");
const _ = require("lodash");
const db = new Datastore({
  filename: "./server/data/db.json",
  autoload: true
});

exports.read = async (req, res) => {
  const filterInfo = req.body.filterInfo;
  console.log("[filterInfo]: ", req.body);
  if (_.isPlainObject(filterInfo)) {
    let selector = {};
    let genderFilter;
    let ageFilter;
    if (Array.isArray(filterInfo.gender) && filterInfo.gender.length > 0) {
      genderFilter = { $or: [] };
      filterInfo.gender.map(genderInfo => {
        genderFilter.$or.push({ gender: genderInfo });
      });
    }
    if (Array.isArray(filterInfo.age) && filterInfo.age.length > 0) {
      ageFilter = { $or: [] };
      filterInfo.age.map(ageInfo => {
        ageFilter.$or.push({ age: ageInfo });
      });
    }

    console.log("[genderFilter]: ", genderFilter);
    console.log("[ageFilter]: ", ageFilter);

    if (genderFilter && ageFilter) {
      selector = { $and: [genderFilter, ageFilter] };
    } else if (genderFilter) {
      selector = genderFilter;
    } else if (ageFilter) {
      selector = ageFilter;
    }
    console.log("[selector]: ", selector);
    db.find(selector, (err, data) => {
      if (err) {
        res.json({ error: true, message: err.toString() });
      } else {
        res.json({ error: false, data });
      }
    });
  } else {
    res.json({ error: true, message: "invalid parameters" });
  }
};
