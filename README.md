# David Boshard - Event Talks Application

## Project Overview

This project provides a single-page web application to display the schedule for a 1-day technical talks event. It features a clean, responsive design and allows users to easily view the event schedule and search for talks by category. The entire application is compiled into a single, self-contained HTML file for easy deployment and sharing.

## Features

*   **Dynamic Schedule Display:** Shows all talks and breaks with their respective timings.
*   **Talk Details:** Each talk includes title, speakers, category, duration, and a description.
*   **Search by Category:** Users can filter talks based on keywords in their categories.
*   **Single-File Deployment:** The entire application is bundled into one `final_event_schedule.html` file.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You will need Python 3 installed on your system to serve the static HTML file locally.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dboshard/David-Boshard--event-talks-app.git
    cd David-Boshard--event-talks-app
    ```

### Running the Application

The application is a single, self-contained HTML file (`final_event_schedule.html`). To view it:

1.  **Open your terminal** in the project directory (where `final_event_schedule.html` is located).
2.  **Start a simple Python HTTP server:**
    ```bash
    python3 -m http.server 8000
    ```
    This will start a server on port `8000`.
3.  **Open your web browser** and navigate to `http://localhost:8000/final_event_schedule.html`.

You should now see the event schedule displayed in your browser.

## Usage

*   **View Schedule:** The full day's schedule will be displayed upon loading the page.
*   **Search Talks:** Use the "Search by Category" input field to filter talks. Type keywords like "AI", "Web", "Cloud", "DevOps", "Python", etc., to see relevant talks. The search is case-insensitive and updates dynamically as you type.

## Project Structure

```
.
├── .gitignore                  # Specifies intentionally untracked files to ignore.
├── build.js                    # Node.js script used to compile the source files.
└── final_event_schedule.html   # The compiled, self-contained event schedule website.
```

The `final_event_schedule.html` is generated from source files (`index.html`, `style.css`, and `script.js`) which are typically used during development but are not included in the repository as per the `.gitignore` configuration. The `build.js` script automates this compilation process.

## Customization

To modify the talk data or design:

1.  **Modify Source Files:** You would typically edit the `index.html`, `style.css`, and `script.js` files (you would need to recreate these locally if you only cloned the repo).
    *   **`script.js`**: Contains the `talksData` array where you can add, remove, or modify talk details. This is also where the schedule calculation and filtering logic resides.
    *   **`style.css`**: Defines the visual styling of the application.
    *   **`index.html`**: Provides the basic HTML structure and elements.
2.  **Re-compile:** After making changes, run the `build.js` script to generate an updated `final_event_schedule.html`:
    ```bash
    node build.js
    ```
3.  **Verify:** Test your changes by running the Python HTTP server as described in the "Running the Application" section.

## Contributing

If you wish to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details (if one is created).
