import { useState } from "react";

export function useClasses() {
  const [classes] = useState([
    {
      id: 1,
      name: "DIGISIGNAL",
      course: "CPE - 401",
      room: "SH - 315",
      time: "11:45 AM - 1:15 PM",
      status: "ONGOING",
    },
    {
      id: 2,
      name: "FUNMIXSIG",
      course: "CPE - 302",
      room: "SH - 407",
      time: "1:30 PM - 3:00 PM",
      status: "UPCOMING",
    },
    {
      id: 3,
      name: "NUMERICALS",
      course: "CPE - 201",
      room: "SH - 314",
      time: "4:30 PM - 6:00 PM",
      status: "UPCOMING",
    },
  ]);

  return classes;
}
