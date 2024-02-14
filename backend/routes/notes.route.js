const express = require("express");
const NoteModel = require("../models/notes.model");
const noteRouter = express.Router();
const auth = require("../middlewares/auth.middleware");

noteRouter.post("/", auth, async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "New Note Created successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

noteRouter.get("/", auth, async (req, res) => {
  const { userID } = req.body;
  try {
    const note = await NoteModel.find({ userID });
    res.status(200).send({ msg: "All notes", note });
  } catch (error) {
    res.status(500).send(error);
  }
});

noteRouter.patch("/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (note.userID == req.body.userID) {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.status(200).send({ msg: "Updated note successfully" });
    } else {
      res
        .status(400)
        .send({ error: "you are not allowed to update someone else notes" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

noteRouter.delete("/:noteID",auth, async (req, res) => {
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (note.userID == req.body.userID) {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.status(200).send({ msg: "Deleted note successfully" });
    } else {
      res
        .status(400)
        .send({ error: "you are not allowed to Delete someone else notes" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = noteRouter;
