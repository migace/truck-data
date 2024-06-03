# Truck Data - ERP Module

## Overview

This project is a React application created as part of a recruitment task. The goal is to build a page with a form for managing truck data, integrated with a mock API. This page is the first module of an ERP application, with the potential to add more modules in the future.

## Features

- Perform CRUD (Create, Read, Update, Delete) operations on truck data.
- Ensure each truck:
  - Has a unique alphanumeric code.
  - Has a name.
  - Has a status from a predefined set: "Out Of Service", "Loading", "To Job", "At Job", "Returning".
    - "Out Of Service" status can be set regardless of the current status.
    - Each status can be set if the current status is "Out Of Service".
    - Remaining statuses can only be changed in the following order: Loading -> To Job -> At Job -> Returning.
    - When a truck has the "Returning" status, it can start "Loading" again.
  - May have a description.

## Mock API

The application interacts with a mock API available at:
http://qa-api-mock-3.eu-central-1.elasticbeanstalk.com/

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/migace/truck-data.git
   cd truck-management-erp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**

   ```bash
   npm run dev
   ```

   The application should now be running at `http://localhost:5173`.

## Usage

1. **Create a Truck:**
   - Fill in the form with the truck's unique alphanumeric code, name, status, and optional description.
   - Click the "Create" button to create a new truck.

2. **Read/View Trucks:**
   - The list of trucks will be displayed on the page. Each truck's details, including code, name, status, and description, will be shown.

3. **Update a Truck:**
   - Click the "Edit" button next to a truck's details.
   - Update the necessary fields and click "Save" to apply the changes.

4. **Delete a Truck:**
   - Click the "Delete" button next to a truck's details to remove it from the list.

## Project Structure

- `src/pages`: Contains React components for every single module in ERP system.
- `src/services`: Contains the API service to interact with the mock API using RTK Query.
- `src/App.tsx`: Main application layout component.
- `src/main.tsx`: Entry point for the React application.

## Future Modules

This project is designed to be part of a larger ERP system. Future modules for managing different resources such as employees, factories, and customers can be added similarly.

## Contributing

Feel free to fork this repository, make feature branches, and create pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact me at michal.gacek@tiptopdesign.pl.
