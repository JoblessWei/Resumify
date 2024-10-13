template = """
type Profile = {
    name: string, // first and last name
    school: string, // school full name
    email: string,
    number: string, // US phone number as a string
    linkedin: string, //link to the linkedin profile of th eapplicant
    github: string, // github link 
    gpa: string, // GPA of the applicant
    schoollocation: string, // City and State in the US
    schoolstartdate: string, // Month and year. for example Aug. 2021
    schoolenddate: string, // Month and year. eg Dec. 2024
    degreetype: string, // eg Bachelors of science, masters degree
    major: string, // college major, eg computer science
}

type Experience = {
    company: string, // Company short name, eg Google, Amazon, Meta
    title: string, // title of the experinece, eg swe intern
    technologieslist: string[], // List of tecnologies used at expereince. max of 5
    startdate: string, // start date, eg Dec 21
    enddate: string, // end date, eg Aug 12
    location: string, // US city and state eg "Dallas Tx"
    bulletlist: string[], // what the user did at the experience. It should follow the format of solved x by using y achieving z. Max of 4, min of 2

}

type Project = {
    projectname: string, // Name of project
    techlist: string[], // List of technologies used. Max of 6
    bulletlist: string[], // What the user did or achieved. Just resume bullets. max of 4
    projectstartdate: string, // month then year, eg Aug 2023
    projectenddate: string, // month then year, eg Dec 2025
    projectlink: string | null // if the project link cant be found, return null
}

type Skillmap = Record<string, string[]> // Maps a category of skills to a list of skills. min of 3, max of 10. Eg {langauges: [python, java, flutter]...} The return should look like json or a python dict
/**
 * The skillmap is a bit more complicated but an example would look like this
 *
 * skill_map = {
    "Languages" : ["Java", "Python", "C/C++", "Javascript/Typescript", "Dart", "Rust"],
    "Frameworks" : ["React", "Node.js", "Spring", "JUnit", "DGS", "Material-UI", "Flutter", "NextJS", "Tailwind", "Expo/React-Native"],
    "Developer Tools" : ["AWS", "GraphQL", "Git", "Linux", "Terraform", "Firebase"]
}
 */

type Resume = {
    profile: Profile,
    experiencelist: Experience[],
    projectlist: Project[],
    skill_map: Skillmap
}
// profile, experiencelist, projectlist, skill_map
"""