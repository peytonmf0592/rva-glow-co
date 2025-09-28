'use client'

export default function ServiceSlider() {
  const services = [
    {
      id: 1,
      icon: '/icons/tree-service.svg',
      title: 'True Full Service',
      description: 'Design, Install, Seasonal maintenance, Takedown, Storage. We handle everything from start to finish and beyond.'
    },
    {
      id: 2,
      icon: '/icons/damage-free.svg',
      title: 'Damage-Free Installation',
      description: 'Installation uses removable clips that attach securely without damaging your roof, gutters, or shingles. No holes, no nails, no worries.'
    },
    {
      id: 3,
      icon: '/icons/color-options.svg',
      title: 'Color Options Without Automation',
      description: 'Pick the color palette you want — warm white, multicolor, or custom themes.'
    },
    {
      id: 4,
      icon: '/icons/flexible-ownership.svg',
      title: 'Flexible Ownership',
      description: 'Lease or buy — transparent pricing with core services included in every package.'
    },
    {
      id: 5,
      icon: '/icons/safety-quality.svg',
      title: 'Safety & Quality',
      description: 'Fall protection, weather-rated bulbs & wiring, and industry-grade termination caps for lasting beauty.'
    },
    {
      id: 6,
      icon: '/icons/commercial.svg',
      title: 'Commercial',
      description: 'Professional holiday lighting solutions for businesses, storefronts, and office buildings.'
    }
  ]

  return (
    <>
      <style jsx>{`
        .service-slides {
          padding: 0;
          width: 100%;
          max-width: 800px;
          height: 500px;
          display: block;
          margin: 0 auto;
          position: relative;
          list-style: none;
        }

        .service-slides * {
          user-select: none;
          -ms-user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
        }

        .service-slides input {
          display: none;
        }

        .service-slide-container {
          display: block;
        }

        .service-slide {
          top: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          transform: scale(0);
          transition: all 0.7s ease-in-out;
        }

        .service-slide-content {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px) saturate(180%);
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 8px 32px rgba(26, 40, 69, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .service-icon {
          width: 80px;
          height: 80px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1.5px solid #D4AF37;
          box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.1);
        }

        .service-icon img {
          width: 100%;
          height: 100%;
        }

        .service-slide h3 {
          font-size: 1.875rem;
          font-weight: bold;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .service-slide p {
          font-size: 1.125rem;
          color: #4b5563;
          line-height: 1.75;
          max-width: 600px;
        }

        .service-nav label {
          width: 80px;
          height: 100%;
          display: none;
          position: absolute;
          opacity: 0;
          z-index: 9;
          cursor: pointer;
          transition: opacity 0.2s;
          color: #1a2845;
          font-size: 60pt;
          text-align: center;
          line-height: 500px;
          font-family: system-ui, -apple-system, sans-serif;
          background-color: rgba(26, 40, 69, 0.1);
          border-radius: 0.5rem;
        }

        .service-slide:hover + .service-nav label {
          opacity: 0.5;
        }

        .service-nav label:hover {
          opacity: 1;
          background-color: rgba(26, 40, 69, 0.15);
        }

        /* Always show arrows on mobile/touch devices */
        @media (hover: none) and (pointer: coarse) {
          input:checked + .service-slide-container .service-nav label {
            opacity: 0.6;
          }

          .service-nav label:active {
            opacity: 1;
            background-color: rgba(26, 40, 69, 0.2);
          }
        }

        .service-nav .next {
          right: 0;
        }

        input:checked + .service-slide-container .service-slide {
          opacity: 1;
          transform: scale(1);
          transition: opacity 1s ease-in-out;
        }

        input:checked + .service-slide-container .service-nav label {
          display: block;
        }

        .service-nav-dots {
          width: 100%;
          bottom: -40px;
          height: 11px;
          display: block;
          position: absolute;
          text-align: center;
        }

        .service-nav-dots .service-nav-dot {
          top: -5px;
          width: 14px;
          height: 14px;
          margin: 0 6px;
          position: relative;
          border-radius: 100%;
          display: inline-block;
          background-color: rgba(26, 40, 69, 0.4);
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .service-nav-dots .service-nav-dot:hover {
          cursor: pointer;
          background-color: rgba(26, 40, 69, 0.6);
          transform: scale(1.2);
        }

        /* Make dots more prominent on mobile */
        @media (hover: none) and (pointer: coarse) {
          .service-nav-dots .service-nav-dot {
            width: 16px;
            height: 16px;
            margin: 0 8px;
            background-color: rgba(26, 40, 69, 0.5);
          }
        }

        input#service-1:checked ~ .service-nav-dots label#service-dot-1,
        input#service-2:checked ~ .service-nav-dots label#service-dot-2,
        input#service-3:checked ~ .service-nav-dots label#service-dot-3,
        input#service-4:checked ~ .service-nav-dots label#service-dot-4,
        input#service-5:checked ~ .service-nav-dots label#service-dot-5,
        input#service-6:checked ~ .service-nav-dots label#service-dot-6 {
          background: #1a2845;
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .service-slides {
            height: 450px;
          }

          .service-nav label {
            line-height: 450px;
            font-size: 36pt;
            width: 50px;
          }

          .service-slide-content {
            padding: 1.5rem;
          }

          .service-slide h3 {
            font-size: 1.25rem;
            line-height: 1.3;
          }

          .service-slide p {
            font-size: 0.9rem;
            line-height: 1.5;
          }
        }

        @media (max-width: 480px) {
          .service-slides {
            height: 400px;
          }

          .service-nav label {
            line-height: 400px;
            font-size: 32pt;
            width: 45px;
          }

          .service-slide-content {
            padding: 1rem;
          }

          .service-slide h3 {
            font-size: 1.125rem;
            margin-bottom: 1rem;
          }

          .service-slide p {
            font-size: 0.875rem;
          }

          .service-icon {
            width: 60px;
            height: 60px;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>

      <ul className="service-slides">
        {services.map((service, index) => {
          const prevId = index === 0 ? 6 : index
          const nextId = index === 5 ? 1 : index + 2

          return (
            <div key={service.id}>
              <input
                type="radio"
                name="service-radio-btn"
                id={`service-${service.id}`}
                defaultChecked={index === 0}
              />
              <li className="service-slide-container">
                <div className="service-slide">
                  <div className="service-slide-content">
                    <div className="service-icon">
                      <img src={service.icon} alt={service.title} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
                <div className="service-nav">
                  <label htmlFor={`service-${prevId}`} className="prev">‹</label>
                  <label htmlFor={`service-${nextId}`} className="next">›</label>
                </div>
              </li>
            </div>
          )
        })}

        <li className="service-nav-dots">
          {services.map(service => (
            <label
              key={service.id}
              htmlFor={`service-${service.id}`}
              className="service-nav-dot"
              id={`service-dot-${service.id}`}
            />
          ))}
        </li>
      </ul>
    </>
  )
}