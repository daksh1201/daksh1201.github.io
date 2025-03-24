const terminal = document.getElementById("terminal");

let delay = 0;
const typeSpeed = 35;
const prompt = '<span class="prompt">root@localhost:~#</span> ';

const loginSequence = [
  { type: "command", text: "login daksh", delay: 500 },
  { type: "output", text: "Authenticating...", delay: 1000 },
  { type: "output", text: "Login successful. Welcome daksh.", delay: 1000 },
  { type: "spacer", delay: 300 }
];

const mainScript = [
  { type: "command", text: "sudo -i", delay: 700 },
  { type: "output", text: "[sudo] password for daksh: *********", delay: 1000 },
  { type: "output", text: "Access granted. Welcome, root.", delay: 700 },
  { type: "spacer", delay: 400 },

  { type: "command", text: "nmap -A daksh.io", delay: 700 },
  { type: "output", text: "Scanning... Found open ports: 80 (http), 443 (https), 22 (ssh), 1337 (rooted)", delay: 1000 },
  { type: "output", text: "OS Detected: Hybrid - Legal Brain v1.0 + Cybersecurity Kernel 5.1", delay: 700 },
  { type: "output", text: "Vulnerabilities: None. Hardened via GRC policies, legal audits, and caffeine.", delay: 600 },
  { type: "spacer", delay: 300 },

  { type: "command", text: "cat /etc/daksh_profile", delay: 500 },
  { type: "output", text: "Name: Daksh", delay: 300 },
  { type: "output", text: "Roles: Cybersecurity Consultant | Legal Architect | Framework Fixer", delay: 400 },
  { type: "output", text: "Specialties: ISO 27001, SOC 2, DPDP, RBI IT Guidelines, ITGCs, VAPT, Compliance Design", delay: 500 },
  { type: "output", text: "Languages: Python, Law, Audit Speak, Human", delay: 400 },
  { type: "spacer", delay: 200 },

  { type: "command", text: "sudo rm -rf /nonsense_policies", delay: 500 },
  { type: "output", text: "Deleting... ✅ Done. Replaced with contextual, risk-aware policies.", delay: 600 },
  { type: "spacer", delay: 300 },

  { type: "command", text: "curl -X GET daksh://backstory", delay: 500 },
  { type: "output", text: "Originally trained in Criminology. Realized systems crash more often than people.", delay: 600 },
  { type: "output", text: "Shifted into MCA, specialized in Information Security. Never looked back.", delay: 600 },
  { type: "output", text: "Now operating at the intersection of tech, law, and pure logic.", delay: 500 },
  { type: "spacer", delay: 200 },

  { type: "command", text: "ip a", delay: 400 },
  { type: "output", text: "inet 127.0.0.1/localhost", delay: 300 },
  { type: "output", text: "inet 10.0.13.37/edge-node", delay: 300 },
  { type: "output", text: "inet 192.168.0.007/on-prem-awareness", delay: 300 },
  { type: "output", text: "inet 172.16.42.42/cloud-native-compliance", delay: 300 },
  { type: "spacer", delay: 300 },

  { type: "command", text: "echo $PASSION", delay: 300 },
  { type: "output", text: "Information Security. Privacy. Enforcement. Impact. Integrity. No fluff.", delay: 500 },
  { type: "spacer", delay: 300 },

  { type: "command", text: "echo $CONTACT", delay: 400 },
  { type: "output", text: "Email: <a href='mailto:daksh1201@gmail.com'>daksh1201@gmail.com</a>", delay: 500 },
  { type: "spacer", delay: 300 },

  { type: "command", text: "shutdown -h now", delay: 700 },
  { type: "output", text: "Session terminated. Compliance secured. Threats logged. Signing off...", delay: 800 }
];

const fullScript = [...loginSequence, ...mainScript];

let lineIndex = 0;
let charIndex = 0;
let currentLine = null;
let fullTextRaw = "";
let fullTextHtml = "";

function executeLine(entry) {
  if (!currentLine) {
    currentLine = document.createElement("div");
    currentLine.classList.add("line");
    terminal.appendChild(currentLine);

    if (entry.type === "command") {
      fullTextHtml = prompt + escapeHtml(entry.text);
      fullTextRaw = stripHtml(prompt) + entry.text;
    } else if (entry.type === "output") {
      fullTextHtml = entry.text;
      fullTextRaw = stripHtml(entry.text);
    }
  }

  if (charIndex < fullTextRaw.length) {
    let displayed = escapeHtml(fullTextRaw.slice(0, charIndex + 1));

    if (entry.type === "command") {
      displayed = prompt + escapeHtml(fullTextRaw.slice(stripHtml(prompt).length, charIndex + 1));
    }

    currentLine.innerHTML = displayed + '<span class="cursor"></span>';
    charIndex++;
    setTimeout(() => executeLine(entry), typeSpeed);
  } else {
    currentLine.innerHTML = fullTextHtml;
    currentLine = null;
    charIndex = 0;
    lineIndex++;
    if (lineIndex < fullScript.length) {
      setTimeout(() => typeNextChar(), fullScript[lineIndex].delay || 300);
    }
  }
}

function typeNextChar() {
  const entry = fullScript[lineIndex];
  if (entry.type === "spacer") {
    const spacer = document.createElement("div");
    spacer.classList.add("line");
    spacer.innerHTML = " ";
    terminal.appendChild(spacer);
    lineIndex++;
    setTimeout(() => typeNextChar(), entry.delay || 200);
  } else {
    executeLine(entry);
  }
}

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

typeNextChar();
