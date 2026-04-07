# Finance Dashboard

A full-stack finance dashboard application built using React and Django REST Framework. The application allows users to manage transactions, analyze financial data, and gain insights into spending patterns through interactive visualizations.



## Overview

This project was developed as part of a frontend developer internship assignment. The goal was to design and build a clean, intuitive dashboard that helps users understand their financial activity.

The application provides features such as financial summaries, transaction management, filtering, data visualization, and role-based UI behavior.



## Features

### Dashboard Overview

* Displays summary cards for total balance, total income, and total expenses
* Includes a time-based visualization (monthly/yearly trends using a line chart)
* Includes a categorical visualization (expense distribution using a pie chart)

### Transactions Management

* Displays transactions in a tabular format
* Supports pagination for better data handling
* Allows adding, editing, and deleting transactions (admin role only)
* Provides filtering by category and type
* Includes search functionality for quick lookup

### Role-Based UI

* Viewer role: read-only access
* Admin role: full access to create, update, and delete transactions
* Role switching implemented via UI for demonstration

### Financial Insights

* Identifies top spending category
* Displays largest expense
* Calculates savings rate
* Provides basic monthly comparison insights

### User Interface and Experience

* Responsive design across different screen sizes
* Dark mode support using Tailwind CSS
* Smooth transitions and hover effects
* Skeleton loaders for loading states
* Proper handling of empty data scenarios

### Export Functionality

* Download all transactions as JSON
* Download filtered transactions as JSON





### Frontend

* React.js
* Tailwind CSS
* Recharts (for data visualization)
* Ant Design (for select components)
* React Icons

### Backend

* Django
* Django REST Framework

### State Management

* Custom React hooks:

  * useTransactions
  * useFilters
  * useChartData
  * useTheme



## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gvinayratnam/finance-dashboard.git
cd finance-dashboard
```

---

### 2. Backend Setup (Django)

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend will run on:

```
http://127.0.0.1:8000/api/
```

---

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---


## Key Implementation Details

### Chart Data Processing

* Transactions are grouped by year or month depending on the selected filter
* Income and expense are aggregated dynamically
* Balance is calculated as:

```
balance = income - expense
```

### Filtering Logic

* Search is applied on transaction title
* Category and type filters are applied together
* Filtering logic is handled in a reusable utility function

### Performance Optimization

* useMemo is used to avoid unnecessary recalculations
* Chart data and derived values are memoized

### Theme Management

* Dark mode preference is stored in localStorage
* Tailwind's dark class is toggled dynamically

---

## Edge Cases Handled

* Application handles empty transaction lists gracefully
* Skeleton loaders are shown during data fetching
* Division-by-zero cases are handled in calculations
* Filters are disabled when not applicable

---

## Optional Enhancements Implemented

* Dark mode support
* JSON export functionality
* Responsive layout
* Loading skeletons
* Smooth UI transitions

---

## Future Improvements

* CSV export support
* Budget tracking feature
* Authentication and user accounts
* Advanced analytics and insights
* Real-time updates

---

## Coverage

This project satisfies the core requirements of the:

* Dashboard overview with summary and visualizations
* Transactions section with filtering and search
* Role-based UI behavior
* Insights section with meaningful observations
* Proper state management using hooks
* Clean and responsive user interface

---

## Author

Vinay Ratnam Geesala
Email: [vlnaynan1229@gmail.com](mailto:vlnaynan1229@gmail.com)

---

## Final Note

The focus of this project is on clarity, usability, and maintainable code structure. The implementation prioritizes simplicity and clean design while covering all required functionalities effectively.
