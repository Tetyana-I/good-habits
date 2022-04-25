import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import HabitList from "../habits/HabitList";
import GuideList from "./GuideList";

// Homepage of site.
// Shows welcome message or login/register buttons.
// 
// Routed at /
//  Routes -> Homepage

function Homepage() {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
        <div className="container text-center">
          {currentUser
              ? <HabitList />
              : (
                  <div>
                    <h2 className="mb-4 font-weight-bold">Let's get started!</h2>
                    <p className="lead">"People do not decide their futures, they decide their habits and their habits decide their futures"</p>
                    <p> - F.M Alexander</p>
                    <Link className="btn btn-primary font-weight-bold m-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-outline-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link>
                    <GuideList /> 
                  </div>
              )}
        </div>
      </div>
  );
}

export default Homepage;