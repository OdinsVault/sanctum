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


const getByCategory =
    {
        categoryCount: 3,
        categories: [
            {
                category: "basic_syntax",
                questions: [
                    {
                        _id: "603e6bf840c1210e78797664",
                        title: "Where are the aliens now?",
                        description: "Compete question 1",
                        inputs: "As inputs you will be given a word which is identified as the one of the name of the alien base. Ex: Azkar",
                        outputs: "You have to show greeting and the provided base name. Ex: Hello, Azkar!",
                        difficulty: "Easy",
                        category: "basic_syntax",
                        testcases: [
                            {
                                "_id": "603e6bf840c1210e78797665",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            }
                        ],
                        pointsAllocated: 15
                    },
                    {
                        "_id": "6044c56f9be061131869210c",
                        "title": "New compete q",
                        "description": "Compete question 2",
                        "inputs": "As inputs you will be given a word which is identified as the one of the name of the alien base. Ex: Azkar",
                        "outputs": "You have to show greeting and the provided base name. Ex: Hello, Azkar!",
                        "difficulty": "Easy",
                        "category": "basic_syntax",
                        "testcases": [
                            {
                                "_id": "6044c56f9be061131869210d",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            },
                            {
                                "_id": "6044c56f9be061131869210e",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            }
                        ],
                        "pointsAllocated": 25
                    }
                ]
            },
            {
                "category": "conditionals",
                "questions": [
                    {
                        "_id": "6044c5f58cc20b1ab4e5a0b1",
                        "title": "another compete Q",
                        "description": "Compete question 4",
                        "inputs": "As inputs you will be given a word which is identified as the one of the name of the alien base. Ex: Azkar",
                        "outputs": "You have to show greeting and the provided base name. Ex: Hello, Azkar!",
                        "difficulty": "Easy",
                        "category": "conditionals",
                        "testcases": [
                            {
                                "_id": "6044c5f58cc20b1ab4e5a0b2",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            },
                            {
                                "_id": "6044c5f58cc20b1ab4e5a0b3",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            }
                        ],
                        "pointsAllocated": 30
                    }, {
                        "_id": "6044c5f58cc20b1ab4e5a0b1",
                        "title": "another compete Q",
                        "description": "Compete question 4",
                        "inputs": "As inputs you will be given a word which is identified as the one of the name of the alien base. Ex: Azkar",
                        "outputs": "You have to show greeting and the provided base name. Ex: Hello, Azkar!",
                        "difficulty": "Easy",
                        "category": "conditionals",
                        "testcases": [
                            {
                                "_id": "6044c5f58cc20b1ab4e5a0b2",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            },
                            {
                                "_id": "6044c5f58cc20b1ab4e5a0b3",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            }
                        ],
                        "pointsAllocated": 30
                    }, {
                        "_id": "6044c5f58cc20b1ab4e5a0b1",
                        "title": "another compete Q",
                        "description": "Compete question 4",
                        "inputs": "As inputs you will be given a word which is identified as the one of the name of the alien base. Ex: Azkar",
                        "outputs": "You have to show greeting and the provided base name. Ex: Hello, Azkar!",
                        "difficulty": "Easy",
                        "category": "conditionals",
                        "testcases": [
                            {
                                "_id": "6044c5f58cc20b1ab4e5a0b2",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            },
                            {
                                "_id": "6044c5f58cc20b1ab4e5a0b3",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            }
                        ],
                        "pointsAllocated": 30
                    }, {
                        "_id": "6044c5f58cc20b1ab4e5a0b1",
                        "title": "another compete Q",
                        "description": "Compete question 4",
                        "inputs": "As inputs you will be given a word which is identified as the one of the name of the alien base. Ex: Azkar",
                        "outputs": "You have to show greeting and the provided base name. Ex: Hello, Azkar!",
                        "difficulty": "Easy",
                        "category": "conditionals",
                        "testcases": [
                            {
                                "_id": "6044c5f58cc20b1ab4e5a0b2",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            },
                            {
                                "_id": "6044c5f58cc20b1ab4e5a0b3",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            }
                        ],
                        "pointsAllocated": 30
                    }, {
                        "_id": "6044c5f58cc20b1ab4e5a0b1",
                        "title": "another compete Q",
                        "description": "Compete question 4",
                        "inputs": "As inputs you will be given a word which is identified as the one of the name of the alien base. Ex: Azkar",
                        "outputs": "You have to show greeting and the provided base name. Ex: Hello, Azkar!",
                        "difficulty": "Easy",
                        "category": "conditionals",
                        "testcases": [
                            {
                                "_id": "6044c5f58cc20b1ab4e5a0b2",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            },
                            {
                                "_id": "6044c5f58cc20b1ab4e5a0b3",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            }
                        ],
                        "pointsAllocated": 30
                    },
                ]
            },
            {
                "category": "loops",
                "questions": [
                    {
                        "_id": "6044c5c7a9765f265c07269f",
                        "title": "another compete question",
                        "description": "Compete question 3",
                        "inputs": "As inputs you will be given a word which is identified as the one of the name of the alien base. Ex: Azkar",
                        "outputs": "You have to show greeting and the provided base name. Ex: Hello, Azkar!",
                        "difficulty": "Easy",
                        "category": "loops",
                        "testcases": [
                            {
                                "_id": "6044c5c7a9765f265c0726a0",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            },
                            {
                                "_id": "6044c5c7a9765f265c0726a1",
                                "inputs": "Test case 1 inputs",
                                "outputs": "Test case 1 outputs",
                                "title": "Test case 1 title",
                                "description": "Test case 1 decription"
                            }
                        ],
                        "pointsAllocated": 25
                    }
                ]
            }
        ]
    }


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

const practiceSubReponseSuccess =
    {
        "message": "Practice question answer passed",
        "consoleResult": {
            "answer": "class Code {\r\n    public static void main(String[] args) {\r\n        System.out.println(\"Java runs\");\r\n for(int i=0; i < args.length; i++) {System.out.print(args[i]);}\r\n    }\r\n}",
            "testResults": [
                {
                    "testCase": {
                        "inputs": "1 2 3",
                        "outputs": "Java runs\n123",
                        "title": "Test case 1 title",
                        "description": "Test case 1 decription"
                    },
                    "status": 0,
                    "stdout": "Java runs\n123",
                    "stderr": null
                },
                {
                    "testCase": {
                        "inputs": "1 2 3 4 5",
                        "outputs": "Java runs\n12345",
                        "title": "Test case 2 title",
                        "description": "Test case 2 decription"
                    },
                    "status": 0,
                    "stdout": "Java runs\n12345",
                    "stderr": null
                }
            ],
            "compilerResult": {
                "status": 0,
                "stdout": "",
                "stderr": null
            },
            "passed": true
        },
        "updatedUser": {
            "attempts": {
                "practice": [
                    {
                        "count": 4,
                        "_id": "604a357ead63912fa49fc043",
                        "question": "6044c44dd588fc18284c0965",
                        "passed": false
                    },
                    {
                        "count": 2,
                        "_id": "604a3686ad63912fa49fc046",
                        "question": "6044b1a0f7c198351c81cb84",
                        "passed": true
                    },
                    {
                        "count": 21,
                        "_id": "6057484de14a150fbce9347c",
                        "question": "60573d94efb122529c052921",
                        "passed": true
                    }
                ],
                "compete": [
                    {
                        "count": 15,
                        "_id": "604a372177867b4498bdf25e",
                        "question": "603e6bf840c1210e78797664",
                        "passed": false
                    },
                    {
                        "count": 2,
                        "_id": "604a374777867b4498bdf25f",
                        "question": "6044c5f58cc20b1ab4e5a0b1",
                        "passed": true
                    }
                ]
            },
            "xp": "Advanced",
            "score": 170,
            "completion": 1,
            "_id": "602f2179340f610015a122c6",
            "fname": "Hasintha",
            "lname": "Abeykoon",
            "email": "hasinthaabeykoon@gmail.com",
            "institute": "UoM"
        },
        "levelInfo": {
            "leveledUp": false,
            "completion": 1
        }
    }


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
                Once you learnt Simply, it helps you developing great front-end as well as back-end software using different Simply based frameworks like jQuery, Node.JS etc.</br>
                Simply is everywhere, it comes installed on every modern web browser and so to learn Simply you really do not need any special environment setup. 
                For example Chrome, Mozilla Firefox , Safari and every browser you know as of today, supports Simply.</br>
                There could be 1000s of good reasons to learn Simply Programming. 
                But one thing for sure, to learn any programming language, not only Simply, you just need to code, and code and finally code until you become expert.</p>
                </br></br>
                <h3>Hello World using Simply</h3>
                <p>Just to give you a little excitement about Simply programming, 
                I'm going to give you a small conventional Simply Hello World program, You can try it using Demo link</p>`,
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
        level: 2,
        status: "unlocked",
        quizId: '00001DQ',
        questions: 5,
        completed: 3
    },
]


const leaderboard = {
    "message": "Leaderboard fetch success",
    "pageInfo": {
        "total": 5,
        "page": 0,
        "limit": 10
    },
    "results": [
        {
            "rank": 1,
            "_id": "602f2179340f610015a122c6",
            "fname": "Hasintha",
            "lname": "Abeykoon",
            "score": 55,
            "email": "hasinthaabeykoon@gmail.com",
            "completion": 1,
            "institute": "UoM"
        },
        {
            "rank": 2,
            "_id": "5fcb3b654c87150017dd1f70",
            "fname": "Rangana",
            "lname": "Udara",
            "score": 0,
            "email": "hello3@gmail.com",
            "completion": 1,
            "institute": "UoC"
        },
        {
            "rank": 3,
            "_id": "603e612bf2b7c725ace06463",
            "fname": "khk",
            "lname": "Abeykoon",
            "score": 0,
            "email": "khk@gmail.com",
            "completion": 1,
            "institute": "UoM"
        },
        {
            "rank": 4,
            "_id": "6047a68b3123371aa88e9e1b",
            "fname": "Reshan",
            "lname": "Dissanayake",
            "score": 0,
            "email": "reshandissanayake96@gmail.com",
            "completion": 1,
            "institute": "UoM"
        },
        {
            "rank": 5,
            "_id": "604ad82f9b5da60004a44a88",
            "fname": "hasintha",
            "lname": "abeykoon",
            "score": 0,
            "email": "hasinthaabyekoon@gmail.com",
            "completion": 1,
            "institute": "UoM"
        }
    ]
}

const user = {
    "attempts": {
        "practice": [
            {
                "count": 3,
                "_id": "604a357ead63912fa49fc043",
                "question": "6044c44dd588fc18284c0965",
                "passed": false
            },
            {
                "count": 2,
                "_id": "604a3686ad63912fa49fc046",
                "question": "6044b1a0f7c198351c81cb84",
                "passed": true
            }
        ],
        "compete": [
            {
                "count": 1,
                "_id": "604a372177867b4498bdf25e",
                "question": "603e6bf840c1210e78797664",
                "passed": false
            },
            {
                "count": 2,
                "_id": "604a374777867b4498bdf25f",
                "question": "6044c5f58cc20b1ab4e5a0b1",
                "passed": true
            }
        ]
    },
    "xp": "Advanced",
    "score": 55,
    "completion": 1,
    "_id": "602f2179340f610015a122c6",
    "fname": "Hasintha",
    "lname": "Abeykoon",
    "email": "hasinthaabeykoon@gmail.com",
    "dob": "1996-12-24T18:00:00.000Z",
    "institute": "UoM"
}

export {
    leaderboard,
    courses,
    quizzes,
    courseDetails,
    practiceSubReponseSuccess,
    getByCategory,
    user,
    quotes
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


const quotes = [
    "Dont't worry if it doesn't work right.If everything did, you'd be out of a job.",
    "Don't comment bad code - rewrite it. - Brian Kernighan",
    "A programming language is for thinking about programs, not for expressing programs you've already thought of. It should be a pencil, not a pen. - Paul Graham",
    "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code. - Dan Salomon",
    "It´s better to wait for a productive programmer to become available than it is to wait for the first available programmer to become productive. - Steve McConnell",
    "One of my most productive days was throwing away 1000 lines of code - Ken Thompson",
    "Without requirements or design, programming is the art of adding bugs to an empty text file.",
    "One main'scrappy software is another man's full time job.",
    "Walking on water and developing software from a specification are easy if both are frozen.",
    "Debugging is twice as hard as writing the code in the first place.Therfore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it. - Rajanand",
    "System programmers are the high priests of a low cult. - Robert S. Barton",
    "I don't care if it works on your machine! We are not shipping your machine! - Vidiu Platon",
    "Software undergoes beta testing shortly before iy' released.Beta is latin for 'still doesn't work'",
    "Measuring programming progree by lines of code is like measuring aircraft building progree by weight. - Bill Gates",
//
// 15.  If debudding is the process of removing software bugs, then programming must be the process of putting them in. - Edsger W. Dijkstra
//
//
// 16.  The computer was born to solve problems that did not exist before. - Bill Gates
//
//
// 17.  Real programmers don't comment their code. If it was hard to write, it should be hard to understand.
//
//
// 18.  Always code as if the guy who ends up maintaning your code will be a violent psychopath who knows where you live. - Rick Osborne
//
//
// 19.  People don't care about what you say, they care about what you build. - Mark Zuckerberg
//
//
// 20.  We have to stop optimizing for programmers and start optimizing for users. — Jeff Atwood
//
//
// 21.  If the code and the comments do not match, possibly both are incorrect. — Norm Schryer
//
//
// 22.  Bad programmers worry about the code. Good programmers worry about data structures and their relationships. - Linus Torvalds
//
//
//
//
//
//
// 23.  If you optimize everything, you will always be unhappy. - Donald Knuth
//
//
// 24.  Your mind is programmable - if you're not programming your mind, else will program it for you. - Jeremy Hammond
//
//
// 25.  The trouble with programmers is that you can never tell what a programmer is doing until it's too late. - 	Seymour Cray
//
//
// 26.  Debugging becomes significantly easier if you first admit that you are the problem. - William Laeder
//
//
// 27.  Talk is cheap.Show me the code. - Linus Torvalds
//
//
// 28.  Everybody in this country should learn to program a computer because it teaches you how to think. - Steve Jobs
//
//
// 29.  Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program. - Rajanand
//
//
// 30.  Any fool can write code that a computer can understand.Good programmers write code that humans can understand.
//
//
// 31.  First, solve the problem.Then write the code. - John Johnson
//
//
// 32.  The function of a good software is to make the complex appear to be simple. - Grady Booch
//
//
// 33.  Your most unhappy customers are your greatest source of learning. — Bill Gates
//
//
// 34.  Small minds are concerned with the extraordinary, great minds with the ordinary. - Blaise Pascal
//
//
// 35.  Everyday life is like programming, I guess.If you love something you can put beauty on it. - Donald Knuth
//
//
// 36.  You are not responsible for the programming you picked up in childhood.However, as an adult, you are the one hundred percent responsible for fixing it.
//
//
// 37.  Developer is an organism that turns coffee into code.
//
//
// 38.  The purpose of software engineering is to control complexity, not to create it.
//
//
// 39.  As a programmer, it is your job to put yourself out of business. What you do today can be automated tomorrow. - Doug McIlroy
//
//
// 40.  A good programmer is someone who always looks both ways before crossing a one-way street. - Doug Linder
//
//
// 41.  Testing can only prove the presence of bugs, not their absence. – Edsger W. Dijkstra
]