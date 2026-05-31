document.getElementById("trackBtn").addEventListener("click", function() {

    document.querySelectorAll(".client-card").forEach(card => {
        card.style.display = "none";
    });

    document.querySelectorAll(".ontrack").forEach(card => {
        card.style.display = "block";
    });

});
document.getElementById("riskBtn").addEventListener("click", function() {

    document.querySelectorAll(".client-card").forEach(card => {
        card.style.display = "none";
    });

    document.querySelectorAll(".riskclient").forEach(card => {
        card.style.display = "block";
    });

});
document.getElementById("dragBtn").addEventListener("click", function() {

    document.querySelectorAll(".client-card").forEach(card => {
        card.style.display = "none";
    });

    document.querySelectorAll(".draggingclient").forEach(card => {
        card.style.display = "block";
    });

});
document.getElementById("allBtn").addEventListener("click", function() {

    document.querySelectorAll(".client-card").forEach(card => {
        card.style.display = "block";
    });

});
document.getElementById("searchBox").addEventListener("keyup", function() {

    let searchText = this.value.toLowerCase();

    document.querySelectorAll(".client-card").forEach(card => {

        if (card.innerText.toLowerCase().includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});
const healthScore = document.getElementById("healthScore");

if (healthScore) {
    let score = parseInt(healthScore.innerText);

    if (score >= 80) {
        healthScore.style.color = "#22c55e";
    } else if (score >= 60) {
        healthScore.style.color = "#f59e0b";
    } else {
        healthScore.style.color = "#ef4444";
    }
}
const priorityAccount = document.getElementById("priorityAccount");

if (priorityAccount) {
    if (document.querySelectorAll(".criticalclient").length > 0) {
        priorityAccount.innerText =
            "Critical account detected. Immediate leadership review recommended.";
    } else if (document.querySelectorAll(".draggingclient").length > 0) {
        priorityAccount.innerText =
            "Dragging accounts require follow-up this week.";
    } else {
        priorityAccount.innerText =
            "No major operational risks detected.";
    }
}
healthScore.addEventListener("click", function() {
    document.getElementById("healthMessage").innerText =
        "Portfolio performing well. Continue monitoring at-risk accounts.";
});
const riskCount = document.querySelectorAll(".riskclient").length;
const criticalCount = document.querySelectorAll(".criticalclient").length;
const draggingCount = document.querySelectorAll(".draggingclient").length;
const trackCount = document.querySelectorAll(".ontrack").length;
const totalClients =
    riskCount +
    criticalCount +
    draggingCount +
    trackCount;

console.log("Dashboard JS Loaded");

const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSr23yjQM4SpQSCjVDt4AnPWeH9r4aK9OB44mgimTDhM660mY2A06YFFgQlSE4p08TLVrz5KXibjN_y/pub?output=csv&t=" + Date.now();

document.getElementById("dashboardContainer").style.display = "none";

fetch(sheetURL, {
    cache: "reload"
})
.then(response => response.text())

.then(data => {

    document.getElementById("dashboardContainer").style.display = "block";

    const rows = data.trim().split("\n").slice(1);
    let priorityClient = "";
let priorityStatus = "";
let highestPriority = 0;

let activeCount = rows.length;

let riskCount = 0;
let trackCount = 0;
let draggingCount = 0;
let criticalCount = 0;

const now = new Date();

document.getElementById("lastUpdated").innerText =
    "🕒 Last Updated: " +
    now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }) +
    " - " +
    now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const clientList = document.getElementById("clientList");

    clientList.innerHTML = "";

    rows.forEach(row => {

        const [name, statusRaw] = row.split(",");
        const status = statusRaw.trim();
        let currentPriority = 0;

if (status === "Critical") {
    currentPriority = 4;
}
else if (status === "Dragging") {
    currentPriority = 3;
}
else if (status === "At Risk") {
    currentPriority = 2;
}
else if (status === "On Track") {
    currentPriority = 1;
}

if (currentPriority > highestPriority) {

    highestPriority = currentPriority;
    priorityClient = [name];
    priorityStatus = status;

}
else if (
currentPriority === highestPriority &&
currentPriority >= 3
) {

    priorityClient.push(name);

}

        const card = document.createElement("div");

        card.className = "client-card";
card.setAttribute("data-status", status);
       if (status === "On Track") {
    trackCount++;
}
else if (status === "At Risk") {
    riskCount++;
}
else if (status === "Dragging") {
    draggingCount++;
}
else if (status === "Critical") {
    criticalCount++;
}

let statusIcon = "⚪";
if (status === "On Track") {
    statusIcon = "🟢";
}
else if (status === "At Risk") {
    statusIcon = "🔴";
}
else if (status === "Dragging") {
    statusIcon = "🟠";
}
else if (status === "Critical") {
    statusIcon = "🚨";
}
        card.innerHTML = name + " " + statusIcon + " " + status;

        clientList.appendChild(card);

    });
document.getElementById("activeCount").textContent = activeCount;

document.getElementById("riskCount").textContent = riskCount;

document.getElementById("trackCount").textContent = trackCount;

document.getElementById("draggingCount").textContent = draggingCount;

document.getElementById("criticalCount").textContent = criticalCount;
if (criticalCount > 0) {

    document.getElementById("priorityAccount").innerHTML =
    `🚨 ${criticalCount} Critical Account(s) Require Immediate Attention`;

}
else if (riskCount > 0) {

    document.getElementById("priorityAccount").innerHTML =
    `⚠️ ${riskCount} At-Risk Account(s) Require Review`;

}
else if (draggingCount > 0) {

    document.getElementById("priorityAccount").innerHTML =
    `🟡 ${draggingCount} Account(s) Are Dragging Behind Target`;

}
else {

    document.getElementById("priorityAccount").innerHTML =
    `✅ No Major Operational Risks Detected`;

}
let healthScoreValue = Math.round(
(
(trackCount * 100) +
(riskCount * 60) +
(draggingCount * 30) +
(criticalCount * 0)
)
/ activeCount
);

document.getElementById("healthScore").innerText =
healthScoreValue + "%";

const healthScoreElement =
document.getElementById("healthScore");

const healthCard =
document.querySelector(".health-score");

if (healthScoreValue >= 80) {

    healthScoreElement.style.color = "#22c55e";
    healthCard.style.borderLeft = "8px solid #22c55e";

}
else if (healthScoreValue >= 60) {

    healthScoreElement.style.color = "#f59e0b";
    healthCard.style.borderLeft = "8px solid #f59e0b";

}
else {

    healthScoreElement.style.color = "#ef4444";
    healthCard.style.borderLeft = "8px solid #ef4444";

}

let summary = "";

summary += `<p>
Portfolio performance remains ${
healthScoreValue >= 80
? "strong"
: healthScoreValue >= 60
? "stable"
: "under pressure"
} this week.
</p>`;

summary += `<p>
${trackCount} account(s) are currently on track.
</p>`;

if (criticalCount > 0) {

summary += `<p>
🚨 ${criticalCount} critical account(s) require immediate attention.
</p>`;

}

if (riskCount > 0) {

summary += `<p>
⚠️ ${riskCount} at-risk account(s) require proactive intervention.
</p>`;

}

if (draggingCount > 0) {

summary += `<p>
🟡 ${draggingCount} account(s) are dragging behind target.
</p>`;

}

summary += `<p>
📊 Overall portfolio health score is ${healthScoreValue}%.
</p>`;

const dashboardStatusElement =
document.getElementById("dashboardStatus");

if (criticalCount >= 2) {

dashboardStatusElement.innerText =
"🔴 Dashboard Status: Critical";

dashboardStatusElement.style.color =
"#ff4d4d";

}
else if (
criticalCount >= 1 ||
riskCount >= 2 ||
draggingCount >= 2
) {

dashboardStatusElement.innerText =
"🟡 Dashboard Status: Monitoring";

dashboardStatusElement.style.color =
"#ffb300";

}
else {

dashboardStatusElement.innerText =
"🟢 Dashboard Status: Operational";

dashboardStatusElement.style.color =
"#2ecc71";

}

document.getElementById("executiveSummary").innerHTML = summary;

});
const allBtn = document.getElementById("allBtn");
const trackBtn = document.getElementById("trackBtn");
const riskBtn = document.getElementById("riskBtn");
const dragBtn = document.getElementById("dragBtn");
const criticalBtn = document.getElementById("criticalBtn");

function filterClients(status) {

    const cards = document.querySelectorAll(".client-card");

    cards.forEach(card => {

        if (
            status === "All" ||
            card.getAttribute("data-status") === status
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}

allBtn.addEventListener("click", () => filterClients("All"));

trackBtn.addEventListener("click", () => filterClients("On Track"));

riskBtn.addEventListener("click", () => filterClients("At Risk"));

dragBtn.addEventListener("click", () => filterClients("Dragging"));

criticalBtn.addEventListener("click", () => filterClients("Critical"));

document.getElementById("refreshBtn")
.addEventListener("click", () => {
    window.location.href =
    window.location.pathname + "?refresh=" + Date.now();
});