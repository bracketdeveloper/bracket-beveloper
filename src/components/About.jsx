import { useEffect, useState } from "react";
import { Briefcase, Calendar, Download, Users, Wrench } from "lucide-react";
import { fetchAbout } from "../services/api";

const iconMap = {
  Calendar,
  Briefcase,
  Users,
  Wrench,
};

const defaultStats = [
  { label: "Years Experience", value: "5+", icon: "Calendar" },
  { label: "Projects Built", value: "25+", icon: "Briefcase" },
  { label: "Happy Clients", value: "20+", icon: "Users" },
  { label: "Core Stack Techs", value: "12+", icon: "Wrench" },
];

export default function About() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setLoading(true);
        const result = await fetchAbout();
        // Assuming your API returns { id, experience_years, ... }
        // Directly set the result if it's the object, or result.data if wrapped
        setData(result ?? null);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  const stats = data
    ? [
        {
          label: "Years Experience",
          value: `${data.experience_years}+`,
          icon: "Calendar",
        },
        {
          label: "Projects Built",
          value: `${data.projects_built}+`,
          icon: "Briefcase",
        },
        {
          label: "Happy Clients",
          value: `${data.happy_clients}+`,
          icon: "Users",
        },
        {
          label: "Core Stack Techs",
          value: `${data.core_stack_count}+`,
          icon: "Wrench",
        },
      ]
    : defaultStats;

  const narrative = data
    ? {
        profileImage: "/profile_pic.png",
        paragraphs: data.description
          ? data.description
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
          : ["No description available."],
      }
    : {
        profileImage: "/profile_pic.png",
        paragraphs: [
          "Hi, I'm Mian Ammar Salar. I am a results-driven Software Engineer and Full Stack Developer with experience designing, developing, and maintaining scalable web applications using JavaScript, PHP, Node.js, React.js, Vue.js, and Laravel.",
          "My professional journey includes building user-centric software solutions at Jillani'z, supporting frontend enhancements and operational tool workflows at the Sony UK Technology Centre, and executing high-impact freelance projects for international clients. I specialize in converting Figma designs to responsive interfaces, integrating RESTful APIs, and implementing robust backend logic.",
          "I have a strong understanding of the software development lifecycle (SDLC) and excel in collaborative Agile environments. I am dedicated to writing clean, maintainable, and reusable code, troubleshooting complex bugs, and ensuring peak site performance and cross-browser stability.",
        ],
      };

  if (loading) {
    return (
      <section id="about" className="section about-section">
        <h2 className="section-title">About Me</h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
          Loading...
        </p>
      </section>
    );
  }

  return (
    <section id="about" className="section about-section">
      <h2 className="section-title">About Me</h2>
      <p className="section-subtitle">
        Bridging the gap between robust system architecture and interactive,
        visual frontend craftsmanship.
      </p>

      <div className="about-grid">
        <div className="about-stats-panel">
          {stats.map((stat) => {
            const IconComponent =
              typeof stat.icon === "string" ? iconMap[stat.icon] : stat.icon;
            return (
              <div key={stat.label} className="glass-card stat-card">
                <div className="stat-icon-wrapper">
                  <IconComponent size={22} />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="glass-card about-narrative-panel">
          <h3 className="narrative-heading">
            My Journey as a{" "}
            <span className="highlight">Full-Stack Developer</span>
          </h3>

          <div className="about-narrative-content">
            <div className="profile-img-container">
              <img
                src={narrative.profileImage}
                alt="Profile"
                className="profile-img"
              />
            </div>
            {narrative.paragraphs?.map((paragraph, index) => (
              <p key={index} className="narrative-paragraph">
                {paragraph}
              </p>
            ))}
            <div className="narrative-clearfix" />
          </div>

          <div className="narrative-actions">
            <a href="#contact" className="btn btn-primary">
              Work With Me
            </a>
            <a
              href="/cv.pdf"
              download="Mian_Ammar_Salar_CV.pdf"
              className="btn btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
