async function checkServer(){
    const statusEl = document.getElementById("server-status");
    try {
        const res = await fetch("/api/health");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        statusEl.textContent= `online (${data.server})`;
    } catch (err) {
        statusEl.textContent = "offline";
        console.error("Health check failed:", err);
     } 
    }
 
    checkServer();