let riskToScore = (score) => {
    if (score <= 20) {
        return "Low Risk";
    } else if (score <= 40) {
        return "Medium Risk";
    } else if (score <= 60) {
        return "High Risk";
    } else {   
        return "Very High Risk";
    }
}
 
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.querySelector(".form__field");
    const submitButton = document.querySelector(".submit-for-check");

    submitButton.addEventListener("click", async () => {
        const walletAddress = inputField.value;
        console.log("Running on " + walletAddress);
        const checkBtn = document.querySelector(".submit-for-check");
        
        try {
            checkBtn.innerHTML = `<img style="height: 20px; width: 20px;" src='./images/spinner.gif' alt='loading...'>`;
            const response = await fetch(`http://localhost:5000/api/explore/risk/${walletAddress}`);
            const data = await response.json();
            console.log(data)
            console.log(data.riskScores.combinedRisk);
            const riskMessageDiv = document.querySelector(".risk-message");
            const riskScoreDiv = document.querySelector(".risk-score");

            // riskMessageDiv.innerHTML = `Risk Message: ${data.reasons[0].explanation}`;
            riskScoreDiv.innerHTML = `Risk Score:<br /> ${data.riskScores.combinedRisk} (${riskToScore(data.riskScores.combinedRisk)})`;
            
            let riskMessage;
            if (data.riskScores.combinedRisk >= 0 && data.riskScores.combinedRisk <= 20) {
                riskMessage = "The address is safe to use. You can proceed with the transaction.";
                riskScoreDiv.style.color = "green";
                riskMessageDiv.style.color = "green";
            } else if (data.riskScores.combinedRisk > 20 && data.riskScores.combinedRisk <= 40) {
                riskMessage = "The address may have some risk. If you are sure about the address, please proceed with caution.";
                riskScoreDiv.style.color = "gold";
                riskMessageDiv.style.color = "gold";
            } else if (data.riskScores.combinedRisk > 40 && data.riskScores.combinedRisk <= 60) {
                riskMessage = "The address is highly risky. If you are sure about the address, please proceed with caution.";
                riskScoreDiv.style.color = "lightcoral";
                riskMessageDiv.style.color = "lightcoral";
            } else if (data.riskScores.combinedRisk > 60 && data.riskScores.combinedRisk <= 100) {
                riskMessage = "The address is highly risky. It is recommended to avoid using this address.";
                riskScoreDiv.style.color = "red";
                riskMessageDiv.style.color = "red"; 
            }
            
            riskMessageDiv.innerHTML = `Risk Message:<br /> \n ${riskMessage}`;

            const mainView = document.querySelector(".remove-div");
            const description = document.querySelector(".Nazar-description");
            mainView.remove()
            description.remove()
            
        } catch (error) {
            console.log(error);
        } finally {
            checkBtn.innerHTML = "Check";
        }
    });
});