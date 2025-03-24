const terminal = document.getElementById("terminal");

const script = [

  { type: "command", text: "login: daksh" },
  { type: "command", text: "password: ********" },
  { type: "output", text: "Authentication successful. Access granted." },
  { type: "spacer" },

  { type: "command", text: "daksh@localhost:~$ sudo cat /usr/bin/profile.sh" },
  { type: "output", text: "#!/bin/bash" },
  { type: "output", text: "echo 'Loading profile...'" },
  { type: "spacer" },

  { type: "output", text: "Initiated in the trenches of VAPT — testing systems, breaking into apps, and reporting flaws." },
  { type: "spacer" },
  { type: "output", text: "Studied cyber law, policy, and digital rights." },
  { type: "output", text: "Now operating at the intersection of security, law, and governance." },
  { type: "spacer" },
  { type: "output", text: "Designing policies, performing audits, and building better systems." },
  { type: "output", text: "I write frameworks like I write exploit PoCs — precise, lean, and no unnecessary logic." },
  { type: "spacer" },
  { type: "output", text: "Data Protection? I don’t just read the Act — I translate it into architecture." },
  { type: "output", text: "RBI Master Directions, ISO 27001, SOC 2 — not just checkboxes, but blueprints." },
  { type: "output", text: "You'll find me reviewing contracts with OWASP in one tab and the IT Act in another." },
  { type: "output", text: "I break apps for breakfast, audit infra for lunch, and dissect legal frameworks for dinner." },
  { type: "output", text: "Tech is my canvas. Law is my syntax. Security is the script that binds them." },
  { type: "spacer" },
  { type: "output", text: "Call me when your auditors are confused, your lawyers are lost, and your SIEM is quiet." },
  { type: "output", text: "Because I speak fluent syscalls, threat models, and jurisprudence." },
  { type: "output", text: "And yes — I still get excited about logs, legal loopholes, and Linux kernels." },
  { type: "output", text: "This isn’t a profession — it’s a compiled binary of law, logic, and zero-trust." },
  { type: "spacer" },


  { type: "command", text: "daksh@localhost:~$ echo $CONTACT" },
  { type: "output", text: "Email: <a href='mailto:daksh1201@gmail.com'>daksh1201@gmail.com</a>" },
  { type: "spacer" },

  { type: "command", text: "daksh@localhost:~$ shutdown -h now" },
  { type: "output", text: "Session terminated. See you in the matrix !!!" }
];

let lineIndex = 0;
let charIndex = 0;
let currentLine = null;
let fullTextRaw = "";
let fullTextHtml = "";

function typeNextChar() {
  if (lineIndex >= script.length) {
    const cursor = document.querySelector(".cursor");
    if (cursor) cursor.remove();
    return;
  }

  const entry = script[lineIndex];

  if (entry.type === "spacer") {
    const spacer = document.createElement("div");
    spacer.classList.add("line");
    spacer.innerHTML = " ";
    terminal.appendChild(spacer);
    lineIndex++;
    setTimeout(typeNextChar, 150);
    return;
  }

  if (!currentLine) {
    currentLine = document.createElement("div");
    currentLine.classList.add("line");
    terminal.appendChild(currentLine);

    if (entry.type === "command") {
      fullTextHtml = '<span class="prompt">daksh@localhost:~$</span> ' + entry.text;
      fullTextRaw = stripHtml('<span class="prompt">daksh@localhost:~$</span> ') + entry.text;
    } else {
      fullTextHtml = entry.text;
      fullTextRaw = stripHtml(entry.text);
    }
  }

  if (charIndex < fullTextRaw.length) {
    let displayed = escapeHtml(fullTextRaw.slice(0, charIndex + 1));
    if (entry.type === "command") {
      displayed = '<span class="prompt">daksh@localhost:~$</span> ' + escapeHtml(fullTextRaw.slice(stripHtml('<span class="prompt">daksh@localhost:~$</span> ').length, charIndex + 1));
    }
    currentLine.innerHTML = displayed + '<span class="cursor"></span>';
    charIndex++;
    setTimeout(typeNextChar, 35);
  } else {
    currentLine.innerHTML = fullTextHtml;
    currentLine = null;
    charIndex = 0;
    lineIndex++;
    setTimeout(typeNextChar, 300);
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
