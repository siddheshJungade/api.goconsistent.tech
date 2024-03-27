import * as puppeteer from 'puppeteer'
import fs from 'fs'
import showdown from 'showdown';
import Handlebars from 'handlebars'

// Step 1: Retrieve data from the database (replace this with your database query)
const fetchDataFromDatabase = () => {
    // Simulated data for demonstration
    return {
        title: 'Sample Title',
        content: 'Sample Content'
    };
};

// Step 2: Read the Markdown template file
const readMarkdownTemplate = () => {
    return fs.readFileSync('./assets/example.md', 'utf-8');
};

// Step 3: Populate the template with the data
const populateTemplate = (compiledTemplate: HandlebarsTemplateDelegate<any>, data: any) => {
    const newData = {
        TITLE: data.personalDetails['First Name'] + " " + data.personalDetails['Last Name'],
        EMAIL: data.personalDetails["Email"],
        EMAIL_LINK: `mailto:${data.personalDetails['Email']}`,
        PHONE_NO: data.personalDetails["Phone No"],
        LINKEDIN_URL: data.personalDetails["Linkedin URL"],
        GITHUB_URL: data.personalDetails["Github URL"],
        EDUCATION_LIST: data.educationDetails.map((item: any) => ({ COLLAGE_NAME: item['College/School Name'], COLLAGE_YEAR: item['Year'], COLLAGE_COURSE: item['Course'], COLLAGE_LOCATION: item['Location'] })),
        EXPERIENCE_LIST: data.experienceDetails.map((item: any) => ({COMPANY_NAME: item['Company'],COMPANY_YEAR: item['Date'],JOB_ROLE: item['Role'],COMPANY_LOCATION: item['Location'],DESCRIPTIONS: item['descriptions']})),
        PROJECT_LIST: data.projectDetails.map((item: any) => ({PROJECT_NAME: item['Project Name'],PROJECT_LINK: item['Link'],PROJECT_TECH: item['Tech'],DESCRIPTIONS: item['descriptions']})),
        SKILL_LIST: data.skillDetails.map((item: any) => ({CATEGORY: item['Skill Category'],SKILLS: item['Skills']}) )
    }
    return compiledTemplate(newData)
};

// Step 4: Convert Markdown to HTML using Showdown
const convertToHtml = (markdown: string) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(markdown);
};

// Step 5: Generate PDF using Puppeteer
const generatePdf = async (html: string, customCSS: string | null | undefined) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    if (customCSS) {
        await page.addStyleTag({ content: customCSS });
    }
    const buffer = await page.pdf({ path: 'output.pdf', format: 'A4' });
    console.log(buffer)
    await browser.close();
};

// Main function to orchestrate the process
const main = async (resumeData: any) => {
    try {
        // const data = fetchDataFromDatabase();
        const template = readMarkdownTemplate();
        let customCSS = fs.readFileSync('./assets/styles.css', 'utf-8');
        const compiledTemplate = Handlebars.compile(template);

        const populatedTemplate = populateTemplate(compiledTemplate, resumeData.resumeDataState);
        const html = convertToHtml(populatedTemplate);
        await generatePdf(html, customCSS);
    } catch (e) {
        throw e
    }
};

// Call the main function
main({
    "resumeDataState": {
        "educationDetails": [
            {
                "College/School Name": "Govt. College Of Engineering, Yavatmal",
                "Course": "B.Tech",
                "Location": "Yavatmal, Maharashatra, India",
                "Year": "2019-2022"
            }
        ],
        "experienceDetails": [
            {
                "descriptions": [
                    "Developed an admin portal that empowered the operational team with a user-friendly interface for managing user information, tracking commissions, and updating contract statuses.",
                    " Developed Bulk Status Update feature processing over 1000 records daily, reducing status update time by 80%. Implemented short polling for progress tracking and efficient background job processing. Enabled bulk modifications using JSON or Excel for enhanced flexibility.",
                    "Implemented broker onboarding automation with AWS Cognito for seamless contract generation and integrated JIRA API for efficient service management, reducing onboarding time from hours to minutes while minimizing repetitive tasks.",
                    "Implemented a customized PDF download functionality using the PDF Kit library, enabling customers to download personalized quotes generated specifically for them. This feature ensures that each customer can access and download their unique quote in PDF format, enhancing the user experience and providing tailored information.",
                    "Developed a user-friendly real-time data visualization app for management, featuring dynamic charts for live broker and contract performance insights, aiding informed decisions.",
                    " Designed and developed a flexible Commission Management System for efficient allocation of commissions in energy contracts. It offers seamless integration of supplier terms, adaptability to evolving requirements, and facilitates effortless generation of broker invoices, prioritizing operational efficiency in managing commission-related transactions.",
                    "Engaged in diverse development tasks, including automation (such as Docker files, CI/CD automation, unit testing, and end-to-end testing), meticulous documentation, and active client collaboration, all aimed at ensuring seamless project execution and maximum user satisfaction."
                ],
                "Company": " Digital API Craft",
                "Role": "Associate Technical Specialist",
                "Location": "Bangalore, India",
                "Date": "2019-2022"
            },
            {
                "descriptions": [
                    "Took an active role in testing and development tasks, demonstrating commitment to ensuring the quality and functionality of software systems."
                ],
                "Company": "Hexaware Technologies",
                "Role": "Graduate Engineer Trainee",
                "Location": "Pune, India",
                "Date": "Jun 2022 - Dec 2022"
            }
        ],
        "projectDetails": [
            {
                "descriptions": [
                    "The RFID-based Vehicle Smart Parking System streamlines parking management tasks at businesses and malls, including issuing tokens, tracking entry and exit times, calculating fees, and collecting payments."
                ],
                "Project Name": " Smart Car Parking System",
                "Tech": "Python, socket.io, PostgreSQL, Raspbarrypi & React",
                "Link": "https://github.com/siddheshJungade/SmartCarParkingRFID"
            }
        ],
        "achievementDetails": [
            {
                "descriptions": [
                    "Postman API Fundamentals Student Expert."
                ],
                "Achievements": " Azure AZ-900 Cloud Fundamentals"
            },
            {
                "descriptions": [
                    "Azure AZ-900 Cloud Fundamentals"
                ],
                "Achievements": "Postman API Fundamentals Student Expert."
            }
        ],
        "skillDetails": [
            {
                "Skill Category": "Languages",
                "Skills": "JavaScript, Typescript, Java, Python, C++, HTML5, and CSS3"
            },
            {
                "Skill Category": "Technologies",
                "Skills": "Node.js, Express, Rest API, AWS ( VPC, EC2,ELB, IAM, DMS, DynomoDb, ECS, ECR, RDS, S3, API Getway, EventBridge, Lambda,Secrets Manager, SNS , SQS, SES ), Nest.JS, Docker, Next.js, MySQL, MongoDB, PostgreSQL, Appsmith, Postman and GitHub Action"
            },
            {
                "Skill Category": "Concepts",
                "Skills": "OOPS, Backend Design Patterns, DBMS, Computer Networks, Low Level Design, High Level Design, Data Structures and Algorithms and Cloud"
            }
        ],
        "personalDetails": {
            "First Name": "Siddhesh",
            "Last Name": "Jungade",
            "Email": "siddheshjungade@gmail.com",
            "Phone No": "+91 7020276567",
            "Github URL": "https://github.com/siddheshJungade",
            "Linkedin URL": "https://www.linkedin.com/in/siddheshjungade/"
        }
    }
}).catch(error => console.error(error));