import { Contact, Education, Experience } from "../App";
import { FC } from "react";

interface Props {
  contactState: Contact[];
  educationState: Education[];
  experienceState: Experience[];
}

const MobileCV: FC<Props> = ({
  contactState,
  educationState,
  experienceState,
}) => {
  return (
    <div className="flex-1 min-h-screen pb-[20px] border-[20px]">
      <div className="h-[150px] bg-[#666] text-white p-[10px] flex flex-col gap-[10px]">
        <p className="text-2xl text-center mt-[30px]">
          {contactState[0].fullName}
        </p>
        <p className="text-center text-sm">{contactState[0].address}</p>
        <div className="flex w-auto justify-center gap-[20px] text-sm">
          <p>{contactState[0].phoneNumber}</p>
          <p>{contactState[0].email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[10px] mt-[10px]">
        <div
          className={`${
            educationState[0].school ? "flex flex-col gap-10" : "hidden"
          }`}
        >
          <p className="block w-auto bg-[#ddd] mx-[20px] p-[10px] text-center text-xl font-bold rounded">
            Education
          </p>
          {educationState.map((education, i) => (
            <div key={`education${i}`}>
              <div className="mx-[20px] flex flex-row">
                <div className="min-w-[30%]">
                  <div className="flex">
                    <p>
                      {education.startDate ? education.startDate + "-" : ""}
                    </p>
                    <p>{education.endDate}</p>
                  </div>
                  <p>{education.location}</p>
                </div>
                <div className="flex flex-col flex-1 gap-[5px]">
                  <p className="font-bold">{education.school}</p>
                  <p>{education.degree}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`${
            experienceState[0].companyName ? "flex flex-col gap-10" : "hidden"
          }`}
        >
          <div>
            <p className="block w-auto bg-[#ddd] mx-[20px] p-[10px] text-center text-xl font-bold rounded">
              Experience
            </p>
          </div>
          {experienceState.map((experience, i) => (
            <div key={`experience${i}`}>
              <div className="mx-[20px] flex">
                <div className="min-w-[30%] flex flex-col gap-[5px]">
                  <div className="flex">
                    <p>
                      {experience.startDate ? experience.startDate + "-" : ""}
                    </p>
                    <p>{experience.endDate}</p>
                  </div>
                  <p>{experience.location}</p>
                </div>
                <div className="flex flex-col flex-1 gap-[5px]">
                  <p className="font-bold">{experience.companyName}</p>
                  <p>{experience.positionTitle}</p>
                  <p>{experience.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MobileCV;
