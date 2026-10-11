import React from 'react';
import { FaUserMd, FaHandHoldingHeart, FaHospital, FaStethoscope } from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    {
      icon: <FaUserMd className="text-primary-custom fs-1 mb-3" />,
      title: "Doctor Appointments",
      desc: "Find and book appointments with specialized doctors easily."
    },
    {
      icon: <FaHandHoldingHeart className="text-danger fs-1 mb-3" />,
      title: "Organ Donation",
      desc: "Pledge to donate organs and give the gift of life to someone in need."
    },
    {
      icon: <FaHospital className="text-info fs-1 mb-3" />,
      title: "Medical Donations",
      desc: "Donate or find blood, medicines, and medical equipment."
    },
    {
      icon: <FaStethoscope className="text-success fs-1 mb-3" />,
      title: "Health Information",
      desc: "Access reliable health information and connect with medical professionals."
    }
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Services</h2>
          <p className="text-muted">Comprehensive healthcare solutions tailored for you</p>
        </div>
        <div className="row g-4">
          {services.map((service, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div className="card h-100 text-center p-4 border-0 bg-light">
                <div className="card-body">
                  {service.icon}
                  <h5 className="card-title fw-bold">{service.title}</h5>
                  <p className="card-text text-muted">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
