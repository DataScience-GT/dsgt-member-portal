# Documentation
When documenting your work, try to adhere to the following guidelines. Thanks :)

# API Requests

## In Code

Header Blocks: 
- Describe the purpose of the api endpoint
- list all input parameters in the following structure
  - ```@param {type} name (where, optional/required) description```

Example:
```
/**
 * Create a new form
 * @param {string} session_id (body, required) user's session id
 * @param {string} name (body, required) form name
 * @param {string} time (body, required) form's estimated time
 * @param {string} url (body, required) url to form
 */
router.post(
  "/create",
```

Code Comments:
 - Comment stuff that we may not know just by looking at the code.
   - When looking at the line ```let countString = req.query.count?.toString();```, we know that it is an optional input that comes from the query.
 - Don't overdue it, divide the method into blocks based on the purpose of the blocks and make a general comment.

## Github Wiki
Include Description, Inputs, Returns, and anything else necessary to understand what is going on.

Example:
[/api/forms/](https://github.com/JohnRamberger/dsgt-member-portal/wiki/API-Requests~form)


# Database Schema
## Github Wiki
Include a description of what the table is used for, as well as all of the columns.

Example:
[team table](https://github.com/JohnRamberger/dsgt-member-portal/wiki/Database-Schema~team)

# React Components
## In Code
### Prop Comments
Include comments in the Props, so we know what they are.
Example:
```ts
interface TeamCardProps {
  //the id of the team
  id?: number;
  //name of the team
  name?: string;
}
```

### Code Comments
Comment what the code does. If there are functions, explain what they do. Once again, do not go overboard. Just enough to where someone unrelated can understand what is going on.

## Github Wiki


