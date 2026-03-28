document.addEventListener('DOMContentLoaded', () => {
    // Placeholder Data
    const talksData = [
        {
            title: "Introduction to AI",
            speakers: ["Alice Wonderland"],
            category: ["AI", "ML"],
            duration: 60,
            description: "An overview of artificial intelligence, its history, and future trends."
        },
        {
            title: "Cloud Native Development",
            speakers: ["Bob The Builder"],
            category: ["Cloud", "DevOps"],
            duration: 60,
            description: "Building scalable applications for the cloud using modern principles."
        },
        {
            title: "Modern JavaScript Frameworks",
            speakers: ["Carol Danvers"],
            category: ["Web", "Frontend"],
            duration: 60,
            description: "A deep dive into popular JavaScript frameworks like React and Vue."
        },
        // Lunch Break will be injected here dynamically
        {
            title: "Data Science with Python",
            speakers: ["David Banner"],
            category: ["Data Science", "Python"],
            duration: 60,
            description: "Exploring data analysis and machine learning techniques using Python."
        },
        {
            title: "Security Best Practices",
            speakers: ["Eve Harrington"],
            category: ["Security", "DevOps"],
            duration: 60,
            description: "Essential security measures and practices for developers."
        },
        {
            title: "Future of Web Assembly",
            speakers: ["Frank Reynolds"],
            category: ["Web", "Performance"],
            duration: 60,
            description: "Understanding Web Assembly and its impact on web development."
        }
    ];

    const scheduleContainer = document.getElementById('schedule-container');
    const categorySearchInput = document.getElementById('category-search');

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    }

    function calculateSchedule(data) {
        const fullSchedule = [];
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

        let talkIndex = 0;
        for (let i = 0; i < data.length + 1; i++) { // +1 for lunch break
            // Insert lunch after the 3rd talk
            if (i === 3) {
                const lunchStartTime = new Date(currentTime.getTime());
                currentTime.setMinutes(currentTime.getMinutes() + 60); // 1 hour lunch
                const lunchEndTime = new Date(currentTime.getTime());
                fullSchedule.push({
                    title: "Lunch Break",
                    type: "break",
                    duration: 60,
                    startTime: formatTime(lunchStartTime),
                    endTime: formatTime(lunchEndTime)
                });
                currentTime.setMinutes(currentTime.getMinutes() + 10); // 10 min transition after lunch
                continue;
            }

            const talk = data[talkIndex];
            const talkStartTime = new Date(currentTime.getTime());
            currentTime.setMinutes(currentTime.getMinutes() + talk.duration);
            const talkEndTime = new Date(currentTime.getTime());

            fullSchedule.push({
                ...talk,
                type: "talk",
                startTime: formatTime(talkStartTime),
                endTime: formatTime(talkEndTime)
            });

            if (talkIndex < data.length -1) { // Add transition after all talks except the last
                currentTime.setMinutes(currentTime.getMinutes() + 10); // 10 min transition
            }
            talkIndex++;
        }
        return fullSchedule;
    }

    const fullEventSchedule = calculateSchedule(talksData);

    function renderSchedule(filteredSchedule) {
        scheduleContainer.innerHTML = ''; // Clear previous schedule
        if (filteredSchedule.length === 0) {
            scheduleContainer.innerHTML = '<p>No talks found matching your search criteria.</p>';
            return;
        }

        filteredSchedule.forEach(item => {
            const card = document.createElement('div');
            card.classList.add(item.type === 'talk' ? 'talk-card' : 'break-card');

            let content = `
                <p class="time">${item.startTime} - ${item.endTime}</p>
                <h3>${item.title}</h3>
            `;

            if (item.type === 'talk') {
                content += `
                    <p class="speakers">Speaker(s): ${item.speakers.join(', ')}</p>
                    <p>${item.description}</p>
                    <p class="category">Category: ${item.category.join(', ')}</p>
                `;
            } else {
                content += `<p>${item.description || 'Enjoy your meal!'}</p>`;
            }
            card.innerHTML = content;
            scheduleContainer.appendChild(card);
        });
    }

    function filterSchedule() {
        const searchTerm = categorySearchInput.value.toLowerCase().trim();
        if (!searchTerm) {
            renderSchedule(fullEventSchedule); // Show full schedule if search is empty
            return;
        }

        const filtered = fullEventSchedule.filter(item =>
            item.type === 'talk' && item.category &&
            item.category.some(cat => cat.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filtered);
    }

    // Initial render
    renderSchedule(fullEventSchedule);

    // Event listener for search input
    categorySearchInput.addEventListener('keyup', filterSchedule);
    categorySearchInput.addEventListener('change', filterSchedule);
});
