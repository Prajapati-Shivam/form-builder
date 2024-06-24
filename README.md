# Formable

Formable is a web application designed to simplify online forms' creation, management, and response collection. This application provides users with an intuitive interface to design custom forms, share them, and gather responses efficiently.

## Features

- **Create Custom Forms**: Use a variety of field types to create forms tailored to your needs.
- **Manage Forms**: Edit, update, or delete existing forms.
- **Response Collection**: Gather and view responses from form participants.
- **Live Preview**: Preview your form in real-time as you design.
- **Theming**: Customize the appearance of your forms with themes and backgrounds.
- **Share Forms**: Easily share forms with others through a unique link.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **npm**: Node.js package manager, which is included with Node.js.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/formable.git
   ```

2. Navigate to the project directory:

   ```bash
   cd formable
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add your environment variables. For example:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
   CLERK_SECRET_KEY=<your-clerk-secret-key>
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_DATABASE_URL_CONFIG=<your-database-url-config>
   NEXT_PUBLIC_GEMINI_API_KEY=<your-gemini-api-key>
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

### Creating a Form

1. Navigate to the Dashboard.
2. Click on the "Create Form" button.
3. Use the form builder to edit or delete fields.
4. Save your form to store it in the database.

### Editing a Form

1. On the Dashboard, click the "Edit" button next to the form you want to modify.
2. Make your changes in the form builder.
3. Save the form to update it in the database.

### Viewing Responses

1. Navigate to the Responses page from the Dashboard.
2. Select a form to view the collected responses.
3. Responses will be displayed in a grid format for easy review.

### Sharing a Form

1. Navigate to the Dashboard.
2. Click on the "Share" button next to the form you want to share.
3. Copy the provided link and share it with your audience.

## Technologies Used

- **Next.js**: React framework for building server-side rendering and static web applications.
- **Clerk**: Authentication and user management.
- **Drizzle ORM**: SQL ORM for database management.
- **Shadcn**: Open source collection of re-usable components.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Gemini**: Google API for generating content from prompts.
