import mongoose, { Schema } from 'mongoose';

const ProgramSchema = Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: String,
  website: String,
  cost: String,
  schedule: String,
  size: String,
  location: String,
  county: String,
  ageRange: String,
  affiliations: String,
  timeOfDay: String,
  timeLength: String,
  certification: String,
  partners: String,
  scholarships: String,
  takesPlace: String,
  averageParticipants: String,
  measuredSuccess: String,
  pastSuccess: String,
  otherInfo: String,
  pending: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

// Indexing all the Program model attrs so they can be searchable.
// This is strictly for demo purposes. In a real world app, it would be better to use something like ElasticSearch.
ProgramSchema.index({ '$**': 'text' });

export default mongoose.model('Program', ProgramSchema);
