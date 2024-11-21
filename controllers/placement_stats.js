const { log } = require("handlebars");
const Placement_Stat = require("./../models/placement_stats");

exports.addPlacement_Stat = async (req, res) => {
  console.log(req.body);

  if (req.body?.link === undefined ) {
    return res.status(400).send("Error: Image link is required");
  }

  const placement_stat = new Placement_Stat({
    link: req.body?.link,
    year: req.body?.year,
    statsType:req.body?.statsType,
    course:req.body?.course
  });

  placement_stat
    .save()
    .then((placement_stat) => res.status(200).send(placement_stat))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getPlacement_Stat = async (req, res) => {
  if (req.query.id !== undefined) {
    Placement_Stat.find({ _id: req.query.id })
      .then((placement_stat) => res.status(200).send(placement_stat))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    Placement_Stat.find({ show: true })
      .then((placement_stats) => res.status(200).send(placement_stats))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

//----------------------------------------------------------------------->
exports.updatePlacement_Stat = async (req, res) => {
  Placement_Stat.findByIdAndUpdate(req.params.id, {
    link: req.body?.link,
    year: req.body?.year,
    statsType:req.body?.statsType,
    course:req.body?.course,
    show: true,
  })
    .then(() => res.status(200).send("Placement_Stat updated."))
    .catch((err) => res.status(404).send("Error: " + err));
};

//----------------------------------------------------------------------->
exports.deletePlacement_Stat = async (req, res) => {
  Placement_Stat.findByIdAndUpdate(req.params.id, { $set: { show: false } })
    .then(() => res.status(200).send("Placement_Stat deleted."))
    .catch((err) => res.status(404).send("Error: " + err));
};


exports.showallPlacement_Stats = async (req, res) => {
  try {
    // Fetch all placement stats from the database
    const placement_stats = await Placement_Stat.find()
      .sort({ year: -1, course: 1 }); // Initial sort by year descending and course ascending

    // Custom sorting to move "Recruiter" statsType to the end
    const sortedStats = placement_stats.sort((a, b) => {
      if (a.statsType === "Recruiter" && b.statsType !== "Recruiter") {
        return 1; // Place "Recruiter" statsType at the end
      } else if (a.statsType !== "Recruiter" && b.statsType === "Recruiter") {
        return -1; // Keep non-"Recruiter" statsType before "Recruiter"
      } else {
        return 0; // If both are the same type, maintain their relative order
      }
    });

    // Send the sorted response
    res.status(200).send(sortedStats);
  } catch (err) {
    res.status(404).send("Error: " + err);
  }
};
