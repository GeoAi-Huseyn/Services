import React from 'react';

const sideBlogs = [
  {
    id: 1,
    title: 'Why Is My Refrigerator Running Constantly Without Cooling?',
    image: 'assets/images/blog-post-1.jpg',
    date: { day: '14', month: 'Aug' },
    desc: 'Discover the primary reasons behind continuous compressor cycling, from dusty condenser coils to failing defrost thermostats.',
  },
  {
    id: 2,
    title: 'Warning Signs Your Washing Machine Needs Prompt Service',
    image: 'assets/images/blog-post-2.jpg',
    date: { day: '28', month: 'Jul' },
    desc: 'Unusual vibrations, slow drainage, and burning odors indicate internal component wear that requires quick professional attention.',
  },
  {
    id: 3,
    title: 'Oven Temperature Inaccuracy: Causes, Symptoms, and Fixes',
    image: 'assets/images/blog-post-3.jpg',
    date: { day: '10', month: 'Jul' },
    desc: 'Uneven baking or burned meals? Learn how faulty heating elements and thermostat probes affect your daily cooking.',
  },
];

export default function Blog() {
  return (
    <section className="tj-blog-secion" id="blog">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="blog-top-area">
              <div className="tj-heading-area wow fadeInLeft" data-wow-delay=".3s">
                <div className="subs-title">
                  <span><i className="fa-solid fa-screwdriver-wrench"></i></span>
                  <span className="sub-title">Tips & Insights</span>
                </div>
                <h2 className="title">Latest From Our Experts</h2>
              </div>
              <div className="blog-button d-none d-md-inline-block wow fadeInRight" data-wow-delay=".4s">
                <a className="tj-primary-btn" href="#blog">
                  View All
                  <span className="icon_box">
                    <i className="icon_first fa-regular fa-arrow-right"></i>
                    <i className="icon_second fa-regular fa-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="blog-item-box">
              {/* Featured Main Blog Card */}
              <div className="tj-blog-item wow fadeInLeft" data-wow-delay=".4s">
                <div className="blog-images">
                  <a href="#blog">
                    <img src="/assets/images/blog-featured.jpg" alt="Featured Blog" />
                  </a>
                  <div className="blog-date">
                    <span className="number">04</span>
                    <span className="date">Sep</span>
                  </div>
                </div>
                <br />
                <div className="blog-content">
                  <h4 className="title">
                    <a href="#blog">5 Essential Tips to Extend the Lifespan of Your Appliances</a>
                  </h4>
                  <div className="desc">
                    <p>
                      Routine maintenance and simple daily care can prevent costly breakdowns and extend the operating life of your refrigerator, washer, and oven.
                    </p>
                  </div>
                  <div className="blog-button">
                    <a className="tj-transparent-btn" href="#blog">
                      Read More
                      <span className="icon_box">
                        <i className="icon_first fa-regular fa-arrow-right"></i>
                        <i className="icon_second fa-regular fa-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Side Blog Cards */}
              {sideBlogs.map((blog, idx) => (
                <div className="tj-blog-item wow fadeInUp" data-wow-delay={`${0.4 + idx * 0.1}s`} key={blog.id}>
                  <div className="blog-images">
                    <a href="#blog">
                      <img src={blog.image} alt={blog.title} />
                    </a>
                    <div className="blog-date">
                      <span className="number">{blog.date.day}</span>
                      <span className="date">{blog.date.month}</span>
                    </div>
                  </div>
                  <div className="blog-content">
                    <h4 className="title">
                      <a href="#blog">{blog.title}</a>
                    </h4>
                    <div className="desc">
                      <p>{blog.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="blog-button d-md-none text-center wow fadeInUp" data-wow-delay=".7s">
            <a className="tj-primary-btn" href="#blog">
              Read More
              <span className="icon_box">
                <i className="icon_first fa-regular fa-arrow-right"></i>
                <i className="icon_second fa-regular fa-arrow-right"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
