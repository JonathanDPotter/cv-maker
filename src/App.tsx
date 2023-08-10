import { v4 as uuid } from "uuid";
import Form from "./components/Form";
import { useState } from "react";

export interface Labels {
  key: string;
  label: string;
}

const App = () => {
  // state for all of the forms
  const [contactState, setContactState] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [educationState, setEducationState] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
  });

// array of form info to map into the form objects
  const forms = [
    {
      key: uuid(),
      legend: "Contact information",
      state: contactState,
      setter: setContactState,
      labels: Object.keys(contactState).map((label) => {
        return {
          key: uuid(),
          label,
        };
      }) as Labels[],
    },
    {
      key: uuid(),
      legend: "Education",
      state: educationState,
      setter: setEducationState,
      labels: Object.keys(educationState).map((label) => {
        return { key: uuid(), label };
      }),
    },
  ];

  return (
    <div className="flex">
      <section className="w-[50%] m-2 flex flex-col gap-2">
        {forms && forms.map((formData) => <Form {...formData} />)}
      </section>
      <section className="w-[50]">
        {contactState &&
          Object.keys(contactState).map((key, i) => (
            <p key={key}>
              {key}: {Object.values(contactState)[i]}{" "}
            </p>
          ))}
      </section>
    </div>
  );
};
export default App;
