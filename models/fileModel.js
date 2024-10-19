import mongoose from 'mongoose';

const fileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },

    fileName: { type: String, required: true, index: { text: true } },

    mimeType: { type: String, required: true },

    fileSize: { type: Number, required: true },

    starred: { type: Boolean, default: false },

    inTrash: { type: Boolean, default: false },

    downloadLink: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model('File', fileSchema);

export default File;
