import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projectsData';

export default function Projects() {
  // Take first 4 projects for homepage preview
  const previewProjects = projectsData.slice(0, 4);

  return (
    <section className="tj-project-section" id="projects">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="project-text wow fadeInUp" data-wow-delay=".3s">
              <div className="tj-heading-area">
                <div className="subs-title">
                  <span><i className="fa-solid fa-screwdriver-wrench"></i></span>
                  <span className="sub-title">Recent Work</span>
                </div>
                <h2 className="title">Featured Repairs</h2>
              </div>
              <div className="desc">
                <p>
                  A showcase of successful repairs completed by our certified technicians. Using authentic OEM parts and certified procedures, we restore appliances to optimal performance.
                </p>
              </div>
              <div className="project-button d-none d-md-inline-block">
                <Link className="tj-primary-btn" to="/projects">
                  View All
                  <span className="icon_box">
                    <i className="icon_first fa-regular fa-arrow-right"></i>
                    <i className="icon_second fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {previewProjects.map((project) => (
            <div className="col-lg-4 col-md-6" key={project.id}>
              <div className="tj-project-item wow fadeInUp" data-wow-delay=".4s">
                <div className="tj-project-images">
                  <Link to={`/project/${project.slug}`}>
                    <img src={project.heroImage} alt={project.title} />
                  </Link>
                </div>
                <div className="project-content">
                  <h4 className="project-title">
                    <Link to={`/project/${project.slug}`}>{project.shortTitle || project.title}</Link>
                  </h4>
                  <div className="project-button">
                    <Link className="tj-white-btn" to={`/project/${project.slug}`}>
                      Details
                      <span className="icon_box">
                        <i className="icon_first fa-regular fa-arrow-right"></i>
                        <i className="icon_second fa-regular fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center d-md-none mt-4">
          <Link className="tj-primary-btn" to="/projects">
            View All ({projectsData.length} Projects)
            <span className="icon_box">
              <i className="icon_first fa-regular fa-arrow-right"></i>
              <i className="icon_second fa-regular fa-arrow-right"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
