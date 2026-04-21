const profileModules = import.meta.glob("../cv/profile.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const profileImage = Object.values(profileModules)[0];

const education = [
  {
    period: "2026 - Now",
    title: "Graduate Certificate of Construction Management",
    place: "University of Technology Sydney / Australia, Sydney",
  },
  {
    period: "2023 - 2025",
    title: "Bachelor of Design in Architecture",
    place: "University of Technology Sydney / Australia, Sydney",
    details: [
      "Developed spatial design, conceptual thinking, and visual communication abilities.",
      "Gained knowledge in architectural history, sustainability, and built environment systems.",
      "Completed collaborative design studios, presentations, and project-based coursework.",
      "Relevant coursework: Sustainable Design, Advanced Structures, Urban Planning.",
    ],
  },
];

const internships = [
  {
    period: "December 2024 - February 2025",
    title: "Architectural Intern",
    place: "OUT-2 Design / Vietnam, Ho Chi Minh City",
    details: [
      "Supported architectural design teams across various project types, contributing to multiple stages of the design process.",
      "Assisted in space and time utilisation studies and concept design development.",
      "Participated in site visits, measurements, and project documentation.",
      "Prepared drawings, diagrams, 3D models, and visualisations for presentations.",
      "Contributed to reporting and coordination tasks across different project requirements.",
      "Collaborated effectively with architects and designers in a professional, fast-paced environment.",
      "Demonstrated strong teamwork and communication skills while meeting deadlines.",
      "Worked independently and as part of a team to ensure high-quality design outcomes.",
    ],
  },
];

const skills = [
  ["Software", "Rhino, Photoshop, Illustrator"],
  ["Specialisations", "Sustainable Design, 3D Modelling"],
  ["Design", "Concept design, documentation, visual communication"],
  ["Practice", "Communication, teamwork, creativity, problem-solving, adaptability"],
];

const languages = [
  ["English", "Professional working proficiency"],
  ["Vietnamese", "Native language"],
];

const Curriculum = () => {
  return (
    <div className="curriculum">
      <div className="cv-spread" aria-label="Nguyen Gia Lam Le curriculum vitae">
        <article className="cv-page cv-page--intro">
          <header className="cv-hero">
            <div className="cv-portrait" aria-label="Profile portrait">
              {profileImage ? (
                <img src={profileImage} alt="Nguyen Gia Lam Le" />
              ) : (
                <div className="cv-portrait-placeholder">
                  <span>Nguyen Gia Lam Le</span>
                  <span>Jimmy</span>
                </div>
              )}
            </div>

            <div className="cv-intro">
              <h1>
                Nguyen Gia Lam
                <span>(Jimmy) Le</span>
              </h1>
              <p>Graduate Architecture Student</p>
              <address>
                Australia, Sydney
                <br />
                <a href="mailto:lenguyengialam2004@gmail.com">
                  lenguyengialam2004@gmail.com
                </a>
                <br />
                <a href="tel:+61412478274">0412478274</a>
              </address>
            </div>
          </header>

          <section className="cv-section cv-summary" aria-labelledby="summary-title">
            <h2 id="summary-title">Professional Summary</h2>
            <p>
              Architecture student at UTS, graduating May 2026, with internship
              experience at an international design studio, contributing to
              concept design, site work, and documentation. Skilled in Rhino,
              with developing proficiency in Revit and strong capabilities in
              Adobe Creative Suite. Currently undertaking a Graduate Certificate
              towards a Master of Construction Management. My work is shaped
              by an interest in sustainable design, careful spatial sequencing,
              and visual communication that makes architectural ideas clear and
              legible. Through studio projects and professional practice, I have
              developed a detail-oriented approach to research, drawing,
              modelling, and presentation, while continuing to build confidence
              in collaborative design environments.
            </p>
          </section>

          <section className="cv-section" aria-labelledby="education-title">
            <h2 id="education-title">Education</h2>
            {education.map((item) => (
              <div className="cv-entry" key={`${item.period}-${item.title}`}>
                <div className="cv-period">{item.period}</div>
                <div className="cv-entry-body">
                  <h3>{item.title}</h3>
                  <p>{item.place}</p>
                  {item.details && (
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>

        </article>

        <article className="cv-page cv-page--experience">
          <section className="cv-section" aria-labelledby="internships-title">
            <h2 id="internships-title">Internships</h2>
            {internships.map((item) => (
              <div className="cv-entry" key={`${item.period}-${item.title}`}>
                <div className="cv-period">{item.period}</div>
                <div className="cv-entry-body">
                  <h3>{item.title}</h3>
                  <p>{item.place}</p>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          <section className="cv-section" aria-labelledby="skills-title">
            <h2 id="skills-title">Skills</h2>
            <div className="cv-list">
              {skills.map(([label, value]) => (
                <div className="cv-list-row" key={label}>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-section" aria-labelledby="languages-title">
            <h2 id="languages-title">Languages</h2>
            <div className="cv-list">
              {languages.map(([label, value]) => (
                <div className="cv-list-row" key={label}>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Curriculum;
