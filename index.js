

document.addEventListener('DOMContentLoaded', function(){

    const searchButton = document.getElementById("search-btn"); //  USE ID BCX CLASS GIVE ARRAY OF ELEMENTS
    const usernameInput = document.getElementById("user-input");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");

    const easyLabel = document.querySelector("#easy-label");
    const mediumLabel = document.querySelector("#medium-label");
    const hardLabel = document.querySelector("#hard-label");
    const cardStatsContainer  = document.querySelector(".stats-card");

    function validateUsername(username){
        if(username.trim() === "" ){
            alert("Username should not be empty");
            return false;
        }
        const regex= /^[a-zA-Z0-9_-]{1,250}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid username");
        }
        return isMatching;

    }

    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent=`${solved}/${total}`;
    }

//     function displayUserData(data){
//             const questionsSolved = document.createElement('div');
//             const totalQuestions=document.createElement('p');
//             const easySolved = document.createElement('p');
//             const mediumSolved = document.createElement('p');
//             const hardSolved = document.createElement('p');

// //            totalQuestions.textContent="Total questions solved : "+ data.totalSolved;
// //            easySolved.textContent="Total easy questions solved : "+ data.easySolved;
// //            mediumSolved.textContent="Total medium questions solved : "+data.mediumSolved;
// //            hardSolved.textContent="Total hard questions solved : "+data.hardSolved;


//             // questionsSolved.appendChild(totalQuestions)
//             // questionsSolved.appendChild(easySolved);
//             // questionsSolved.appendChild(mediumSolved);
//             // questionsSolved.appendChild(hardSolved);

//             // const totalQuestions = data.totalQuestions;
//             // const percentageEasySolved = (data.easySolved/data.totalEasy)*100;
//             // const percentageMediumSolved = (data.mediumSolved/data.totalMedium)*100;
//             // const percentageHardSolved = (data.hardSolved/data.totalHard)*100;
//             //questionsSolved.style.cssText="gap: 6px; display:flex; flex-wrap:wrap; justify-content:space-evenly; height:20px;";
// //            cardStatsContainer.appendChild(questionsSolved);
//             // cardStatsContainer.style.setAttribute('style', 'height:fit-content');

//             totalQuestions.className="solved-questions-card";
//             easySolved.className="solved-questions-card";
//             mediumSolved.className="solved-questions-card";
//             hardSolved.className="solved-questions-card";
            
//             const cards = document.querySelectorAll('.solved-questions-card');
//             cards.forEach(card =>{
//                 card.style.cssText="background-color:#ed8816; border-radius:5px; color:white; height:35px; padding:5px "
//             })
            

//             updateProgress(data.easySolved, data.totalEasy, easyLabel, easyProgressCircle );
//             updateProgress(data.mediumSolved, data.totalMedium, mediumLabel, mediumProgressCircle );
//             updateProgress(data.hardSolved, data.totalHard, hardLabel, hardProgressCircle );
//             const cardData=[
//                 {label:"Overall Submissions : ", value:data.totalSolved},
//                 {label:"Total easy questions solved :",  value:data.easySolved},
//                 {label:"Total medium questions solved :",  value:data.mediumSolved},
//                 {label:"Total hard questions solved :",  value:data.hardSolved},
//             ];
//             console.log("card ka data : ", cardData);

//             cardStatsContainer.innerHTML=cardData.map(
//                 data=>
//                         `<div>
//                         <h3>${data.label}</h3>
//                         <p>${data.value}</p>
//                         </div>`
//             ).join("");
//     }
    function displayUserData(data){

    updateProgress(data.easySolved, data.totalEasy, easyLabel, easyProgressCircle );
    updateProgress(data.mediumSolved, data.totalMedium, mediumLabel, mediumProgressCircle );
    updateProgress(data.hardSolved, data.totalHard, hardLabel, hardProgressCircle );
    
    const cardData=[
        {label:"Overall Submissions : ", value:data.totalSolved},
        {label:"Total easy questions solved :",  value:data.easySolved},
        {label:"Total medium questions solved :",  value:data.mediumSolved},
        {label:"Total hard questions solved :",  value:data.hardSolved},
    ];

    console.log("card ka data : ", cardData);

    cardStatsContainer.innerHTML=cardData.map(
        data=>
                `<div class="card">
                <h4>${data.label}<span id="card-p">${data.value}</span></h4>
                
                </div>`
    ).join("");
}

    async function fetchUserDetails(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the User details");
            }
            const data = await response.json();
            console.log("Logging data : " ,data);

            displayUserData(data);
            
        }
        catch(error){
            cardStatsContainer.innerHTML=`<p>No data found</p>`;
        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("Loggin username: "+ username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })

})
