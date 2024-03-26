import mongoose from 'mongoose';

const fileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },

    fileName: { type: String, required: true },

    mimeType: { type: String, required: true },

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
