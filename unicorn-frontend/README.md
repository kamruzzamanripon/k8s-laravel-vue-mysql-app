# Unicorn App Overview
#test github

This App is a Vue.js web application that allows users to run CRUD operations on Unicorn data served via REST API. Here I used https://crudcrud.com/ API. This App has a lot of facilities. like, Pagination, Sorting feature, search feature, item create and update modal, Loader page ect.

## Instructions on how to install and run your application locally

```
- Clone this repository on your local drive.
- npm install
- rename exampe.env file as .env
- replace crudcrud unique ID from this https://crudcrud.com
- npm run dev
```

# Overview App

## Default page

![This is a alt text.](/public/screenshort/Screenshot_11.jpg)

### Note: This is Primary state. So, you need unique id from https://crudcrud.com . Go to this site and take id and repleace on your env file. First rename example.env file as .env then replace your Id. Then create some item.

## After Create Item then this page will look like.

![This is a alt text.](/public/screenshort/Screenshot_1.jpg)

## Create Modal.

![This is a alt text.](/public/screenshort/Screenshot_2.jpg)

## Validation Check before submit.

![This is a alt text.](/public/screenshort/Screenshot_3.jpg)

## Show success message right bottom side.

![This is a alt text.](/public/screenshort/Screenshot_4.jpg)

## Edit Modal.

![This is a alt text.](/public/screenshort/Screenshot_5.jpg)

## Before Delete Item show alert.

![This is a alt text.](/public/screenshort/Screenshot_6.jpg)

## After confirm delete item then show message right bottom side.

![This is a alt text.](/public/screenshort/Screenshot_7.jpg)

## Sorting feature add.

![This is a alt text.](/public/screenshort/Screenshot_8.jpg)

## Search feature add.

![This is a alt text.](/public/screenshort/Screenshot_9.jpg)

## Loader page add.

![This is a alt text.](/public/screenshort/Screenshot_10.jpg)

### That's a short brief about this app. I hope you are enjoying it.

## Explanation of your application structure and design choices.

### Directory Structure

Below is the directory structure of the project with explanations for each folder and its responsibilities:
![This is a alt text.](/public/screenshort/Screenshot_12.jpg)

### Design Choices

The structure reflects the following principles:

1. Modularity:
   - UI components are broken down into logical subdirectories (common, dashboard, etc.) to keep the codebase clean and maintainable.
   - The modal and layout folders encapsulate reusable structures for UI consistency.
2. Separation of Concerns:
   - Page-level components (in views/) handle route-level logic and layout, while reusable components (in components/) focus on UI elements.
3. Routing Management:

   - All routing logic is centralized in the router/ directory to make navigation easier to maintain.

4. State Management:
   - The stores/ directory handles global state, ensuring components remain stateless and testable.

### challenges

    - Pagination Mechanism. In every request, I didn't know how many pages I got and there is no meta data about pagination.
    - Search feature add without call again api. Its do search inside data stored in pinia.

### Bonus

    - Pinia store add.
    - Search feature add.
    - When delete item then show alert.
    - when create or update any item then show success message.

test one
