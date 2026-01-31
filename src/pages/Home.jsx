import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="container">
      <header>
        <nav>
          Home&nbsp;|&nbsp;<Link to="/log">Log &#9679; 日志</Link>
        </nav>
      </header>

      <section className="profile-section">
        <div className="profile-info">
          {/* 修正：style 必须是对象，且属性名是驼峰式 textAlign */}
          <p style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Hong Lanxuan
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            <em>lhongae [at] connect [dot] ust [dot] hk</em>
          </p>
          <p>
            My name is 洪澜轩, and I go by <b>Lanxuan</b>. I am a third-year
            undergraduate studying Computer Science &amp; Electronic Engineering
            at the Hong Kong University of Science &amp; Technology (HKUST).
          </p>
          <p>
            I'm passionate about building technologies to connect the digital
            and physical worlds, especially through prototyping and building
            machines that interact with people and their environment.
          </p>
          <p>
            My favorite game is{" "}
            <a
              href="https://www.klei.com/games/oxygen-not-included"
              target="_blank">
              Oxygen Not Included
            </a>
            , and I am a super football (soccer) fan. I maintain a{" "}
            <Link to="/log">Log</Link> page to document my thoughts,
            photography, snapshots of code, and gaming life. Feel free to
            explore!
          </p>
          <p>I was born and raised in Xiamen.</p>
          <p style={{ textAlign: "center" }}>
            <a href="mailto:lhongae@connect.ust.hk">Email</a>
            &nbsp;/&nbsp;
            <a href="/data/cv-lanxuan.pdf" target="_blank" rel="noreferrer">
              CV
            </a>
            &nbsp;/&nbsp;
            <a
              href="https://github.com/justlanxuan"
              target="_blank"
              rel="noreferrer">
              GitHub
            </a>
            {/*<!--<a href="https://scholar.google.com/citations?user=sZIz-M8AAAAJ" target="_blank"
                        >Google Scholar</a>
                      -->
                      <!-- <a href="https://gitlab.com/cryptoast"> GitLab </a> --> */}
          </p>
        </div>
        <div className="profile-photo">
          <img src="/avatar.jpg" alt="profile photo" />
        </div>
      </section>

      <section>
        <h1 className="sectiontitle">Courses</h1>
        <table className="project">
          <tbody>
            <tr>
              <td className="project">
                Winter 2026 @ University of Washington (Exchange)
                <hr />
                <ul>
                  <li>CSE 403 Software Engineering</li>
                  <li>CSE 443 Digital Accessibility</li>
                  <li>DXARTS 471 Mechatronic Art, Design And Fabrication</li>
                </ul>
                <details className="inline">
                  <summary>past semesters</summary>
                  <div>
                    Fall 2025 @ HKUST
                    <hr />
                    <ul>
                      <li>COMP 3031 Principles of Programming Language</li>
                      <li>ELEC 3120 Computer Communication Networks</li>
                      <li>ELEC 3200 System Modeling, Analysis and Control</li>
                      <li>MATH 2011 Introduction to Multivariable Calculus</li>
                      <li>
                        PHYS 1002 Introduction to Astrophysics and Astronomy
                      </li>
                    </ul>
                    Spring 2025 &#65312; HKUST
                    <hr />
                    <ul>
                      <li>
                        [{" "}
                        <a href="course/comp2012.pdf" target="_blank">
                          Note
                        </a>{" "}
                        ] COMP 2012 Object-oriented Programming and Data
                        Structures
                      </li>
                      <li>
                        [{" "}
                        <a href="course/comp2611.pdf" target="_blank">
                          Note
                        </a>{" "}
                        ] COMP 2611 Computer Organization
                      </li>
                      <li>
                        [{" "}
                        <a href="course/comp3211.pdf" target="_blank">
                          Note
                        </a>{" "}
                        ] COMP 3211 Fundamentals of Artificial Intelligence
                      </li>
                      <li>COMP 4971 Independent Work</li>
                      <li>ELEC 2400 Electronic Circuits</li>
                      <li>
                        [{" "}
                        <a href="course/comp5214.pdf" target="_blank">
                          Note
                        </a>{" "}
                        ] ELEC 5680 Advanced Deep Learning Architectures
                      </li>
                    </ul>
                    Fall 2024 &#65312; HKUST
                    <hr />
                    <ul>
                      <li>
                        [{" "}
                        <a href="course/comp3711h.pdf" target="_blank">
                          Note
                        </a>{" "}
                        ] COMP 3711H Honors Design and Analysis of Algorithms
                      </li>
                      <li>
                        [{" "}
                        <a href="course/comp4462.pdf" target="_blank">
                          Note
                        </a>{" "}
                        ] [
                        <a
                          href="course/comp4462-cheatsheet.pdf"
                          target="_blank">
                          Cheat Sheet
                        </a>{" "}
                        ] COMP 4462 Data Visualization
                      </li>
                      <li>
                        [{" "}
                        <a href="course/elec2100.pdf" target="_blank">
                          Note
                        </a>{" "}
                        ] ELEC 2100 Signals and Systems
                      </li>
                      <li>
                        [{" "}
                        <a href="course/elec3310.pdf" target="_blank">
                          Note
                        </a>{" "}
                        ] ELEC 3310 Digital Fundamentals and System Design
                      </li>
                      <li>LANG 1330 Spanish &#8544;</li>
                      <li>
                        [{" "}
                        <a href="course/phys1114.pdf" target="_blank">
                          Note
                        </a>{" "}
                        ] PHYS 1114 General Physics &#8545;
                      </li>
                    </ul>
                    Spring 2024 &#65312; HKUST
                    <hr />
                    <ul>
                      <li>COMP 2011 Programming with C++</li>
                      <li>COMP 2211 Exploring Artificial Intelligence</li>
                      <li>
                        [{" "}
                        <a href="course/elec1100.pdf" target="_blank">
                          Note
                        </a>{" "}
                        ] ELEC 1100 Introduction to Electro-Robot Design
                      </li>
                      <li>MATH 1014 Calculus &#8545;</li>
                      <li>PHYS 1112 General Physics &#8544;</li>
                    </ul>
                    Fall 2023 &#65312; HKUST
                    <hr />
                    <ul>
                      <li>COMP 1021 Introduction to Computer Science</li>
                      <li>
                        COMP 2711H Honors Discrete Mathematical Tools for
                        Computer Science
                      </li>
                      <li>
                        IEDA 2010 Introduction to Industrial Engineering and
                        Decision Analytics
                      </li>
                      <li>
                        LANG 1014 Advanced Academic English for University
                        Studies
                      </li>
                      <li>MATH 1013 Calculus &#8544;</li>
                    </ul>
                  </div>
                </details>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Home;
