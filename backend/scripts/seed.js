require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Doctor = require('../src/models/Doctor');
const Donation = require('../src/models/Donation');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartcare');
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    const force = process.argv.includes('--force');

    if (force) {
      console.log('Force flag detected. Dropping existing data...');
      await User.deleteMany({});
      await Doctor.deleteMany({});
      await Donation.deleteMany({});
    } else {
      const userCount = await User.countDocuments();
      if (userCount > 0) {
        console.log('Database already has data. Use --force to overwrite.');
        process.exit(0);
      }
    }

    // Create Admin User
    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@smartcare.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin'
    });
    console.log('Admin user created');

    // Create Sample Doctors
    const doctors = await Doctor.insertMany([
      {
        name: 'Dr. John Doe',
        specialty: 'Cardiology',
        qualifications: 'MD, FACC',
        experience: 15,
        consultationFee: 150,
        bio: 'Experienced cardiologist specializing in heart failure and preventive cardiology.',
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        timeSlots: ['09:00', '10:00', '11:00', '14:00'],
        isAvailable: true,
        isActive: true
      },
      {
        name: 'Dr. Jane Smith',
        specialty: 'Pediatrics',
        qualifications: 'MD, FAAP',
        experience: 10,
        consultationFee: 100,
        bio: 'Dedicated pediatrician providing comprehensive care for children of all ages.',
        availableDays: ['Tuesday', 'Thursday', 'Saturday'],
        timeSlots: ['09:00', '10:30', '11:30', '15:00'],
        isAvailable: true,
        isActive: true
      },
      {
        name: 'Dr. Robert Brown',
        specialty: 'Orthopedics',
        qualifications: 'MS Ortho',
        experience: 20,
        consultationFee: 200,
        bio: 'Expert in joint replacement and sports injuries.',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        timeSlots: ['08:00', '09:00', '10:00', '11:00', '12:00'],
        isAvailable: true,
        isActive: true
      },
      {
        name: 'Dr. Emily White',
        specialty: 'Dermatology',
        qualifications: 'MD Dermatology',
        experience: 8,
        consultationFee: 120,
        bio: 'Specialist in clinical and cosmetic dermatology.',
        availableDays: ['Monday', 'Thursday'],
        timeSlots: ['14:00', '15:00', '16:00', '17:00'],
        isAvailable: true,
        isActive: true
      },
      {
        name: 'Dr. Michael Green',
        specialty: 'Neurology',
        qualifications: 'MD, PhD',
        experience: 18,
        consultationFee: 180,
        bio: 'Leading expert in neurodegenerative diseases and stroke management.',
        availableDays: ['Wednesday', 'Friday'],
        timeSlots: ['10:00', '11:00', '14:00', '15:00'],
        isAvailable: true,
        isActive: true
      },
      {
        name: 'Dr. Sarah Wilson',
        specialty: 'Psychiatry',
        qualifications: 'MD Psychiatry',
        experience: 12,
        consultationFee: 130,
        bio: 'Compassionate psychiatrist focusing on adult mood disorders and anxiety.',
        availableDays: ['Tuesday', 'Wednesday', 'Thursday'],
        timeSlots: ['09:00', '11:00', '13:00', '15:00'],
        isAvailable: true,
        isActive: true
      }
    ]);
    console.log(`${doctors.length} Doctors created`);

    // Create Sample Donations
    const donations = await Donation.insertMany([
      {
        title: 'Wheelchair in good condition',
        category: 'equipment',
        description: 'Used for a few months, fully functional manual wheelchair.',
        location: 'New York, NY',
        contactInfo: 'Please arrange for pickup on weekends.',
        status: 'available',
        createdBy: admin._id
      },
      {
        title: 'O-Negative Blood Needed Urgent',
        category: 'blood',
        description: 'Urgent requirement for O-Negative blood for a surgery patient.',
        location: 'City Hospital, Main Branch',
        contactInfo: 'Contact blood bank directly and mention patient ID 12345.',
        status: 'available',
        createdBy: admin._id
      },
      {
        title: 'Unused Diabetes Medication',
        category: 'medicine',
        description: 'Sealed boxes of Metformin, expiry 2025. Donating as treatment changed.',
        location: 'Los Angeles, CA',
        contactInfo: 'Will ship if you pay postage.',
        status: 'available',
        createdBy: admin._id
      },
      {
        title: 'Hospital Bed',
        category: 'equipment',
        description: 'Electric hospital bed with mattress.',
        location: 'Chicago, IL',
        contactInfo: 'Requires a truck for pickup.',
        status: 'available',
        createdBy: admin._id
      }
    ]);
    console.log(`${donations.length} Donations created`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error with seeding:', error);
    process.exit(1);
  }
};

seedData();
