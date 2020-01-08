Chat Application
- As a User I want to have an application where I can create and join chats, write messages
there and immediately receive messages from other people joining these chats .

Flow described:
- On a main page (called Dashboard from now on) I have a button that creates a new chat
with a name that I can enter in input placed near the button. Below I want to see a list of
existing chats in a tabled view.
- Chats should be persistently stored in a database.
- In a table with chats list on Dashboard page I have a button called Join. By clickin on it I
want to be redirected to a dedicated page with a properly set route (like {host}/{chat-name})
where I can see a list of messages that participants will be sending to each other.
- Below I want to have a text input where I can type the message and button SEND that will
send a message to a chat
- I don't expect messages to be saved somewhere in database, therefore messages sent
before I join the chat might not be shown
- It would be nice to have a ability to send a message by Ctrl + Enter keys combination.
Required technical stack: .NET Core 3, WEB API, Angular 8+, SQL Server
Recommended libraries: SignalR Core, EntityFramework Core

Acceptance criteria:
- I can see a list of chats and have ability to create a new one
- Chats should be saved to a database thus I can see them after closing current application
session
- I have a basic validation rules on frontend side so it's not possible to create a chat with an
empty name or with name longer than 50 symbols
- I have ability to send a message to a chat. Other participans are seeing this message
immediately without a need to refresh the page.
- Solution should be based on Sockets, recurring calls to backend will be considered as a
failed task
- Basic validation to a messages sent to a chat should be applied - no empty messages,
maximum length should be 1024 symbols.

Advanced level requirements:
- Show cound of active participants in a chat
- Add CRUD operations for chats (Update name/Delete completely)
- Add basic bot-protection, so user who wants to join the chat has to answer a basic math
question (like 2 + 2 = 4) in a given time span (1 minute for example)
