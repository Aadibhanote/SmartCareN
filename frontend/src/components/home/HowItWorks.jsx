import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      num: "1",
      title: "Create Account",
      desc: "Register securely to access all features of the SmartCareN platform."
    },
    {
      num: "2",
      title: "Find a Service",
      desc: "Browse doctors, view available donations, or explore organ donation info."
    },
    {
      num: "3",
      title: "Book / Request",
      desc: "Schedule your appointment or submit your request with just a few clicks."
    }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold">How It Works</h2>
          <p className="text-muted">Simple steps to get the care you need</p>
        </div>
        <div className="row g-4 position-relative">
          {steps.map((step, idx) => (
            <div key={idx} className="col-md-4 text-center z-1">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary-custom text-white rounded-circle mb-4 shadow" style={{ width: '80px', height: '80px', fontSize: '32px', fontWeight: 'bold' }}>
                {step.num}
              </div>
              <h4 className="fw-bold">{step.title}</h4>
              <p className="text-muted px-3">{step.desc}</p>
            </div>
          ))}
          {/* Connector line for large screens */}
          <div className="d-none d-md-block position-absolute top-50 start-50 translate-middle w-75 border-top border-2 border-primary opacity-25" style={{ zIndex: 0, marginTop: '-40px' }}></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
