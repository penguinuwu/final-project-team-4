# Sprint 3 Planning Meeting

**Meeting held on:** Sunday, February 28th, 2021

## Participants

- Shane
- Adam
- Shiang Zhi (Ben)
- Bingbing
- Yichen

## Sprint Goal

Mostly frontend, data managing, implement features that utilize frontend

## Sprint Spikes

We have a sprint spike on task TEAM-21, which involves uploading images and youtube videos. We do not have any experience with uploading images from the React frontend to the Node.js backend, so we will need to research for tools and learn how to use those tools.

## Sprint Backlog

- **Create database table for games**

  - _As Shane, I would like intractability regarding games and rating them_
  - Points: 3
  - Priority: VERY HIGH
  - Owners: Shane
  - Estimated time: 3h
  - Tasks
    - Create database table for games
    - Update existing features to use database table
    - Rating storage and calculation

- **Create database table for posts**

  - _As Shane, I would like to store my posts_
  - Points: 3
  - Priority: HIGH
  - Owners: Adam
  - Estimated time: 2h
  - Tasks:
    - Create database table for media posts

- **Upload images and videos**

  - _As Shane, I would like to queue up for my favourite game to be matched with other users to play with._
  - Points: 10
  - Priority: MEDIUM
  - Owners: Yichen, Ben
  - Estimated time: 16h
  - Tasks:
    - Upload media from front-end
    - Verify and categorize media in back-end
    - Format media for display in back-end
    - Display media in front-end

- **Like media and set up posts to be dynamic**

  - _As Shane, I would like to like posts and get certain posts based on post id in the route_
  - Points: 5
  - Priority: MEDIUM
  - Owners: Adam
  - Estimated time: 6h
  - Tasks:
    - Ability to like posts
    - Each user can only like once
    - Posts should be obtained from the server based on the id provided is the route: /media/id

- **View community posts dynamically taken from the server**

  - _As Shane, I would like to see community posts stored on the server in the community page_
  - Points: 5
  - Priority: MEDIUM
  - Owners: Adam
  - Estimated time: 5h
  - Tasks:
    - An api endpoint to get the posts
    - The community page must pull the posts and render them appropriately
    - Liking posts function must be connected to the server

- **Critique games**
  - _As Shane, I would like to view a game's ratings and rate the game myself._
  - Points: 7
  - Priority: LOW
  - Owners: Shane, Bingbing
  - Estimated time: 4h
  - Tasks:
    - Some menu with 5 buttons 1-5 to rate the game
    - Calculate and display overall rating of a game
