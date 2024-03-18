import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
const PortfolioIsotopeList = ({ projects, noViewMore }) => {

  async function fetchUserData() {
    try {
      const response = await fetch("https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        if (userData.success) {
          let temp = userData.user.projects.sort((a, b) => a.sequence - b.sequence)
          setProjectList(temp)
          const techStackArrays = temp.map(project => project.techStack);
          const allTechStacks = techStackArrays.flat();
          const trimmedTechStacks = allTechStacks.map((tech) => tech.trim())
          // trimmedTechStacks.unshift('*')
          const uniqueTechStacks = [...new Set(trimmedTechStacks)];
          setTechStack(uniqueTechStacks);
        }
      } else {
        window.alert("Error in data retrieval.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }


  const [techStack, setTechStack] = useState([])
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    if (projects) {
      projects.sort((a, b) => a.sequence - b.sequence)
      setProjectList(projects)
      const techStackArrays = projects.map(project => project.techStack);
      const allTechStacks = techStackArrays.flat();
      const trimmedTechStacks = allTechStacks.map((tech) => tech.trim())
      // trimmedTechStacks.unshift('*')
      const uniqueTechStacks = [...new Set(trimmedTechStacks)];
      setTechStack(uniqueTechStacks);
      // console.log(uniqueTechStacks);
    }
    else {
      fetchUserData();
    }
  }, [projects])

  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    isotope.current = new Isotope(".works-items", {
      itemSelector: ".works-col",
      //    layoutMode: "fitRows",
      percentPosition: true,
      masonry: {
        columnWidth: ".works-col",
      },
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });
    const itemsToShow = noViewMore ? ".works-col" : ".works-col:nth-child(-n+6)";
    isotope.current.arrange({ filter: itemsToShow });
    return () => isotope.current.destroy();
  });
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "active" : "");
  return (
    <Fragment>
      <div className="works-box works-list">
        <div
          className="filter-links scrolla-element-anim-1 scroll-animate"
          data-animate="active"
        >
          <a
            className={`c-pointer lui-subtitle ${activeBtn("*")}`}
            onClick={handleFilterKeyChange("*")}
            data-href=".works-col"
          >
            All
          </a>
          {techStack.map((stack, index) => {
            let lowerCaseStack = stack.trim().toLowerCase();
            return (
              <a
                className={`c-pointer lui-subtitle ${activeBtn(`sorting-` + lowerCaseStack)}`}
                onClick={handleFilterKeyChange(`sorting-${lowerCaseStack}`)}
                data-href={`.sorting-${lowerCaseStack}`}
                key={index}
              >
                {stack}
              </a>
            )
          })}
        </div>
        <div className="works-items works-list-items row">
        {
            projectList?.map((project, index) => {
              let classString = "";
              project.techStack.forEach((item) => { classString += `sorting-${item.trim().toLowerCase()} ` })
              console.log(classString)
              return (
                project.enabled && <div className={`works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 ${classString.toString()}`}>
                  <div
                    className="works-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="image">
                      <div className="img">
                        <Link legacyBehavior href="/work-single">
                          <a>
                            <img
                              decoding="async"
                              // src="assets/images/work4.jpeg"
                              src={project.image.url}
                              alt={project.title}
                            />
                            <span className="overlay" />
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="desc">
                      <span className="category"> {project.techStack.map((tech, index) => {
                        return index !== 0 ? ", " + tech.trim() : tech.trim()
                      })}</span>
                      <h5 className="name">
                        <Link legacyBehavior href="/work-single">
                          <a>{project.title}</a>
                        </Link>
                      </h5>
                      <div className="text">
                        <p>
                          {
                            project.description ? project.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
                          }
                        </p>
                      </div>
                      <Link legacyBehavior href="/work-single">
                        <a className="lnk">See project</a>
                      </Link>
                    </div>
                    <div
                      className="bg-img"
                      style={{
                        backgroundImage: "url(assets/images/pat-2.png)",
                      }}
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </Fragment>
  );
};
export default PortfolioIsotopeList;
