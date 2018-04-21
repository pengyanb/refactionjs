const Datastore = require('nedb');
const _ = require('lodash');
const db = new Datastore({
  filename: './server/data/db.json',
  autoload: true,
});

exports.read = async (req, res) => {
  const filterInfo = req.body.filterInfo;
  console.log('[filterInfo]: ', req.body);
  if (_.isPlainObject(filterInfo)) {
    let selector = {};
    let genderFilter;
    let ageFilter;
    let nameFilter;
    if (typeof filterInfo.name === 'string') {
      nameFilter = {
        name: { $regex: new RegExp(`${filterInfo.name}`, 'i') },
      };
    }
    if (Array.isArray(filterInfo.gender) && filterInfo.gender.length > 0) {
      genderFilter = { $or: [] };
      filterInfo.gender.map((genderInfo) => {
        genderFilter.$or.push({ gender: genderInfo });
      });
    }
    if (filterInfo.age && (filterInfo.age.$gte || filterInfo.age.$lte)) {
      ageFilter = { $and: [] };
      if (_.isInteger(filterInfo.age.$gte)) {
        ageFilter.$and.push({ age: { $gte: filterInfo.age.$gte } });
      }
      if (_.isInteger(filterInfo.age.$lte)) {
        ageFilter.$and.push({ age: { $lte: filterInfo.age.$lte } });
      }
    }

    // console.log('[nameFilter]: ', nameFilter);
    // console.log("[genderFilter]: ", JSON.stringify(genderFilter, null, 2));
    // console.log("[ageFilter]: ", JSON.stringify(ageFilter, null, 2));

    if (genderFilter || ageFilter || nameFilter) {
      selector = { $and: [] };
      if (nameFilter) {
        selector.$and.push(nameFilter);
      }
      if (genderFilter) {
        selector.$and.push(genderFilter);
      }
      if (ageFilter) {
        selector.$and.push(ageFilter);
      }
    }
    console.log('[selector]: ', selector);
    try {
      db.find(selector, (err, data) => {
        if (err) {
          console.error(err);
          res.json({ error: true, message: err.toString() });
        } else {
          res.json({ error: false, data });
        }
      });
    } catch (e) {
      console.error(e);
      res.json({ error: true, message: e.toString() });
    }
  } else {
    res.json({ error: true, message: 'invalid parameters' });
  }
};
