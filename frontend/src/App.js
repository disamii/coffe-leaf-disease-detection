import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./components/MainHome/ContactUs";
import AboutUs from "./components/MainHome/AboutUs";
import SignUp from "./components/auth/SignUp";
import LoginWithRedirect from "./components/auth/LoginWithRedirect";
import Farmer from "./components/Farmerpage/Farmer";

import HomeOfMain from "./components/MainHome/HomeOfMain";
import FarmerPage from "./components/Farmerpage/Page";
import ResearcherPage from "./components/Researcher/Page";
import Result from "./components/Farmerpage/Result";
import Researcher from "./components/Researcher/Researcher";
import FileUploadTrain from "./components/Researcher/FileUploadTrain";
import TrainResult from "./components/Researcher/TrainResult";
import TestResult from "./components/Researcher/TestResult"
import "../src/styling/App.css";
import FileUploadTest from "./components/Researcher/FileUploadTest";
import UploadImageFR from "./components/Researcher/UploadImage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Unauthorized from "./components/auth/Unauthorized";
import UnsignedFarmer from "./components/MainHome/UnsignedFarmer";
import UnsignedResearcher from "./components/MainHome/UnsignedResearcher";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* global routes */}
          <Route path="/" element={<HomeOfMain />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<LoginWithRedirect />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/unsigned_farmer" element={<UnsignedFarmer/>}/>
          <Route path="/unsigned_researcher" element={<UnsignedResearcher/>}/>
          
            {/* Protected Farmer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['farmer']} />}>
          <Route path="/farmer" element={<FarmerPage />}>
            <Route index element={<Farmer />} />
            <Route path="predicted_result/" element={<Result />} />
          </Route>
        </Route>

        {/* Protected Researcher Routes */}
        <Route element={<ProtectedRoute allowedRoles={['researcher']} />}>
          <Route path="/researcher" element={<ResearcherPage />}>
            <Route index element={<Researcher />} />
            <Route path="train-model" element={<FileUploadTrain />} />
            <Route path="train-model/result" element={<TrainResult />} />
            <Route path="test-model" element={<FileUploadTest />} />
            <Route path="test-model/result" element={<TestResult />} />
            <Route path="predict_coffe_leaf" element={<UploadImageFR />} />
            <Route path="predicted_result/" element={<Result />} />
          </Route>
        </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
