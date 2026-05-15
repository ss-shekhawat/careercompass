import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Header } from "./Header";
import { useGetProfileQuery } from "../redux/services/studentApi";

const StudentLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user: reduxUser, isLoggedIn } = useSelector(
    (state) => state.userInfo,
  );

  const {
    data: apiStudentData,
    isLoading,
    isError,
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const studentData = apiStudentData || reduxUser;

  if (isLoading && !studentData)
    return (
      <p className="p-4" style={{ color: "#64748B" }}>
        Loading...
      </p>
    );
  if (isError && !studentData)
    return (
      <p className="p-4" style={{ color: "#DC2626" }}>
        Failed to load student profile.
      </p>
    );
  if (!studentData)
    return (
      <p className="p-4" style={{ color: "#64748B" }}>
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <Sidebar
        userType={studentData.role}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="lg:pl-60">
        <Header title={title} user={studentData} />
        <main className="p-4 sm:p-6 lg:p-8" role="main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
