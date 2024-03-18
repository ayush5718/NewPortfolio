import { useState } from "react";
// const educationData = [
//   {
//     id: 1,
//     title: "Backend Programming",
//     academy: "CoderHouse Course",
//     dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     startYear: "2014",
//     endYear: "2016",
//   },
//   {
//     id: 2,
//     title: "Faculty of Design",
//     academy: "Lviv National Academy of Arts",
//     dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     startYear: "2012",
//     endYear: "2014",
//   },
//   {
//     id: 3,
//     title: "High School",
//     academy: "IT Future",
//     dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     startYear: "2010",
//     endYear: "2012",
//   },
// ];

// const experienceData = [
//   {
//     id: 1,
//     title: "UI Head & Manager",
//     company: "Soft Tech Inc.",
//     dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     startYear: "2020",
//     endYear: false,
//   },
//   {
//     id: 2,
//     title: "UI / UX Specialist",
//     company: "Kana Design Studio",
//     dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     startYear: "2018",
//     endYear: "2020",
//   },
//   {
//     id: 3,
//     title: "Plugins Developer",
//     company: "Fiverr.com",
//     dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     startYear: "2016",
//     endYear: "2018",
//   },
// ];

const Resume = ({ timeline }) => {
  timeline = timeline.sort((a, b) => a.sequence - b.sequence)
  const educationData = timeline.filter((data) => data.forEducation);
  const experienceData = timeline.filter((data) => !data.forEducation);
  console.log("Time line is: ", educationData, experienceData)
  const [educationToggle, setEducationToggle] = useState(educationData[0]._id);
  const [experienceToggle, setExperienceToggle] = useState(experienceData[0]._id);
  console.log(educationToggle, experienceToggle);
  return (

    <section className="lui-section lui-gradient-bottom" id="resume-section">
      {/* Heading */}
      <div className="lui-heading">
        <div className="container">
          <div className="m-titles align-center">
            <h2
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Resume </span>
            </h2>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>
                {" "}
                my <b>Story</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* History */}
      <div className="v-line v-line-left">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <h5
                className="history-title scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span> Education </span>
              </h5>
              <div className="history-items">
                {educationData.map((education) => (
                  education.enabled && <div
                    key={education._id}
                    className={`history-item lui-collapse-item scroll-animate ${educationToggle === education._id ? "opened" : ""
                      }`}
                    data-animate="active"
                  >
                    <h6
                      className={`name lui-collapse-btn ${educationToggle == education._id ? "active" : ""
                        }`}
                      onClick={() =>
                        setEducationToggle(
                          educationToggle == education._id ? null : education._id
                        )
                      }
                    >
                      <span> {education.company_name} </span>
                    </h6>
                    <div className="history-content">
                      <div className="subname">
                        <span> {education.jobTitle} </span>
                      </div>
                      <div className="date lui-subtitle">
                        <span>
                          {" "}
                          {education.startDate.split('-')[0]} - {education.endDate.split('-')[0]},{" "}
                          {education.jobLocation.split(',')[0]}
                        </span>
                      </div>
                      <div className="text">
                        <div>
                          <p className="resume-summary">{education.summary ? education.summary : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"}</p>
                        </div>
                        {education.bulletPoints &&
                          <ul>
                            {education.bulletPoints.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <h5
                className="history-title scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span> Experience </span>
              </h5>
              <div className="history-items">
                {experienceData.map((experience) => (
                  experience.enabled &&
                  <div
                    className={`history-item lui-collapse-item scroll-animate ${experience._id == experienceToggle ? "opened" : ""
                      }`}
                    data-animate="active"
                    key={experience._id}
                  >
                    <h6
                      className={`name lui-collapse-btn ${experienceToggle == experience._id ? " active" : ""
                        }`}
                      onClick={() => setExperienceToggle(
                        experienceToggle == experience._id ? null : experience._id
                      )}
                    >
                      <span> {experience.company_name} </span>
                    </h6>
                    <div className="history-content">
                      <div className="subname">
                        <span> {experience.jobTitle} </span>
                      </div>
                      <div className="date lui-subtitle">
                        <span>
                          {" "}
                          {experience.startDate.split('T')[0].split('-').reverse().join('/')} -{" "}
                          {experience.endDate ? (
                            experience.endDate.split('T')[0].split('-').reverse().join('/')
                          ) : (
                            <b>Present</b>
                          )}
                        </span>
                      </div>
                        <div className="experience-location">
                          <p>{experience.jobLocation}</p>
                        </div>
                      <div className="text" style={{paddingTop:'0px'}}>
                        <div>
                          <p>{experience.summary}</p>
                        </div>
                        <ul>
                          {experience.bulletPoints.map((point,index)=>(
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lui-bgtitle">
            <span> History </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Resume;
