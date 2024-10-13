import subprocess
import json
class Profile():
    def __init__(self, *, name, school, email, number, linkedin, github, gpa,
    schoollocation ="Dallas, TX", schoolstartdate = "Aug. 2021", schoolenddate="Dec 2024", degreetype="Bachelors of Science",
    major = "Computer Science"):
        self.name = name
        self.school = school
        self.email = email 
        self.number = number
        self.linkedin = linkedin
        self.github = github
        self.schoollocation = schoollocation
        self.gpa = gpa
        self.schoolstartdate = schoolstartdate
        self.schoolenddate = schoolenddate
        self.degreetype = degreetype
        self.major = major
        ...

    def totex(self):
        lines = ["\\begin{center}"]
        lines.append(f"\\textbf{{\\Huge \\scshape {self.name}}} \\ \\ \\vspace{{1pt}}\n")
        minilist = []
        if self.number:
            minilist.append(f"\\small {self.number} $|$")
        if self.email:
            minilist.append(f"\\href{{mailto:{self.email}}}{{\\textcolor{{blue}}{{\\underline{{{self.email}}}}}}}  $|$")
        if self.linkedin:
            minilist.append(f"\\href{{{self.linkedin}}}{{\\textcolor{{blue}}{{\\underline{{{self.linkedin}}}}}}} $|$")
        if self.github:
            minilist.append(f"\\href{{{self.github}}}{{\\textcolor{{blue}}{{\\underline{{{self.github}}}}}}}")
        lines.append("\n".join(minilist))
        lines.append("\\end{center}")

        # add education 
        lines.append("\\section{Education}")
        lines.append("\\resumeSubHeadingListStart")
        lines.append("\\resumeSubheading")
        lines.append(f"{{{self.school}}}{{{self.schoollocation}}}")
        lines.append(f"{{{self.degreetype} in {self.major}}}{{{self.schoolstartdate} -- {self.schoolenddate}. GPA: {self.gpa}}}")
        lines.append(f"\\resumeSubHeadingListEnd")

        # post proc
        newlist = []
        for line in lines:
            newlist.append(f"{line}\n")
        return newlist

class Experience():
    def __init__(self, company, title, technologieslist, startdate, enddate, location,
    bulletlist):
        self.company = company
        self.title = title 
        self.technologieslist = technologieslist
        self.startdate = startdate
        self.enddate = enddate
        self.location = location
        self.bulletlist = bulletlist
        ...
    def totex(self):
        lines = ["\\resumeSubheading"]
        lines.append(f"{{{self.company}}}{{{self.startdate} -- {self.enddate}}}")
        lines.append(f"{{{self.title} ({', '.join(self.technologieslist)})}} {{{self.location}}}")
        lines.append(f"{{{self.title} ({', '.join(self.technologieslist)})}} {{{self.location}}}")
        lines.append("\\resumeItemListStart")
        
        for bulletpoint in self.bulletlist:
            lines.append(f"\\resumeItem{{{bulletpoint}}}")
        lines.append("\\resumeItemListEnd")

        # post processing
        newlines = []
        for line in lines:
            newlines.append(f"{line}\n")
        return newlines
        ...

class Project():
    def __init__(self, projectname, techlist, bulletlist, projectstartdate, projectenddate, projectlink=None):
        self.projectname = projectname
        self.projectlink = projectlink
        self.techlist = techlist
        self.bulletlist = bulletlist
        self.projectstartdate = projectstartdate
        self.projectenddate = projectenddate

    def totex(self):
        lines = ["\\resumeProjectHeading"]
        linktitle = f"\\href{{{self.projectlink}}}{{\\textcolor{{blue}}{{\\underline{{\\textbf{{{self.projectname}}}}}}}}}"
        regulartitle=f"\\textbf{{{self.projectname}}}"

        lines.append(f"{{ {linktitle if self.projectlink else regulartitle} $|$ \\emph{{{', '.join(self.techlist)}}}}}{{{self.projectstartdate} -- {self.projectenddate}}}")
        lines.append(f"{{ {linktitle if self.projectlink else regulartitle} $|$ \\emph{{{', '.join(self.techlist)}}}}}{{{self.projectstartdate} -- {self.projectenddate}}}")
        lines.append("\\resumeItemListStart\n")
        lines.extend([f"\\resumeItem{{{bullet}}}" for bullet in self.bulletlist])
        lines.append("\\resumeItemListEnd\n")
        # post proc
        newlines = []
        for line in lines:
            newlines.append(f"{line}\n")
        return newlines

class Skills():
    def __init__(self, strtolistmap):
        self.map = strtolistmap
        ...
    def totex(self, ):
        sections = self.map.keys()
        # lines = ["\\section{Technical Skills}\n \\begin{itemize}[leftmargin=0.15in, label={}]"]
        backslash = "\\"
        newline = "\n"
        def skilllist(section):
            return f": {', '.join(self.map[section])}"
        lines =[f"""{f"{backslash}textbf{{{section}}}{{{skilllist(section=section)}}}"} {backslash * 2}""" for section in sections]
        sentences = "\n".join(lines)
        res  = f"""{backslash}small{{{backslash}item {newline}{{{sentences}}}}}"""
        backslash = "\\"
        newline = "\n"
        def skilllist(section):
            return f": {', '.join(self.map[section])}"
        lines =[f"""{f"{backslash}textbf{{{section}}}{{{skilllist(section=section)}}}"} {backslash * 2}""" for section in sections]
        sentences = "\n".join(lines)
        res  = f"""{backslash}small{{{backslash}item {newline}{{{sentences}}}}}"""
        lines = ["\n\\section{Technical Skills} \n \\begin{itemize}[leftmargin=0.15in, label={}]\n", res, "\n \\end{itemize}\n"]
        return lines

class Compiler():
    def __init__(self, profile, experiencelist, projectlist, skill_map):
        with open("pre.tex", "r") as pretex:
            self.pretex = pretex.read()
        self.profile = profile
        self.experiencelist = experiencelist
        self.projectlist = projectlist
        self.skill_map = skill_map


        with open("post.tex", "r") as postex:
            self.postex = postex.read()
    
    def compileresume(self):
        lines = [self.pretex]
        lines.extend(self.profile.totex())

        # if we have experiences
        if self.experiencelist:
            lines.append("\\section{Experience}\n \\resumeSubHeadingListStart\n")
            for experience in self.experiencelist:
                lines.extend(experience.totex())
            lines.append("\\resumeSubHeadingListEnd")

        # if we have projects
        if self.projectlist:
            lines.append("\\section{Projects}\n \\resumeSubHeadingListStart\n")
            for project in self.projectlist:
                lines.extend(project.totex())
            lines.append(" \\resumeSubHeadingListEnd\n")

        
        lines.extend(self.skill_map.totex())
        
        lines.append(self.postex)

        with open("main.tex", "w") as output:
            # output.writelines([f"{line}\n" for line in lines])
            output.writelines(lines)

        subprocess.run(["./compile.sh"])
    # next is to run the command
    @staticmethod
    def fromjson(jsonitem):
        asjson = jsonitem
        profilejson = asjson["profile"]
        profile = Profile(name=profilejson["name"], school=profilejson["school"], number=profilejson["number"],
            email=profilejson["email"], linkedin=profilejson["linkedin"], github=profilejson["github"], gpa=profilejson["gpa"],
            schoollocation=profilejson["schoollocation"], schoolstartdate=profilejson["schoolstartdate"], schoolenddate=profilejson["schoolenddate"],
            degreetype=profilejson["degreetype"], major=profilejson["major"])
        projectlist = []
        for projectjson in asjson["projectlist"]:
            # projectname, techlist, bulletlist, projectstartdate, projectenddate, projectlink=None
            project = Project(projectname=projectjson["projectname"], techlist=projectjson["techlist"], 
            bulletlist=projectjson["bulletlist"], projectstartdate = projectjson["projectstartdate"], 
            projectenddate=projectjson["projectenddate"], projectlink=projectjson["projectlink"])

            projectlist.append(project)
        experiencelist = []
        for experiencejson in asjson["experiencelist"]:
            experience = Experience(company=experiencejson["company"], title=experiencejson["title"], technologieslist = experiencejson["technologieslist"],
            startdate = experiencejson["startdate"], enddate=experiencejson["enddate"], location = experiencejson["location"],
            bulletlist = experiencejson["bulletlist"])

            experiencelist.append(experience)
            ...
        
        skills = Skills(asjson["skill_map"])
        
        return Compiler(profile=profile, projectlist=projectlist, experiencelist=experiencelist,
        skill_map=skills)
        ...

# compiler = Compiler(profile =profile, experiencelist = [experience], projectlist = [project], skill_map=skill_map)

# compiler.compileresume()
# compile(
def test():
    with open("message.txt", "r") as response:
        text = response.read()
        text = text.replace("%", " percentage ")
        res = json.loads(text)
        compiler = Compiler.fromjson(res)
        compiler.compileresume()