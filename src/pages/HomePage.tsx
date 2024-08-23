import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUser, clearAllUserErrors } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FolderKanban, Cpu, Timer } from "lucide-react";

const HomePage = () => {
  // const dispatch = useDispatch();
  // const navigateTo = useNavigate();
  // const { isAuthenticated, error, message } = useSelector(
  //   (state) => state.user
  // );

  // const handelLogout = () => {
  //   dispatch(logout());
  //   dispatch(clearAllUserErrors());
  // };

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigateTo("/login");
  //   }
  //   if (error) {
  //     console.log(error);
  //   }
  //   if (message !== null) {
  //     console.log(message);
  //     dispatch(getUser());
  //   }
  // }, [error, isAuthenticated, message, navigateTo]);

  return (
    <div>
      <header className="pb-6">Dashboard</header>
      <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-center">
        <div className="flex flex-col px-5 py-3 border rounded-lg border-border2 sm:min-w-[250px] shadow-sm w-full">
          <div className="flex items-center justify-between mb-3">
            <p>Projet of me</p>
            <FolderKanban />
          </div>
          <span className="text-[40px]">9</span>
        </div>
        <div className="flex flex-col px-5 py-3 border rounded-lg border-border2 min-w-[250px] shadow-sm w-full">
          <div className="flex items-center justify-between mb-3">
            <p>Skills of me</p>
            <Cpu />
          </div>
          <span className="text-[40px]">9</span>
        </div>
        <div className="flex flex-col px-5 py-3 border rounded-lg border-border2 min-w-[250px] shadow-sm w-full">
          <div className="flex items-center justify-between mb-3">
            <p>Timeline of me</p>
            <Timer />
          </div>
          <span className="text-[40px]">9</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
