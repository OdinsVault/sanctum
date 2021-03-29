const courses = [
    {
        courseId: '0001B',
        key: '0001B',
        courseName: 'Basic Syntax',
        description: '',
        level: 1,
        status: "completed",
        quizId: '00001BQ',
        questions: 5,
        completed: 5
    },
    {
        courseId: '0001D',
        key: '0001D',
        courseName: 'Data types',
        description: '',
        level: 2,
        status: "unlocked",
        quizId: '00001DQ',
        questions: 5,
        completed: 3
    },
    {
        courseId: '0001V',
        key: '0001V',
        courseName: 'Variables',
        description: '',
        level: 3,
        status: "locked",
        quizId: '00001VQ',
        questions: 4,
        completed: 0
    },
    {
        courseId: '0001O',
        key: '0001O',
        courseName: 'Operators',
        description: '',
        level: 4,
        status: "locked",
        quizId: '00001OQ',
        questions: 4,
        completed: 0
    },
    {
        courseId: '0001L',
        key: '0001L',
        courseName: 'Loops',
        description: '',
        level: 5,
        status: "locked",
        quizId: '00001LQ',
        questions: 4,
        completed: 0
    }
]

const quizzes = [
    {
        quizId: '00001BQ',
        courseId: '0001B',
        courseName: 'Basic Syntax',
        level: 1,
        questionList: [
            {
                questionId: '0001QQB',
                title: "The Big Bran Hypothesis",
                status: 'completed',
                attempts: 4,
                difficulty: "Easy"
            },
            {questionId: '0002QQB', title: "The Fuzzy Boots Corollary", status: '', attempts: 5, difficulty: "Easy"},
            {questionId: '0003QQB', title: "The Luminous Fish Effect", status: '', attempts: 0, difficulty: "Medium"},
            {
                questionId: '0004QQB',
                title: "The Hamburger Postulate",
                status: 'completed',
                attempts: 1,
                difficulty: "Medium"
            },
            {questionId: '0005QQB', title: "The Middle-earth Paradigm", status: '', attempts: 4, difficulty: "Hard"},
        ]
    },
    {
        quizId: '00001DQ',
        courseId: '0001D',
        courseName: 'Variables',
        level: 2,
        questionList: [
            {questionId: '0001QQV', title: "The Dumpling Paradox", status: '', attempts: 5, difficulty: "Easy"},
            {
                questionId: '0002QQV',
                title: "The Grasshopper Experiment",
                status: 'completed',
                attempts: 2,
                difficulty: "Easy"
            },
            {
                questionId: '0003QQV',
                title: "The Cooper-Hofstadter Polarization",
                status: 'completed',
                attempts: 6,
                difficulty: "Medium"
            },
            {questionId: '0004QQV', title: "The Loobenfeld Decay", status: '', attempts: 6, difficulty: "Medium"},
            {questionId: '0005QQV', title: "The Pancake Batter Anomaly", status: '', attempts: 0, difficulty: "Hard"},
        ]
    },
    {
        quizId: '00001VQ',
        courseId: '0001V',
        courseName: 'Data types',
        level: 3,
        questionList: [
            {questionId: '0001QQD', title: "The Jerusalem Duality", status: '', attempts: 3, difficulty: "Easy"},
            {
                questionId: '0002QQD',
                title: "The Bat Jar Conjecture",
                status: 'completed',
                attempts: 6,
                difficulty: "Easy"
            },
            {questionId: '0003QQD', title: "The Nerdvana Annihilation", status: '', attempts: 0, difficulty: "Medium"},
            {questionId: '0004QQD', title: "The Peanut Reaction", status: '', attempts: 0, difficulty: "Medium"},
            {questionId: '0005QQD', title: "The Tangerine Factor", status: '', attempts: 0, difficulty: "Hard"},
        ]
    }
]

const courseDetails = [
    {
        courseId: '0001B',
        key: '0001B',
        courseName: 'Basic Syntax',
        description:

            `<h3>Why to Learn Simply</h3>
               <p>Simply is a MUST for students and working professionals to become a great Software Engineer specially when they are working in Web Development Domain. 
               I will list down some of the key advantages of learning Simply:</br>
                Simply is the most popular programming language in the world and that makes it a programmer’s great choice. 
                Once you learnt Simply, it helps you developing great front-end as well as back-end softwares using different Simply based frameworks like jQuery, Node.JS etc.</br>
                Simply is everywhere, it comes installed on every modern web browser and so to learn Simply you really do not need any special environment setup. 
                For example Chrome, Mozilla Firefox , Safari and every browser you know as of today, supports Simply.</br>
                There could be 1000s of good reasons to learn Simply Programming. 
                But one thing for sure, to learn any programming language, not only Simply, you just need to code, and code and finally code until you become expert.</p>
                </br></br>
                <h3>Hello World using Simply</h3>
                <p>Just to give you a little excitement about Simply programming, 
                I'm going to give you a small conventional Simply Hello World program, You can try it using Demo link</p>`,
        level: 1
    },
    {
        courseId: '0001D',
        key: '0001D',
        courseName: 'Data types',
        description:
            `<h3>Simply Data Types</h3>
                <p>
                Simply provides different data types to hold different types of values. There are two types of data types in Simply.</br>
                1. Primitive data type </br>
                2. Non-primitive (reference) data type </br>
                Simply is a dynamic type language, means you don't need to specify type of the variable because it is dynamically used by Simply engine. 
                You need to use var here to specify the data type. It can hold any type of values such as numbers, strings etc. For example:</br></p>
                <p style={{background: "#e8e6e1" }}>
                var a=40;  //holding number </br>
                var b="Rahul";   //holding string
                </p>
                </br>
                <h3>Simply primitive data types</h3>
                <p>There are five types of primitive data types in Simply </p>`,
    level: 2
    },
]


export {
    courses,
    quizzes,
    courseDetails
}


//     [
//     {
//         heading: "Why to Learn Simply\n",
//         content:
//             "Simply is a MUST for students and working professionals to become a great Software Engineer specially when they are working in Web Development Domain. I will list down some of the key advantages of learning Simply:\n" +
//             "\n" +
//             "Simply is the most popular programming language in the world and that makes it a programmer’s great choice. Once you learnt Simply, it helps you developing great front-end as well as back-end softwares using different Simply based frameworks like jQuery, Node.JS etc.\n" +
//             "\n" +
//             "Simply is everywhere, it comes installed on every modern web browser and so to learn Simply you really do not need any special environment setup. For example Chrome, Mozilla Firefox , Safari and every browser you know as of today, supports Simply.\n" +
//             "\n" +
//             "Simply helps you create really beautiful and crazy fast websites. You can develop your website with a console like look and feel and give your users the best Graphical User Experience.\n" +
//             "\n" +
//             "Simply usage has now extended to mobile app development, desktop app development, and game development. This opens many opportunities for you as Simply Programmer.\n" +
//             "\n" +
//             "Due to high demand, there is tons of job growth and high pay for those who know Simply. You can navigate over to different job sites to see what having Simply skills looks like in the job market.\n" +
//             "\n" +
//             "Great thing about Simply is that you will find tons of frameworks and Libraries already developed which can be used directly in your software development to reduce your time to market.\n" +
//             "\n" +
//             "There could be 1000s of good reasons to learn Simply Programming. But one thing for sure, to learn any programming language, not only Simply, you just need to code, and code and finally code until you become expert.\n" +
//             "\n"
//     },
//     {
//            heading: "Hello World using Simply\n",
//            content: "Just to give you a little excitement about Simply programming, I'm going to give you a small conventional Simply Hello World program, You can try it using Demo link\n" +
//             "\n"
//     }
// ]
