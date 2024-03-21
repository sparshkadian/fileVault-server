import mongoose from 'mongoose';

const fileSchema = mongoose.Schema({});

const File = mongoose.model('File', fileSchema);

export default File;
