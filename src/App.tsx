import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Form from "./components/Form";
import PDFdocument from "./components/PDFdocument";
import MobileCV from "./components/MobileCV";
import detectMobile from "./utils/detectMobile";

export interface Labels {
  key: string;
  label: string;
}

export interface Contact {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Experience {
  companyName: string;
  positionTitle: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

const App = () => {
  const [animated] = useAutoAnimate({ duration: 500 });
  const [isMobile] = useState(detectMobile(navigator.userAgent));

  console.log(navigator.userAgent);

  const contact = (): Contact => {
    return { fullName: "", email: "", phoneNumber: "", address: "" };
  };

  const education = (): Education => {
    return { school: "", degree: "", startDate: "", endDate: "", location: "" };
  };

  const experience = (): Experience => {
    return {
      companyName: "",
      positionTitle: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    };
  };

  // state for all of the forms
  const [contactState, setContactState] = useState([contact()]);

  const [educationState, setEducationState] = useState([education()]);

  const [experienceState, setExperienceState] = useState([experience()]);

  // array of form info to map into the form objects
  const forms = [
    {
      key: uuid(),
      legend: "Contact information",
      state: contactState,
      setter: setContactState,
      labels: Object.keys(contactState[0]).map((label) => {
        return { key: uuid(), label };
      }) as Labels[],
      index: 0,
      add: contact,
    },
    ...educationState.map((labels, i) => {
      return {
        key: uuid(),
        legend: "Education",
        state: educationState,
        setter: setEducationState,
        labels: Object.keys(labels).map((label) => {
          return { key: uuid(), label };
        }),
        index: i,
        add: education,
      };
    }),
    ...experienceState.map((labels, i) => {
      return {
        key: uuid(),
        legend: "Experience",
        state: experienceState,
        setter: setExperienceState,
        labels: Object.keys(labels).map((label) => {
          return { key: uuid(), label };
        }),
        index: i,
        add: experience,
      };
    }),
  ];

  return (
    <div className={`flex ${isMobile ? "flex-col" : ""} min-h-[100vh]`}>
      <section className="p-2 flex flex-col gap-2 min-w-[30vw]" ref={animated}>
        {forms && forms.map((formData) => <Form {...formData} />)}
      </section>
      <section className="flex-1">
        {isMobile ? (
          <MobileCV
            {...{ contactState }}
            {...{ educationState }}
            {...{ experienceState }}
          />
        ) : (
          <PDFdocument
            {...{ contactState }}
            {...{ educationState }}
            {...{ experienceState }}
          />
        )}
      </section>
    </div>
  );
};
export default App;
