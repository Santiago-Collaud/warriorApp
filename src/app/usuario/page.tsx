"use client";
import LabelNovedades from "../novedades/page";
import Footer from "../components/footer/footer";

export default function UserPage() {
  
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <LabelNovedades />
      </div>
     <div>
        <Footer/>
    </div>   
  </div>
);
}