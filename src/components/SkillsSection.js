export function SkillsSection({ skills }) {
    let skillParts;
    if (skills) {
        skills.sort((a, b) => a.sequence - b.sequence);
        const enabledSkills = skills.filter((skill) => skill.enabled)
        // Function to chunk an array into smaller arrays
        function chunkArray(array, chunkSize) {
            return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
                array.slice(index * chunkSize, (index + 1) * chunkSize)
            );
        }
        // calculating chunk size based on number of columns 
        const chunkSize = Math.ceil(enabledSkills.length / 3);
        skillParts = chunkArray(enabledSkills, chunkSize);
    }
    return (
        <section className="lui-section lui-gradient-center" id="skills-section">
            {/* Heading */}
            <div className="lui-heading">
                <div className="container">
                    <div className="m-titles align-center">
                        <h2
                            className="m-title splitting-text-anim-1 scroll-animate"
                            data-splitting="words"
                            data-animate="active"
                        >
                            <span> Professional Skills </span>
                        </h2>
                        <div
                            className="m-subtitle splitting-text-anim-1 scroll-animate"
                            data-splitting="words"
                            data-animate="active"
                        >
                            <span>
                                {" "}
                                my <b>Talent</b>{" "}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Skills */}
            <div className="v-line v-line-left">
                <div className="container">
                    <div className="row">
                        {skillParts.map((part, columnIndex) => (
                            <div key={columnIndex} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div className="skills-items">
                                    {part.map((skill, index) => (
                                        //mapping each item and displaying if enabled is true
                                        skill.enabled &&
                                        <div key={index} _id={skill._id} className="skills-item scrolla-element-anim-1 scroll-animate" data-animate="active">
                                            <h6 className="name">
                                                <img src={skill.image.url} alt={skill.name} public_id={skill.image.public_id} _id={skill.image._id} />
                                                <span> {skill.name} </span>
                                            </h6>
                                            <div className="text">
                                                <div>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                                        elit, sed do eiusmod tempor incididunt ut labore et
                                                        dolore magna aliqua.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dots">
                                                <div className="dot" style={{ width: `${skill.percentage}%` }}>
                                                    <span />
                                                </div>
                                            </div>
                                            <div className="value">
                                                <span className="num">
                                                    {skill.percentage} <span>%</span>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lui-bgtitle">
                        <span> Skills </span>
                    </div>
                </div>
            </div>
        </section>
    )
}