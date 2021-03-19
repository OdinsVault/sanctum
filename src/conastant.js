const courses = [
    {courseId: '0001B', key: '0001B', courseName: 'Basic Syntax', description:'', level: 1, status: "completed",quizId:'00001BQ', questions: 5, completed: 5},
    {courseId: '0001D', key: '0001D', courseName: 'Data types', description:'', level: 2, status: "unlocked",quizId:'00001DQ', questions: 5, completed: 3},
    {courseId: '0001V', key: '0001V', courseName: 'Variables', description:'', level: 3, status: "locked",quizId:'00001VQ', questions: 4, completed: 0},
    {courseId: '0001O', key: '0001O', courseName: 'Operators', description:'', level: 4, status: "locked",quizId:'00001OQ', questions: 4, completed: 0},
    {courseId: '0001L', key: '0001L', courseName: 'Loops', description:'', level: 5, status: "locked",quizId:'00001LQ', questions: 4, completed: 0}
]

const quizzes = [
    {
        quizId:'00001BQ',
        courseId: '0001B',
        courseName: 'Basic Syntax',
        level: 1,
        questionList:[
            {questionId:'0001QQB',title:"The Big Bran Hypothesis",status:'completed',attempts:4,difficulty:"Easy"},
            {questionId:'0002QQB',title:"The Fuzzy Boots Corollary",status:'',attempts:5,difficulty:"Easy"},
            {questionId:'0003QQB',title:"The Luminous Fish Effect",status:'',attempts:0, difficulty:"Medium"},
            {questionId:'0004QQB',title:"The Hamburger Postulate",status:'completed',attempts:1, difficulty:"Medium"},
            {questionId:'0005QQB',title:"The Middle-earth Paradigm",status:'',attempts:4, difficulty: "Hard"},
        ]
    },
    {
        quizId:'00001DQ',
        courseId: '0001D',
        courseName: 'Variables',
        level: 2,
        questionList:[
            {questionId:'0001QQV',title:"The Dumpling Paradox",status:'',attempts:5,difficulty:"Easy"},
            {questionId:'0002QQV',title:"The Grasshopper Experiment",status:'completed',attempts:2, difficulty:"Easy"},
            {questionId:'0003QQV',title:"The Cooper-Hofstadter Polarization",status:'completed',attempts:6, difficulty:"Medium"},
            {questionId:'0004QQV',title:"The Loobenfeld Decay",status:'',attempts:6, difficulty:"Medium"},
            {questionId:'0005QQV',title:"The Pancake Batter Anomaly",status:'',attempts: 0,difficulty: "Hard"},
        ]
    },
    {
        quizId:'00001VQ',
        courseId: '0001V',
        courseName: 'Data types',
        level: 3,
        questionList:[
            {questionId:'0001QQD',title:"The Jerusalem Duality",status:'',attempts:3,difficulty:"Easy"},
            {questionId:'0002QQD',title:"The Bat Jar Conjecture",status:'completed',attempts:6, difficulty:"Easy"},
            {questionId:'0003QQD',title:"The Nerdvana Annihilation",status:'',attempts:0,difficulty:"Medium"},
            {questionId:'0004QQD',title:"The Peanut Reaction",status:'',attempts:0, difficulty:"Medium"},
            {questionId:'0005QQD',title:"The Tangerine Factor",status:'',attempts:0,  difficulty: "Hard"},
        ]
    }
]

export {
    courses,
    quizzes
}
