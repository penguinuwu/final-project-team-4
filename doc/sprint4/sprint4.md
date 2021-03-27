# Sprint 4 Planning Meeting

**Meeting held on:** Sunday, March 14th, 2021

## Participants

- Shane
- Adam
- Shiang Zhi (Ben)
- Bingbing
- Yichen

## Sprint Goal

Add features that regard community and quality of user experience.

## Sprint Spikes

We have no sprint spikes in this sprint since this sprint focuses on finishing touches.

## Sprint Backlog

- **Change password**
  - _As Shane, I would like to change my password to secure my account_
  - Points: 1
  - Priority: VERY HIGH
  - Owners: Ben
  - Estimated time: 2h
  - Tasks:
    - Have password change option of profile page
    - Update database of users so that password change is reflected in said database
- **Filter queue by rank and experience**
  - _As Shane, I would like to filter other users in queue by their rank and experience_
  - Points: 3
  - Priority: HIGH
  - Owners: Shane
  - Estimated time: 3h
  - Tasks:
    - Add a dropdown for filtering user's game statistics
    - Filter users by their statistics in the backend
- **Search and sort Games**
  - _As Shane, I would like to sort games by likes or rating_
  - Points: 3
  - Priority: HIGH
  - Owners: Yichen, Ben
  - Estimated time: 3h
  - Tasks:
    - Edit frontend dropdown button and search bar
    - Implement the sorting and searching features in the backend
- **Search and sort Posts**
  - _As Shane, I would like to search for certain posts and sort by name and likes_
  - Points: 5
  - Priority: HIGH
  - Owners: Yichen
  - Estimated time: 5h
  - Tasks:
    - Edit frontend dropdown button and search bar
    - Implement the sorting and searching features in the backend
- **Ability to visit other user profiles**
  - _As Shane, I would like to be able to visit other user profiles other as well as my own_
  - Points: 5
  - Priority: MEDIUM
  - Owners: Adam
  - Estimated time: 4h
  - Tasks:
    - Ability to provide an id in the route and get a profile page for that specific user.
    - Implement component hiding for the following buttons: settings, follow, and change rank, depending on if you are viewing your own profile or another user profile.
- **Ability to upload a profile picture in settings**
  - _As Shane, I would like to be able to change my profile picture_
  - Points: 3
  - Priority: MEDIUM
  - Owners: Yichen
  - Estimated time: 2h
  - Tasks:
    - Ability to upload an image and store it in the database
    - Ability to pull the image for the profile when the page loads.
- **Add following**
  - _As Shane, I would like to follow other users_
  - Points: 1
  - Priority: MEDIUM
  - Owners: Bingbing
  - Estimated time: 1h
  - Tasks:
    - Implement the follow button on the profile page to add the user to the logged in user’s following list.
    - Update following tab on profile page by pulling the list from server
- **List of favourite games and media posts**
  - _As Shane, I would like to see my games and posted media on my profile page_
  - Points: 5
  - Priority: LOW
  - Owners: Adam
  - Estimated time: 4h
  - Tasks:
    - Implement favourite button on game pages to add the game to the logged in user’s games list
    - Favourite games and posted media should be visible in the profile pages home, games, and media tabs (Requires pulling the data from the server).
- **Ability to block users**
  - _As Shane, I would like to be able to block other users by pressing the block button on their profile page_
  - Points: 3
  - Priority: VERY LOW
  - Owners: Bingbing
  - Estimated time: 2h
  - Tasks:
    - Implement block button on profile pages which sends a request to add the user to the logged in user’s block list
