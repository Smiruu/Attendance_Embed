import React from "react";
import { useClasses } from "../../hooks/useClasses";

function ClassesComponent() {
  const classes = useClasses();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-extrabold mb-4 text-[#4B3A34]">
        ONGOING CLASSES
      </h2>

      {classes.map((cls) => (
        <div
          key={cls.id}
          className="bg-[#4B3A34] text-white p-4 rounded-lg mb-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">{cls.name}</span>
            <span className="font-bold">{cls.course}</span>
            <span className="font-bold">{cls.room}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="italic text-sm">{cls.time}</span>
            <span className="text-sm font-semibold">
              STATUS: {cls.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClassesComponent;
