(() => {
    let buttonPanel, walletAddressNode, statusNode, nazarLogoBtn, walletAddress, score;
    let riskMessage = "";
    let current_address = '';
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


    chrome.runtime.onMessage.addListener((obj, sender, res) => {
        const { type, address } = obj

        if (type == "NEW") {
            current_address = address
            newAddressLoaded()
        }
    })

    const newAddressLoaded = () => {
        nazarExists = document.getElementsByClassName('nazar-logo-btn')[0]

        if (!nazarExists) {
            nazarLogoBtn = document.createElement('img')
            nazarLogoBtn.src = chrome.runtime.getURL('/images/nazar-32.png')
            nazarLogoBtn.className = 'link-secondary position-relative ' + 'nazar-logo-btn'
            nazarLogoBtn.alt = 'Nazar'
            nazarLogoBtn.style.cursor = 'pointer'

            buttonPanel = document.getElementById('ContentPlaceHolder1_copyButtonPanel')
            walletAddressNode = document.getElementById('mainaddress')


            if (!buttonPanel) return
            buttonPanel.appendChild(nazarLogoBtn)

            nazarLogoBtn.addEventListener('click', onNazarBtnClick)
        }
    }

    const onNazarBtnClick = async () => {
        statusNode = document.createElement('span');
        walletAddress = walletAddressNode.innerText
        console.log(walletAddress)
        await fetch(`http://localhost:5000/api/explore/risk/${walletAddress}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data.mdata)
                // riskMessage = data.riskMessage;
                score = data.riskScores.combinedRisk;
                // console.log("extension", data.mdata)
            }).catch(err => {
                console.log(err)
            });
            const popupNode = document.createElement('div');
            popupNode.classList.add('popup');
            
            popupNode.style.display = 'none';
            popupNode.style.position = 'absolute';
            popupNode.style.marginTop = '170px';
            popupNode.style.marginLeft = '100px';
        popupNode.style.width = '200px';
        popupNode.style.padding = '10px';
            popupNode.style.background = 'rgba(0, 0, 0, 0.7)';
            popupNode.style.color = 'white';
            popupNode.style.padding = '10px';
            popupNode.style.borderRadius = '5px';
        popupNode.style.zIndex = '999';
        
            let riskMessage;
            statusNode.addEventListener('mouseenter', () => {
                popupNode.style.display = 'block';
            });
    
            statusNode.addEventListener('mouseleave', () => {
                popupNode.style.display = 'none';
            });
    
            buttonPanel.appendChild(popupNode);
        if (score >= 0 && score <= 20) {
            walletAddressNode.style.color = 'green';
            nazarLogoBtn.replaceWith(statusNode);
            statusNode.innerText = '✅ ' + riskToScore(score);
            statusNode.style.color = 'green';
            riskMessage = 'This address is safe to use. You can proceed with the transaction.';
        } else if (score > 20 && score <= 40) {
            walletAddressNode.style.color = '#FFD700';
            nazarLogoBtn.replaceWith(statusNode);
            statusNode.innerText = '⚠️ ' + riskToScore(score);
            statusNode.style.color = '#FFD700';
            riskMessage = 'The address has medium risk. If you are sure about the address, please proceed with caution.';
        } else if (score > 40 && score <= 60) {
            walletAddressNode.style.color = 'lightcoral'; // Using a light red color
            nazarLogoBtn.replaceWith(statusNode);
            statusNode.innerText = '⚠️ ' + riskToScore(score);
            statusNode.style.color = 'lightcoral';
            riskMessage = 'The address has high risk. If you are sure about the address, please proceed with caution.';
        } else if (score > 60 && score <= 100) {
            walletAddressNode.style.color = 'darkred';
            nazarLogoBtn.replaceWith(statusNode);
            statusNode.innerText = '⚠️ ' + riskToScore(score);
            statusNode.style.color = 'darkred';
            riskMessage = 'The address has very high risk. Please do not proceed with the transaction.';
        }

        popupNode.innerHTML = `Risk Score: \n ${score} <br /> Risk Message:<br /> \n ${riskMessage}`
        

        walletAddressNode.style.fontWeight = 'bold'

    }

    newAddressLoaded()
})();
