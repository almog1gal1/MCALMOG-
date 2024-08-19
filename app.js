document.addEventListener("DOMContentLoaded", () => {
    alert("ברוכים הבאים לאפליקציה שלנו!");

    const pizzaIcon = "🍕";
    const sushiIcon = "🍣";
    const burgerIcon = "🍔";
    let price = 0;
    let order = "";

    function incrementPrice(currentPrice, priceToAdd) {
        return currentPrice + priceToAdd;
    }

    function showPrompt(promptId, show) {
        document.getElementById(promptId).style.display = show ? 'block' : 'none';
    }

    function handleToppingPrompt(toppingName, toppingPrice, callback) {
        document.getElementById("toppingQuestion").innerText = `רוצה ${toppingName}? זה עולה ${toppingPrice}`;
        showPrompt("toppingPrompt", true);

        document.getElementById("toppingPromptYes").onclick = () => {
            price = incrementPrice(price, toppingPrice);
            showPrompt("toppingPrompt", false);
            callback();
        };

        document.getElementById("toppingPromptNo").onclick = () => {
            showPrompt("toppingPrompt", false);
            callback();
        };
    }

    function handleCutleryPrompt(callback) {
        showPrompt("cutleryPrompt", true);

        document.getElementById("cutleryPromptYes").onclick = () => {
            showPrompt("cutleryPrompt", false);
            callback("עם");
        };

        document.getElementById("cutleryPromptNo").onclick = () => {
            showPrompt("cutleryPrompt", false);
            callback("ללא");
        };
    }

    function handleTrayPrompt(callback) {
        showPrompt("trayPrompt", true);

        document.getElementById("trayPromptRegular").onclick = () => {
            showPrompt("trayPrompt", false);
            callback(false);
        };

        document.getElementById("trayPromptFamily").onclick = () => {
            showPrompt("trayPrompt", false);
            callback(true);
        };
    }

    function displayOptions(selectedFood) {
        let cutlery = "ללא";
        let trayType = false;

        if (selectedFood === pizzaIcon) {
            price = incrementPrice(price, 25);
            showPrompt("foodSelection", false);
            handleToppingPrompt("פטריות", 1, () => {
                handleToppingPrompt("זיתים", 5, () => {
                    handleToppingPrompt("תירס (איכס)", 9, () => {
                        handleCutleryPrompt((cutleryChoice) => {
                            cutlery = cutleryChoice;
                            document.getElementById("summary").innerText = `מחיר ההזמנה הוא ${price}. ההזמנה תגיע בעוד חצי שעה בע״ה בלי נדר. ההזמנה תגיע ${cutlery}`;
                        });
                    });
                });
            });
        } else if (selectedFood === burgerIcon) {
            price = incrementPrice(price, 55);
            showPrompt("foodSelection", false);
            handleToppingPrompt("פטריות", 7, () => {
                handleToppingPrompt("חריף", 13, () => {
                    handleToppingPrompt("בצל", 22, () => {
                        handleCutleryPrompt((cutleryChoice) => {
                            cutlery = cutleryChoice;
                            document.getElementById("summary").innerText = `מחיר ההזמנה הוא ${price}. ההזמנה תגיע בעוד חצי שעה בע״ה בלי נדר. ההזמנה תגיע ${cutlery}`;
                        });
                    });
                });
            });
        } else if (selectedFood === sushiIcon) {
            price = incrementPrice(price, 45);
            handleTrayPrompt((isFamily) => {
                if (isFamily) {
                    price = incrementPrice(price, 100);
                }
                handleCutleryPrompt((cutleryChoice) => {
                    cutlery = cutleryChoice;
                    document.getElementById("summary").innerText = `מחיר ההזמנה הוא ${price}. ההזמנה תגיע בעוד חצי שעה בע״ה בלי נדר. ההזמנה תגיע ${cutlery}`;
                });
            });
        }
    }

    document.getElementById("pizzaBtn").addEventListener("click", () => {
        order = pizzaIcon;
        displayOptions(order);
    });

    document.getElementById("burgerBtn").addEventListener("click", () => {
        order = burgerIcon;
        displayOptions(order);
    });

    document.getElementById("sushiBtn").addEventListener("click", () => {
        order = sushiIcon;
        displayOptions(order);
    });
});