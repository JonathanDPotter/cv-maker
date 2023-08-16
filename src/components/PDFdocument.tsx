import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { Contact, Education, Experience } from "../App";
import { FC } from "react";
// Create styles
const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

interface Props {
  contactState: Contact[];
  educationState: Education[];
  experienceState: Experience[];
}

const PDFdocument: FC<Props> = ({
  contactState,
  educationState,
  experienceState,
}) => {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page
          size="LETTER"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              height: 150,
              backgroundColor: "#666",
              color: "#fff",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                marginTop: 30,
              }}
            >
              {contactState[0].fullName}
            </Text>
            <Text style={{ textAlign: "center" }}>
              {contactState[0].address}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <Text>{contactState[0].phoneNumber}</Text>
              <Text>{contactState[0].email}</Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 10,
            }}
          >
            <View
              style={{
                display: `${educationState[0].school ? "flex" : "none"}`,
              }}
            >
              <Text
                style={{
                  backgroundColor: "#ddd",
                  marginHorizontal: 20,
                  padding: 10,
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  borderRadius: 5,
                }}
              >
                Education
              </Text>
              {educationState.map((education, i) => (
                <View key={`education${i}`}>
                  <View
                    style={{
                      marginHorizontal: 20,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "30%" }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Text>
                          {education.startDate ? education.startDate + "-" : ""}
                        </Text>
                        <Text>{education.endDate}</Text>
                      </View>
                      <Text>{education.location}</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>
                        {education.school}
                      </Text>
                      <Text>{education.degree}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View
              style={{
                display: `${experienceState[0].companyName ? "flex" : "none"}`,
              }}
            >
              <View>
                <Text
                  style={{
                    backgroundColor: "#ddd",
                    marginHorizontal: 20,
                    padding: 10,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    borderRadius: 5,
                  }}
                >
                  Experience
                </Text>
              </View>
              {experienceState.map((experience, i) => (
                <View key={`experience${i}`}>
                  <View
                    style={{
                      marginHorizontal: 20,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "30%", display: "flex", gap: 5 }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Text>
                          {experience.startDate
                            ? experience.startDate + "-"
                            : ""}
                        </Text>
                        <Text>{experience.endDate}</Text>
                      </View>
                      <Text>{experience.location}</Text>
                    </View>
                    <View style={{ width: "70%", display: "flex", gap: 5 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {experience.companyName}
                      </Text>
                      <Text>{experience.positionTitle}</Text>
                      <Text>{experience.description}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default PDFdocument;
