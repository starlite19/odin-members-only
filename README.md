# ODIN Members Only Application
Project deployed on https://odin-members-only-2myp.onrender.com

- Note that it may take a while to load because the application is asleep

This project demonstrates the concepts of building a basic Express app using the following knowledge:
- EJS, CSS
- Routers, Views, Controllers
- PostgreSQL
- Express validator
- Authentication using Passport and bcrypt

Functionality:
- View list of messages (author's name and date of message are hidden)
- Sign up and encrypt passwords
- Login and allow users to create a new message
- Users can join the club by entering a secret passcode (upgraded to membership status)
- Members can see the author and date on messages
- Users can become an admin by entering a secret passcode (upgraded to admin status)
- Admin can see author and date on messages AND delete messages
- Log out

Missing Features:
- No hints on secret codes
- Cannot delete account
- No option to view only your own messages
- Cannot remove/downgrade status

<details>
<summary>SECRET CODES for testing purposes:</summary>

- Member: MICKEYMOUSE
- Admin: MMCLUBHOUSE
</details>