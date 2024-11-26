const mailSender = require("../utils/mailSender");
const Query = require("./../models/queries");


//addition of query
exports.addQuery = async (req, res) => {
  if (req.body?.question === undefined 
    || req.body?.name === undefined 
    || req.body?.related === undefined 
    || req.body?.email === undefined 
    || req.body?.phone === undefined 
    || req.body?.insiderOutsider === undefined
    ||(req.body?.insiderOutsider && req.body?.rollNumber === undefined))  {
    return res.status(400).send("Error: All fields are required");
  }

  const query = new Query({
    question: req.body?.question,
    answer: "",
    related: req.body?.related,
    name: req.body?.name,
    email: req.body?.email,
    phone: req.body?.phone,
    rollNumber: req.body?.rollNumber,
    insiderOutsider: req.body?.insiderOutsider,

  });

  query
    .save()
    .then((query) => res.status(200).send(query))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getQuery = async (req, res) => {
    if (req.query.id !== undefined) {
        Query.find({ _id: req.query.id })
            .then((query) => res.status(200).send(query))
            .catch((err) => res.status(400).send("Error: " + err));
    }
    else {
        await Query.find({ show: true })
            .then((query) => res.status(200).send(query))
            .catch((err) => res.status(400).send("Error: " + err));
    }
};

//----------------------------------------------------------------------->



exports.updateQuery = async (req, res) => {
    try{

        const {question,answer,related} = req.body;
        const id = req.params.id;
        const query = await Query.findById(id);
        const email = query.email;

        if(query.state === "resolved"){
            await Query.findByIdAndUpdate(req.params.id, {
                question: question,
                answer: answer,
                related: related,
                show: true,
            });
            return res.status(400).send("Query updated.");
        }
        

        await Query.findByIdAndUpdate(req.params.id, {
            question: question,
            answer: answer,
            related: related,
            state: "resolved",
            show: true,
        });

        await mailSender(email, "Response To Query", `<h1>Question: ${question}</h1><br><h3>Response: ${answer}</h3>`);

        return res.status(200).send("Query updated.");

    }catch(err){
        return res.status(404).send("Error: " + err);
    }
};

//----------------------------------------------------------------------->
exports.deleteQuery = async (req, res) => {
    try {
        const deletedQuery = await Query.findByIdAndDelete(req.params.id);
        if (!deletedQuery) {
            return res.status(404).send("Query not found.");
        }
        res.status(200).send("Query deleted successfully.");
    } catch (err) {
        res.status(500).send("Error: " + err);
    }
};

exports.showallQueries = async (req, res) => {
Query.find()
        .then((query) => res.status(200).send(query))
        .catch((err) => res.status(404).send("Error: " + err));
};
