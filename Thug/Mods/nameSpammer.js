import actions from "../API/actions";

const firstNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth",
    "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
    "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Margaret", "Anthony", "Betty", "Donald", "Sandra",
    "Mark", "Ashley", "Paul", "Dorothy", "Steven", "Kimberly", "Andrew", "Emily", "Joshua", "Donna",
    "Kevin", "Michelle", "Brian", "Carol", "George", "Amanda", "Edward", "Melissa", "Ronald", "Deborah",
    "Samuel", "Helen", "Adam", "Natalie", "KILLALLNIGGERS", "Diana", "Peter", "Victoria", "Henry", "Julia",
    "Ryan", "Alice", "Nathan", "Sophia", "Isaac", "Grace", "Zachary", "Chloe", "Jesse", "Megan",
    "Gabriel", "Ava", "Ethan", "Lily", "Lucas", "Scarlett", "Noah", "Emma", "Logan", "Hannah",
    "Aiden", "Samantha", "Isaiah", "Addison", "Caleb", "Nora", "Charles", "Katherine", "Luke", "Zoe",
    "Leo", "Aria", "Oliver", "Bella", "Jackson", "Aurora", "Jameson", "Madison", "Eli", "Piper",
    "Mason", "Sofia", "Carter", "Ellie", "Dylan", "Stella", "Sawyer", "Victoria", "Theodore", "Hazel",
    "Jordan", "Riley", "Wyatt", "Layla", "Hudson", "Maya", "Asher", "Sadie", "Anthony", "Aubrey",
    "Gavin", "Claire", "Adrian", "Luna", "Chase", "Eliana", "Jaxon", "Kinsley", "Colton", "Maddison",
    "Xander", "Camila", "Kai", "Serenity", "Liam", "Julia", "Quinn", "Vivian", "Ryder", "Sienna"
];

const lastNames = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
    "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
    "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
    "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
    "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Cooper",
    "Peterson", "Bailey", "Rivera", "Cook", "Howard", "Kim", "Ward", "Torres", "Nguyen", "Peterson",
    "Simmons", "Foster", "Gonzalez", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes", "Myers",
    "Ford", "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", "West", "Jordan", "Owens",
    "Reyes", "Harrison", "Gonzalez", "Hanson", "Charles", "Ferguson", "Wells", "Gordon", "Ryan", "James",
    "Bishop", "Bennett", "Powell", "Bennett", "Jenkins", "Bishop", "Franklin", "Gordon", "Riley", "Cruz",
    "Wood", "James", "Jimenez", "Mendez", "Oliver", "Jordan", "Wilkins", "Kelley", "Wheeler", "Riley"
];

function nameSpammer() {
    if (nameSpammer.nameSpammerInterval) {
        clearInterval(nameSpammer.nameSpammerInterval);
    }

    nameSpammer.nameSpammerInterval = setInterval(() => {
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        actions.changeUsername(`${randomFirstName} ${randomLastName}`);
    }, parseInt(nameSpammer.nameSpammerDelay));
}

nameSpammer.nameSpammerDelay = "1";
nameSpammer.nameSpammerInterval = null;
nameSpammer.stop = () => clearInterval(nameSpammer.nameSpammerInterval);

export default nameSpammer;
