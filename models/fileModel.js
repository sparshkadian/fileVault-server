import mongoose from 'mongoose';

const fileSchema = mongoose.Schema(
  {
    fileName: { type: String, required: true },

    fileType: { type: String, required: true },

    fileSize: { type: Number, required: true },

    starred: { type: Boolean, default: false },

    inTrash: { type: Boolean, default: false },

    downloadLink: String,
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model('File', fileSchema);

export default File;
